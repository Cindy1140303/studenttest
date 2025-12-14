const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: false,  // 改為可選，支援匿名記錄
    index: true
  },
  studentName: {
    type: String,
    required: false  // 改為可選，支援匿名記錄
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  courseId: String,
  courseName: String,
  questionType: String,
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  correctAnswer: mongoose.Schema.Types.Mixed,
  isCorrect: {
    type: Boolean,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number, // 秒數
    default: 0
  },
  answeredAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// 複合索引：方便查詢特定學生在特定時間範圍的記錄
recordSchema.index({ studentId: 1, answeredAt: -1 });

module.exports = mongoose.model('Record', recordSchema);
