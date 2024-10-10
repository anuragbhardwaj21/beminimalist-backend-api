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
      const token = jwt.sign({ userId: newUser._id }, "anurag", {
        expiresIn: "1h",
      });
      res.status(201).json({
        message: "User created successfully",
        username: newUser.name,
        userid: newUser._id,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      const data = { username: user.email, name: user.name};

      Response.success(
        res,
        data,
        Constants.SUCCESS,
        "Logged in successfully.",
        token
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
