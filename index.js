const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

//ROUTES
const testRoute = require("./routes/test");

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
app.use("/api", testRoute);

const server = app.listen(port, () => {
  console.log(`server is running... at ${port}`);
});
