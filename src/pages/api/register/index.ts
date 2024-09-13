import { User } from "@/database";
import { connectDB } from "@/middlewares/api";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const addAUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    //Check if existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exits",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      data: user,
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
    return addAUser(req, res);
  } else
    return res.status(404).json({
      status: false,
      message: `Method ${req.method} Not Allowed`,
    });
};

export default handler;
