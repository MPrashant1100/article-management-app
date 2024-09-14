import mongoose, { Schema } from "mongoose";

interface ArticleDocumentModel {
  title: string;
  image?: string;
  video?: string;
  description: string;
  publishDate: Date;
  articleText: string;
  likes: number;
  userId: mongoose.Types.ObjectId;
}

const ArticleSchema: Schema<ArticleDocumentModel> =
  new Schema<ArticleDocumentModel>(
    {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      video: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
      publishDate: {
        type: Date,
        default: Date.now,
      },
      articleText: {
        type: String,
        required: true,
      },
      likes: {
        type: Number,
        default: 0,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  
        required: true,
      },
    },
    { timestamps: true }
  );

export default mongoose.models.Article ||
  mongoose.model<ArticleDocumentModel>("Article", ArticleSchema);
