const foodController = require('../controllers/food.controller');
const middlewareController = require('../middleware/middlewareController');

const router = require('express').Router();

router.get('/foods', middlewareController.verifyToken, foodController.getAllFood);
router.get('/foods:active', middlewareController.verifyToken, foodController.getAllFoodActive);
router.post('/food', middlewareController.verifyToken, foodController.addFood);
router.delete('/food', middlewareController.verifyToken, foodController.deleteFood);
router.put('/food', middlewareController.verifyToken, foodController.updateFood);

module.exports = router;
