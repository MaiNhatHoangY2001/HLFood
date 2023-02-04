const authCusController = require("../auth/authCusController");
const cusController = require("../controllers/cusController");
const middlewareController = require("../middleware/middlewareController");
const passport = require("../auth/passport");

const router = require("express").Router();

//REGISTER
router.post("/register", cusController.addCus);

//LOGIN
router.post("/login", authCusController.loginUser);

//REFRESH
router.post("/refresh", authCusController.requestRefreshToken);

//COMPARE PASS
router.post(
    "/comparePass",
    middlewareController.verifyToken,
    authCusController.comparePassword
);

// Implement the authentication routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


//http://localhost:8000/auth/google
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    authCusController.loginGoogle);

//LOGOUT
router.post(
    "/logout",
    middlewareController.verifyToken,
    authCusController.userLogout
);

module.exports = router;
