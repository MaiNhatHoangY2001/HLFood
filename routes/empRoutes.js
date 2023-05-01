const empController = require('../controllers/emp.controller');
const middlewareController = require('../middleware/middlewareController');

const router = require('express').Router();

router.get('/employees', middlewareController.verifyTokenAndAdminAuth, empController.getAllEmp);
router.get('/employees:active', middlewareController.verifyTokenAndAdminAuth, empController.getAllEmpActive);
router.get('/employees', middlewareController.verifyTokenAndAdminAuth, empController.addEmp);
router.delete('/employee', middlewareController.verifyTokenAndAdminAuth, empController.deleteEmp);
router.put('/employee', middlewareController.verifyTokenAndAdminAuth, empController.updateEmp);

module.exports = router;
