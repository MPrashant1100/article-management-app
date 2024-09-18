import { Article } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/middlewares/api";

const getAllArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allArticles = await Article.find()
    .sort({ publishDate: -1 })
    .populate("userId", "username");
    return res.status(200).json({
      success: true,
      allArticles,
    });
  } catch (error) {
    console.error("Error fetching articles: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB(res);
  if (req.method === "GET") {
    return getAllArticles(req, res);
  } else {
    return res.status(404).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
};

export default handler;
