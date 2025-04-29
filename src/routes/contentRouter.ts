import express from "express";
import authUser from "../middlewares/authUser";
import { Request, Response, NextFunction } from "express";
import { ContentModel } from "../models/contentModel";
const contentRouter = express.Router();

contentRouter.post(
  "/content",
  authUser,
  async (req: Request, res: Response) => {
    try {
      const { title, type, link } = req.body;
      const content = await ContentModel.create({
        title,
        type,
        link,
      });
      res.json({
        message: "Content is Added",
        contentId: content._id,
      });
    } catch (err) {
      res.status(401).json({
        message: (err as Error).message,
      });
    }
  }
);

contentRouter.get("/content", authUser, async (req, res) => {
  try {
    const contents = await ContentModel.find({});

    res.json({
      data: contents,
    });
  } catch (err) {
    res.status(401).json({
      message: (err as Error).message,
    });
  }
});

export default contentRouter;
