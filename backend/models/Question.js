const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  knowledge: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['單選題', '多選題', '是非題', '連連看', '拖拉方塊', '填空題']
  },
  content: {
    type: String,
    required: true
  },
  options: {
    type: mongoose.Schema.Types.Mixed, // 可以是陣列或字串
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['簡單', '中等', '困難'],
    default: '中等'
  },
  tags: [String],
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

questionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Question', questionSchema);
