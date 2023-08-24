const express = require("express");
const { login } = require("../controllers/login");
const { singup } = require("../controllers/singup");
var router = express.Router();

router.post("/login", login);
router.post("/singup", singup);
