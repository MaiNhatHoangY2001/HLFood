const orderController = require("../controllers/order.controller");

const router = require("express").Router();

router.get("/order", orderController.getOrder);

router.post("/order", orderController.addOrder);

router.post("/bookingFood", orderController.addOrderDetail);


module.exports = router;
