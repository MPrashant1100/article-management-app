import { User } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { connectDB } from "@/middlewares/api";
import bcrypt from "bcrypt";

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "5h",
    });

    console.log("Login Token", token)
    
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB(res);

  if (req.method === "POST") {
    return loginUser(req, res);
  } else {
    return res.status(404).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
};

export default handler;
