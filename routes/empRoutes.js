const empController = require("../controllers/emp.controller");

const router = require("express").Router();

router.get("/employees", empController.getAllEmp);


module.exports = router;
