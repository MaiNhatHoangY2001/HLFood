const Customer = require("../model/Customer");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const cusController = {
  //ADD USER
  addCus: async (req, res) => {
    try {
      const newUser = new Customer(req.body);
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  checkCus: async (profile) => {
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

module.exports = cusController;
