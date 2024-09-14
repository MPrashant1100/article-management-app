import { Article } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/middlewares/api";
import jwt from "jsonwebtoken";

const likeArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { articleId } = req.body;

  if (!articleId) {
    return res.status(400).json({ message: "Article ID is required." });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    if (article.likes.includes(decoded.id)) {
      return res.status(400).json({ message: "You have already liked this article." });
    }

    article.liked += 1;
    article.likes.push(decoded.id);

    // Save the updated article
    await article.save();

    return res.status(200).json({
      success: true,
      article,
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
    return likeArticle(req, res);
  } else {
    return res.status(404).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
};

export default handler;
