const notificationController = require('../controllers/notification.controller');
const middlewareController = require('../middleware/middlewareController');

const router = require('express').Router();

router.post('/notifi', middlewareController.verifyToken, notificationController.addNotification);
router.post('/notifi:status', middlewareController.verifyToken, notificationController.setStatusNotifi);
router.get('/notifi', middlewareController.verifyToken, notificationController.getAllNotification);

module.exports = router;
