const fs = require("fs");

const Product = require("../models/Product");
const helpers = require("../config/helpers");
const cloudnary = require("../services/cloudnary");

const createProduct = async (req, res) => {
  const bannerImage = req.files.bannerImage;
  const images = req.files.images || [];

  try {
    if (!bannerImage) {
      throw new Error("Banner Image is required!");
    }

    const data = req.body;

    const payload = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      discountedPrice: data.discountedPrice,
      currency: data.currency
    };

    const product = new Product(payload);

    await product.save();

    const folderpath = "products/" + product._id;

    const promises = images.map(item =>
      cloudnary.uploadImage(item, folderpath)
    );

    promises.push(cloudnary.uploadImage(bannerImage[0], folderpath));

    const responsesArr = await Promise.all(promises);

    product.bannerImage = responsesArr.pop().url;

    product.images = responsesArr.map(item => item.url);

    await product.save();

    res.status(200).json(product);
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    res.status(400).json(errors);
  }

  if (bannerImage) {
    fs.unlinkSync(bannerImage[0].path);
  }

  images.forEach(item => fs.unlinkSync(item.path));
};

module.exports = {
  createProduct
};
