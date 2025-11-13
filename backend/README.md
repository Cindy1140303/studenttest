# 考題管理系統 - 後端 API

## 專案說明
這是考題管理系統的後端 API，使用 Node.js + Express + MongoDB 開發。

## 功能模組

### 1. 考題分派 (Assignment)
- `GET /api/assignment/courses` - 取得課程列表
- `GET /api/assignment/modes` - 取得考題模式列表
- `POST /api/assignment/preview` - 預覽考題
- `POST /api/assignment/save` - 儲存考題分派

### 2. 考題管理 (Questions)
- `GET /api/questions` - 取得考題列表（支援篩選）
- `GET /api/questions/:id` - 取得單一考題
- `POST /api/questions` - 新增考題
- `PUT /api/questions/:id` - 更新考題
- `DELETE /api/questions/:id` - 刪除考題
- `POST /api/questions/import` - 批量匯入考題
- `GET /api/questions/knowledge/list` - 取得知識點列表

### 3. 模式管理 (Modes)
- `GET /api/modes` - 取得所有考題模式
- `GET /api/modes/:id` - 取得單一模式
- `POST /api/modes` - 新增模式
- `PUT /api/modes/:id` - 更新模式
- `DELETE /api/modes/:id` - 刪除模式

### 4. 答題記錄 (Records)
- `GET /api/records` - 取得答題記錄（支援篩選）
- `GET /api/records/student/:studentId` - 取得學生答題記錄
- `GET /api/records/stats/:questionId` - 取得考題統計
- `POST /api/records` - 提交答題記錄
- `GET /api/records/report/:studentId` - 取得學生成績報告
- `DELETE /api/records/:id` - 刪除記錄

## 安裝步驟

1. 安裝依賴套件
```bash
npm install
```

2. 設定環境變數
複製 `.env` 檔案並修改資料庫連線設定

3. 啟動 MongoDB
確保 MongoDB 服務正在運行

4. 啟動伺服器
```bash
# 開發模式（自動重啟）
npm run dev

# 正式模式
npm start
```

## 資料庫模型

### Question（考題）
- course: 課別
- chapter: 章節
- knowledge: 知識點
- type: 題型
- content: 題目內容
- options: 選項
- answer: 答案

### Mode（考題模式）
- name: 模式名稱
- code: VUE 組件代碼
- description: 描述

### Record（答題記錄）
- studentId: 學生 ID
- questionId: 題目 ID
- answer: 學生答案
- isCorrect: 是否正確
- score: 得分
- timeSpent: 花費時間

### Assignment（考題分派）
- courseId: 課程 ID
- modeId: 模式 ID
- questions: 考題列表
- assignedTo: 分派對象
- dueDate: 截止日期

## 技術棧
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer（檔案上傳）
- CORS
- dotenv

## 開發注意事項
1. 所有 API 回應格式統一為：
```json
{
  "success": true/false,
  "data": {},
  "message": ""
}
```

2. 目前使用模擬資料，實際部署時需連接真實資料庫

3. 檔案上傳功能需要建立 `uploads/` 資料夾
