const User = require("../models/User");
const Product = require("../models/Product");
const Response = require("../utils/Response");
const Constants = require("../utils/Constants");

module.exports = {
  allproducts: async (req, res) => {
    try {
      const { page = 1, perPage = Constants.PER_PAGE } = req.query;

      const currentPage = parseInt(page, 10);
      const limit = parseInt(perPage, 10);
      const skip = (currentPage - 1) * limit;

      const totalProducts = await Product.countDocuments();
      const allProducts = await Product.find().skip(skip).limit(limit);

      const generateRandomDigit = () => {
        return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      };

      const productsWithDeductedPrice = allProducts.map((product) => ({
        ...product.toObject(),
        deductedPrice: product.price - generateRandomDigit(),
      }));

      const responseData = {
        products: productsWithDeductedPrice,
        currentPage,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        perPage: limit,
      };

      Response.success(
        res,
        responseData,
        Constants.SUCCESS,
        "All Product Fetched Successfully"
      );
    } catch (error) {
      Response.error(res, Constants.FAIL, "Error fetching products");
    }
  },

  skin: async (req, res) => {
    try {
      const { page = 1, perPage = Constants.PER_PAGE } = req.query;
      const currentPage = parseInt(page, 10);
      const limit = parseInt(perPage, 10);
      const skip = (currentPage - 1) * limit;

      const totalProducts = await Product.countDocuments({ type: "skin" });
      const skinProducts = await Product.find({ type: "skin" })
        .skip(skip)
        .limit(limit);

      const generateRandomDigit = () => {
        return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      };

      const productsWithDeductedPrice = skinProducts.map((product) => ({
        ...product.toObject(),
        deductedPrice: product.price - generateRandomDigit(),
      }));

      const responseData = {
        products: productsWithDeductedPrice,
        currentPage,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        perPage: limit,
      };

      Response.success(
        res,
        responseData,
        Constants.SUCCESS,
        "Skin Products Fetched Successfully"
      );
    } catch (error) {
      Response.error(res, Constants.FAIL, "Error fetching skin products");
    }
  },

  hair: async (req, res) => {
    try {
      const { page = 1, perPage = Constants.PER_PAGE } = req.query;
      const currentPage = parseInt(page, 10);
      const limit = parseInt(perPage, 10);
      const skip = (currentPage - 1) * limit;

      const totalProducts = await Product.countDocuments({ type: "hair" });
      const hairProducts = await Product.find({ type: "hair" })
        .skip(skip)
        .limit(limit);

      const generateRandomDigit = () => {
        return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      };

      const productsWithDeductedPrice = hairProducts.map((product) => ({
        ...product.toObject(),
        deductedPrice: product.price - generateRandomDigit(),
      }));

      const responseData = {
        products: productsWithDeductedPrice,
        currentPage,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        perPage: limit,
      };

      Response.success(
        res,
        responseData,
        Constants.SUCCESS,
        "Hair Products Fetched Successfully"
      );
    } catch (error) {
      Response.error(res, Constants.FAIL, "Error fetching hair products");
    }
  },

  bathnbody: async (req, res) => {
    try {
      const { page = 1, perPage = Constants.PER_PAGE } = req.query;
      const currentPage = parseInt(page, 10);
      const limit = parseInt(perPage, 10);
      const skip = (currentPage - 1) * limit;

      const totalProducts = await Product.countDocuments({ type: "bathnbody" });
      const bathnbodyProducts = await Product.find({ type: "bathnbody" })
        .skip(skip)
        .limit(limit);

      const generateRandomDigit = () => {
        return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      };

      const productsWithDeductedPrice = bathnbodyProducts.map((product) => ({
        ...product.toObject(),
        deductedPrice: product.price - generateRandomDigit(),
      }));

      const responseData = {
        products: productsWithDeductedPrice,
        currentPage,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        perPage: limit,
      };

      Response.success(
        res,
        responseData,
        Constants.SUCCESS,
        "BathNBody Products Fetched Successfully"
      );
    } catch (error) {
      Response.error(
        res,
        Constants.FAIL,
        "Error fetching bath and body products"
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
      const { userId } = req.userData;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return Response.error(res, Constants.FAIL, "User not found");
      }
  
      const productIds = user.cart.map((item) => item.productId);
      const cartProducts = await Product.find({ _id: { $in: productIds } });
  
      cartProducts = cartProducts.map((product) => {
        const quantity = user.cart.find(
          (item) => item.productId.toString() === product._id.toString()
        )?.quantity || 1;
  
        return { ...product.toObject(), quantity };
      });
  

      Response.success(
        res,
        cartProducts,
        Constants.SUCCESS,
        "Cart products retrieved successfully"
      );
    } catch (error) {
      Response.error(res, Constants.FAIL, error.message);
    }
  },

  addToCart: async (req, res) => {
    try {
      const { userId } = req.userData;
      const { productId, quantity } = req.body;

      const user = await User.findById(userId);
  
      if (!user) {
        return Response.error(res, Constants.FAIL, "User not found");
      }
  
      const existingProduct = user.cart.find(
        (item) => item.productId.toString() === productId
      );
  
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }
  
      await user.save();
  
      Response.success(res, {}, Constants.SUCCESS, "Product added to cart.");
    } catch (error) {
      Response.error(res, Constants.FAIL, error.message);
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
