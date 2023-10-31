const express = require("express");
const connectDB = require("./config/database");
const cookieparser = require("cookie-parser");
const app = express();
const cors = require("cors");
const { auth } = require("./middlewares/auth");
const { login } = require("./controllers/login");
const { signup } = require("./controllers/signup");
const { profile } = require("./controllers/profile");
const { streamInfo } = require("./controllers/streamInfo");
const nms = require("./nmsAndWs/server");
const { init } = require("./nmsAndWs/webSocket");
const { liveStreams } = require("./controllers/liveStreams");
// const dotenv = require("dotenv").config();
console.log(process.env.CLIENT_URL);
//middleware
app.use(cookieparser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// console.log(process.env.CLIENT_URL);

//connect Db
connectDB();

//mount
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/profile", auth, profile);
app.use("/api/liveStreams", liveStreams);
app.use("/api/streamInfo", streamInfo);

app.use("/thumbnail",express.static(__dirname + "/uploads"));
init(app);

//node mediaserver running
nms.run();
