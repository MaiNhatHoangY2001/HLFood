const mongoose = require('mongoose');

const table = new mongoose.Schema({
	table_num: {
		type: Number,
		required: true,
	},
	status: {
		type: Number,
		required: true,
	},
	floor: {
		type: Number,
		required: true,
	},
	chair: {
		type: Number,
		required: true,
	},
	is_deleted: {
		type: Boolean,
		default: false,
	},
	order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Order',
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Employee',
	},
});

module.exports = mongoose.model('Table', table);
