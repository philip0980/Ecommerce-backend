import Seller from "../models/seller.js";
import { sendSellerToken } from "../config/sendSellerToken.js";

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res
        .status(400)
        .json({ success: false, message: "Seller already exists" });
    }

    const newSeller = new Seller({ name, email, password });
    await newSeller.save();

    await sendSellerToken({
      res,
      statusCode: 200,
      message: "Seller created successfully",
      user: newSeller,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const seller = await Seller.findOne({ email });
    if (!seller || seller.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    await sendSellerToken({
      res,
      statusCode: 200,
      message: "Seller logged in successfully",
      user: seller,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, message: "Profile sent", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { Register, Login, getProfile };
