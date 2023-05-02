const controller = require('../controllers/uploadFileController');
const middlewareController = require('../middleware/middlewareController');
const router = require('express').Router();

router.post('/upload', middlewareController.verifyToken, controller.upload);
router.get('/', middlewareController.verifyToken, controller.getListFiles);
router.get('/:name', middlewareController.verifyToken, controller.download);

module.exports = router;