// services
const auth = require("../services/auth");

const login = async (req, res) => {
  try {
    const response = await auth.login(req.body, "admin");

    res.status(200).json(response);
  } catch (e) {
    console.log("e =>", e);
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  login
};
