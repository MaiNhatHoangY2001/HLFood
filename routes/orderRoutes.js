const orderController = require("../controllers/order.controller");
const orderDetailController = require("../controllers/order_detail.controller");
const middlewareController = require('../middleware/middlewareController');



const router = require("express").Router();

router.get("/orders", middlewareController.verifyToken, orderController.getAllOrder);

router.get("/order", middlewareController.verifyToken, orderController.getOrder);

router.post("/order", middlewareController.verifyToken, orderController.addOrder);

router.get("/order_details", middlewareController.verifyToken, orderDetailController.getAllOrderDetail);

router.put("/order_details:status", middlewareController.verifyToken, orderDetailController.changeFoodStatus);

router.post("/booking/food", middlewareController.verifyToken, orderDetailController.addListOrderDetail);

router.put("/booking/food", middlewareController.verifyToken, orderDetailController.updateOrderDetails);

router.delete("/booking/food/:id",middlewareController.verifyToken, orderDetailController.deleteOrderDetail);

module.exports = router;
