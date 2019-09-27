const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) throw { message: "Authentication is required!" };

    const user = await jwt.verify(token, process.env.JWT_SECRET);

    if (user.role !== "admin") throw new Error("You need to be an admin");

    req.user = user.id;

    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};
