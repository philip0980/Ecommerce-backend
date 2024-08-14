import express from "express";
import { Register, Login, getUser } from "../controllers/user.js";
import { isAuthenticatedUser } from "../middleware/userAuth.js";
const app = express.Router();

app.post("/register", Register);
app.post("/login", Login);
app.get("/user", isAuthenticatedUser, getUser);

export default app;
