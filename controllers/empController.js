const Employee = require("../model/Employee");
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
};

module.exports = empController;
