var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var OrderCount = require("../models/orderCount");
const { findOneAndUpdate } = require("../models/product");
const Product = require("../models/product");
var User = require("../models/user");

router.get("/checkout",isLoggedIn,function(req,res){
	res.render("cart/checkout",{user: req.user,csrfToken: req.csrfToken()});
});

router.post("/checkout",isLoggedIn,function(req,res){
	console.log(req.body)
	OrderCount.findOne({},function(err,orderCountObject) {
		if(err || !orderCountObject) {
			req.flash("error","Something went wrong!!");
			res.redirect("/products");
		} else {
			orderCountObject.count++;
			var no = orderCountObject.count;
			orderCountObject.save();
			User.findById(req.user._id).populate("cart.items.product").exec(function(err,user){
				console.log(user)
				var order = {
					no: no,
					name: req.body.name,
					address: req.body.address,
					contactNo: req.body.contactNo,
					paymentMode: 'COD',
					checkoutCart: {
						items: [],
						cart_total: user.cart.cart_total,
						discount: user.cart.discount,
						total: user.cart.total
					},
					user: req.user
				}
				user.cart.items.forEach(async function(cartItem){
					var orderItem = {
						product: {
							id: cartItem.product._id,
							name: cartItem.product.name,
							image: cartItem.product.image,
							mrp: cartItem.product.mrp,
							price: cartItem.product.price,
							disc_perc: cartItem.product.disc_perc,
							discount: cartItem.product.discount
						},
						qty: cartItem.qty
					}
					order.checkoutCart.items.push(orderItem);
					// ตัด Stock
					let productStock = await Product.findById(cartItem.product._id);
					let balance = (productStock.stock_balance - cartItem.qty);
					console.log("productStock",productStock.stock_balance)
					productStock.stock_balance = balance;
					productStock.save();
					// End
				});
				Order.create(order,function(err,order) {
					if(err || !order) {
						req.flash("error","Something went wrong!!");
						res.redirect("/products");
					} else {
						req.user.orders.unshift(order);
						req.user.cart.items.splice(0,req.user.cart.items.length);
						req.user.cart.cart_total=0;
						req.user.cart.discount=0;
						req.user.cart.total=0;
						req.user.save();
						req.flash("success","Order placed successfully!!")
						res.redirect("/order/"+order._id+"/success");
					}
				});
				
			});
		}
	});
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Login to continue!!");
	res.redirect("/login");
}

module.exports = router;