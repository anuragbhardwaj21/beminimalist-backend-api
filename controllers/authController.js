const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Response = require("../utils/Response");
const Constants = require("../utils/Constants");

module.exports = {

  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      data = {
        username: newUser.name,
        userid: newUser._id,
      };
      Response.success(
        res,
        data,
        Constants.SUCCESS,
        "User created successfully.",
        token
      );
    } catch (error) {
      return Response.error(res, Constants.FAIL, error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return Response.validationError(
          res,
          Constants.FAIL,
          "Invalid username or password."
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return Response.validationError(
          res,
          Constants.FAIL,
          "Invalid username or password."
        );
      }

      const token = jwt.sign({ userId: user._id }, "anurag", {
        expiresIn: "1h",
      });

      user.token = token;
      await user.save();

      const data = { username: user.email, name: user.name };

      Response.success(
        res,
        data,
        Constants.SUCCESS,
        "Logged in successfully.",
        token
      );
    } catch (error) {
      return Response.error(res, Constants.FAIL, error.message);
    }
  },

  logout: async (req, res) => {
    try {
      const { userId } = req.userData;

      const user = await User.findById(userId);


      if (!user) {
        return Response.error(res, Constants.FAIL, "User not found.");
      }

      user.token = null;
      await user.save();

      Response.success(res, {}, Constants.SUCCESS, "Logged out successfully.");
    } catch (error) {
      return Response.error(res, Constants.FAIL, error.message);
    }
  },

};
