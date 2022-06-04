const mongoose = require('mongoose');

const beautySchema = new mongoose.Schema({
URL:String,
URL1:String,
URL2:String,
URL3:String,
URL4:String,
URL5:String,
URL6:String,
URL7:String,
URL8:String,
URL9:String,
URL10:String,
description: String
});

const Beauty = mongoose.model('Beauty',beautySchema);

module.exports =Beauty;