const foodController = require("../controllers/food.controller");
const foodDetailController = require("../controllers/food_detail.controller");
const middlewareController = require('../middleware/middlewareController');



const router = require("express").Router();

router.get("/foods", middlewareController.verifyToken, foodController.getAllFood);

router.post("/foodDetail", middlewareController.verifyToken, foodDetailController.addFoodDetail);


module.exports = router;
