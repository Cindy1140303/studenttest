const express = require('express');
const router = express.Router();

// GET - 取得所有課程列表
router.get('/courses', (req, res) => {
  // 模擬資料，實際應該從資料庫取得
  const courses = [
    { id: 'math', name: '數學' },
    { id: 'history', name: '歷史' },
    { id: 'science', name: '科學' }
  ];
  
  res.json({
    success: true,
    data: courses
  });
});

// GET - 取得所有考題模式
router.get('/modes', (req, res) => {
  const modes = [
    { id: 'connect', name: '連連看' },
    { id: 'drag', name: '拖拉方塊' },
    { id: 'single', name: '單選題' }
  ];
  
  res.json({
    success: true,
    data: modes
  });
});

// POST - 根據課程和模式取得考題
router.post('/preview', (req, res) => {
  const { courseId, modeId } = req.body;
  
  if (!courseId || !modeId) {
    return res.status(400).json({
      success: false,
      message: '請提供課程和考題模式'
    });
  }
  
  // 模擬返回考題資料
  const assignmentData = {
    courseId,
    modeId,
    questions: [
      {
        id: 1,
        content: '這是一個範例考題',
        options: ['選項A', '選項B', '選項C', '選項D'],
        correctAnswer: 'A'
      }
    ]
  };
  
  res.json({
    success: true,
    data: assignmentData
  });
});

// POST - 儲存考題分派
router.post('/save', (req, res) => {
  const { courseId, modeId, assignedTo, dueDate } = req.body;
  
  // 這裡應該將分派資料儲存到資料庫
  
  res.json({
    success: true,
    message: '考題分派成功',
    data: {
      assignmentId: Date.now(),
      courseId,
      modeId,
      assignedTo,
      dueDate
    }
  });
});

module.exports = router;
