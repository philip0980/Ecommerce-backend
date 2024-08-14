import jwt from "jsonwebtoken";
import Seller from "../models/seller.js";
import dotenv from "dotenv";

dotenv.config();

const isAuthenticatedSeller = async (req, res, next) => {
  try {
    const token =
      req.cookies["seller-token"] ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log("token", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Login first" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const seller = await Seller.findById(decoded.id).select("-password");

    if (!seller) {
      return res
        .status(401)
        .json({ success: false, message: "Seller not found" });
    }
    req.user = seller;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token", error });
  }
};

export { isAuthenticatedSeller };
