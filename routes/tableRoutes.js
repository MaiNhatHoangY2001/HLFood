const tableController = require("../controllers/tableController");

const router = require("express").Router();

router.get("/tables", tableController.getAllTable);
router.put("/tables", tableController.setEmpTable);


module.exports = router;
