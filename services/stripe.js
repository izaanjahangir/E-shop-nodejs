const stripe = require("stripe")(process.env.STRIPE_TEST_API_KEY);

const charge = async payload => {
  //   const { amount, currency = "usd", description, source: req.body } = payload;

  try {
    let response = await stripe.charges.create(payload);

    console.log("stripe response =>", response);

    return response;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  charge
};
