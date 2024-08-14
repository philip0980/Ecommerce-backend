import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const options = {
  httpOnly: true,
  secure: true,
  expiresIn: "1000 * 60 *60 *24 *15",
};

const sendToken = async ({ res, statusCode, message, user }) => {
  const payload = {
    id: user._id,
    email: user.email,
    password: user.password,
  };
  console.log(user);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res
    .cookie("token", token, options)
    .status(statusCode)
    .json({ success: true, message, token });
};

export { sendToken };
