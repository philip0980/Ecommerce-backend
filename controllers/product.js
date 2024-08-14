import Product from "../models/product.js";
import Request from "../models/request.js";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

const PostProduct = async (req, res) => {
  try {
    const { title, description, price, stocks } = req.body;
    const image = req.file;
    const seller = req.user;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "No image file provided" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(image.path, {
      folder: "Product_Image",
    });

    const newProduct = await Product.create({
      title,
      description,
      price,
      stocks,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      seller,
    });

    await newProduct.save();
    fs.unlinkSync(image.path);
    res.status(201).json({ success: true, message: "Product created" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Error creating product", error });
  }
};

const GetProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(400).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product found", products });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Error getting product", error });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No update data provided" });
    }

    const updatedData = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      res.status(400).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product updated" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Error getting product", error });
  }
};

const sendRequest = async (req, res) => {
  try {
    const { sender, receiver, productDetail } = req.body;
    if (!sender || !receiver || !productDetail) {
      r.status(400).json({
        success: false,
        message: "Not found sender , receiver or productdetail",
      });
    }

    const newRequest = await Request.create({
      sender,
      receiver,
      productDetail,
    });

    await newRequest.save();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error sending request", error });
  }
};


const receiveRequest = async (req, res) => {
  try {
    const applications =await Request.find()
    if(!applications) {
      res.status(400)
      .json({ success: false, message: "Application not found in database" });
    }
    res.status(200).json({ success : true , message : "Application data" , applications})
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Application not found", error });
  }
};



export { PostProduct, GetProduct, UpdateProduct, sendRequest , receiveRequest };
