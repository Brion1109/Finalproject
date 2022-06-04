var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	img: {
        type: String,
    },
	username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
	firstname: {
        type: String,
    },
	surname: {
        type: String,
    },
	phonenumber: {
        type: String,
    },
	address: {
        type: String,
    },
	country: {
        type: String,
    },
	state: {
        type: String,
    },
	sos: {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    provider: {
        type: String,
        required: true,
    },
	cart: {
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
	         		ref: "Product"
				},
				qty: Number
			}
		],
		cart_total: {type: Number, default: 0},
		discount: {type: Number, default: 0},
		total: {type: Number, default: 0}
	},
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
	        ref: "Order"
		}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);