const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const app = express();

//ROUTES
const authRoute = require('./routes/authEmp');

const port = process.env.PORT || 8000;
const origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://mchat-realtimechat-cnm.netlify.app";

dotenv.config();
//CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL, () => {
	console.log('Connect to MongoDB');
});

//SSO
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  accessToken => {
    console.log(accessToken);
  }
));


app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin,
  })
);
app.use(morgan("common"));

//ROUTERS
app.use("/api", authRoute);

const server = app.listen(port, () => {
  console.log(`server is running... at ${port}`);
});

//TESTING
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
app.get('/auth/google/callback', passport.authenticate('google'));
