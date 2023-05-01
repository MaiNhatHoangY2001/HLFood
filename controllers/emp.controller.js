const Employee = require('../model/Employee.model');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const empController = {
	//ADD USER
	addEmp: async (req, res) => {
		try {
			const newUser = new Employee(req.body);
			const saveUser = await newUser.save();
			res.status(200).json(saveUser);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	updateEmp: async (req, res) => {
		try {
			const emp = await Employee.findById(req.query.id);
			await emp.updateOne({ $set: { ...req.body } });
			res.status(200).json('Update emp successfuly');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	checkEmp: async (profile) => {
		const cus = await Customer.findOne({ email: profile.email });

		if (!cus) {
			// Save the new user to the database
			const newUser = new Customer({ name: profile.name, email: profile.email });
			const saveUser = await newUser.save();
			return saveUser;
		} else return cus;
	},
	getAllEmp: async (req, res) => {
		try {
			const emps = await Employee.find();
			res.status(200).json(emps);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	getAllEmpActive: async (req, res) => {
		try {
			const emps = await Employee.find({ is_deleted: false }).populate('tables');
			res.status(200).json(emps);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	deleteEmp: async (req, res) => {
		try {
			const emp = await Employee.findById(req.query.id);

			const modifiedUserName = `${emp.username}_deleted_${Date.now()}`;

			await emp.updateOne({ $set: { username: modifiedUserName, is_deleted: true } });

			res.status(200).json('Delete successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = empController;
