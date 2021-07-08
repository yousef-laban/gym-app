const { User } = require("../db/models");
const bcrypt = require("bcryptjs");

const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

exports.signupOwner = async (req, res, next) => {
  try {
    const { user } = req;

    if (user.type !== "admin")
      throw { status: 401, message: "Only Admin Can Sign UP An Owner" };

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    if (req.body.type === "owner" && req.body.type === "admin")
      throw {
        status: 401,
        message: "hhhhhh nice try",
      };

    const { user } = req;
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const token = generateToken(req.user);
  await res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
    type: user.type,
    first: user.firstName,
    last: user.lastName,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.fetchUsers = async (req, res, next) => {
  try {
    const foundUsers = await User.findAll();
    res.json(foundUsers);
  } catch (error) {
    next(error);
  }
};
