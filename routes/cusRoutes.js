const cusController = require('../controllers/customer.controller');
const middlewareController = require('../middleware/middlewareController');

const router = require('express').Router();

router.get('/customers', middlewareController.verifyToken, cusController.getAllCus);
router.delete('/customer', middlewareController.verifyTokenAndAdminAuth, cusController.deleteCus);
router.put('/customer', middlewareController.verifyTokenAndAdminAuth, cusController.updateCus);

module.exports = router;
