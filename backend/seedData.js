const mongoose = require('mongoose');
require('dotenv').config();

// 引入模型
const Question = require('./models/Question');
const Mode = require('./models/Mode');
const Record = require('./models/Record');

const seedData = async () => {
  try {
    // 連接資料庫
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/exam_management');
    console.log('MongoDB 連接成功');

    // 清空現有資料
    await Question.deleteMany({});
    await Mode.deleteMany({});
    await Record.deleteMany({});
    console.log('已清空現有資料');

    // 插入考題模式
    const modes = await Mode.insertMany([
      {
        name: '連連看',
        code: `<template>
  <div class="connect-mode">
    <h3>{{ question.content }}</h3>
    <div class="connect-game">
      <!-- 連連看遊戲邏輯 -->
    </div>
  </div>
</template>`,
        description: '連連看互動模式',
        isActive: true
      },
      {
        name: '拖拉方塊',
        code: `<template>
  <div class="drag-mode">
    <h3>{{ question.content }}</h3>
    <div class="drag-area">
      <!-- 拖拉方塊遊戲邏輯 -->
    </div>
  </div>
</template>`,
        description: '拖拉方塊互動模式',
        isActive: true
      },
      {
        name: '單選題',
        code: `<template>
  <div class="single-choice">
    <h3>{{ question.content }}</h3>
    <div class="options">
      <button v-for="option in question.options" :key="option">
        {{ option }}
      </button>
    </div>
  </div>
</template>`,
        description: '標準單選題模式',
        isActive: true
      }
    ]);
    console.log(`已插入 ${modes.length} 個考題模式`);

    // 插入考題
    const questions = await Question.insertMany([
      {
        course: '數學',
        chapter: '第3章',
        knowledge: '微積分',
        type: '單選題',
        content: '求 f(x) = x² 在 x=2 的導數是多少？',
        options: ['A. 2', 'B. 4', 'C. 8', 'D. 16'],
        answer: 'B',
        difficulty: '中等'
      },
      {
        course: '數學',
        chapter: '第1章',
        knowledge: '代數',
        type: '單選題',
        content: '解方程式 2x + 5 = 13，x 的值為？',
        options: ['A. 3', 'B. 4', 'C. 5', 'D. 6'],
        answer: 'B',
        difficulty: '簡單'
      },
      {
        course: '歷史',
        chapter: '第5章',
        knowledge: '古代文明',
        type: '連連看',
        content: '將朝代與其代表人物連線',
        options: '4組配對',
        answer: '見圖',
        difficulty: '中等'
      },
      {
        course: '歷史',
        chapter: '第2章',
        knowledge: '近代史',
        type: '單選題',
        content: '第一次世界大戰發生在哪一年？',
        options: ['A. 1912', 'B. 1914', 'C. 1916', 'D. 1918'],
        answer: 'B',
        difficulty: '簡單'
      },
      {
        course: '科學',
        chapter: '第1章',
        knowledge: '物理學',
        type: '是非題',
        content: '光速在真空中是恆定的',
        options: ['是', '否'],
        answer: '是',
        difficulty: '簡單'
      },
      {
        course: '科學',
        chapter: '第3章',
        knowledge: '化學',
        type: '單選題',
        content: '水的化學式是？',
        options: ['A. H2O', 'B. CO2', 'C. O2', 'D. N2'],
        answer: 'A',
        difficulty: '簡單'
      },
      {
        course: '數學',
        chapter: '第2章',
        knowledge: '幾何',
        type: '單選題',
        content: '圓的面積公式是？',
        options: ['A. πr', 'B. πr²', 'C. 2πr', 'D. πd'],
        answer: 'B',
        difficulty: '簡單'
      },
      {
        course: '歷史',
        chapter: '第6章',
        knowledge: '現代史',
        type: '單選題',
        content: '中華民國建立於哪一年？',
        options: ['A. 1910', 'B. 1911', 'C. 1912', 'D. 1913'],
        answer: 'B',
        difficulty: '中等'
      }
    ]);
    console.log(`已插入 ${questions.length} 個考題`);

    // 插入答題記錄
    const records = await Record.insertMany([
      {
        studentId: 'S001',
        studentName: '張小明',
        questionId: questions[0]._id,
        courseId: 'math',
        courseName: '數學',
        questionType: '單選題',
        answer: 'B',
        correctAnswer: 'B',
        isCorrect: true,
        score: 100,
        timeSpent: 45
      },
      {
        studentId: 'S001',
        studentName: '張小明',
        questionId: questions[2]._id,
        courseId: 'history',
        courseName: '歷史',
        questionType: '連連看',
        answer: '見圖',
        correctAnswer: '見圖',
        isCorrect: true,
        score: 100,
        timeSpent: 120
      },
      {
        studentId: 'S002',
        studentName: '李小華',
        questionId: questions[4]._id,
        courseId: 'science',
        courseName: '科學',
        questionType: '是非題',
        answer: '否',
        correctAnswer: '是',
        isCorrect: false,
        score: 0,
        timeSpent: 30
      }
    ]);
    console.log(`已插入 ${records.length} 筆答題記錄`);

    console.log('\n✅ 種子資料建立完成！');
    console.log('----------------------------');
    console.log(`考題模式: ${modes.length} 筆`);
    console.log(`考題: ${questions.length} 筆`);
    console.log(`答題記錄: ${records.length} 筆`);
    console.log('----------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('錯誤:', error);
    process.exit(1);
  }
};

seedData();
