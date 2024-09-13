import { User } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectDB } from "@/middlewares/api";

interface JwtPayload {
    id: string;
  }

const authenticateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            message: "Unauthorized" 
        })
    }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    console.log("Decoded Token:", decodeToken);
    const user = await User.findById(decodeToken.id)

    if(!user) {
        return res.status(404).json({ message: "User not found"})
    }
    res.status(200).json({ 
        id: user._id, 
        email: user.email, 
        username: user.username 
    });
    
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB(res);

  if (req.method === "GET") {
    return authenticateUser(req, res);
  } else {
    return res.status(404).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
};

export default handler;
