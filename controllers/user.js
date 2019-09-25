const User = require("../models/User");

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

module.exports = {
  register,
  login,
  getUser
};
