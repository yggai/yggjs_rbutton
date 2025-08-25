/**
 * 应用程序入口文件
 * 初始化React应用并挂载到DOM
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// 获取根DOM节点
const container = document.getElementById('root');

if (!container) {
  throw new Error('无法找到根DOM节点！请确保HTML文件中存在id为"root"的元素。');
}

// 创建React根节点并渲染应用
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);