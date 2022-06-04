var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Order = require("../models/order");

router.get("/order/:id/success",isLoggedIn,function(req,res){
   	res.render("cart/confirmation",{id: req.params.id,user: req.user,csrfToken: req.csrfToken()});
});

router.get("/orders",isLoggedIn,function(req,res){
	User.findById(req.user._id).populate('orders').exec(function(err,user){
		if(err || !user) {
			req.flash("error","Something went wrong!!");
			res.redirect("/products");
		} else {
			res.render("orders/index",{orders: user.orders});
		}
	});
});

router.get("/orders/:id",isLoggedIn,function(req,res){
	Order.findById(req.params.id,function(err,order){
		if(err || !order) {
			req.flash("error","Order not found!!");
			res.redirect("/products");
		} else {
			res.render("orders/show",{order: order});
		}
	});
});


router.delete("/orders/:id",function(req,res){
	Order.findByIdAndRemove(req.params.id,function(err){
		if(err) {
			req.flash("error","Something went wrong!!");
			res.redirect("/dashorder");
		} else {
			req.flash("success","Order removed!!");
			res.redirect("/dashorder");
		}
	});
});

router.get("/orders",isLoggedIn,function(req,res){
	User.findById(req.user._id).populate('orders').exec(function(err,user){
		if(err || !user) {
			req.flash("error","Something went wrong!!");
			res.redirect("/products");
		} else {
			res.render("orders/admi",{orders: user.orders});
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