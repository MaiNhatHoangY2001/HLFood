const mongoose = require('mongoose');

const food = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		required: true,
	},
	type: {
		type: Number,
		require: true,
	},
	is_deleted: {
		type: Boolean,
		default: false,
	},
	is_outdated: {
		type: Boolean,
		default: false,
	},
	order_details: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'OrderDetail',
		},
	],
});

module.exports = mongoose.model('Food', food);
