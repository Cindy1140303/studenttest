# Vercel 部署步驟

## 問題原因
404 錯誤是因為 Vercel 配置路徑不正確。已修正。

## 修正內容
1. ✅ 更新 `vercel.json` 路由配置
2. ✅ 在根目錄新增 `package.json`（Vercel 需要）
3. ✅ 新增 `.vercelignore` 排除不必要的檔案

## 部署步驟

### 方法一：使用 Vercel CLI（推薦）

```powershell
# 1. 安裝 Vercel CLI（如果還沒安裝）
npm install -g vercel

# 2. 登入 Vercel
vercel login

# 3. 在專案根目錄執行部署
cd c:\Users\love3\Downloads\testmanerge
vercel

# 4. 按照提示操作：
#    - Set up and deploy? Y
#    - Which scope? 選擇你的帳號
#    - Link to existing project? N
#    - What's your project's name? studenttest-api
#    - In which directory is your code located? ./
#    - Want to override the settings? N

# 5. 部署到正式環境
vercel --prod
```

### 方法二：使用 Vercel 網頁介面

1. 前往 https://vercel.com
2. 登入後點擊 "Add New" → "Project"
3. 選擇你的 GitHub 倉庫 `Cindy1140303/studenttest`
4. **重要設定：**
   - Framework Preset: `Other`
   - Root Directory: `./`（保持預設）
   - Build Command: 留空
   - Output Directory: 留空
   - Install Command: `npm install`

5. **環境變數設定（非常重要！）：**
   點擊 "Environment Variables" 新增：
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://<你的帳號>:<你的密碼>@cluster0.hmvmdjp.mongodb.net/exam_management?retryWrites=true&w=majority&appName=Cluster0
   ```
   **記得替換 `<你的帳號>` 和 `<你的密碼>`**

6. 點擊 "Deploy"

## 部署後設定

### 1. 取得 Vercel URL
部署成功後，你會得到一個 URL，例如：
```
https://studenttest-api.vercel.app
```

### 2. 更新前端 API 位址
修改 `index.html` 第 395 行左右：

```javascript
// 原本
const API_BASE_URL = 'http://localhost:3000/api';

// 改為（請替換為你的實際 URL）
const API_BASE_URL = 'https://studenttest-api.vercel.app/api';
```

### 3. 推送前端更新
```powershell
git add index.html
git commit -m "更新 API 位址為 Vercel URL"
git push origin main
```

### 4. 測試 API
在瀏覽器開啟：
```
https://你的vercel網址.vercel.app/
https://你的vercel網址.vercel.app/api/questions
```

應該看到 JSON 回應。

## 常見問題

### Q: 仍然出現 404
**A:** 檢查以下項目：
1. Vercel 專案設定中的 Root Directory 是否為 `./`
2. `vercel.json` 是否在根目錄
3. `package.json` 是否在根目錄
4. 重新部署：`vercel --prod`

### Q: 資料庫連線失敗
**A:** 
1. 確認 Vercel 環境變數 `MONGODB_URI` 已正確設定
2. 檢查 MongoDB Atlas 是否允許 Vercel IP（建議設為 0.0.0.0/0）
3. 確認帳號密碼正確（特殊字元需要 URL encode）

### Q: CORS 錯誤
**A:** 
`backend/server.js` 已設定 CORS，應該不會有問題。如果還有錯誤，可以明確設定允許的來源：
```javascript
app.use(cors({
  origin: 'https://cindy1140303.github.io'
}));
```

## 檢查清單

- [ ] Vercel 已部署成功
- [ ] 環境變數 MONGODB_URI 已設定
- [ ] 可以訪問 `https://你的vercel網址.vercel.app/`
- [ ] 可以訪問 `https://你的vercel網址.vercel.app/api/questions`
- [ ] 前端 index.html 的 API_BASE_URL 已更新
- [ ] GitHub Pages 可以正常顯示資料
