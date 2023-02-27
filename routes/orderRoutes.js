const orderController = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/order", orderController.addOrder);


module.exports = router;
