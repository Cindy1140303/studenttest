const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI not found');
      throw new Error('MONGODB_URI environment variable is not set');
    }

    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedDb = connection;
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    cachedDb = null;
    throw error;
  }
}

// Import models
const Question = require('../backend/models/Question');
const Mode = require('../backend/models/Mode');
const Record = require('../backend/models/Record');
const Assignment = require('../backend/models/Assignment');

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '考題管理系統 API Server',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      questions: '/api/questions',
      modes: '/api/modes',
      records: '/api/records',
      assignment: '/api/assignment'
    }
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: '考題管理系統 API',
    status: 'running'
  });
});

// Questions routes
app.get('/api/questions', async (req, res) => {
  try {
    await connectToDatabase();
    const { course, knowledge, chapter } = req.query;
    const filter = {};
    if (course) filter.course = course;
    if (knowledge) filter.knowledge = knowledge;
    if (chapter) filter.chapter = chapter;

    const questions = await Question.find(filter);
    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions',
      error: error.message
    });
  }
});

// Get single question by ID
app.get('/api/questions/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
        error: `No question found with ID: ${req.params.id}`
      });
    }
    
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch question',
      error: error.message
    });
  }
});

app.post('/api/questions', async (req, res) => {
  try {
    await connectToDatabase();
    console.log('Received data:', req.body);
    
    // 驗證必要欄位
    if (!req.body.course || !req.body.content) {
      return res.status(400).json({
        success: false,
        message: '缺少必要欄位：course 和 content 為必填',
        receivedData: req.body
      });
    }
    
    const question = await Question.create(req.body);
    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Create question error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create question',
      error: error.message,
      details: error.errors || {}
    });
  }
});

app.put('/api/questions/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update question',
      error: error.message
    });
  }
});

app.delete('/api/questions/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete question',
      error: error.message
    });
  }
});

// Modes routes
app.get('/api/modes', async (req, res) => {
  try {
    await connectToDatabase();
    const modes = await Mode.find().sort({ order: 1 });
    res.json({
      success: true,
      count: modes.length,
      data: modes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch modes',
      error: error.message
    });
  }
});

app.post('/api/modes', async (req, res) => {
  try {
    await connectToDatabase();
    const { name, code, description, order } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: '模式名稱為必填'
      });
    }
    
    const mode = new Mode({
      name,
      code: code || '',
      description: description || name,
      order: order || 0
    });
    
    await mode.save();
    
    res.status(201).json({
      success: true,
      message: 'Mode created successfully',
      data: mode
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create mode',
      error: error.message
    });
  }
});

app.delete('/api/modes', async (req, res) => {
  try {
    await connectToDatabase();
    await Mode.deleteMany({});
    res.json({
      success: true,
      message: 'All modes deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete modes',
      error: error.message
    });
  }
});

// Records routes
app.get('/api/records', async (req, res) => {
  try {
    await connectToDatabase();
    const records = await Record.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch records',
      error: error.message
    });
  }
});

app.post('/api/records', async (req, res) => {
  try {
    await connectToDatabase();
    const recordData = {
      questionId: req.body.questionId,
      questionType: req.body.questionType,
      answer: req.body.answer,
      correctAnswer: req.body.correctAnswer,
      isCorrect: req.body.isCorrect,
      score: req.body.isCorrect ? 100 : 0,
      timeSpent: req.body.timeSpent || 0,
      courseId: req.body.courseId,
      courseName: req.body.courseName,
      answeredAt: new Date()
    };
    
    const record = new Record(recordData);
    await record.save();
    
    res.json({
      success: true,
      message: 'Record saved successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save record',
      error: error.message
    });
  }
});

// 獲取題目的統計資訊
app.get('/api/records/stats/:questionId', async (req, res) => {
  try {
    await connectToDatabase();
    const questionId = req.params.questionId;
    
    const stats = await Record.aggregate([
      { $match: { questionId: new mongoose.Types.ObjectId(questionId) } },
      {
        $group: {
          _id: '$questionId',
          totalAttempts: { $sum: 1 },
          correctAttempts: {
            $sum: { $cond: ['$isCorrect', 1, 0] }
          },
          avgTimeSpent: { $avg: '$timeSpent' }
        }
      }
    ]);
    
    if (stats.length === 0) {
      return res.json({
        success: true,
        data: {
          totalAttempts: 0,
          correctAttempts: 0,
          correctRate: 0,
          avgTimeSpent: 0
        }
      });
    }
    
    const result = stats[0];
    res.json({
      success: true,
      data: {
        totalAttempts: result.totalAttempts,
        correctAttempts: result.correctAttempts,
        correctRate: ((result.correctAttempts / result.totalAttempts) * 100).toFixed(2),
        avgTimeSpent: Math.round(result.avgTimeSpent)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message
    });
  }
});

// Assignment routes
app.get('/api/assignment', async (req, res) => {
  try {
    await connectToDatabase();
    const assignments = await Assignment.find();
    res.json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignments',
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.url
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

module.exports = app;
