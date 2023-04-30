const foodController = require('../controllers/food.controller');
const middlewareController = require('../middleware/middlewareController');

const router = require('express').Router();

router.get('/foods', middlewareController.verifyToken, foodController.getAllFood);
router.post('/food', middlewareController.verifyToken, foodController.addFood);

module.exports = router;
