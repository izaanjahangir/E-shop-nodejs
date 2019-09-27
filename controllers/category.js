const fs = require("fs");

const Category = require("../models/Category");
const helpers = require("../config/helpers");
const cloudnary = require("../services/cloudnary");

const createCategory = async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      image: process.env.NO_IMAGE_PLACEHOLDER
    };

    const category = new Category(payload);

    await category.save();

    // if image is uploaded
    if (req.file) {
      const path = `categories/${category._id}`;
      const uploadResponse = await cloudnary.uploadImage(req.file, path);

      category.image = uploadResponse.url;

      // delete uploaded image from filesystem
      fs.unlinkSync(req.file.path);
    }

    await category.save();

    res.status(200).json(category);
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    res.status(400).send(errors);
  }
};

module.exports = {
  createCategory
};
