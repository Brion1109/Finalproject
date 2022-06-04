const mongoose = require('mongoose');

const indietSchema = new mongoose.Schema({
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
description: String,
description1: String,
description2: String,
description3: String,
description4: String
});

const Indiet = mongoose.model('Indiet',indietSchema);

module.exports = Indiet;