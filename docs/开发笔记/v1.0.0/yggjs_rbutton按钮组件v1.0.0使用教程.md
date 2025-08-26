# YggJS RButton 按钮组件 v1.0.0 使用教程

> 专为React打造的现代化多主题按钮组件库

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1+-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-007ACC.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

---

## 📋 目录

- [简介](#-简介)
- [核心特性](#-核心特性)
- [快速开始](#-快速开始)
- [安装指南](#-安装指南)
- [基础使用](#-基础使用)
- [主题系统](#-主题系统)
- [高级功能](#-高级功能)
- [API 参考](#-api-参考)
- [最佳实践](#-最佳实践)
- [性能优化](#-性能优化)
- [故障排除](#-故障排除)
- [总结](#-总结)

---

## 🚀 简介

YggJS RButton 是一个专门为 React 应用程序设计的高性能按钮组件库。它提供了两套完整的设计主题：**科技风主题**和**极简主题**，满足不同项目的设计需求。

### 设计理念

- **🎨 双主题设计**：科技风主题展现现代感和科技感，极简主题追求纯净简洁的美学
- **⚡ 高性能**：基于 CSS-in-JS 的动态样式系统，支持主题热切换
- **🔧 TypeScript 原生支持**：完整的类型定义，提供最佳的开发体验
- **♿ 可访问性优先**：遵循 WCAG 2.1 标准，支持键盘导航和屏幕阅读器
- **📱 响应式设计**：完美适配各种屏幕尺寸和设备类型

---

## ✨ 核心特性

### 🎯 多主题支持
- **科技风主题**：蓝色基调、霓虹发光效果、科技感边框
- **极简主题**：灰度色彩、微妙阴影、优雅过渡动画

### 🎨 丰富的样式配置
- **5种颜色变体**：primary、secondary、success、danger、warning
- **3种尺寸规格**：small、medium、large
- **4种填充模式**：solid、outline、ghost、link
- **4种形状样式**：default、rounded、circle、square

### ⚡ 状态管理
- **交互状态**：normal、hover、active、focus、disabled
- **加载状态**：支持异步操作的加载指示器
- **自定义状态**：可扩展的状态系统

### 🔧 开发者体验
- **TypeScript 支持**：完整的类型定义和 IntelliSense
- **Tree Shaking**：按需导入，减小打包体积
- **热模块替换**：开发时支持样式热更新

---

## 🏁 快速开始

### 30秒快速体验

```tsx
import React from 'react';
import { TechButton } from 'yggjs_rbutton';

function App() {
  return (
    <div>
      <TechButton variant="primary" size="medium">
        点击我
      </TechButton>
    </div>
  );
}

export default App;
```

---

## 📦 安装指南

### NPM 安装

```bash
npm install yggjs_rbutton
```

### Yarn 安装

```bash
yarn add yggjs_rbutton
```

### 依赖要求

```json
{
  "peerDependencies": {
    "react": "^19.1.1"
  }
}
```

### TypeScript 配置

如果您使用 TypeScript，请确保在 `tsconfig.json` 中包含以下配置：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

---

## 🎯 基础使用

### 导入方式

#### 完整导入

```tsx
import { TechButton, MinimalButton } from 'yggjs_rbutton';
```

#### 按需导入（推荐）

```tsx
// 导入科技风主题
import { TechButton } from 'yggjs_rbutton/tech';

// 导入极简主题
import { MinimalButton } from 'yggjs_rbutton/minimal';
```

### 基础示例

#### 科技风按钮

```tsx
import React from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

export default function BasicExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
      {/* 基础按钮 */}
      <TechButton>默认按钮</TechButton>
      
      {/* 不同变体 */}
      <TechButton variant="primary">主要按钮</TechButton>
      <TechButton variant="secondary">次要按钮</TechButton>
      <TechButton variant="success">成功按钮</TechButton>
      <TechButton variant="danger">危险按钮</TechButton>
      
      {/* 不同尺寸 */}
      <TechButton size="small">小按钮</TechButton>
      <TechButton size="medium">中等按钮</TechButton>
      <TechButton size="large">大按钮</TechButton>
    </div>
  );
}
```

#### 极简主题按钮

```tsx
import React from 'react';
import { MinimalButton } from 'yggjs_rbutton/minimal';

export default function MinimalExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
      {/* 极简风格按钮 */}
      <MinimalButton variant="primary">极简主要</MinimalButton>
      <MinimalButton variant="outline">轮廓按钮</MinimalButton>
      <MinimalButton variant="ghost">幽灵按钮</MinimalButton>
    </div>
  );
}
```

### 事件处理

```tsx
import React, { useState } from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

export default function InteractiveExample() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleAsyncClick = async () => {
    setLoading(true);
    try {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <TechButton
        variant="primary"
        loading={loading}
        disabled={loading}
        onClick={handleAsyncClick}
      >
        {loading ? '处理中...' : `点击次数: ${count}`}
      </TechButton>
    </div>
  );
}
```

---

## 🎨 主题系统

### 主题对比

| 特性 | 科技风主题 | 极简主题 |
|------|-----------|----------|
| **色彩基调** | 蓝色科技感 | 灰度纯净感 |
| **视觉效果** | 霓虹发光、渐变 | 微妙阴影、简洁 |
| **动画风格** | 动感、科技感 | 温和、优雅 |
| **使用场景** | 科技产品、游戏、创新应用 | 商务应用、内容平台、工具软件 |

### 科技风主题特性

```tsx
import React from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

export default function TechThemeDemo() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#0a0a0a' }}>
      {/* 霓虹发光效果 */}
      <TechButton variant="primary" glow>
        霓虹发光按钮
      </TechButton>
      
      {/* 渐变背景 */}
      <TechButton variant="primary" gradient>
        渐变背景按钮
      </TechButton>
      
      {/* 全宽按钮 */}
      <TechButton variant="primary" fullWidth>
        全宽度按钮
      </TechButton>
      
      {/* 自定义颜色 */}
      <TechButton 
        variant="primary" 
        customColors={{
          primary: '#ff6b35',
          primaryHover: '#ff8c42'
        }}
      >
        自定义颜色
      </TechButton>
    </div>
  );
}
```

### 极简主题特性

```tsx
import React from 'react';
import { MinimalButton } from 'yggjs_rbutton/minimal';

export default function MinimalThemeDemo() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fafafa' }}>
      {/* 纯净模式 */}
      <MinimalButton 
        variant="primary"
        minimalConfig={{ pureMode: true }}
      >
        纯净模式
      </MinimalButton>
      
      {/* 内容优先 */}
      <MinimalButton 
        variant="outline"
        minimalConfig={{ contentFirst: true }}
      >
        内容优先
      </MinimalButton>
      
      {/* 呼吸空间优化 */}
      <MinimalButton 
        variant="ghost"
        minimalConfig={{ breathingSpace: true }}
      >
        呼吸空间优化
      </MinimalButton>
    </div>
  );
}
```

### 深色模式支持

```tsx
import React, { useState } from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

export default function DarkModeExample() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div 
      style={{ 
        padding: '20px',
        backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        minHeight: '200px',
        transition: 'all 0.3s ease'
      }}
    >
      <TechButton 
        variant="secondary" 
        onClick={() => setDarkMode(!darkMode)}
      >
        切换 {darkMode ? '浅色' : '深色'} 模式
      </TechButton>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
        <TechButton variant="primary">主要按钮</TechButton>
        <TechButton variant="secondary">次要按钮</TechButton>
        <TechButton variant="success">成功按钮</TechButton>
      </div>
    </div>
  );
}
```

---

## 🔥 高级功能

### 自定义样式

```tsx
import React from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

export default function CustomStylesExample() {
  return (
    <div style={{ padding: '20px' }}>
      {/* 自定义CSS样式 */}
      <TechButton 
        variant="primary"
        style={{
          background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
          border: 'none',
          boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
        }}
      >
        自定义渐变
      </TechButton>
      
      {/* 使用className */}
      <TechButton 
        variant="secondary"
        className="my-custom-button"
      >
        自定义类名
      </TechButton>
    </div>
  );
}
```

### 异步操作处理

```tsx
import React, { useState } from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

export default function AsyncOperationsExample() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    setStatus('loading');
    
    try {
      // 模拟API调用
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: 'example' })
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        throw new Error('提交失败');
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const getButtonProps = () => {
    switch (status) {
      case 'loading':
        return {
          loading: true,
          disabled: true,
          children: '提交中...'
        };
      case 'success':
        return {
          variant: 'success' as const,
          children: '✓ 提交成功'
        };
      case 'error':
        return {
          variant: 'danger' as const,
          children: '✗ 提交失败'
        };
      default:
        return {
          variant: 'primary' as const,
          children: '提交数据'
        };
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <TechButton 
        {...getButtonProps()}
        onClick={handleSubmit}
        disabled={status !== 'idle'}
      />
    </div>
  );
}
```

### 表单集成

```tsx
import React, { useState } from 'react';
import { TechButton, MinimalButton } from 'yggjs_rbutton';

export default function FormIntegrationExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '姓名不能为空';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('表单提交:', formData);
      // 处理表单提交
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '' });
    setErrors({});
  };

  const isFormValid = formData.name.trim() && formData.email.trim();

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label>姓名:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '4px',
            border: errors.name ? '1px solid red' : '1px solid #ccc'
          }}
        />
        {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>邮箱:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '4px',
            border: errors.email ? '1px solid red' : '1px solid #ccc'
          }}
        />
        {errors.email && <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>}
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <TechButton 
          type="submit"
          variant="primary"
          disabled={!isFormValid}
        >
          提交
        </TechButton>
        
        <MinimalButton 
          type="button"
          variant="outline"
          onClick={handleReset}
        >
          重置
        </MinimalButton>
      </div>
    </form>
  );
}
```

---

## 📚 API 参考

### TechButton API

#### Props

```typescript
interface TechButtonProps {
  // 基础属性
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fill?: 'solid' | 'outline' | 'ghost' | 'link';
  shape?: 'default' | 'rounded' | 'circle' | 'square';
  
  // 状态属性
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  
  // 样式属性
  fullWidth?: boolean;
  glow?: boolean;
  gradient?: boolean;
  customColors?: {
    primary?: string;
    primaryHover?: string;
    primaryActive?: string;
  };
  
  // 事件处理
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  // HTML 属性
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  name?: string;
  value?: string;
  tabIndex?: number;
  
  // 自定义属性
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  'data-testid'?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}
```

### MinimalButton API

```typescript
interface MinimalButtonProps {
  // 基础属性
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  
  // 状态属性
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  
  // 极简主题特殊配置
  minimalConfig?: {
    pureMode?: boolean;        // 纯净模式
    contentFirst?: boolean;    // 内容优先
    breathingSpace?: boolean;  // 呼吸空间优化
  };
  
  // 主题配置
  colorMode?: 'light' | 'dark' | 'auto';
  density?: 'compact' | 'comfortable' | 'spacious';
  borderStyle?: 'none' | 'subtle' | 'visible';
  shadowIntensity?: 'none' | 'subtle' | 'visible';
  textStyle?: 'light' | 'normal' | 'medium';
  
  // 其他属性与 TechButton 相同...
}
```

### 工具函数

```typescript
// 主题工具
import { createTheme, mergeThemes } from 'yggjs_rbutton/utils';

// 创建自定义主题
const customTheme = createTheme({
  colors: {
    primary: '#ff6b35',
    secondary: '#4ecdc4'
  },
  animations: {
    duration: {
      fast: '100ms',
      normal: '200ms'
    }
  }
});

// 合并主题
const mergedTheme = mergeThemes(baseTheme, customTheme);
```

---

## 💡 最佳实践

### 1. 性能优化

```tsx
import React, { memo, useMemo, useCallback } from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

// 使用 memo 优化重渲染
const OptimizedButton = memo(({ onClick, children, ...props }) => {
  // 使用 useCallback 缓存事件处理器
  const handleClick = useCallback((e) => {
    onClick?.(e);
  }, [onClick]);

  // 使用 useMemo 缓存复杂计算
  const buttonStyle = useMemo(() => ({
    margin: '4px',
    transition: 'all 0.2s ease'
  }), []);

  return (
    <TechButton
      {...props}
      onClick={handleClick}
      style={buttonStyle}
    >
      {children}
    </TechButton>
  );
});
```

### 2. 可访问性优化

```tsx
import React from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

export default function AccessibleButtons() {
  return (
    <div>
      {/* 使用语义化标签和ARIA属性 */}
      <TechButton
        variant="primary"
        aria-label="保存用户数据"
        aria-describedby="save-help-text"
        role="button"
      >
        保存
      </TechButton>
      <div id="save-help-text">点击保存当前用户信息</div>
      
      {/* 键盘导航支持 */}
      <TechButton
        variant="secondary"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // 处理键盘激活
          }
        }}
      >
        键盘友好按钮
      </TechButton>
      
      {/* 状态通知 */}
      <TechButton
        variant="success"
        aria-live="polite"
        aria-atomic="true"
      >
        操作成功
      </TechButton>
    </div>
  );
}
```

### 3. 主题一致性

```tsx
import React, { createContext, useContext } from 'react';
import { TechButton, MinimalButton } from 'yggjs_rbutton';

// 创建主题上下文
const ThemeContext = createContext<{
  theme: 'tech' | 'minimal';
  toggleTheme: () => void;
}>({
  theme: 'tech',
  toggleTheme: () => {}
});

// 统一按钮组件
const UnifiedButton: React.FC<any> = (props) => {
  const { theme } = useContext(ThemeContext);
  
  return theme === 'tech' 
    ? <TechButton {...props} />
    : <MinimalButton {...props} />;
};

// 使用示例
export default function ThemedApp() {
  const [theme, setTheme] = useState<'tech' | 'minimal'>('tech');
  
  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme: () => setTheme(prev => prev === 'tech' ? 'minimal' : 'tech')
    }}>
      <div>
        <UnifiedButton variant="primary">统一主题按钮</UnifiedButton>
        <UnifiedButton variant="secondary" onClick={() => toggleTheme()}>
          切换主题
        </UnifiedButton>
      </div>
    </ThemeContext.Provider>
  );
}
```

### 4. 类型安全

```tsx
import React from 'react';
import { TechButton } from 'yggjs_rbutton/tech';
import type { TechButtonProps } from 'yggjs_rbutton/tech/types';

// 定义强类型的按钮配置
interface ButtonConfig {
  variant: TechButtonProps['variant'];
  size: TechButtonProps['size'];
  label: string;
  action: () => void;
}

const buttonConfigs: ButtonConfig[] = [
  {
    variant: 'primary',
    size: 'medium',
    label: '主要操作',
    action: () => console.log('主要操作')
  },
  {
    variant: 'secondary',
    size: 'small',
    label: '次要操作',
    action: () => console.log('次要操作')
  }
];

export default function TypeSafeButtons() {
  return (
    <div>
      {buttonConfigs.map((config, index) => (
        <TechButton
          key={index}
          variant={config.variant}
          size={config.size}
          onClick={config.action}
        >
          {config.label}
        </TechButton>
      ))}
    </div>
  );
}
```

---

## ⚡ 性能优化

### Bundle 大小优化

```tsx
// ❌ 避免完整导入
import { TechButton, MinimalButton } from 'yggjs_rbutton';

// ✅ 推荐按需导入
import { TechButton } from 'yggjs_rbutton/tech';
import { MinimalButton } from 'yggjs_rbutton/minimal';
```

### 样式缓存

```tsx
import React, { useMemo } from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

export default function OptimizedButtonList({ items }) {
  // 缓存样式计算
  const buttonStyles = useMemo(() => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '8px',
      padding: '16px'
    }
  }), []);

  return (
    <div style={buttonStyles.container}>
      {items.map((item, index) => (
        <TechButton
          key={item.id || index}
          variant={item.variant}
          size="medium"
          onClick={item.onClick}
        >
          {item.label}
        </TechButton>
      ))}
    </div>
  );
}
```

### 虚拟化长列表

```tsx
import React, { memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { TechButton } from 'yggjs_rbutton/tech';

const ButtonItem = memo(({ index, style, data }) => (
  <div style={style}>
    <TechButton
      variant="primary"
      size="small"
      onClick={() => data.onItemClick(index)}
    >
      按钮 {index + 1}
    </TechButton>
  </div>
));

export default function VirtualizedButtonList({ itemCount }) {
  const handleItemClick = (index) => {
    console.log(`点击了按钮 ${index + 1}`);
  };

  return (
    <List
      height={400}
      itemCount={itemCount}
      itemSize={40}
      itemData={{ onItemClick: handleItemClick }}
    >
      {ButtonItem}
    </List>
  );
}
```

---

## 🐛 故障排除

### 常见问题

#### 1. 样式不生效

**问题**: 按钮样式没有正确应用

**解决方案**:
```tsx
// 确保正确导入CSS（如果需要）
import 'yggjs_rbutton/dist/styles.css';

// 或者使用CSS-in-JS方案（推荐）
import { TechButton } from 'yggjs_rbutton/tech';
```

#### 2. TypeScript 类型错误

**问题**: TypeScript 报告类型错误

**解决方案**:
```tsx
// 确保安装了类型定义
npm install @types/react

// 在组件中正确使用类型
import type { TechButtonProps } from 'yggjs_rbutton/tech/types';

const MyButton: React.FC<TechButtonProps> = (props) => {
  return <TechButton {...props} />;
};
```

#### 3. 主题切换不生效

**问题**: 主题切换没有视觉变化

**解决方案**:
```tsx
// 确保主题提供器正确包装组件
import { ThemeProvider } from 'yggjs_rbutton';

function App() {
  return (
    <ThemeProvider theme="tech">
      <YourComponent />
    </ThemeProvider>
  );
}
```

#### 4. 性能问题

**问题**: 大量按钮渲染导致性能下降

**解决方案**:
```tsx
import React, { memo } from 'react';
import { TechButton } from 'yggjs_rbutton/tech';

// 使用 React.memo 优化
const OptimizedButton = memo(TechButton);

// 或者使用虚拟化
import { FixedSizeList } from 'react-window';
```

### 调试技巧

#### 开启开发模式

```tsx
// 在开发环境中启用详细日志
import { setDebugMode } from 'yggjs_rbutton/utils';

if (process.env.NODE_ENV === 'development') {
  setDebugMode(true);
}
```

#### 样式调试

```tsx
import { TechButton } from 'yggjs_rbutton/tech';

// 使用 data-testid 便于调试和测试
<TechButton data-testid="submit-button" variant="primary">
  提交
</TechButton>
```

---

## 🎓 总结

YggJS RButton 是一个功能强大、设计精美的 React 按钮组件库，它为现代 Web 应用提供了完整的按钮解决方案。

### 🎯 核心价值

1. **双主题设计**：科技风和极简风两套完整主题，满足不同项目需求
2. **TypeScript 原生支持**：完整的类型定义，提供卓越的开发体验
3. **高性能架构**：基于 CSS-in-JS 的动态样式系统，支持主题热切换
4. **可访问性优先**：遵循 WCAG 标准，确保所有用户都能正常使用
5. **企业级品质**：经过严格测试，适用于生产环境

### 🚀 适用场景

- **科技产品**：使用科技风主题展现创新和现代感
- **商务应用**：使用极简主题保持专业和简洁
- **企业级应用**：利用完整的类型支持和高性能架构
- **设计系统**：作为设计系统的基础组件进行扩展

### 📈 发展路线

未来版本计划：
- 更多主题变体和自定义选项
- 动画效果增强和微交互优化
- 更好的性能优化和 Bundle 大小控制
- 更丰富的无障碍访问功能

### 🤝 社区支持

- **问题反馈**：[GitHub Issues](https://github.com/yggai/yggjs_rbutton/issues)
- **功能建议**：[GitHub Discussions](https://github.com/yggai/yggjs_rbutton/discussions)
- **贡献代码**：[贡献指南](https://github.com/yggai/yggjs_rbutton/blob/main/CONTRIBUTING.md)

---

<div align="center">

**感谢使用 YggJS RButton！**

如果这个组件库对您有帮助，请考虑给我们一个 ⭐ Star！

[📖 更多文档](https://yggjs-rbutton.dev) | 
[🐛 问题反馈](https://github.com/yggai/yggjs_rbutton/issues) | 
[💡 功能建议](https://github.com/yggai/yggjs_rbutton/discussions)

</div>

---

> 📝 **文档版本**: v1.0.0  
> 📅 **更新日期**: 2025年8月26日  
> 👨‍💻 **作者**: 源滚滚AI编程团队