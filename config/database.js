import mongoose from "mongoose";
const connect_db = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connect_db;
