import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

/**
 * Vite 构建配置 - 用于打包 React 组件库
 * 
 * 优化特性：
 * - 支持多种输出格式 (ES, UMD, CJS) - 提供最佳兼容性
 * - 按需导入支持 - 通过 preserveModules 保持模块结构
 * - Tree-shaking 优化 - 移除未使用代码，减少包体积
 * - CSS-in-JS 处理 - 零配置样式注入
 * - 外部化依赖 - 减少重复打包，提升加载性能
 * - 代码分割 - 支持动态导入和懒加载
 * - 压缩优化 - Terser 深度优化，最小化输出
 */
export default defineConfig({
  plugins: [
    react({
      // 优化 React 编译，减少运行时代码
      jsxRuntime: 'automatic',
      // 启用快速刷新（开发环境）
      fastRefresh: process.env.NODE_ENV !== 'production',
    }),
    cssInjectedByJs({
      // 将 CSS 注入到 JS 中，减少额外请求
      injectCode: (cssCode) => `
        try {
          if (typeof document !== 'undefined') {
            const elementStyle = document.createElement('style');
            const styleText = document.createTextNode(${cssCode});
            elementStyle.appendChild(styleText);
            document.head.appendChild(elementStyle);
          }
        } catch(e) {
          console.error('vite-plugin-css-injected-by-js', e);
        }
      `,
    }),
  ],
  
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'YggJSRButton',
      fileName: (format) => {
        const formatMap = {
          es: 'esm',
          cjs: 'cjs'
        };
        return `index.${formatMap[format]}.js`;
      }
    },
    
    rollupOptions: {
      // 外部化依赖，减少包体积 - 避免重复打包 React
      external: ['react', 'react-dom', 'react/jsx-runtime', 'prop-types'],
      
      output: [
        // ES Module 输出 - 支持 Tree Shaking 和按需导入
        {
          format: 'es',
          preserveModules: true, // 保持模块结构，支持按需导入
          preserveModulesRoot: 'src',
          dir: 'dist',
          entryFileNames: '[name].esm.js',
          exports: 'named',
        },
        // CommonJS 输出 - Node.js 兼容
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src', 
          dir: 'dist',
          entryFileNames: '[name].cjs.js',
          exports: 'named',
        }
      ],
      
      // Rollup 高级优化配置
      treeshake: {
        // 启用激进的 Tree Shaking
        moduleSideEffects: (id) => {
          // CSS 文件有副作用，不能被 tree-shake
          return id.includes('.css') || id.includes('styles');
        },
        propertyReadSideEffects: false, // 属性读取无副作用
        tryCatchDeoptimization: false, // 禁用 try-catch 去优化
        unknownGlobalSideEffects: false, // 全局变量访问无副作用
      },
    },
    
    // 构建优化配置（简化版）
    target: 'es2020', // 现代浏览器支持
    minify: 'terser', // 使用 terser 进行代码压缩
    terserOptions: {
      compress: {
        // 基础压缩选项
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        dead_code: true,
      },
      mangle: {
        // 变量名混淆（保守配置）
        properties: false, // 不混淆属性名
      },
      format: {
        comments: false, // 移除注释
      }
    },
    
    // 输出配置（简化版）
    outDir: 'dist',
    emptyOutDir: true, // 构建前清空输出目录
    sourcemap: false, // 禁用源码映射加快构建
    
    // 构建性能优化
    chunkSizeWarningLimit: 50, // 50KB 警告阈值
    reportCompressedSize: false, // 禁用压缩大小报告加快构建
  },
  
  // 依赖预构建（简化版）
  optimizeDeps: {
    exclude: ['react', 'react-dom', 'prop-types'], // 排除外部化的依赖
  },
  
  // 模块解析配置（简化版）
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  
  // 日志级别
  logLevel: 'info',
});

