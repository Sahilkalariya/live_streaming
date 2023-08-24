const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  stream_key: { type: String },
});
module.exports = mongoose.model("User", Userschema);
