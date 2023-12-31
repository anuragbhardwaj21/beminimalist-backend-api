const products = require("../db.json");
const User = require("../models/User");

exports.allproducts = (req, res) => {
  res.status(200).json(products.allproducts);
};
exports.skin = (req, res) => {
  res.status(200).json(products.skin);
};
exports.hair = (req, res) => {
  res.status(200).json(products.hair);
};
exports.bathnbody = (req, res) => {
  res.status(200).json(products.bathnbody);
};

exports.getsingleproducts = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.allproducts.find(
      (product) => product.id === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  };

exports.getCart = async (req, res) => {
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
};



exports.addToCart = async (req, res) => {
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
};

exports.removeFromCart = async (req, res) => {
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
};
