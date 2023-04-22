const orderController = require("../controllers/order.controller");
const orderDetailController = require("../controllers/order_detail.controller");


const router = require("express").Router();

router.get("/orders", orderController.getAllOrder);

router.get("/order", orderController.getOrder);

router.post("/order", orderController.addOrder);

router.get("/order_details", orderDetailController.getAllOrderDetail);

router.post("/booking/food", orderDetailController.addListOrderDetail);

router.put("/booking/food", orderDetailController.updateOrderDetails);

router.delete("/booking/food/:id", orderDetailController.deleteOrderDetail);

module.exports = router;
