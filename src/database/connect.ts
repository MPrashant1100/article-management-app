import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from env variables');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;
