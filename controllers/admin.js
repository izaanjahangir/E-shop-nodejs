// services
const auth = require("../services/auth");

const login = (req, res) => {
  try {
    const response = auth.login(req.body, "admin");

    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {
  login
};
