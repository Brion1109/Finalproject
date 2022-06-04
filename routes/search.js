const express = require('express');
const router = express.Router();
const Herb = require("../models/herbsModel");

router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Herb.find({name: regex}, function(err, allherbs){
           if(err){
               console.log(err);
           } else {
              if(allherbs.length < 1) {
                  noMatch = ("No herbs match that query, please try again.");
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