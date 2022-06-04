const express = require('express');
const router = express.Router();
const allherbsController = require('../controllers/allherbsController');
const Herb = require("../models/herbsModel");

//INDEX - show all campgrounds
router.get("/", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all campgrounds from DB
      Herb.find({$or:[{name: regex},{description8: regex}]}, function(err, allherbs){
         if(err){
             console.log(err);
         } else {
            if(allherbs.length < 1) {
                noMatch = ("No match that query, please try again.");
                res.render("search",{noMatch: noMatch});
            }
            res.render("allherbs/allherbs",{herbs:allherbs, noMatch: noMatch});
         }
      });
  } else {
      // Get all campgrounds from DB
        Herb.find({}, function(err, allHerbs){
         if(err){
             console.log(err);
         } else {
            res.render("allherbs/allherbs",{herbs:allHerbs, noMatch: noMatch});
         }
      });
  }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


router
.route('/')
.get(allherbsController.getAllHerbs)
.post(allherbsController.createHerbs);


router
.route('/:id')
.get(allherbsController.getHerb)
.put(allherbsController.updateHerb)
.delete(allherbsController.deleteHerb);
module.exports = router;
