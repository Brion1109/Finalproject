const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');
const Image = require("../models/image");

router.get("/", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all campgrounds from DB
      Image.find({name: regex}, function(err, allImages){
         if(err){
             console.log(err);
         } else {
            if(allImages.length < 1) {
                noMatch = "No Images match that query, please try again.";
            }
            res.render("herbs",{images:allImages, noMatch: noMatch});
         }
      });
  } else {
      // Get all campgrounds from DB
      Image.find({}, function(err, allImages){
         if(err){
             console.log(err);
         } else {
            res.render("herbs",{image:allImages, noMatch: noMatch});
         }
      });
  }
});

router
.route('/')
.get(imagesController.getAllImages)
.post(imagesController.createImages);


router
.route('/:id')
.get(imagesController.getImage)
.put(imagesController.updateImage)
.delete(imagesController.deleteImage);


module.exports = router;