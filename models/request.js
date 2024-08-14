import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  sender: {
    type: Object,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  productDetail: {
    type: Object,
    required: true,
  },
});

const Request = mongoose.model("Request", requestSchema);
export default Request;
