// lib/models/Comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  comment: { type: String, required: true },
  userEmail: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
