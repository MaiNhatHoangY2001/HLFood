const tableController = require('../controllers/table.controller');
const middlewareController = require('../middleware/middlewareController');

const router = require('express').Router();

router.get('/tables', middlewareController.verifyToken, tableController.getAllTable);
router.post('/tables', middlewareController.verifyToken, tableController.addTables);
router.put('/table', middlewareController.verifyToken, tableController.updateTable);
router.delete('/table', middlewareController.verifyToken, tableController.deleteTable);
router.put('/tables:num', middlewareController.verifyToken, tableController.updateNumTable);
router.put('/table:hidden', middlewareController.verifyToken, tableController.hiddenTable);
router.put('/tables:order', middlewareController.verifyToken, tableController.setOrderInTable);
router.put('/tables/emps', middlewareController.verifyToken, tableController.setEmpTable);
router.put('/tables/status', middlewareController.verifyToken, tableController.updateStatus);
router.post('/tables:order', middlewareController.verifyToken, tableController.udpateTableOrder);

module.exports = router;
