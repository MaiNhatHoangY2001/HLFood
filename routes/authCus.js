const authController = require("../auth/authEmpController");
const cusController = require("../controllers/cusController");
const middlewareController = require("../middleware/middlewareController");
const passport = require("../auth/passport");

const router = require("express").Router();

const origin =
  process.env.NODE_ENV !== "production"
    ? process.env.LOCAL_ENV
    : process.env.DEPLOY_ENV;

//REGISTER
router.post("/register", cusController.addCus);

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

// Implement the authentication routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


//http://localhost:8000/auth/google
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        // Create a new session for the authenticated user
        if (req.authInfo.newSession) {
            req.session.regenerate(function (err) {
                if (err) { return next(err); }

                // Successful authentication, redirect home.
                res.redirect(origin);
            });
        } else {
            // Successful authentication, redirect home.
            res.redirect(origin);
        }
    });

//LOGOUT
router.post(
    "/logout",
    middlewareController.verifyToken,
    authController.userLogout
);

module.exports = router;
