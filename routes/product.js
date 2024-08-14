import express from "express";
import { PostProduct } from "../controllers/product.js";
import multer from "multer";
import { isAuthenticatedSeller } from "../middleware/sellerAuth.js";
import {
  GetProduct,
  sendRequest,
  receiveRequest,
} from "../controllers/product.js";
import { UpdateProduct } from "../controllers/product.js";
import { isAuthenticatedUser } from "../middleware/userAuth.js";
const app = express.Router();

const upload = multer({ dest: "/upload" });

app.post(
  "/postproduct",
  isAuthenticatedSeller,
  upload.single("image"),
  PostProduct
);
app.get("/getproduct", GetProduct);
app.put("/updateproduct/:id", isAuthenticatedSeller, UpdateProduct);
app.post("/send-request", isAuthenticatedUser, sendRequest);
app.get("/receive-request", isAuthenticatedSeller, receiveRequest);

export default app;
