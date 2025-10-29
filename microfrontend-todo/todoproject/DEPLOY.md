# 📦 Hướng dẫn Deploy

## 🚀 Deploy lên Vercel

### Bước 1: Chuẩn bị

```bash
npm run build
```

### Bước 2: Deploy

1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Click **Add New Project**
4. Import repository này
5. Vercel sẽ tự động detect Vite config
6. Click **Deploy**

### Bước 3: Cấu hình (nếu cần)

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## 🌐 Deploy lên Netlify

### Bước 1: Chuẩn bị

Tạo file `netlify.toml` (đã có sẵn trong project):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Bước 2: Deploy

1. Truy cập [netlify.com](https://netlify.com)
2. Đăng nhập bằng GitHub
3. Click **Add new site** → **Import an existing project**
4. Chọn repository
5. Netlify sẽ tự động detect config từ `netlify.toml`
6. Click **Deploy site**

---

## ⚠️ Lưu ý quan trọng về json-server

**json-server chỉ chạy được ở local development!**

Khi deploy production, bạn có 2 lựa chọn:

### Option 1: Chuyển về localStorage (đơn giản nhất)

Trong `src/hooks/useTodosQuery.js`, comment phần API và uncomment localStorage logic:

```javascript
// Comment phần fetch API
// const { data: todos = [] } = useQuery({ ... });

// Uncomment phần localStorage
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
});
```

### Option 2: Sử dụng backend thật

Các backend miễn phí bạn có thể dùng:

1. **My JSON Server** (GitHub-based)
   - Tạo repo với file `db.json`
   - URL: `https://my-json-server.typicode.com/<username>/<repo>`

2. **JSONPlaceholder** (demo only)
   - URL: `https://jsonplaceholder.typicode.com`
   - Chỉ mock response, không lưu thật

3. **Supabase** (PostgreSQL miễn phí)
   - [supabase.com](https://supabase.com)
   - REST API tự động

4. **Firebase** (NoSQL miễn phí)
   - [firebase.google.com](https://firebase.google.com)
   - Realtime Database hoặc Firestore

5. **Railway** / **Render** (host Node.js app)
   - Deploy json-server như một service riêng
   - Miễn phí với giới hạn

### Option 3: Tách json-server thành service riêng

Deploy json-server lên **Railway** hoặc **Render**:

1. Tạo repo riêng với `db.json` và `package.json`:

```json
{
  "name": "todos-api",
  "scripts": {
    "start": "json-server --watch db.json --port $PORT --host 0.0.0.0"
  },
  "dependencies": {
    "json-server": "^1.0.0-beta.3"
  }
}
```

2. Deploy lên Railway/Render
3. Update `API_URL` trong `useTodosQuery.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

4. Thêm env variable `VITE_API_URL` trong Vercel/Netlify settings

---

## 🔧 Environment Variables

Nếu cần dùng API URL khác cho production:

### Vercel
1. Settings → Environment Variables
2. Thêm `VITE_API_URL` = `https://your-api.com`

### Netlify
1. Site settings → Build & deploy → Environment
2. Thêm `VITE_API_URL` = `https://your-api.com`

---

## ✅ Checklist trước khi deploy

- [ ] `npm run build` chạy thành công
- [ ] Dark mode hoạt động
- [ ] Routing hoạt động (React Router)
- [ ] API hoặc localStorage đã setup đúng
- [ ] Tailwind CSS classes hiển thị đầy đủ
- [ ] Toast notifications hoạt động
- [ ] Delete modal hiển thị đúng
- [ ] Animations mượt mà

---

## 🎯 Khuyến nghị

Cho project demo/portfolio này, mình khuyên dùng **Option 1 (localStorage)** vì:

✅ Đơn giản nhất  
✅ Không cần backend  
✅ Hoạt động offline  
✅ Không giới hạn request  

Nếu muốn showcase khả năng làm việc với API, dùng **Option 3 (Railway/Render + json-server)**.

---

## 📚 Tài liệu tham khảo

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [My JSON Server](https://my-json-server.typicode.com)
