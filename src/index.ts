import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ConnectDB from "./config/connectDB";
import authRouter from "./routes/authRouter";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api/v1", authRouter);

ConnectDB()
  .then(() => {
    console.log("DB Connected ✅");
    app.listen(PORT, () => {
      console.log("App is Listening ✅");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("DB Not Connected ❌");
  });
