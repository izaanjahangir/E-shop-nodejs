const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"]
    },
    description: {
      type: String
    },
    bannerImage: String,
    images: { type: Array, default: [] },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category id is required!"]
    },
    price: { type: Number, required: [true, "Price is required!"] },
    currency: { type: String, default: "$" },
    discountedPrice: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    features: { type: Object, default: {} }
  },
  { timestamps: true, minimize: false }
);

// ProductSchema.index({ title: "text" });

ProductSchema.plugin(uniqueValidator, { message: "{PATH} already exist." });
module.exports = mongoose.model("product", ProductSchema);
