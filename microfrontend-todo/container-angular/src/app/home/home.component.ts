import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div style="padding: 2rem; text-align: center;">
      <h1 style="color:#1e40af;">Angular Container 🧱</h1>
      <p style="font-size: 1.2rem; margin: 2rem 0;">Chào mừng đến với ứng dụng Microfrontend!</p>
      <p>Ứng dụng này chứa React Todo App như một microfrontend.</p>

      <div style="margin: 2rem 0;">
        <button
          routerLink="/react-todo"
          style="padding:15px 30px; background:#2563eb; color:white; border:none; border-radius:8px; font-size: 1.1rem; cursor: pointer;">
          🚀 Mở React Todo App
        </button>
      </div>

      <div style="margin-top: 3rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
        <h3>Thông tin kỹ thuật:</h3>
        <ul style="list-style: none; padding: 0;">
          <li>📦 Angular 15 Container</li>
          <li>⚛️ React 18 Microfrontend</li>
          <li>🔧 Module Federation</li>
          <li>🎯 Vite + Webpack</li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
