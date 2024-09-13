import mongoose, { Schema } from "mongoose";

interface UserDocumentModel {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema<UserDocumentModel> =
  new mongoose.Schema<UserDocumentModel>({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

export default mongoose.models.User ||
  mongoose.model<UserDocumentModel>("User", UserSchema);
