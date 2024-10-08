const jwt = require("jsonwebtoken");
const Constants = require("./Constants");
const Response = require("./Response");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "anurag");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return Response.error(
      res,
      Constants.UNAUTHORIZED,
      "Session expired. Please login again."
    );
  }
};
