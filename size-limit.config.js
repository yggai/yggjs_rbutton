/**
 * Size Limit 配置 - 监控包体积
 * 
 * 帮助确保组件库保持轻量化，防止意外的包体积增长
 * 支持不同导入方式的体积检查
 * 
 * @see https://github.com/ai/size-limit
 */
module.exports = [
  // 完整导入 - 所有组件
  {
    name: '完整导入 (ES Module)',
    path: 'dist/index.esm.js',
    limit: '25 KB', // 主包限制在 25KB 以内
    gzip: true,
    running: false, // 不运行代码，仅检查大小
  },
  
  // UMD 版本 - 浏览器直接使用
  {
    name: 'UMD 版本 (浏览器)',
    path: 'dist/index.umd.js', 
    limit: '30 KB', // UMD 格式稍大一些
    gzip: true,
    running: false,
  },
  
  // 按需导入 - 仅科技风按钮
  {
    name: '按需导入 - 科技风按钮',
    path: 'dist/tech/index.esm.js',
    limit: '20 KB', // 单个组件应该更小
    gzip: true,
    running: false,
  },
  
  // 样式文件独立检查
  {
    name: '样式系统',
    path: 'dist/tech/styles.esm.js',
    limit: '8 KB', // 样式文件限制
    gzip: true,
    running: false,
  },
  
  // 类型定义文件
  {
    name: '类型定义',
    path: 'dist/tech/types.esm.js',
    limit: '2 KB', // 类型文件应该很小
    gzip: true,
    running: false,
  },
  
  // CommonJS 版本检查
  {
    name: 'CommonJS 版本',
    path: 'dist/index.cjs.js',
    limit: '28 KB',
    gzip: true,
    running: false,
  },
];