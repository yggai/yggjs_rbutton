# 多主题系统使用指南

## 概述

YggJS按钮组件库提供了一个强大的多主题系统，支持科技风和极简风两种设计风格。本指南将详细介绍如何使用、配置和扩展这个多主题系统。

## 目录

- [快速开始](#快速开始)
- [主题系统架构](#主题系统架构)
- [科技风主题](#科技风主题)
- [极简主题](#极简主题)
- [主题切换](#主题切换)
- [自定义主题](#自定义主题)
- [性能优化](#性能优化)
- [最佳实践](#最佳实践)
- [API参考](#api参考)
- [故障排除](#故障排除)

## 快速开始

### 安装

```bash
npm install yggjs-rbutton
```

### 基本使用

```jsx
import React from 'react';
import { TechButton, MinimalButton } from 'yggjs-rbutton';

function App() {
  return (
    <div>
      {/* 科技风按钮 */}
      <TechButton variant="primary">
        科技风按钮
      </TechButton>
      
      {/* 极简按钮 */}
      <MinimalButton variant="primary">
        极简按钮
      </MinimalButton>
    </div>
  );
}
```

## 主题系统架构

### 设计原则

1. **统一接口**: 所有主题使用相同的API接口
2. **独立加载**: 支持按需加载特定主题
3. **类型安全**: 完整的TypeScript类型支持
4. **性能优先**: 优化的样式计算和缓存机制
5. **可扩展性**: 易于添加新主题和自定义配置

### 核心组件

```
src/
├── core/                    # 核心系统
│   ├── types/              # 类型定义
│   ├── theme-engine/       # 主题引擎
│   └── validation/         # 验证系统
├── themes/                 # 主题实现
│   ├── tech/              # 科技风主题
│   └── minimal/           # 极简主题
└── components/            # 通用组件
```

## 科技风主题

### 特点

- **视觉效果**: 渐变背景、发光效果、科幻感边框
- **颜色系统**: 以蓝色和紫色为主的科技色调
- **动画**: 流畅的悬停和点击动画效果
- **适用场景**: 科技产品、游戏界面、创新应用

### 基本使用

```jsx
import { TechButton } from 'yggjs-rbutton';

function TechInterface() {
  return (
    <div>
      <TechButton variant="primary">主要操作</TechButton>
      <TechButton variant="secondary">次要操作</TechButton>
      <TechButton variant="danger">危险操作</TechButton>
      <TechButton variant="success">成功操作</TechButton>
    </div>
  );
}
```

### 高级配置

```jsx
import { TechThemeProvider, useTechTheme } from 'yggjs-rbutton/tech';

function App() {
  const techConfig = {
    glowIntensity: 'high',
    animationSpeed: 'fast',
    colorScheme: 'cyberpunk',
    borderStyle: 'neon',
  };

  return (
    <TechThemeProvider config={techConfig}>
      <TechInterface />
    </TechThemeProvider>
  );
}

function TechInterface() {
  const { theme, setGlowIntensity } = useTechTheme();
  
  return (
    <div>
      <TechButton 
        variant="primary"
        size="large"
        glow={theme.glowIntensity}
        onClick={() => setGlowIntensity('ultra')}
      >
        超级按钮
      </TechButton>
    </div>
  );
}
```

## 极简主题

### 特点

- **设计理念**: 简洁、清晰、无多余装饰
- **颜色系统**: 灰度为主的温和色调
- **交互**: 微妙的状态变化和反馈
- **适用场景**: 商务应用、文档工具、专业软件

### 基本使用

```jsx
import { MinimalButton } from 'yggjs-rbutton';

function MinimalInterface() {
  return (
    <div>
      <MinimalButton variant="primary">主要操作</MinimalButton>
      <MinimalButton variant="secondary" fill="outline">
        次要操作
      </MinimalButton>
      <MinimalButton variant="ghost" size="small">
        辅助操作
      </MinimalButton>
    </div>
  );
}
```

### 高级配置

```jsx
import { MinimalThemeProvider, useMinimalTheme } from 'yggjs-rbutton/minimal';

function App() {
  const minimalConfig = {
    colorMode: 'light',
    borderRadius: 'medium',
    fontWeight: 'normal',
    shadows: 'subtle',
  };

  return (
    <MinimalThemeProvider config={minimalConfig}>
      <MinimalInterface />
    </MinimalThemeProvider>
  );
}

function MinimalInterface() {
  const { theme, toggleColorMode } = useMinimalTheme();
  
  return (
    <div>
      <MinimalButton 
        variant="primary"
        onClick={toggleColorMode}
      >
        切换{theme.colorMode === 'light' ? '深色' : '浅色'}模式
      </MinimalButton>
    </div>
  );
}
```

## 主题切换

### 动态主题切换

```jsx
import { useState } from 'react';
import { TechButton, MinimalButton } from 'yggjs-rbutton';

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('tech');

  const ButtonComponent = currentTheme === 'tech' ? TechButton : MinimalButton;

  return (
    <div>
      <div>
        <button onClick={() => setCurrentTheme('tech')}>科技风</button>
        <button onClick={() => setCurrentTheme('minimal')}>极简风</button>
      </div>
      
      <ButtonComponent variant="primary">
        当前主题按钮
      </ButtonComponent>
    </div>
  );
}
```

### 主题预览组件

```jsx
import { ThemePreview } from 'yggjs-rbutton';

function ThemeSelector() {
  return (
    <ThemePreview
      themes={['tech', 'minimal']}
      onThemeChange={(theme) => console.log('选择主题:', theme)}
      showVariants={['primary', 'secondary', 'danger']}
    />
  );
}
```

## 自定义主题

### 创建新主题

```typescript
import { createTheme, BaseButtonProps } from 'yggjs-rbutton/core';

// 定义主题配置
const customTheme = createTheme({
  name: 'custom',
  colors: {
    primary: {
      500: '#6366f1',
      600: '#5b21b6',
      700: '#4c1d95',
    },
    secondary: {
      500: '#64748b',
      600: '#475569',
      700: '#334155',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  animation: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
});

// 实现按钮组件
export const CustomButton: React.FC<BaseButtonProps> = (props) => {
  const styles = useCustomTheme(props);
  
  return (
    <button css={styles} {...props}>
      {props.children}
    </button>
  );
};
```

### 扩展现有主题

```typescript
import { extendTheme, techTheme } from 'yggjs-rbutton/core';

const extendedTechTheme = extendTheme(techTheme, {
  colors: {
    primary: {
      // 覆盖原有的主色调
      500: '#00ff88',
      600: '#00cc6a',
      700: '#00994d',
    },
    // 添加新颜色
    neon: {
      500: '#ff0080',
      600: '#cc0066',
      700: '#99004d',
    },
  },
  // 添加新的样式变体
  variants: {
    neon: {
      backgroundColor: 'neon.500',
      color: 'white',
      border: '2px solid transparent',
      boxShadow: '0 0 20px neon.500',
      '&:hover': {
        backgroundColor: 'neon.600',
        boxShadow: '0 0 30px neon.600',
      },
    },
  },
});
```

## 性能优化

### 样式缓存

```jsx
import { StyleCacheProvider } from 'yggjs-rbutton/core';

function App() {
  return (
    <StyleCacheProvider 
      cacheSize={100} 
      enableDevTools={process.env.NODE_ENV === 'development'}
    >
      <YourApp />
    </StyleCacheProvider>
  );
}
```

### 按需加载

```jsx
// 动态导入特定主题
const loadTechTheme = () => import('yggjs-rbutton/tech');
const loadMinimalTheme = () => import('yggjs-rbutton/minimal');

function ThemeLoader({ themeName, children }) {
  const [Theme, setTheme] = useState(null);

  useEffect(() => {
    const loadTheme = themeName === 'tech' ? loadTechTheme : loadMinimalTheme;
    
    loadTheme().then((module) => {
      setTheme(() => module.default);
    });
  }, [themeName]);

  if (!Theme) return <div>加载中...</div>;

  return <Theme>{children}</Theme>;
}
```

### Bundle优化

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 将主题相关代码分离成独立的chunk
        themes: {
          test: /[\\/]themes[\\/]/,
          name: 'themes',
          chunks: 'all',
        },
      },
    },
  },
};
```

## 最佳实践

### 1. 组件命名规范

```jsx
// ✅ 推荐：清晰的主题前缀
import { TechButton, MinimalButton } from 'yggjs-rbutton';

// ❌ 避免：通用命名可能导致冲突
import { Button } from 'yggjs-rbutton';
```

### 2. 类型安全

```typescript
import type { TechButtonProps, MinimalButtonProps } from 'yggjs-rbutton';

interface AppButtonProps {
  theme: 'tech' | 'minimal';
  variant: TechButtonProps['variant'] | MinimalButtonProps['variant'];
}

const AppButton: React.FC<AppButtonProps> = ({ theme, ...props }) => {
  if (theme === 'tech') {
    return <TechButton {...props as TechButtonProps} />;
  }
  return <MinimalButton {...props as MinimalButtonProps} />;
};
```

### 3. 性能监控

```jsx
import { usePerformanceMonitor } from 'yggjs-rbutton/core';

function ButtonWithMonitoring(props) {
  const { measureRender } = usePerformanceMonitor();

  return measureRender(
    'button-render',
    <TechButton {...props} />,
    {
      threshold: 16, // 16ms (60fps)
      onSlowRender: (duration) => {
        console.warn('按钮渲染较慢:', duration, 'ms');
      },
    }
  );
}
```

### 4. 错误边界

```jsx
import { ThemeErrorBoundary } from 'yggjs-rbutton/core';

function App() {
  return (
    <ThemeErrorBoundary 
      fallback={<button>按钮加载失败</button>}
      onError={(error, errorInfo) => {
        console.error('主题错误:', error, errorInfo);
      }}
    >
      <TechButton>科技按钮</TechButton>
    </ThemeErrorBoundary>
  );
}
```

## API参考

### 通用Button属性

```typescript
interface BaseButtonProps {
  /** 按钮变体 */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  
  /** 按钮大小 */
  size?: 'small' | 'medium' | 'large';
  
  /** 填充样式 */
  fill?: 'solid' | 'outline' | 'ghost';
  
  /** 按钮形状 */
  shape?: 'square' | 'round' | 'pill';
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 是否显示加载状态 */
  loading?: boolean;
  
  /** 加载状态文本 */
  loadingText?: string;
  
  /** 按钮图标 */
  icon?: React.ReactNode;
  
  /** 图标位置 */
  iconPosition?: 'left' | 'right';
  
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 子元素 */
  children?: React.ReactNode;
  
  /** 自定义样式类名 */
  className?: string;
  
  /** 内联样式 */
  style?: React.CSSProperties;
  
  /** HTML属性 */
  [key: string]: any;
}
```

### TechButton特有属性

```typescript
interface TechButtonProps extends BaseButtonProps {
  /** 发光强度 */
  glow?: 'none' | 'low' | 'medium' | 'high' | 'ultra';
  
  /** 边框样式 */
  borderStyle?: 'solid' | 'neon' | 'pulse' | 'gradient';
  
  /** 动画类型 */
  animation?: 'none' | 'glow' | 'pulse' | 'matrix' | 'cyberpunk';
  
  /** 粒子效果 */
  particles?: boolean;
  
  /** 音效 */
  sound?: 'none' | 'click' | 'hover' | 'futuristic';
}
```

### MinimalButton特有属性

```typescript
interface MinimalButtonProps extends BaseButtonProps {
  /** 色彩模式 */
  colorMode?: 'light' | 'dark' | 'auto';
  
  /** 文字重量 */
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold';
  
  /** 边框半径 */
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  
  /** 阴影样式 */
  shadow?: 'none' | 'subtle' | 'soft' | 'medium';
}
```

### 主题Provider属性

```typescript
interface ThemeProviderProps {
  /** 主题配置 */
  config?: ThemeConfig;
  
  /** 是否启用样式缓存 */
  enableCache?: boolean;
  
  /** 缓存大小限制 */
  cacheSize?: number;
  
  /** 是否启用开发者工具 */
  enableDevTools?: boolean;
  
  /** 子组件 */
  children: React.ReactNode;
}
```

## 故障排除

### 常见问题

#### 1. 样式不生效

**问题**: 按钮样式没有正确应用

**解决方案**:
```jsx
// 确保主题Provider正确包裹
import { TechThemeProvider } from 'yggjs-rbutton/tech';

function App() {
  return (
    <TechThemeProvider>
      <TechButton variant="primary">按钮</TechButton>
    </TechThemeProvider>
  );
}
```

#### 2. TypeScript类型错误

**问题**: TypeScript报告类型不匹配

**解决方案**:
```typescript
// 确保导入正确的类型
import type { TechButtonProps } from 'yggjs-rbutton';

const MyButton: React.FC<TechButtonProps> = (props) => {
  return <TechButton {...props} />;
};
```

#### 3. 性能问题

**问题**: 按钮渲染较慢或内存占用高

**解决方案**:
```jsx
// 启用样式缓存
import { StyleCacheProvider } from 'yggjs-rbutton/core';

function App() {
  return (
    <StyleCacheProvider cacheSize={50}>
      {/* 你的应用 */}
    </StyleCacheProvider>
  );
}

// 使用React.memo优化
const OptimizedButton = React.memo(TechButton);
```

#### 4. 主题切换闪烁

**问题**: 主题切换时出现样式闪烁

**解决方案**:
```jsx
// 预加载主题样式
import { preloadTheme } from 'yggjs-rbutton/core';

function App() {
  useEffect(() => {
    preloadTheme('tech');
    preloadTheme('minimal');
  }, []);

  // 使用平滑过渡
  return (
    <div style={{ transition: 'all 0.3s ease' }}>
      {/* 你的内容 */}
    </div>
  );
}
```

### 调试工具

```jsx
import { ThemeDevTools } from 'yggjs-rbutton/core';

function App() {
  return (
    <>
      <YourApp />
      {process.env.NODE_ENV === 'development' && <ThemeDevTools />}
    </>
  );
}
```

### 支持和反馈

- **GitHub Issues**: [https://github.com/yggjs/yggjs-rbutton/issues](https://github.com/yggjs/yggjs-rbutton/issues)
- **文档**: [https://yggjs.github.io/yggjs-rbutton](https://yggjs.github.io/yggjs-rbutton)
- **示例**: [https://github.com/yggjs/yggjs-rbutton/examples](https://github.com/yggjs/yggjs-rbutton/examples)

---

**版本**: 1.0.0  
**最后更新**: 2024年  
**维护者**: YggJS Team