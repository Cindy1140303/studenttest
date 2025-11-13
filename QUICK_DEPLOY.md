# 快速部署到 Vercel

## 前置條件
- ✅ MongoDB Atlas 帳號（您已有）
- ✅ GitHub 儲存庫（已完成）

## 🚀 三個簡單步驟

### 1️⃣ 取得 MongoDB 連接字串

在您的 MongoDB Atlas:
1. Database → Connect → Connect your application
2. 複製連接字串並替換密碼
3. 加上資料庫名稱 `/exam_management`

範例：
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/exam_management
```

### 2️⃣ 部署到 Vercel（最簡單方式）

1. 訪問：https://vercel.com/new
2. 用 GitHub 登入
3. 匯入 `Cindy1140303/studenttest`
4. 設定環境變數：
   ```
   MONGODB_URI = 您的連接字串
   ```
5. 點擊 Deploy

### 3️⃣ 測試

部署完成後：
- 測試 API：`https://your-project.vercel.app/api/questions`
- 應該會看到空陣列（因為資料庫是空的）

---

## ❓ 需要我幫您嗎？

請告訴我您目前的狀態：
1. MongoDB Atlas 叢集是否已建立？
2. 是否已取得連接字串？
3. 需要我協助部署到 Vercel 嗎？
