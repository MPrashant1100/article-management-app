import { Article } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/middlewares/api";
import jwt from "jsonwebtoken";

const getUserArticles  = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const articles = await Article.find({ userId: decoded.id }).sort({ publishDate: -1 });

    return res.status(200).json({
      success: true,
      articles,
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

  if (req.method === "GET") {
    return getUserArticles (req, res);
  } else {
    return res.status(404).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
};

export default handler;
