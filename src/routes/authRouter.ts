import express from "express";
import { Validation } from "../utils/validation";
import { UserModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const validateUser = Validation(req.body);
    if (validateUser.success) {
      const { userName, emailId, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 5);
      await UserModel.create({
        userName,
        emailId,
        password: hashPassword,
      });
      res.json({
        message: "User Signup Successful",
      });
    } else {
      res.status(401).json({
        message: validateUser.error,
      });
    }
  } catch (err) {
    res.status(401).json({
      message: (err as Error).message,
    });
  }
});
authRouter.post("/signin", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const userFound = await UserModel.findOne({
      emailId,
    });

    if (!userFound) throw new Error("Invalid Credentials");
    const isPasswordValid = bcrypt.compare(
      password,
      userFound.password as string
    );
    if (!isPasswordValid) throw new Error("Invalid Credentials");
    const token = jwt.sign(
      {
        id: userFound._id,
      },
      process.env.JWT_USER_SECRET as string
    );
    res.cookie("token", token);

    res.json({
      message: "User Login Successful",
    });
  } catch (err) {
    res.status(401).json({
      message: (err as Error).message,
    });
  }
});
authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({
      message: "User Logout Successful",
    });
  } catch (err) {
    res.send(401).json({
      message: (err as Error).message,
    });
  }
});

export default authRouter;
