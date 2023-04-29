const notificationController = require("../controllers/notification.controller");
const middlewareController = require('../middleware/middlewareController');


const router = require("express").Router();

router.post("/notifi", middlewareController.verifyToken, notificationController.addNotification);

module.exports = router;
