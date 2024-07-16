import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRoute from "./src/routes/productRoute.js";
import cartRoute from "./src/routes/cartRoute.js";
import orderRoute from "./src/routes/orderRoute.js";
import userRoute from "./src/routes/userRoute.js";
import authRoute from "./src/routes/authRoute.js";
import filterRoute from "./src/routes/filterRoute.js";

import errorMiddleware from "./src/middleware/errorMiddleware.js";
import notFoundMiddleware from "./src/middleware/notFoundMiddleware.js";
import authenticateMiddleware from "./src/middleware/authenticateMiddleware.js";
// import adminAuthenticateMiddleware from "./middleware/adminAuthenticateMiddleware.js";

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongodb💚");
});

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRoute);
app.use("/users", authenticateMiddleware, userRoute);
app.use("/products", productRoute);
app.use("/carts", authenticateMiddleware, cartRoute);
app.use("/order", orderRoute);
app.use("/filter", filterRoute);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server PORT ${PORT} good 💥`);
});
