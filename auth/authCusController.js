const bcrypt = require("bcrypt");
const Customer = require("../model/Customer");
const jwt = require("jsonwebtoken");
const { verifyGoogleToken } = require("../middleware/middlewareController");
const { checkCus } = require("../controllers/cusController");

const authController = {
  //REGISTER IS ADD USER IN CONTROLLER

  //GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1h" }
    );
  },

  //GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  //COMPARE PASSWORD
  comparePassword: async (req, res) => {
    try {
      const user = await Customer.findOne({ phoneNumber: req.body.phoneNumber });
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      res.json(validPassword);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginGoogle: async (req, res) => {
    try {
      if (req.body.credential) {
        const verificationResponse = await verifyGoogleToken(req.body.credential);
        if (verificationResponse.error) {
          return res.status(400).json({
            message: verificationResponse.error,
          });
        }
        const profile = verificationResponse?.payload;

        const user = await checkCus(profile);
        const token = authController.createToken(user, res);
        res.status(200).json(token);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await Customer.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("Wrong email");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(404).json("Password incorrect");
      }

      if (user && validPassword) {
        const token = this.createToken(user);
        res.status(200).json(token);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //REDIS
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshTokenCookies = req.cookies.refreshToken;
    const refreshTokenUser = req.body.refreshToken;
    //Send error if token is not valid
    if (!refreshTokenCookies)
      return res.status(401).json("You're not authenticated");
    if (refreshTokenUser !== refreshTokenCookies) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(
      refreshTokenCookies,
      process.env.JWT_REFRESH_KEY,
      (err, user) => {
        if (err) {
          console.log(err);
        }
        //create new access token, refresh token and send to user
        const newAccessToken = authController.generateAccessToken(user);
        const newRefreshToken = authController.generateRefreshToken(user);

        res.clearCookie("refreshToken");
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          path: "/",
          sameSite: "none",
        });
        res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      }
    );
  },

  createToken: (user, res) => {
    const accessToken = authController.generateAccessToken(user);
    const refreshToken = authController.generateRefreshToken(user);

    // create refresh token in database
    user.updateOne({ refreshToken: refreshToken });

    res.cookie("refreshToken", refreshToken, {
      // create cookie with refresh token that expires in 7 days
      httpOnly: true,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      secure: true,
      path: "/",
      sameSite: "none",
    });
    const { password, ...others } = user._doc;
    return { ...others, accessToken, refreshToken }
  },

  //LOGOUT
  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json("LOGOUT!!");
  },
};

module.exports = authController;