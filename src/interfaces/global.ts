import mongoose from "mongoose";

export interface UserDocumentModel {
    username: string;
    email: string;
    password: string;
  }

export interface ArticleDocumentModel {
    _id?: string;
    title: string;
    image?: string;
    video?: string;
    description: string;
    publishDate: Date;
    articleText: string;
    likes: number;
    userId: mongoose.Types.ObjectId;
  }