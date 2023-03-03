const tableController = require("../controllers/table.controller");

const router = require("express").Router();

router.get("/tables", tableController.getAllTable);
router.put("/tables/emps", tableController.setEmpTable);
router.put("/tables/status", tableController.updateStatus);



module.exports = router;
