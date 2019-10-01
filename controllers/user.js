const User = require("../models/User");

const helpers = require("../config/helpers");
const auth = require("../services/auth");

const register = async (req, res) => {
  try {
    const response = await auth.register(req.body, req.file);

    res.json(response);
  } catch (e) {
    res.status(400).json(e);
  }
};

const login = async (req, res) => {
  try {
    const response = await auth.login(req.body);

    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
};

const getUser = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!helpers.isValidMongooseId(id))
      throw new Error("Please provide a valid id!");

    const user = await User.findById(id);

    res.status(200).json(user.getPublicProfile());
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    throw errors;
  }
};

const changePassword = async (req, res) => {
  const userId = req.user;

  try {
    const payload = {
      id: userId,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword
    };

    const response = await auth.changePassword(payload);

    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {
  register,
  login,
  getUser,
  changePassword,
  getUserById
};
