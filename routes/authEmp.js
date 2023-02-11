const authController = require("../auth/authEmpController");
const empController = require("../controllers/empController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();

//REGISTER
router.post("/register", empController.addEmp);

//LOGIN
router.post("/login", authController.loginUser);

//REFRESH
router.post("/refresh", authController.requestRefreshToken);

//COMPARE PASS
router.post(
  "/comparePass",
  middlewareController.verifyToken,
  authController.comparePassword
);

//LOGOUT
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;
