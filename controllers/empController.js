const Employee = require("../model/Employee.model");
const bcrypt = require("bcrypt");
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
  checkEmp: async (profile) => {
    const cus = await Customer.findOne({ email: profile.email });

    if (!cus) {
      // Save the new user to the database
      const newUser = new Customer({ name: profile.name, email: profile.email });
      const saveUser = await newUser.save();
      return saveUser
    } else
      return cus
  }
};

module.exports = empController;
