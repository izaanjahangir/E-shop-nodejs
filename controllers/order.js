const Order = require("../models/Order");
const helpers = require("../config/helpers");

const fetchAllOrders = async (req, res) => {
  try {
    const query = {
      status: req.body.status
    };

    const orders = await Order.find(queryBuilder(query));

    res.status(200).json(orders);
  } catch (e) {
    const errors = helpers.handleMongooseError(e);

    res.status(400).send(errors);
  }
};

const queryBuilder = data => {
  const query = {};

  if (data.id) {
    query._id = data.id;
  }

  if (data.status) {
    query.status = data.status;
  }

  return query;
};

module.exports = {
  fetchAllOrders
};
