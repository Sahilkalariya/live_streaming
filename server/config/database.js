const mongoose = require("mongoose");
require("dotenv").config();
// console.log(process.env.MONGO_URL);
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
      console.log("error while db connected");
    });
};
module.exports = connectDB;
