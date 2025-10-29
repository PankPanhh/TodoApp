# Microfrontend Todo - Angular + React

Dự án microfrontend kết hợp Angular 15 container và React 18 microfrontend.

## 🏗️ Kiến trúc

- **Container Angular** (Port 4200): Ứng dụng chủ sử dụng Angular 15
- **React Microfrontend** (Port 3001): Todo app sử dụng React 18
- **Module Federation**: Webpack Module Federation để tích hợp

## 🚀 Cách chạy

### Tự động (Khuyến nghị)
```bash
# Chạy file batch để start cả hai ứng dụng
.\start-microfrontend.bat
```

### Thủ công

1. **Chạy React Microfrontend trước:**
```bash
cd todoproject
npm install
npm run dev
```
React app sẽ chạy tại: http://localhost:3001

2. **Chạy Angular Container:**
```bash
cd container-angular
npm install
npm start
```
Angular app sẽ chạy tại: http://localhost:4200

## 📱 Cách sử dụng

1. Mở http://localhost:4200
2. Nhấp "React Todo" để xem React microfrontend
3. Hoặc truy cập trực tiếp: http://localhost:4200/react-todo

## 🔧 Cấu hình quan trọng

### webpack.config.js (Angular)
```javascript
remotes: {
  todoproject: "todoproject@http://localhost:3001/remoteEntry.js",
}
```

### vite.config.js (React)
```javascript
federation({
  name: 'todoproject',
  filename: 'remoteEntry.js',
  exposes: {
    './TodoApp': './src/App.jsx',
  }
})
```

## 🐛 Xử lý lỗi

### Lỗi thường gặp:

1. **"Failed to load React Todo App"**
   - Đảm bảo React app đang chạy trên port 3001
   - Kiểm tra console để xem chi tiết lỗi

2. **Module Federation errors**
   - Xóa node_modules và cài lại: `rm -rf node_modules && npm install`
   - Đảm bảo cả hai app đều đang chạy

3. **CORS errors**
   - React app đã được cấu hình CORS, nhưng kiểm tra browser console

### Debug steps:

1. Kiểm tra http://localhost:3001 - React app phải load được
2. Kiểm tra http://localhost:3001/remoteEntry.js - file này phải tồn tại
3. Xem Angular console để biết chi tiết lỗi

## 📚 Cấu trúc thư mục

```
microfrontend-todo/
├── container-angular/          # Angular 15 container
│   ├── src/app/
│   │   ├── react-wrapper/     # Component wrapper cho React
│   │   ├── home/              # Trang chủ
│   │   └── ...
│   ├── webpack.config.js      # Module Federation config
│   └── package.json
├── todoproject/               # React 18 microfrontend
│   ├── src/
│   │   ├── App.jsx           # Main React app
│   │   ├── bootstrap.jsx     # Microfrontend bootstrap
│   │   └── ...
│   ├── vite.config.js        # Vite + Module Federation
│   └── package.json
└── start-microfrontend.bat   # Script để chạy cả hai
```

## 🔥 Features

- ✅ Angular 15 + React 18
- ✅ Module Federation với Webpack + Vite
- ✅ Standalone React app (có thể chạy độc lập)
- ✅ Runtime integration (không cần build trước)
- ✅ Error handling và fallback UI
- ✅ CORS đã được cấu hình
- ✅ Navigation giữa Angular và React

## 🛠️ Tech Stack

**Angular Container:**
- Angular 15
- Webpack 5 + Module Federation
- ngx-build-plus
- TypeScript 4.9

**React Microfrontend:**
- React 18
- Vite 7
- @originjs/vite-plugin-federation
- React Router 7
- Tailwind CSS
- React Query

## 📝 Notes

- React app có thể chạy standalone tại http://localhost:3001
- Angular container sẽ fallback về error message nếu React app không available
- Cả hai app đều có hot reload trong development
- Production build cần adjust URL trong webpack config