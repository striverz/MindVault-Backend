import mongoose from "mongoose";

const ConnectDB = async () => {
  const connectionString = process.env.MONGO_URI;
  if (!connectionString) {
    throw new Error("Connection string is not found!");
  }
  await mongoose.connect(connectionString);
};
export default ConnectDB;
