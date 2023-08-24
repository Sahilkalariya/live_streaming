// const mongoose = require('mongoose');
// const sdsd = require('cookie-parser');
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(500).json({
      success: false,
      message: "please login",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    return res.status(500).json({
      success: false,
      message: "login first",
    });
  }
  req.UserDetails = decode;
  next();
};
