// models/Car.js
import mongoose from 'mongoose'
import Category from "./Category";
const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  images: {
    type: [String], // مصفوفة روابط صور
    default: [],
  },

  date: {
    type: Date,
    default: Date.now,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
})

export default mongoose.models.Car || mongoose.model('Car', carSchema)
