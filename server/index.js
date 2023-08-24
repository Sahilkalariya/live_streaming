const express = require("express");
const connectDB = require("./config/database");
const cookieparser = require("cookie-parser");
const app = express();
const cors = require("cors");
const { auth } = require("./middlewares/auth");
const { login } = require("./controllers/login");
const { signup } = require("./controllers/signup");
const { profile } = require("./controllers/profile");
const nms = require("./nmsServer/server");
//middleware
app.use(cookieparser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

//connect Db
connectDB();

//mount
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/profile", auth, profile);

app.listen(4000, () => {
  console.log("server is listing");
});
//node mediaserver running
nms.run();
