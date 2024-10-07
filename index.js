const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require('morgan');
const dotenv = require("dotenv").config();
const authMiddleware = require("./utils/auth");
const { addAddress, getAddress } = require("./controllers/addressController");
const { signup, login } = require("./controllers/authController");
const {
  addDetails,
  getDetails,
} = require("./controllers/personalDataController");
const {
  allproducts,
  skin,
  hair,
  bathnbody,
  getsingleproducts,
  getCart,
  addToCart,
  removeFromCart,
} = require("./controllers/productController");


const app = express();

app.use(morgan(':method :url :response-time ms'));
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

app.post("/signup", signup);
app.post("/login", login);

app.get("/products", allproducts);
app.get("/products/skin", skin);
app.get("/products/hair", hair);
app.get("/products/bathnbody", bathnbody);

app.get("/products/:id", getsingleproducts);

app.get("/cart", authMiddleware, getCart);
app.post("/cart/add", authMiddleware, addToCart);
app.post("/cart/remove", authMiddleware, removeFromCart);

app.post("/addaddress", authMiddleware, addAddress);
app.get("/getaddress", authMiddleware, getAddress);

app.post("/adddetails", authMiddleware, addDetails);
app.get("/getdetails", authMiddleware, getDetails);

app.listen(PORT);
