import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

import errorMiddleware from "./middleware/errorMiddleware.js";
import notFoundMiddleware from "./middleware/notfoundMiddleware.js";
import authenticateMiddleware from "./middleware/authenticateMiddleware.js";
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
// add authenticateMiddleware and adminAuthenticateMiddleware
app.use("/auth", authRoute);
app.use("/users", authenticateMiddleware, userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/order", orderRoute);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server PORT ${PORT} good 💥`);
});
