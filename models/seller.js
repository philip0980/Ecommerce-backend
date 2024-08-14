import mongoose, { Schema } from "mongoose";

const sellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
