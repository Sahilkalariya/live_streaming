// const mongoose = require('mongoose');
// const sdsd = require('cookie-parser');
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("auth middeleware");
  if (!token) {
    console.log("not token");
    return res.status(401).json({
      success: false,
      message: "please login",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.UserDetails = decode;
    console.log("sending to next");
    next();
  } catch (error) {
    console.log(" error accures");
    return res.status(401).json({
      success: false,
      message: "please login first",
    });
  }
};
