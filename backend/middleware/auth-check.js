const jwt = require("jsonwebtoken");

let checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'this-is-the-password-for-the-hashing-of-the-token');
    req.userData = { id: decodedToken.userId, name: decodedToken.username };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed! Please login to continue" });
  }
}

module.exports = checkAuth;
