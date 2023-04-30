const foodController = require("../controllers/food.controller");
const middlewareController = require('../middleware/middlewareController');



const router = require("express").Router();

router.get("/foods", middlewareController.verifyToken, foodController.getAllFood);



module.exports = router;
