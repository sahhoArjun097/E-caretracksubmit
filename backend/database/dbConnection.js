import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName:"HOSPITAL_MANAGEMENT",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};



