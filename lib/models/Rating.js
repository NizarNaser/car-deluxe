// models/Rating.js
import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  postId:mongoose.Schema.Types.ObjectId, 
  userEmail: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Rating || mongoose.model('Rating', ratingSchema);
