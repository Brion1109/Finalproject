const mongoose = require('mongoose');

const herbsSchema = new mongoose.Schema({
name: String,
name1:String,
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
description1: String,
description2: String,
description3: String,
description4: String,
description5: String,
description6: String,
description7: String,
description8: String,
description: String
});

const Herbs = mongoose.model('Herbs',herbsSchema);

module.exports = Herbs;