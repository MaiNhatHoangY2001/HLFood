const notificationController = require("../controllers/notification.controller");

const router = require("express").Router();

router.post("/notifi", notificationController.addNotification);

module.exports = router;
