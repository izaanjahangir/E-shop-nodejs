const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    lowercase: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
  image: String
});

CategorySchema.plugin(uniqueValidator, { message: "{PATH} already exist." });
module.exports = mongoose.model("category", CategorySchema);
