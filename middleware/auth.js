const jwt = require("jsonwebtoken");
const createError = require("../helpers/createError");
const { User } = require("../models");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  try {
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401, "Unauthorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw createError(401, "Unauthorized");
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.message === "Invalid sugnature") {
      err.status = 401;
    }
    next(err);
  }
};
module.exports = auth;
