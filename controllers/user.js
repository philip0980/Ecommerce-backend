import User from "../models/user.js";
import { sendToken } from "../config/sendToken.js";

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    await sendToken({
      res,
      statusCode: 200,
      message: "User created successfully",
      user: newUser,
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

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    await sendToken({
      res,
      statusCode: 200,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, message: "User found", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export { Register, Login, getUser };
