const User = require("../model/user");
const shortid = require("shortid");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();
exports.signup = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !username) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  // Check for existing user with same email or username
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({
      error: "User alredy exits",
    });
  }
  const hashpass = bcrypt.hashSync(password, 10);
  const streamKey = shortid.generate();
  const userdetail = await User.create({
    username: username,
    email: email,
    password: hashpass,
    stream_key: streamKey,
  });
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      id: userdetail._id,

      username: userdetail.username,
      email: userdetail.email,
      streamKey: userdetail.stream_key,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3h",
    }
  );

  res.cookie("token", token).json({
    message: "success",
  });
};
