const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.profile = async (req, res) => {
  res.json(req.UserDetails);
};
