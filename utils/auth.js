// const jwt = require("jsonwebtoken");
// const Constants = require("./Constants");
// const Response = require("./Response");

// module.exports = (req, res, next) => {
//   try {

//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, "anurag");
//     req.userData = { userId: decodedToken.userId };
//     console.log("user",req.userData);
//     next();
//   } catch (error) {
//     return Response.error(
//       res,
//       Constants.UNAUTHORIZED,
//       "Session expired. Please login again."
//     );
//   }
// };

const jwt = require("jsonwebtoken");
const Constants = require("./Constants");
const Response = require("./Response");
const User = require("../models/User"); // Import your User model

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return Response.error(res, Constants.UNAUTHORIZED, "No token provided.");
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, "anurag");
    req.userData = { userId: decodedToken.userId };

    const user = await User.findById(req.userData.userId).select("+token");
    if (!user || user.token !== token) {
      return Response.error(res, Constants.UNAUTHORIZED, "Invalid token.");
    }

    next();
  } catch (error) {
    return Response.error(
      res,
      Constants.UNAUTHORIZED,
      "Session expired. Please login again."
    );
  }
};
