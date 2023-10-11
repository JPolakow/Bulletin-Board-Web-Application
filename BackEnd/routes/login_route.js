const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require("../models/user_model");
const { isValidPassword } = require("../utils/hash");

//Login
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  //Checks if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  //Tries to find user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Incorrect username or password' });
  }

  //Checks password
  const valid = await isValidPassword(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Incorrect username and password' });
  }

  //If allvalid generate and send a token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
  res.send({ token });
});

module.exports = router;