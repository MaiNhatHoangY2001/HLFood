const ingredientController = require("../controllers/ingredient.controller");

const router = require("express").Router();

router.get("/ingredients", ingredientController.getAllIngredient);


module.exports = router;
