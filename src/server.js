require("dotenv").config();
require("express");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongodb💚");
});

const express = require("express");
const cors = require("cors");
const Product = require("./model/product.model");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/products", async (req, res, next) => {
  const products = await Product.findOne();
  console.log(products);

  res.json("products connected");
});

app.listen(PORT, () => {
  console.log(`Server PORT ${PORT} good 💥`);
});
