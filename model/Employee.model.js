const hasingPass = require('../middleware/hasingPasword');
const mongoose = require('mongoose');

const employee = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	phone_num: {
		type: String,
		required: true,
		trim: true,
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	refreshToken: {
		type: String,
	},
	job_title: {
		type: Number,
		required: true,
	},
	is_deleted: {
		type: Boolean,
		default: false,
	},
	admin: {
		type: Boolean,
		default: false,
	},
	tables: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Table',
		},
	],
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Order',
		},
	],

	notifications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Notification',
		},
	],
});

hasingPass(employee);

module.exports = mongoose.model('Employee', employee);
