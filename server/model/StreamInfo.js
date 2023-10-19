const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
  streamKey: { type: String },
  title: { type: String },
});

module.exports = mongoose.model("StreamInfo", InfoSchema);
