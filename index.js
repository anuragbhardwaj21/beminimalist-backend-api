const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const fs = require("fs");
const Product = require("./models/Product");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const addressController = require("./controllers/addressController");
const personalDataController = require("./controllers/personalDataController");
const authMiddleware = require("./utils/auth");
const {
  allproducts,
  skin,
  hair,
  bathnbody,
} = require("./controllers/productController");
const app = express();
const PORT = process.env.PORT || 3000;
var corsOptions = {
  origin: "*",
};

app.use(cors());
app.use(express.json());

mongoose
  .connect(`${process.env.MONGO_DB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/signup", authController.signup);
app.post("/login", authController.login);

app.get("/products", allproducts);
app.get("/products/skin", skin);
app.get("/products/hair", hair);
app.get("/products/bathnbody", bathnbody);

// app.get("/products/:id", productController.getsingleproducts);

app.get("/cart", authMiddleware, productController.getCart);
app.post("/cart/add", authMiddleware, productController.addToCart);
app.post("/cart/remove", authMiddleware, productController.removeFromCart);

app.post("/addaddress", authMiddleware, addressController.addAddress);
app.get("/getaddress", authMiddleware, addressController.getAddress);

app.post("/adddetails", authMiddleware, personalDataController.addDetails);
app.get("/getdetails", authMiddleware, personalDataController.getDetails);

app.listen(PORT);
