import mongoose, { Types } from "mongoose";
const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
    type: {
      type: String,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    tags: [{ type: String }],
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const ContentModel = mongoose.model("Content", contentSchema);
