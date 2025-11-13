# 考題管理系統 - 完整啟動指南

## 📋 系統需求
- Node.js (v14 或以上)
- MongoDB (v4.4 或以上)

## 🚀 快速開始

### 1. 安裝 MongoDB

#### Windows:
```bash
# 下載並安裝 MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# 啟動 MongoDB 服務
net start MongoDB
```

#### Mac:
```bash
brew install mongodb-community
brew services start mongodb-community
```

### 2. 設定後端

```bash
# 進入後端資料夾
cd backend

# 安裝依賴套件
npm install

# 初始化資料庫（建立測試資料）
npm run seed

# 啟動後端伺服器
npm run dev
```

後端會在 `http://localhost:3000` 運行

### 3. 開啟前端

在瀏覽器中開啟 `index.html`，或使用 Live Server 等工具。

**重要：** 前端會自動連接到 `http://localhost:3000` 的後端 API。

## 📊 測試資料說明

執行 `npm run seed` 後會建立：
- **8 筆考題**：涵蓋數學、歷史、科學三個科目
- **3 種考題模式**：連連看、拖拉方塊、單選題
- **3 筆答題記錄**：模擬學生作答資料

## 🔧 API 端點測試

### 取得所有考題
```bash
curl http://localhost:3000/api/questions
```

### 篩選考題（以課別為例）
```bash
curl http://localhost:3000/api/questions?course=數學
```

### 新增考題
```bash
curl -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "course": "數學",
    "chapter": "第1章",
    "knowledge": "代數",
    "type": "單選題",
    "content": "2+2=?",
    "options": ["A. 3", "B. 4", "C. 5", "D. 6"],
    "answer": "B"
  }'
```

## 📱 前端功能說明

### 考題管理頁面
- 點擊「考題管理」標籤
- 可以看到從 MongoDB 載入的考題資料
- 支援編輯和刪除功能（刪除會實際從資料庫移除）

### 查詢功能
- 選擇課別和知識點進行篩選
- 點擊「查詢」按鈕（目前尚未實作，可自行擴充）

## 🛠️ 開發模式

### 後端自動重啟
```bash
cd backend
npm run dev  # 使用 nodemon，修改代碼後自動重啟
```

### 前端開發
建議使用 VS Code 的 Live Server 擴充套件，可以自動重新載入頁面。

## 🗄️ MongoDB 管理

### 使用 MongoDB Compass（圖形化介面）
1. 下載：https://www.mongodb.com/products/compass
2. 連接字串：`mongodb://localhost:27017`
3. 資料庫名稱：`exam_management`

### 使用命令列
```bash
# 進入 MongoDB shell
mongosh

# 使用資料庫
use exam_management

# 查看所有考題
db.questions.find()

# 查看所有模式
db.modes.find()

# 查看答題記錄
db.records.find()
```

## ⚠️ 常見問題

### 1. 無法連接 MongoDB
```
錯誤: MongoDB 連接錯誤: connect ECONNREFUSED
解決: 確認 MongoDB 服務是否啟動
Windows: net start MongoDB
Mac: brew services start mongodb-community
```

### 2. 前端顯示「連接後端 API 失敗」
```
解決: 
1. 確認後端是否在 http://localhost:3000 運行
2. 檢查瀏覽器 Console 是否有 CORS 錯誤
3. 確認 backend/server.js 中的 CORS 設定
```

### 3. npm run seed 失敗
```
解決:
1. 確認 MongoDB 正在運行
2. 檢查 .env 檔案中的 MONGODB_URI 設定
3. 確認資料庫連接字串正確
```

## 📝 環境變數設定

編輯 `backend/.env`：
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/exam_management
```

## 🔄 重置資料庫

如果需要重新建立測試資料：
```bash
cd backend
npm run seed
```

這會清空現有資料並重新建立種子資料。

## 📦 部署到生產環境

### 後端部署（例如：Heroku, Railway）
1. 設定環境變數 `MONGODB_URI` 為遠端 MongoDB 連接字串
2. 修改 `PORT` 為雲端平台提供的端口

### 前端部署
1. 修改 `index.html` 中的 `API_BASE_URL`
2. 改為實際的後端 API 地址
3. 部署到 GitHub Pages 或其他靜態主機

## 🎯 下一步開發建議

1. 實作查詢按鈕功能
2. 加入考題新增表單
3. 實作編輯考題功能
4. 加入使用者登入系統
5. 實作考題分派功能
6. 加入圖表統計功能
