# Vercel 部署指南

## 步驟 1: 建立 MongoDB Atlas（免費雲端資料庫）

1. 前往 https://www.mongodb.com/cloud/atlas/register
2. 註冊帳號並建立免費叢集（Free Tier）
3. 建立資料庫使用者和密碼
4. 設定網路存取：允許所有 IP（0.0.0.0/0）
5. 取得連接字串，例如：
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/exam_management
   ```

## 步驟 2: 部署後端到 Vercel

### 方式 A：使用 Vercel CLI（推薦）

1. 安裝 Vercel CLI
```bash
npm install -g vercel
```

2. 登入 Vercel
```bash
vercel login
```

3. 部署專案
```bash
cd c:\Users\love3\Downloads\testmanerge
vercel
```

4. 設定環境變數
```bash
vercel env add MONGODB_URI
# 貼上您的 MongoDB Atlas 連接字串

vercel env add PORT
# 輸入: 3000
```

5. 重新部署
```bash
vercel --prod
```

### 方式 B：使用 Vercel 網頁介面

1. 前往 https://vercel.com
2. 登入並點擊「Import Project」
3. 連接您的 GitHub 帳號
4. 選擇 `Cindy1140303/studenttest` 儲存庫
5. 設定環境變數：
   - `MONGODB_URI`: 您的 MongoDB Atlas 連接字串
   - `PORT`: 3000
6. 點擊「Deploy」

## 步驟 3: 初始化資料庫資料

部署完成後，您需要執行一次種子資料腳本：

### 選項 1: 本地連接雲端資料庫
```bash
cd backend
# 修改 .env 中的 MONGODB_URI 為 Atlas 連接字串
npm run seed
```

### 選項 2: 使用 MongoDB Compass
1. 下載 MongoDB Compass
2. 連接到 MongoDB Atlas
3. 手動匯入測試資料

## 步驟 4: 更新前端 API 地址

取得 Vercel 部署的 URL（例如：https://your-project.vercel.app），然後更新前端：

```javascript
// 在 index.html 中修改
const API_BASE_URL = 'https://your-project.vercel.app/api';
```

## 步驟 5: 推送更新

```bash
git add .
git commit -m "Update API URL for Vercel deployment"
git push origin main
```

## 驗證部署

1. 訪問後端 API：`https://your-project.vercel.app/api/questions`
2. 應該會看到 JSON 格式的考題資料
3. 前端 GitHub Pages 現在應該能正常載入資料了

## 常見問題

### Q: Vercel 部署失敗
A: 檢查 `vercel.json` 配置和 `package.json` 中的依賴

### Q: 無法連接 MongoDB
A: 確認 MongoDB Atlas 網路設定允許所有 IP 存取（0.0.0.0/0）

### Q: 前端還是顯示錯誤
A: 檢查瀏覽器 Console，確認 API_BASE_URL 是否正確

## 完整架構

```
前端（GitHub Pages）
    ↓
後端 API（Vercel）
    ↓
MongoDB Atlas（雲端資料庫）
```
