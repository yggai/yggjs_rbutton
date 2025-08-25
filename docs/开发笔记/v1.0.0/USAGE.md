# YggJS RButton - 使用指南

## 按需导入优化

### 完整导入（不推荐 - 包体积大）
```javascript
import { TechButton } from 'yggjs_rbutton';
```

### 按需导入（推荐 - 包体积小）
```javascript
// 仅导入科技风按钮组件 - 约20KB
import { TechButton } from 'yggjs_rbutton/tech';

// 或者更细粒度的导入 - 约8KB
import { techTheme, getTechButtonStyles } from 'yggjs_rbutton/tech/styles';
import type { TechButtonProps } from 'yggjs_rbutton/tech/types';
```

### 模块化导入支持
```javascript
// ES Module (推荐)
import { TechButton } from 'yggjs_rbutton/tech';

// CommonJS (Node.js)
const { TechButton } = require('yggjs_rbutton/tech');
```

## 包体积对比

| 导入方式 | ES Module | CommonJS | UMD |
|---------|-----------|----------|-----|
| 完整导入 | ~25KB | ~28KB | ~30KB |
| 按需导入 | ~20KB | ~15KB | - |
| 仅样式 | ~8KB | ~7KB | - |

## Tree Shaking 支持

本组件库完全支持 Tree Shaking，未使用的代码会被自动移除：

```javascript
// 只会打包 TechButton 相关代码
import { TechButton } from 'yggjs_rbutton';

// 不会打包 TechButton，只打包样式工具
import { techTheme } from 'yggjs_rbutton/tech/styles';
```

## 构建优化特性

✅ **ES2020+ 目标** - 现代浏览器优化  
✅ **Terser 压缩** - 最小化包体积  
✅ **模块保持** - 支持按需导入  
✅ **外部化依赖** - React 不重复打包  
✅ **副作用标记** - 精确的 Tree Shaking  
✅ **类型定义** - 完整 TypeScript 支持  