const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
  {
    product: [{
      type: Schema.Types.ObjectId,
      ref: "product",
      required: [true, "Product id is required"]
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required!"]
    },
    amount: Number,
    currency: { type: String, default: "$" },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

OrdersSchema.plugin(uniqueValidator, { message: "{PATH} already exist." });
module.exports = mongoose.model("order", OrdersSchema);
