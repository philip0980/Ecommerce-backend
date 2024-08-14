import express from "express";
import { Register, Login, getProfile } from "../controllers/seller.js";
import { isAuthenticatedSeller } from "../middleware/sellerAuth.js";
const app = express.Router();

app.post("/register", Register);
app.post("/login", Login);
app.get("/profile", isAuthenticatedSeller, getProfile);

export default app;
