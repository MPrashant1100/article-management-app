import { Article } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/middlewares/api";
import jwt from "jsonwebtoken";

const addArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, articleText, image, video } = req.body;

  if (!title || !description || !articleText) {
    return res
      .status(400)
      .json({ message: "Title, description, and text are required." });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const newArticle = new Article({
      title,
      description,
      articleText,
      image,
      video,
      userId: decoded.id,
    });

    await newArticle.save();

    return res.status(201).json({
      success: true,
      article: newArticle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB(res);

  if (req.method === "POST") {
    return addArticle(req, res);
  } else {
    return res.status(404).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
};

export default handler;
