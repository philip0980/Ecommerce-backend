import express from "express";
import { config } from "dotenv";
import connect_db from "./config/database.js";
import userRoute from "./routes/user.js";
import sellerRoute from "./routes/seller.js";
import productRoute from "./routes/product.js";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
config();
connect_db();

//middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", userRoute);
app.use("/api/v1/seller", sellerRoute);
app.use("/api/v1/product", productRoute);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
