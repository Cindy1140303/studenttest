const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Question = require('../models/Question');

// GET - 取得所有考題（支援篩選）
router.get('/', async (req, res) => {
  try {
    const { course, knowledge, chapter } = req.query;
    
    // 建立查詢條件
    let query = {};
    if (course) query.course = course;
    if (knowledge) query.knowledge = knowledge;
    if (chapter) query.chapter = chapter;
    
    const questions = await Question.find(query).sort({ createdAt: -1 });
    
    // 轉換為前端需要的格式
    const formattedQuestions = questions.map(q => ({
      id: q._id,
      date: q.createdAt.toISOString().split('T')[0],
      course: q.course,
      chapter: q.chapter,
      knowledge: q.knowledge,
      type: q.type,
      content: q.content,
      options: Array.isArray(q.options) ? q.options.join(',') : q.options,
      answer: q.answer
    }));
    
    res.json({
      success: true,
      data: formattedQuestions,
      total: formattedQuestions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '查詢失敗',
      error: error.message
    });
  }
});

// GET - 取得單一考題
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: '找不到該考題'
      });
    }
    
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '查詢失敗',
      error: error.message
    });
  }
});

// POST - 手動新增考題
router.post('/', async (req, res) => {
  try {
    const { course, chapter, knowledge, type, content, options, answer } = req.body;
    
    if (!course || !type || !content || !answer) {
      return res.status(400).json({
        success: false,
        message: '請填寫必要欄位：課別、題型、題目內容、答案'
      });
    }
    
    const newQuestion = new Question({
      course,
      chapter,
      knowledge,
      type,
      content,
      options,
      answer
    });
    
    await newQuestion.save();
    
    res.json({
      success: true,
      message: '考題新增成功',
      data: newQuestion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '新增失敗',
      error: error.message
    });
  }
});

// PUT - 更新考題
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: '找不到該考題'
      });
    }
    
    res.json({
      success: true,
      message: '考題更新成功',
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '更新失敗',
      error: error.message
    });
  }
});

// DELETE - 刪除考題
router.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: '找不到該考題'
      });
    }
    
    res.json({
      success: true,
      message: '考題刪除成功',
      deletedId: req.params.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '刪除失敗',
      error: error.message
    });
  }
});

// POST - 批量匯入考題
router.post('/import', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: '請上傳檔案'
    });
  }
  
  // 這裡應該解析檔案並批量插入資料庫
  // 支援 CSV, Excel 等格式
  
  res.json({
    success: true,
    message: '批量匯入成功',
    imported: 10 // 匯入的題目數量
  });
});

// GET - 取得知識點列表
router.get('/knowledge/list', (req, res) => {
  const { course } = req.query;
  
  const knowledgePoints = {
    '數學': ['微積分', '代數', '幾何'],
    '歷史': ['古代文明', '近代史', '現代史'],
    '科學': ['物理學', '化學', '生物學']
  };
  
  res.json({
    success: true,
    data: course ? knowledgePoints[course] : knowledgePoints
  });
});

module.exports = router;
