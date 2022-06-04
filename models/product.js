var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
	name: String,
	stock:String,
	image: String,
	description:String,
	type:String,
	mrp: Number,
	price: Number,
	stock_balance: Number,
	disc_perc: Number,
	discount: Number,
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review"
		}
	]
});

module.exports = mongoose.model('Product',productSchema);