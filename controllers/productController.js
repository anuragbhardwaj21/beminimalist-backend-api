// const products = require("../db.json");
const User = require("../models/User");
const Product = require("../models/Product");
const Response = require("../utils/Response");
const Constants = require("../utils/Constants");
module.exports = {
  allproducts: async (req, res) => {
    try {
      const allProducts = await Product.find();
      Response.success(
        res,
        allProducts,
        Constants.SUCCESS,
        "All Product Fetched Successfully"
      );
    } catch (error) {
      Response.error(
        res,
        Constants.FAIL,
        "Error fetching products"
      );
    }
  },

  skin: async (req, res) => {
    try {
      const skinProducts = await Product.find({ type: "skin" });
      Response.success(
        res,
        skinProducts,
        Constants.SUCCESS,
        "Skin Products Fetched Successfully"
      );
    } catch (error) {
      Response.error(
        res,
        Constants.FAIL,
        "Error fetching products"
      );
    }
  },

  hair: async (req, res) => {
    try {
      const hairProducts = await Product.find({ type: "hair" });
      Response.success(
        res,
        hairProducts,
        Constants.SUCCESS,
        "Hair Products Fetched Successfully"
      );
    } catch (error) {
      Response.error(
        res,
        Constants.FAIL,
        "Error fetching products"
      );
    }
  },

  bathnbody: async (req, res) => {
    try {
      const bathnbodyProducts = await Product.find({ type: "bathnbody" });
      Response.success(
        res,
        bathnbodyProducts,
        Constants.SUCCESS,
        "BathNBody Products Fetched Successfully"
      );
    } catch (error) {
      Response.error(
        res,
        Constants.FAIL,
        "Error fetching products"
      );
    }
  },
  getsingleproducts: (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.allproducts.find(
      (product) => product.id === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  },

  getCart: async (req, res) => {
    try {
      const userId = req.userData.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const cartProductIds = user.cart;
      const cartProducts = cartProductIds.map((productId) => {
        return products.allproducts.find((product) => product.id === productId);
      });

      res.status(200).json({ cart: cartProducts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      const { productIds } = req.body;
      const userId = req.userData.userId;

      await User.findByIdAndUpdate(userId, {
        $addToSet: { cart: { $each: productIds } },
      });

      res.status(200).json({ message: "Products added to cart" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { productIds } = req.body;
      const userId = req.userData.userId;

      await User.findByIdAndUpdate(userId, {
        $pull: { cart: { $in: productIds } },
      });

      res.status(200).json({ message: "Products removed from cart" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
