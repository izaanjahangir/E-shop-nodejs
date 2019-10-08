const fs = require("fs");

const Product = require("../models/Product");
const helpers = require("../config/helpers");
const cloudnary = require("../services/cloudnary");

const findSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!helpers.isValidMongooseId(id)) {
      throw new Error("Please provide valid id!");
    }

    const product = await Product.findById(id)
      .populate("category")
      .exec();

    res.status(200).json(product);
  } catch (e) {
    console.log("e =>", e);
    const errors = helpers.handleMongooseError(e);

    res.status(400).json(errors);
  }
};

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
      currency: data.currency,
      features: data.features
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

const findProduct = async (req, res) => {
  try {
    const skip = req.body.skip || 0;
    const limit = req.body.limit || 5;

    const query = {
      id: req.body.id,
      category: req.body.category,
      title: req.body.title,
      rating: req.body.rating,
      price: req.body.price,
      features: req.body.features
    };

    if (query.category && !helpers.isValidMongooseId(query.category)) {
      throw new Error("Category field should have a valid id!");
    }

    const productQuery = Product.find(queryBuilder(query))
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("category")
      .exec();

    const productCount = Product.find(queryBuilder(query))
      .countDocuments()
      .exec();

    const responsesArr = await Promise.all([productQuery, productCount]);

    const data = { total: responsesArr[1], data: responsesArr[0] };

    res.status(200).json(data);
  } catch (e) {
    const errors = helpers.handleMongooseError(e);

    res.status(400).json(errors);
  }
};

const queryBuilder = data => {
  const query = {};

  if (data.id) {
    query._id = data.id;
  }

  if (data.title) {
    query.title = { $regex: `^${data.title}`, $options: "i" };
  }

  if (data.category) {
    query.category = data.category;
  }

  if (data.rating) {
    query.rating = { $gte: data.rating };
  }

  if (data.price) {
    query.price = { $lte: data.price };
  }

  if (data.features) {
    for (key in data.features) {
      query[`features.${key}`] = data.features[key];
    }
  }

  return query;
};

module.exports = {
  findSingleProduct,
  createProduct,
  findProduct
};
