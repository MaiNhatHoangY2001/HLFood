const ingredientController = require("../controllers/ingredient.controller");
const middlewareController = require('../middleware/middlewareController');


const router = require("express").Router();

router.get("/ingredients", middlewareController.verifyTokenAndAdminAuth, ingredientController.getAllIngredient);


module.exports = router;
