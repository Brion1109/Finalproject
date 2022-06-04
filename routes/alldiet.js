const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController');
const Diet = require("../models/dietModel");

//INDEX - show all 
router.get("/", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all  from DB
      Diet.find({name: regex}, function(err, alldiets){
         if(err){
             console.log(err);
         } else {
            if(alldiets.length < 1) {
                noMatch = ("No match that query, please try again.");
                res.render("alldiet/dietsearch",{noMatch: noMatch});
            }
            res.render("alldiet/alldiet",{diets:alldiets, noMatch: noMatch});
         }
      });
  } else {
      // Get all  from DB
        Diet.find({}, function(err, alldiets){
         if(err){
             console.log(err);
         } else {
            res.render("alldiet/alldiet",{diets:alldiets, noMatch: noMatch});
         }
      });
  }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


router
.route('/')
.get(dietController.getAllDiets)
.post(dietController.createDiets);


router
.route('/:id')
.get(dietController.getDiet)
.put(dietController.updateDiet)
.delete(dietController.deleteDiet);
module.exports = router;
