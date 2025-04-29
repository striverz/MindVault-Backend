import express from "express";
const authRouter = express.Router();

authRouter.post("/signup", (req, res) => {
  res.json("Signup Succcessful");
});
authRouter.post("/signin", (req, res) => {
  res.json("Signup Succcessful");
});
authRouter.post("/logout", (req, res) => {
  res.json("Signup Succcessful");
});

export default authRouter;
