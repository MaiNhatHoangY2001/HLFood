const tableController = require("../controllers/table.controller");

const router = require("express").Router();

router.get("/tables", tableController.getAllTable);
router.put("/tables", tableController.setEmpTable);


module.exports = router;
