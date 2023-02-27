const foodController = require("../controllers/food.controller");

const router = require("express").Router();

router.get("/foods", foodController.getAllFood);


module.exports = router;
