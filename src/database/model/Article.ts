import { ArticleDocumentModel } from "@/interfaces";
import mongoose, { Schema } from "mongoose";

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
        default: 1,
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
