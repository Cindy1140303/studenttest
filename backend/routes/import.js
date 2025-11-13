const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const Question = require('../models/Question');

// 設定檔案上傳
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('只接受 Excel 檔案 (.xlsx, .xls)'));
        }
    }
});

// Excel 匯入端點
router.post('/import', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: '未上傳檔案'
            });
        }

        // 讀取 Excel 檔案
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // 轉換為 JSON
        const data = xlsx.utils.sheet_to_json(worksheet);

        if (data.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Excel 檔案中沒有資料'
            });
        }

        // 批次新增考題
        const questions = data.map(row => ({
            course: row['課程'] || row['course'],
            chapter: row['章節'] || row['chapter'],
            knowledge: row['知識點'] || row['knowledge'],
            type: row['題型'] || row['type'] || '選擇題',
            content: row['題目內容'] || row['content'],
            options: row['選項'] || row['options'],
            answer: row['答案'] || row['answer'],
            difficulty: row['難度'] || row['difficulty'],
            tags: row['標籤'] ? (row['標籤'].split(',') || row['tags'].split(',')) : []
        }));

        const result = await Question.insertMany(questions);

        res.json({
            success: true,
            message: `成功匯入 ${result.length} 筆考題`,
            imported: result.length,
            data: result
        });

    } catch (error) {
        console.error('匯入失敗:', error);
        res.status(500).json({
            success: false,
            message: '匯入失敗：' + error.message
        });
    }
});

module.exports = router;
