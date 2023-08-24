const User = require("../model/user");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(406).json({
      message: "Please enter all fields",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const validuser = bcrypt.compare(password, user.password);
  if (validuser) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        streamKey: user.stream_key,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );
    user.password = null;
    res.cookie("token", token).status(200).json({
      username: user.username,
      streamKey: user.stream_key,
      email: user.email,
      message: "success",
    });
  }
};
