const { User } = require("../models");
const createError = require("../helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "User with this email already exists");
  }

  const newUser = new User({ username, email });
  newUser.setHashedPassword(password);
  await newUser.save();
  res.status(201).json({ email, username });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePasswords(password)) {
    throw createError(401, "Incorrect email or password");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

module.exports = { signup, signin };
