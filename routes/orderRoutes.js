const orderController = require("../controllers/order.controller");

const router = require("express").Router();

router.get("/order", orderController.getOrder);

router.post("/order", orderController.addOrder);

router.post("/booking/food", orderController.addOrderDetail);

router.post("/booking/foods", orderController.addListOrderDetail);


module.exports = router;
