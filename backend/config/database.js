const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Vercel serverless 環境可能已有連線
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB 已連接');
      return mongoose.connection;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/exam_management', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB 連接成功: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB 連接錯誤: ${error.message}`);
    // 在 Vercel 不使用 process.exit()
    throw error;
  }
};

module.exports = connectDB;
