const orderController = require("../controllers/order.controller");
const orderDetailController = require("../controllers/order_detail.controller");


const router = require("express").Router();

router.get("/orders", orderController.getAllOrder);

router.get("/order", orderController.getOrder);

router.post("/order", orderController.addOrder);

router.post("/booking/food", orderDetailController.addListOrderDetail);

router.put("/booking/food", orderDetailController.subtractOrderDetail);

router.delete("/booking/food/:id", orderDetailController.deleteOrderDetail);

router.put("/food-history", orderDetailController.subtractOrderHistory);

router.delete("/food-history/:id", orderDetailController.deleteOrderHistory);

module.exports = router;
