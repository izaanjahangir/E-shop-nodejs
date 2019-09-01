const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email is already exist"]
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "This username is already exist"]
  },
  password: String
});

UserSchema.plugin(uniqueValidator, { message: "{PATH} already exist." });
module.exports = mongoose.model("users", UserSchema);
