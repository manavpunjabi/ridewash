const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // get jwt from header
  const token = req.header("x-auth-token");
  //   verify
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ status: false, message: "Invalid token", data: {} });
  }
};
