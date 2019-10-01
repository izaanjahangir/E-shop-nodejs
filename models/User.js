const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  role: {
    type: String,
    default: "user"
  },
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
  password: String,
  profilePicture: String,
  tokens: Array,
  lastPasswordChanged: Number
});

UserSchema.methods.toJSON = function() {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;

  return user;
};

UserSchema.methods.getPublicProfile = function() {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;
  delete user.email;
  delete user.role;
  delete user.lastPasswordChanged;
  
  return user;
};

UserSchema.plugin(uniqueValidator, { message: "{PATH} already exist." });
module.exports = mongoose.model("users", UserSchema);
