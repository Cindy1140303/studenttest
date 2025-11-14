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

app.post('/api/questions', async (req, res) => {
  try {
    await connectToDatabase();
    const question = await Question.create(req.body);
    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create question',
      error: error.message
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
    const modes = await Mode.find();
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
