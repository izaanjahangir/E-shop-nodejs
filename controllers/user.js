const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const helpers = require("../config/helpers");
const User = require("../models/User");

// Cloudnary services
const cloudnary = require("../services/cloudnary");

const register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const file = req.file;

  try {
    const data = {
      firstName,
      lastName,
      username,
      email,
      password,
      profilePicture: process.env.DEFAULT_PROFILE_PICTURE
    };

    const user = new User(data);
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    await user.save();

    // if image is uploaded
    if (file) {
      const path = `users/${user._id}`;
      const uploadResponse = await cloudnary.uploadImage(file, path);

      user.profilePicture = uploadResponse.url;

      // delete uploaded image from filesystem
      fs.unlinkSync(file.path);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user.tokens = [token];

    await user.save();

    const responseObject = {
      user,
      token,
      message: "User created succcessfully"
    };

    res.json(responseObject);
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    res.status(400).json(errors);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) throw { message: "User doesn't exist" };

    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) throw { message: "Email or password is not correct" };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ user, token });
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    res.status(400).json(errors);
  }
};

const getUser = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId);
    const parsedUser = user.toJSON();

    delete parsedUser.password;

    res.status(200).json(parsedUser);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {
  register,
  login,
  getUser
};
