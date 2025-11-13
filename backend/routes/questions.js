const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// GET - 取得所有考題（支援篩選）
router.get('/', (req, res) => {
  const { course, knowledge, chapter } = req.query;
  
  // 模擬資料，實際應該從資料庫查詢
  let questions = [
    {
      id: 1,
      date: '2025/01/10',
      course: '數學',
      chapter: '第3章',
      knowledge: '微積分',
      type: '單選題',
      content: '求 f(x) = x² 在 x=2 的導數',
      options: ['A. 2', 'B. 4', 'C. 8', 'D. 16'],
      answer: 'B'
    },
    {
      id: 2,
      date: '2025/01/10',
      course: '歷史',
      chapter: '第5章',
      knowledge: '古代文明',
      type: '連連看',
      content: '將朝代與其代表人物連線',
      options: '4組',
      answer: '見圖'
    },
    {
      id: 3,
      date: '2025/01/11',
      course: '科學',
      chapter: '第1章',
      knowledge: '物理學',
      type: '是非題',
      content: '光速在真空中是恆定的',
      options: ['是', '否'],
      answer: '是'
    }
  ];
  
  // 根據篩選條件過濾
  if (course) {
    questions = questions.filter(q => q.course === course);
  }
  if (knowledge) {
    questions = questions.filter(q => q.knowledge === knowledge);
  }
  if (chapter) {
    questions = questions.filter(q => q.chapter === chapter);
  }
  
  res.json({
    success: true,
    data: questions,
    total: questions.length
  });
});

// GET - 取得單一考題
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // 這裡應該從資料庫查詢
  const question = {
    id: parseInt(id),
    date: '2025/01/10',
    course: '數學',
    chapter: '第3章',
    knowledge: '微積分',
    type: '單選題',
    content: '求 f(x) = x² 在 x=2 的導數',
    options: ['A. 2', 'B. 4', 'C. 8', 'D. 16'],
    answer: 'B'
  };
  
  res.json({
    success: true,
    data: question
  });
});

// POST - 手動新增考題
router.post('/', (req, res) => {
  const { course, chapter, knowledge, type, content, options, answer } = req.body;
  
  if (!course || !type || !content || !answer) {
    return res.status(400).json({
      success: false,
      message: '請填寫必要欄位：課別、題型、題目內容、答案'
    });
  }
  
  // 這裡應該將資料儲存到資料庫
  const newQuestion = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    course,
    chapter,
    knowledge,
    type,
    content,
    options,
    answer
  };
  
  res.json({
    success: true,
    message: '考題新增成功',
    data: newQuestion
  });
});

// PUT - 更新考題
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  // 這裡應該更新資料庫中的資料
  
  res.json({
    success: true,
    message: '考題更新成功',
    data: {
      id: parseInt(id),
      ...updateData
    }
  });
});

// DELETE - 刪除考題
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // 這裡應該從資料庫刪除資料
  
  res.json({
    success: true,
    message: '考題刪除成功',
    deletedId: parseInt(id)
  });
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
