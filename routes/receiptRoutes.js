const receiptController = require("../controllers/receipt.controller");

const router = require("express").Router();

router.get("/receipts", receiptController.getAllReceipt);

module.exports = router;
