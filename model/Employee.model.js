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
		type: String,
		required: true,
		trim: true,
	},
	admin: {
		type: Boolean,
		default: false,
	},
	tables: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tables',
		},
	],
	shifts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shift',
		},
	],
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Order',
		},
	],
	inventories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Inventory',
		},
	],
	notifications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Notification',
		},
	],
	receipt: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Receipt',
	},
});

hasingPass(employee);

module.exports = mongoose.model('Employee', employee);
