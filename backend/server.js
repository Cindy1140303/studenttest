const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const assignmentRoutes = require('./routes/assignment');
const questionsRoutes = require('./routes/questions');
const modesRoutes = require('./routes/modes');
const recordsRoutes = require('./routes/records');

// Use routes
app.use('/api/assignment', assignmentRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/modes', modesRoutes);
app.use('/api/records', recordsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: '考題管理系統 API Server' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export for Vercel serverless
module.exports = app;
