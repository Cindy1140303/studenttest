# 🎯 您的 MongoDB Atlas 設定

## ✅ 您的連接字串
```
mongodb+srv://<db_username>:<db_password>@cluster0.hmvmdjp.mongodb.net/?appName=Cluster0
```

---

## 📝 接下來的步驟

### 步驟 1: 取得您的資料庫帳號密碼

1. 前往 MongoDB Atlas: https://cloud.mongodb.com/v2/690e80d07757f4238e04f728
2. 點擊左側 **"Database Access"**
3. 如果還沒有使用者：
   - 點擊 **"Add New Database User"**
   - 設定使用者名稱（例如：`examuser`）
   - 設定密碼（例如：`Pass1234`）**← 請記住這個密碼！**
   - Privileges 選擇：**"Read and write to any database"**
   - 點擊 **"Add User"**

### 步驟 2: 設定網路存取（重要！）

1. 點擊左側 **"Network Access"**
2. 點擊 **"Add IP Address"**
3. 選擇 **"Allow Access from Anywhere"**
4. IP Address 應該顯示：`0.0.0.0/0`
5. 點擊 **"Confirm"**

### 步驟 3: 替換連接字串中的帳號密碼

假設您建立的帳號是：
- Username: `examuser`
- Password: `Pass1234`

則完整的連接字串變成：
```
mongodb+srv://examuser:Pass1234@cluster0.hmvmdjp.mongodb.net/exam_management?retryWrites=true&w=majority&appName=Cluster0
```

**注意：**
- 已加上資料庫名稱：`/exam_management`
- 已加上必要參數：`?retryWrites=true&w=majority`

### 步驟 4: 本地測試（可選）

如果您想在本地測試：

1. 編輯 `backend/.env`，貼上完整連接字串：
   ```env
   MONGODB_URI=mongodb+srv://examuser:Pass1234@cluster0.hmvmdjp.mongodb.net/exam_management?retryWrites=true&w=majority&appName=Cluster0
   ```

2. 執行測試：
   ```bash
   cd backend
   npm install
   npm run seed
   ```

3. 如果成功，會看到：
   ```
   MongoDB 連接成功
   ✅ 種子資料建立完成！
   考題模式: 3 筆
   考題: 8 筆
   答題記錄: 3 筆
   ```

### 步驟 5: 部署到 Vercel

#### 方式 A：使用 Vercel CLI（推薦）

```bash
# 1. 安裝 Vercel CLI
npm install -g vercel

# 2. 登入 Vercel
vercel login

# 3. 部署
cd c:\Users\love3\Downloads\testmanerge
vercel

# 4. 設定環境變數（貼上完整連接字串）
vercel env add MONGODB_URI production

# 5. 正式部署
vercel --prod
```

#### 方式 B：使用 Vercel 網頁介面（更簡單）

1. 訪問：https://vercel.com/new
2. 用 GitHub 登入
3. 點擊 **"Import Git Repository"**
4. 選擇 `Cindy1140303/studenttest`
5. 在 **"Environment Variables"** 區域：
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://examuser:Pass1234@cluster0.hmvmdjp.mongodb.net/exam_management?retryWrites=true&w=majority&appName=Cluster0`
   - Environment: **Production**
6. 點擊 **"Deploy"**

### 步驟 6: 初始化 Vercel 資料庫資料

部署完成後，需要執行一次種子資料腳本。有兩個方式：

**方式 A：本地連接雲端資料庫**
```bash
cd backend
# 確認 .env 有正確的 MONGODB_URI
npm run seed
```

**方式 B：使用 MongoDB Compass**
1. 下載 MongoDB Compass: https://www.mongodb.com/products/compass
2. 連接字串貼上您的完整 URI
3. 手動建立集合和資料

### 步驟 7: 更新前端 API 地址

部署完成後，Vercel 會給您一個網址，例如：
```
https://studenttest-xxxxx.vercel.app
```

編輯 `index.html` 第 295 行：
```javascript
const API_BASE_URL = 'https://studenttest-xxxxx.vercel.app/api';
```

然後推送更新：
```bash
git add index.html
git commit -m "Update API URL to Vercel"
git push origin main
```

### 步驟 8: 測試完整系統

1. 測試後端：`https://studenttest-xxxxx.vercel.app/api/questions`
2. 測試前端：`https://cindy1140303.github.io/studenttest/`

---

## 🎉 完成！

您的系統架構：
```
GitHub Pages (前端)
    ↓
Vercel (後端 API)
    ↓
MongoDB Atlas (資料庫)
```

---

## ⚠️ 重要提醒

1. **密碼安全**：不要把真實的連接字串提交到 Git
2. **Network Access**：必須設定為 `0.0.0.0/0`，否則 Vercel 無法連接
3. **資料庫名稱**：連接字串中必須包含 `/exam_management`

---

## 需要協助？

如果遇到問題，請告訴我：
- 您在哪一步遇到困難
- 看到什麼錯誤訊息
- 是否成功建立了資料庫使用者

我會立即協助您！🚀
