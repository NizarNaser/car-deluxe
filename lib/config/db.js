import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let isConnected = false

export const dbConnect = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(MONGODB_URI) // بدون useNewUrlParser أو useUnifiedTopology
    isConnected = true
    console.log('✅ MongoDB Connected')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
  }
}
