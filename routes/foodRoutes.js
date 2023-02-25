const foodController = require("../controllers/foodController");

const router = require("express").Router();

router.get("/foods", foodController.getAllFood);


module.exports = router;
