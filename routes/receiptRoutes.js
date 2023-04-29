const receiptController = require('../controllers/receipt.controller');
const middlewareController = require('../middleware/middlewareController');


const router = require('express').Router();

router.get('/receipts', middlewareController.verifyToken, receiptController.getAllReceipt);

module.exports = router;
