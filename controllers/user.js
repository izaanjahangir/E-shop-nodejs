const fs = require("fs");

const User = require("../models/User");
const Order = require("../models/Order");
const cloudnary = require("../services/cloudnary");
const helpers = require("../config/helpers");
const auth = require("../services/auth");
const stripe = require("../services/stripe");

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

    res.status(400).json(errors);
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

const updateUser = async (req, res) => {
  try {
    const _id = req.user;
    const payload = req.body;

    if (!helpers.isValidMongooseId(_id))
      throw new Error("Please provide a valid id!");

    if (req.file) {
      const path = `users/${_id}`;
      const uploadResponse = await cloudnary.uploadImage(req.file, path);

      payload.profilePicture = uploadResponse.url;

      // delete uploaded image from filesystem
      fs.unlinkSync(req.file.path);
    }

    delete payload.username;
    delete payload.email;
    delete payload.password;
    delete payload.lastPasswordChanged;
    delete payload.role;
    delete payload._id;

    const response = await User.findOneAndUpdate({ _id }, payload, {
      returnOriginal: false
    });

    if (!response) throw new Error("No user found!");

    res.status(200).json(response);
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    res.status(400).json(errors);
  }
};

const charge = async (req, res) => {
  try {
    const payload = {
      source: req.body.token,
      amount: req.body.amount,
      description: "test",
      currency: "usd"
    };

    const response = await stripe.charge(payload);

    const product = req.body.order.map(item => item._id);

    const orderPayload = {
      product,
      user: req.user,
      amount: req.body.amount / 100
    };

    const order = new Order(orderPayload);

    await order.save();

    res.status(200).json(response);
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    res.status(400).json(errors);
  }
};

module.exports = {
  register,
  login,
  getUser,
  changePassword,
  getUserById,
  updateUser,
  charge
};
