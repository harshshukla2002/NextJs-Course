import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo DB Connected Successfully");
    });
    connection.on("error", (err) => {
      console.log("mongo DB Connection error", err);
    });
  } catch (error) {
    console.error("something went wrong", error);
  }
};
