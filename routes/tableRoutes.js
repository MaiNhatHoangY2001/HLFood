const tableController = require('../controllers/table.controller');
const middlewareController = require('../middleware/middlewareController');

const router = require('express').Router();

router.get('/tables', middlewareController.verifyToken, tableController.getAllTable);
router.put('/tables/emps', middlewareController.verifyToken, tableController.setEmpTable);
router.put('/tables/status', middlewareController.verifyToken, tableController.updateStatus);
router.post('/tables:order', middlewareController.verifyToken, tableController.udpateTableOrder);

module.exports = router;
