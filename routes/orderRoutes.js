const orderController = require("../controllers/order.controller");

const router = require("express").Router();

router.get("/orders", orderController.getAllOrder);

router.get("/order", orderController.getOrder);

router.post("/order", orderController.addOrder);

router.post("/booking/food", orderController.addListOrderDetail);


module.exports = router;
