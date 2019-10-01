const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const helpers = require("../config/helpers");
const User = require("../models/User");

// Cloudnary services
const cloudnary = require("../services/cloudnary");

const login = async (payload, role) => {
  const { email, password } = payload;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) throw new Error("User doesn't exist");

    if (role === "admin" && user.role !== "admin")
      throw new Error("You are not authorized to be admin");

    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) throw new Error("Email or password is not correct");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    return { user, token };
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    throw errors;
  }
};

const register = async (payload, file) => {
  const { firstName, lastName, username, email, password } = payload;

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

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    user.tokens = [token];

    await user.save();

    const responseObject = {
      user,
      token,
      message: "User created succcessfully"
    };

    return responseObject;
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    throw errors;
  }
};

const changePassword = async payload => {
  try {
    const user = await User.findById(payload.id);

    if (!user) throw new Error("No user found!");

    const isVerified = await bcrypt.compare(payload.oldPassword, user.password);

    if (!isVerified) throw new Error("Old password is not correct!");

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(payload.newPassword, salt);

    user.password = hash;
    user.lastPasswordChanged = Date.now();

    await user.save();

    return { message: "Password have been successfully changed!" };
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    throw errors;
  }
};

module.exports = {
  login,
  register,
  changePassword
};
