# MongoDB Atlas 快速設定指南

## 您的 MongoDB Atlas: https://cloud.mongodb.com/v2/690e80d07757f4238e04f728

## 步驟 1: 建立資料庫叢集（如果還沒有）

1. 在 MongoDB Atlas 控制台，點擊左側 **"Database"**
2. 如果還沒有叢集，點擊 **"Build a Database"**
3. 選擇 **FREE** 方案（M0 Sandbox）
4. 選擇區域（建議選擇距離您最近的，如 AWS / Singapore）
5. 點擊 **"Create"**

## 步驟 2: 建立資料庫使用者

1. 點擊左側選單的 **"Database Access"**
2. 點擊 **"Add New Database User"**
3. 設定：
   - Authentication Method: **Password**
   - Username: `examuser` (或您喜歡的名稱)
   - Password: **自動生成** 或自訂（請記住這個密碼）
   - Database User Privileges: **Read and write to any database**
4. 點擊 **"Add User"**

## 步驟 3: 設定網路存取

1. 點擊左側選單的 **"Network Access"**
2. 點擊 **"Add IP Address"**
3. 選擇 **"Allow Access from Anywhere"** (0.0.0.0/0)
   - 這樣 Vercel 和您的電腦都能連接
4. 點擊 **"Confirm"**

## 步驟 4: 取得連接字串

1. 回到 **"Database"** 頁面
2. 點擊您的叢集旁邊的 **"Connect"** 按鈕
3. 選擇 **"Connect your application"**
4. 選擇 Driver: **Node.js**，Version: **5.5 or later**
5. 複製連接字串，格式類似：
   ```
   mongodb+srv://examuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. 將 `<password>` 替換為您在步驟 2 設定的實際密碼
7. 在最後加上資料庫名稱，變成：
   ```
   mongodb+srv://examuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/exam_management?retryWrites=true&w=majority
   ```

## 步驟 5: 測試連接（本地測試）

1. 複製您的連接字串
2. 編輯 `backend/.env`：
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://examuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/exam_management?retryWrites=true&w=majority
   ```
3. 初始化資料：
   ```bash
   cd backend
   npm install
   npm run seed
   ```
4. 如果看到 "✅ 種子資料建立完成！"，表示連接成功！

## 步驟 6: 部署到 Vercel

### 方式 A: 使用 Vercel CLI（推薦）

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入
vercel login

# 部署
cd c:\Users\love3\Downloads\testmanerge
vercel

# 設定環境變數
vercel env add MONGODB_URI production
# 貼上您的 MongoDB 連接字串

# 正式部署
vercel --prod
```

### 方式 B: 使用 Vercel 網頁介面

1. 前往 https://vercel.com 並登入
2. 點擊 **"Add New..."** → **"Project"**
3. 選擇從 GitHub 匯入
4. 授權 Vercel 存取您的 GitHub
5. 選擇 `Cindy1140303/studenttest` 儲存庫
6. 在 **Environment Variables** 設定：
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://examuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/exam_management?retryWrites=true&w=majority`
7. 點擊 **"Deploy"**

## 步驟 7: 更新前端 API 地址

1. 部署完成後，Vercel 會給您一個網址，例如：
   ```
   https://studenttest.vercel.app
   ```

2. 編輯 `index.html`，修改第 295 行：
   ```javascript
   const API_BASE_URL = 'https://studenttest.vercel.app/api';
   ```

3. 提交並推送：
   ```bash
   git add index.html
   git commit -m "Update API URL to Vercel deployment"
   git push origin main
   ```

## 步驟 8: 驗證部署

1. 測試後端 API：
   - 訪問：`https://studenttest.vercel.app/api/questions`
   - 應該會看到 JSON 格式的考題資料

2. 測試前端：
   - 訪問：`https://cindy1140303.github.io/studenttest/`
   - 點擊「考題管理」標籤
   - 應該會從 Vercel 後端載入資料

## 🎉 完成！

您的完整架構：
```
GitHub Pages (前端)
    ↓ HTTPS
Vercel (後端 API)
    ↓ HTTPS
MongoDB Atlas (雲端資料庫)
```

## ⚠️ 注意事項

1. **不要把密碼提交到 Git**
   - `.env` 檔案已在 `.gitignore` 中
   - 只在 Vercel 設定環境變數

2. **MongoDB Atlas 免費方案限制**
   - 儲存空間: 512 MB
   - 對大部分開發測試來說足夠

3. **Vercel 免費方案限制**
   - 每月 100 GB 頻寬
   - 10 秒函數執行時間
   - 對個人專案完全足夠

## 需要幫助？

如果遇到問題，請檢查：
1. MongoDB Atlas 的 Network Access 是否允許 0.0.0.0/0
2. 連接字串中的密碼是否正確
3. Vercel 環境變數是否正確設定
