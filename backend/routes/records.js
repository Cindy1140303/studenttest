const express = require('express');
const router = express.Router();

// GET - 取得所有答題記錄（支援篩選）
router.get('/', (req, res) => {
  const { studentId, courseId, startDate, endDate } = req.query;
  
  // 模擬資料，實際應該從資料庫查詢
  let records = [
    {
      id: 1,
      studentId: 'S001',
      studentName: '張小明',
      courseId: 'math',
      courseName: '數學',
      questionId: 1,
      questionType: '單選題',
      answer: 'B',
      correctAnswer: 'B',
      isCorrect: true,
      score: 100,
      timeSpent: 45, // 秒
      answeredAt: '2025/01/15 10:30:00'
    },
    {
      id: 2,
      studentId: 'S001',
      studentName: '張小明',
      courseId: 'history',
      courseName: '歷史',
      questionId: 2,
      questionType: '連連看',
      answer: '見圖',
      correctAnswer: '見圖',
      isCorrect: true,
      score: 100,
      timeSpent: 120,
      answeredAt: '2025/01/15 11:00:00'
    },
    {
      id: 3,
      studentId: 'S002',
      studentName: '李小華',
      courseId: 'science',
      courseName: '科學',
      questionId: 3,
      questionType: '是非題',
      answer: '否',
      correctAnswer: '是',
      isCorrect: false,
      score: 0,
      timeSpent: 30,
      answeredAt: '2025/01/15 14:20:00'
    }
  ];
  
  // 根據篩選條件過濾
  if (studentId) {
    records = records.filter(r => r.studentId === studentId);
  }
  if (courseId) {
    records = records.filter(r => r.courseId === courseId);
  }
  
  res.json({
    success: true,
    data: records,
    total: records.length
  });
});

// GET - 取得單一學生的答題記錄
router.get('/student/:studentId', (req, res) => {
  const { studentId } = req.params;
  
  // 這裡應該從資料庫查詢該學生的所有答題記錄
  const studentRecords = [
    {
      id: 1,
      questionId: 1,
      courseName: '數學',
      isCorrect: true,
      score: 100,
      answeredAt: '2025/01/15 10:30:00'
    }
  ];
  
  res.json({
    success: true,
    data: studentRecords
  });
});

// GET - 取得特定考題的統計資料
router.get('/stats/:questionId', (req, res) => {
  const { questionId } = req.params;
  
  // 這裡應該計算該考題的統計資料
  const stats = {
    questionId: parseInt(questionId),
    totalAttempts: 50,
    correctCount: 35,
    incorrectCount: 15,
    accuracy: 70,
    averageTimeSpent: 60
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// POST - 提交答題記錄
router.post('/', (req, res) => {
  const { 
    studentId, 
    studentName, 
    questionId, 
    answer, 
    timeSpent 
  } = req.body;
  
  if (!studentId || !questionId || !answer) {
    return res.status(400).json({
      success: false,
      message: '請提供必要資料：學生ID、題目ID、答案'
    });
  }
  
  // 這裡應該：
  // 1. 從資料庫取得正確答案
  // 2. 比對答案是否正確
  // 3. 計算分數
  // 4. 儲存答題記錄
  
  const correctAnswer = 'B'; // 假設從資料庫取得
  const isCorrect = answer === correctAnswer;
  
  const newRecord = {
    id: Date.now(),
    studentId,
    studentName,
    questionId,
    answer,
    correctAnswer,
    isCorrect,
    score: isCorrect ? 100 : 0,
    timeSpent,
    answeredAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: '答題記錄已儲存',
    data: newRecord
  });
});

// GET - 取得學生成績報告
router.get('/report/:studentId', (req, res) => {
  const { studentId } = req.params;
  
  // 這裡應該生成詳細的成績報告
  const report = {
    studentId,
    studentName: '張小明',
    totalQuestions: 50,
    correctAnswers: 42,
    accuracy: 84,
    averageScore: 84,
    strongSubjects: ['數學', '科學'],
    weakSubjects: ['歷史'],
    recentActivity: [
      { date: '2025/01/15', questionsAnswered: 10, accuracy: 90 },
      { date: '2025/01/14', questionsAnswered: 8, accuracy: 75 }
    ]
  };
  
  res.json({
    success: true,
    data: report
  });
});

// DELETE - 刪除答題記錄（管理員功能）
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // 這裡應該從資料庫刪除記錄
  
  res.json({
    success: true,
    message: '記錄已刪除',
    deletedId: parseInt(id)
  });
});

module.exports = router;
