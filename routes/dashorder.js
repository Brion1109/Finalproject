var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Order = require("../models/order");

//INDEX - show all campgrounds
router.get("/dashorder", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
       Order.find({name: regex}, function(err, allOrders){
           if(err){
               console.log(err);
           } else {
              if(allOrders.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("orders/admin",{orders:allOrders, noMatch: noMatch,csrfToken: req.csrfToken()});
           }
        });
    } else {
        // Get all campgrounds from DB
       Order.find({}, function(err, allOrders){
           if(err){
               console.log(err);
           } else {
              res.render("orders/admin",{orders:allOrders, noMatch: noMatch,csrfToken: req.csrfToken()});
           }
        });
    }
});



// UPDATE CAMPGROUND ROUTE
router.put("/:id",function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedOrder){
       if(err){
           res.redirect("orders/dashorders");
       } else {
           //redirect somewhere(show page)
           res.redirect("orders/dashorders/" + req.params.id);
       }
    });
});


router.delete("/Orders/:id/",function(req,res){
	Order.findById(req.params.id,function(err,order){
		if(err || !order) {
			req.flash("error","order not found!!");
			res.redirect("/dashorder");
		} else {
			Order.findByIdAndRemove(req.params.order_id,function(err){
				if(err) {
					req.flash("error","Something went wrong!!");
					res.redirect("/dashorder");
				} else {
					req.flash("success","Review removed!!");
					res.redirect("/dashorder" + order._id);
				}
			});
		}
	});
});


    

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;