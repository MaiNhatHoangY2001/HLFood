const foodController = require("../controllers/food.controller");
const foodDetailController = require("../controllers/food_detail.controller");


const router = require("express").Router();

router.get("/foods", foodController.getAllFood);

router.post("/foodDetail", foodDetailController.addFoodDetail);


module.exports = router;
