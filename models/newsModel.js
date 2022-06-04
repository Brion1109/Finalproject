const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
image: String,
image1: String,
image2: String,
image3: String,
image4: String,
image5: String,
image6: String,
image7: String,
image8: String,
image9: String,
image10: String,
image11: String,
image12: String,
image13: String,
image14: String,
image15: String,
image16: String,
image17: String,
image18: String,
image19: String,
image20: String,
image21: String,
details1: String,
details2: String,
details3: String,
details4: String,
details5: String,
details6: String,
details7: String,
details8: String,
details9: String,
details10: String
});

const News = mongoose.model('News',newsSchema);

module.exports = News;