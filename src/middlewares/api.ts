import type { NextApiResponse } from 'next';
import { connectToDatabase } from '@/database';

// Connect to DB
const connectDB = async (res: NextApiResponse) => {
  try {
    await connectToDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'DB error', error });
  }
};

export { connectDB };
