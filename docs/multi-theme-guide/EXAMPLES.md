# 示例和教程

## 概述

本文档提供了 YggJS 多主题按钮系统的详细示例和分步教程，帮助开发者快速上手并掌握高级用法。

## 目录

- [快速入门](#快速入门)
- [基础用法示例](#基础用法示例)
- [高级功能示例](#高级功能示例)
- [实际应用场景](#实际应用场景)
- [自定义主题教程](#自定义主题教程)
- [性能优化实践](#性能优化实践)

## 快速入门

### 1. 安装和基础设置

```bash
# 安装核心包
npm install yggjs-rbutton

# 或者使用 yarn
yarn add yggjs-rbutton
```

### 2. 第一个按钮

```jsx
import React from 'react';
import { TechButton } from 'yggjs-rbutton';

function App() {
  return (
    <div>
      <TechButton variant="primary">
        我的第一个科技按钮
      </TechButton>
    </div>
  );
}

export default App;
```

### 3. 添加主题提供者

```jsx
import React from 'react';
import { TechThemeProvider, TechButton } from 'yggjs-rbutton/tech';

function App() {
  return (
    <TechThemeProvider>
      <div>
        <h1>科技风界面</h1>
        <TechButton variant="primary">主要操作</TechButton>
        <TechButton variant="secondary">次要操作</TechButton>
      </div>
    </TechThemeProvider>
  );
}
```

## 基础用法示例

### 1. 按钮变体展示

```jsx
import React from 'react';
import { TechButton, MinimalButton } from 'yggjs-rbutton';

const ButtonVariants = () => {
  const variants = ['primary', 'secondary', 'danger', 'success', 'warning', 'info'];

  return (
    <div>
      {/* 科技风按钮变体 */}
      <section>
        <h2>科技风按钮变体</h2>
        {variants.map((variant) => (
          <TechButton key={variant} variant={variant} style={{ margin: '0 8px 8px 0' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </TechButton>
        ))}
      </section>

      {/* 极简按钮变体 */}
      <section>
        <h2>极简按钮变体</h2>
        {variants.map((variant) => (
          <MinimalButton key={variant} variant={variant} style={{ margin: '0 8px 8px 0' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </MinimalButton>
        ))}
      </section>
    </div>
  );
};

export default ButtonVariants;
```

### 2. 按钮尺寸展示

```jsx
import React from 'react';
import { TechButton } from 'yggjs-rbutton/tech';

const ButtonSizes = () => {
  const sizes = ['small', 'medium', 'large'];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {sizes.map((size) => (
        <TechButton key={size} size={size} variant="primary">
          {size.charAt(0).toUpperCase() + size.slice(1)} 按钮
        </TechButton>
      ))}
    </div>
  );
};

export default ButtonSizes;
```

### 3. 按钮状态展示

```jsx
import React, { useState } from 'react';
import { TechButton } from 'yggjs-rbutton/tech';

const ButtonStates = () => {
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 正常状态 */}
      <TechButton variant="primary">
        正常按钮
      </TechButton>

      {/* 禁用状态 */}
      <TechButton variant="primary" disabled>
        禁用按钮
      </TechButton>

      {/* 加载状态 */}
      <TechButton 
        variant="primary" 
        loading={loading}
        loadingText="处理中..."
        onClick={handleAsyncAction}
      >
        {loading ? '处理中...' : '点击加载'}
      </TechButton>

      {/* 带图标的按钮 */}
      <TechButton 
        variant="primary"
        icon={<span>🚀</span>}
        iconPosition="left"
      >
        带图标按钮
      </TechButton>
    </div>
  );
};

export default ButtonStates;
```

## 高级功能示例

### 1. 主题切换器

```jsx
import React, { useState } from 'react';
import { TechButton, MinimalButton, TechThemeProvider, MinimalThemeProvider } from 'yggjs-rbutton';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('tech');

  const ThemeProvider = currentTheme === 'tech' ? TechThemeProvider : MinimalThemeProvider;
  const Button = currentTheme === 'tech' ? TechButton : MinimalButton;

  return (
    <div>
      {/* 主题选择器 */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setCurrentTheme('tech')}
          style={{ 
            marginRight: '10px',
            backgroundColor: currentTheme === 'tech' ? '#3b82f6' : '#e5e7eb',
            color: currentTheme === 'tech' ? 'white' : 'black',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          科技风
        </button>
        <button 
          onClick={() => setCurrentTheme('minimal')}
          style={{ 
            backgroundColor: currentTheme === 'minimal' ? '#374151' : '#e5e7eb',
            color: currentTheme === 'minimal' ? 'white' : 'black',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          极简风
        </button>
      </div>

      {/* 主题按钮展示 */}
      <ThemeProvider>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">主要操作</Button>
          <Button variant="secondary">次要操作</Button>
          <Button variant="danger">危险操作</Button>
          <Button variant="success">成功操作</Button>
        </div>
      </ThemeProvider>

      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h3>当前主题: {currentTheme === 'tech' ? '科技风' : '极简风'}</h3>
        <p>
          {currentTheme === 'tech' 
            ? '科技风主题具有发光效果、渐变背景和科幻感设计元素。' 
            : '极简主题注重简洁性，使用微妙的阴影和清晰的色彩层次。'
          }
        </p>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
```

### 2. 科技风高级特效

```jsx
import React, { useState } from 'react';
import { TechThemeProvider, TechButton, useTechTheme } from 'yggjs-rbutton/tech';

const TechEffectsDemo = () => {
  const [glowLevel, setGlowLevel] = useState('medium');
  const [particlesEnabled, setParticlesEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <TechThemeProvider 
      config={{
        glowConfig: { intensity: glowLevel },
        particleConfig: { enabled: particlesEnabled },
        soundConfig: { enabled: soundEnabled }
      }}
    >
      <div style={{ padding: '20px' }}>
        {/* 效果控制面板 */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ color: '#ffffff', marginRight: '10px' }}>发光强度:</label>
            <select 
              value={glowLevel} 
              onChange={(e) => setGlowLevel(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '4px' }}
            >
              <option value="none">无</option>
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
              <option value="ultra">超强</option>
            </select>
          </div>

          <div>
            <label style={{ color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={particlesEnabled}
                onChange={(e) => setParticlesEnabled(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              粒子效果
            </label>
          </div>

          <div>
            <label style={{ color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              音效
            </label>
          </div>
        </div>

        {/* 特效按钮展示 */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <TechButton 
            variant="primary"
            glow={glowLevel}
            particles={particlesEnabled}
            sound={soundEnabled ? 'futuristic' : 'none'}
            animation="cyberpunk"
          >
            赛博朋克按钮
          </TechButton>

          <TechButton 
            variant="secondary"
            glow={glowLevel}
            borderStyle="neon"
            animation="pulse"
            holographic
          >
            全息按钮
          </TechButton>

          <TechButton 
            variant="info"
            glow={glowLevel}
            scanlines
            animation="matrix"
          >
            矩阵风格
          </TechButton>
        </div>

        <EffectDescription glowLevel={glowLevel} particlesEnabled={particlesEnabled} />
      </div>
    </TechThemeProvider>
  );
};

const EffectDescription = ({ glowLevel, particlesEnabled }) => (
  <div style={{ 
    marginTop: '30px', 
    padding: '20px', 
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: '8px',
    border: '1px solid #3b82f6' 
  }}>
    <h3 style={{ color: '#3b82f6', marginBottom: '10px' }}>当前效果设置</h3>
    <ul style={{ color: '#ffffff', listStyle: 'none', padding: 0 }}>
      <li>🌟 发光强度: {glowLevel}</li>
      <li>✨ 粒子效果: {particlesEnabled ? '启用' : '禁用'}</li>
      <li>🎵 交互音效: 可在浏览器控制台查看事件</li>
    </ul>
  </div>
);

export default TechEffectsDemo;
```

### 3. 响应式按钮组

```jsx
import React from 'react';
import { MinimalButton, useResponsive } from 'yggjs-rbutton';

const ResponsiveButtonGroup = () => {
  const { isMobile, isTablet, responsive } = useResponsive();

  const buttonSize = responsive({
    mobile: 'small',
    tablet: 'medium',
    desktop: 'large'
  });

  const buttonsPerRow = responsive({
    mobile: 2,
    tablet: 3,
    desktop: 4
  });

  const actions = [
    { id: 1, label: '创建', variant: 'primary' },
    { id: 2, label: '编辑', variant: 'secondary' },
    { id: 3, label: '删除', variant: 'danger' },
    { id: 4, label: '分享', variant: 'info' },
    { id: 5, label: '导出', variant: 'success' },
    { id: 6, label: '导入', variant: 'warning' },
  ];

  return (
    <div>
      <div style={{ 
        marginBottom: '20px', 
        padding: '16px', 
        backgroundColor: '#f3f4f6', 
        borderRadius: '8px' 
      }}>
        <h3>当前设备信息</h3>
        <p>设备类型: {isMobile ? '移动设备' : isTablet ? '平板设备' : '桌面设备'}</p>
        <p>按钮尺寸: {buttonSize}</p>
        <p>每行按钮数: {buttonsPerRow}</p>
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${buttonsPerRow}, 1fr)`,
        gap: responsive({
          mobile: '8px',
          tablet: '12px',
          desktop: '16px'
        }),
        marginBottom: '20px'
      }}>
        {actions.map((action) => (
          <MinimalButton
            key={action.id}
            variant={action.variant}
            size={buttonSize}
            onClick={() => console.log(`执行操作: ${action.label}`)}
          >
            {action.label}
          </MinimalButton>
        ))}
      </div>

      {/* 移动端特殊布局 */}
      {isMobile && (
        <div style={{ 
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          right: '20px',
          display: 'flex',
          gap: '12px'
        }}>
          <MinimalButton variant="primary" size="large" style={{ flex: 1 }}>
            主要操作
          </MinimalButton>
          <MinimalButton variant="secondary" size="large">
            菜单
          </MinimalButton>
        </div>
      )}
    </div>
  );
};

export default ResponsiveButtonGroup;
```

## 实际应用场景

### 1. 表单提交界面

```jsx
import React, { useState } from 'react';
import { MinimalButton, useAccessibility } from 'yggjs-rbutton';

const FormSubmissionExample = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const { announceToScreenReader } = useAccessibility();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟成功/失败
      const success = Math.random() > 0.3;
      
      if (success) {
        setSubmitResult('success');
        announceToScreenReader('登录成功');
      } else {
        setSubmitResult('error');
        announceToScreenReader('登录失败，请重试');
      }
    } catch (error) {
      setSubmitResult('error');
      announceToScreenReader('网络错误，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ email: '', password: '', remember: false });
    setSubmitResult(null);
    announceToScreenReader('表单已重置');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>用户登录</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>
            邮箱地址
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid #d1d5db' 
            }}
            required
            disabled={submitting}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>
            密码
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid #d1d5db' 
            }}
            required
            disabled={submitting}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={formData.remember}
              onChange={(e) => setFormData(prev => ({ ...prev, remember: e.target.checked }))}
              style={{ marginRight: '8px' }}
              disabled={submitting}
            />
            记住我
          </label>
        </div>

        {/* 提交结果显示 */}
        {submitResult && (
          <div style={{ 
            marginBottom: '16px',
            padding: '12px',
            borderRadius: '4px',
            backgroundColor: submitResult === 'success' ? '#d1fae5' : '#fee2e2',
            color: submitResult === 'success' ? '#065f46' : '#991b1b'
          }}>
            {submitResult === 'success' ? '✅ 登录成功！' : '❌ 登录失败，请重试'}
          </div>
        )}

        {/* 按钮组 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <MinimalButton
            type="submit"
            variant="primary"
            loading={submitting}
            loadingText="登录中..."
            disabled={!formData.email || !formData.password}
            style={{ flex: 1 }}
          >
            {submitting ? '登录中...' : '登录'}
          </MinimalButton>

          <MinimalButton
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={submitting}
          >
            重置
          </MinimalButton>
        </div>
      </form>

      {/* 其他操作 */}
      <div style={{ textAlign: 'center' }}>
        <MinimalButton variant="ghost" size="small">
          忘记密码？
        </MinimalButton>
        <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>
        <MinimalButton variant="ghost" size="small">
          创建账户
        </MinimalButton>
      </div>
    </div>
  );
};

export default FormSubmissionExample;
```

### 2. 数据表格操作

```jsx
import React, { useState } from 'react';
import { TechButton, MinimalButton } from 'yggjs-rbutton';

const DataTableExample = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [view, setView] = useState('table');

  const sampleData = [
    { id: 1, name: '张三', email: 'zhang@example.com', status: 'active' },
    { id: 2, name: '李四', email: 'li@example.com', status: 'inactive' },
    { id: 3, name: '王五', email: 'wang@example.com', status: 'active' },
    { id: 4, name: '赵六', email: 'zhao@example.com', status: 'pending' },
  ];

  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const selectAll = () => {
    if (selectedRows.size === sampleData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sampleData.map(item => item.id)));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`批量操作: ${action}`, Array.from(selectedRows));
    // 这里可以实现实际的批量操作逻辑
    alert(`执行批量${action}操作，影响 ${selectedRows.size} 个项目`);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 工具栏 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        padding: '16px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px'
      }}>
        <div>
          <h2 style={{ margin: 0, marginBottom: '8px' }}>用户管理</h2>
          <p style={{ margin: 0, color: '#6b7280' }}>
            共 {sampleData.length} 个用户，已选择 {selectedRows.size} 个
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <MinimalButton
            variant="primary"
            icon="+"
            onClick={() => console.log('添加用户')}
          >
            添加用户
          </MinimalButton>
          
          <div style={{ display: 'flex', backgroundColor: '#e5e7eb', borderRadius: '6px' }}>
            <button
              onClick={() => setView('table')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px 0 0 6px',
                backgroundColor: view === 'table' ? '#3b82f6' : 'transparent',
                color: view === 'table' ? 'white' : '#374151',
                cursor: 'pointer'
              }}
            >
              表格
            </button>
            <button
              onClick={() => setView('card')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '0 6px 6px 0',
                backgroundColor: view === 'card' ? '#3b82f6' : 'transparent',
                color: view === 'card' ? 'white' : '#374151',
                cursor: 'pointer'
              }}
            >
              卡片
            </button>
          </div>
        </div>
      </div>

      {/* 批量操作栏 */}
      {selectedRows.size > 0 && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '16px',
          padding: '12px 16px',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '6px'
        }}>
          <span style={{ color: '#1e40af' }}>
            已选择 {selectedRows.size} 个项目
          </span>
          
          <TechButton 
            size="small" 
            variant="info"
            onClick={() => handleBulkAction('编辑')}
          >
            批量编辑
          </TechButton>
          
          <TechButton 
            size="small" 
            variant="warning"
            onClick={() => handleBulkAction('导出')}
          >
            导出数据
          </TechButton>
          
          <TechButton 
            size="small" 
            variant="danger"
            onClick={() => handleBulkAction('删除')}
          >
            批量删除
          </TechButton>

          <MinimalButton
            size="small"
            variant="ghost"
            onClick={() => setSelectedRows(new Set())}
          >
            取消选择
          </MinimalButton>
        </div>
      )}

      {/* 数据表格 */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>
                <input
                  type="checkbox"
                  checked={selectedRows.size === sampleData.length && sampleData.length > 0}
                  onChange={selectAll}
                />
              </th>
              <th style={{ padding: '12px', textAlign: 'left' }}>姓名</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>邮箱</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>状态</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item, index) => (
              <tr 
                key={item.id}
                style={{ 
                  borderTop: index > 0 ? '1px solid #e5e7eb' : 'none',
                  backgroundColor: selectedRows.has(item.id) ? '#f0f9ff' : 'white'
                }}
              >
                <td style={{ padding: '12px' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => toggleRowSelection(item.id)}
                  />
                </td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{item.name}</td>
                <td style={{ padding: '12px', color: '#6b7280' }}>{item.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: item.status === 'active' ? '#d1fae5' : 
                                   item.status === 'inactive' ? '#fee2e2' : '#fef3c7',
                    color: item.status === 'active' ? '#065f46' : 
                           item.status === 'inactive' ? '#991b1b' : '#92400e'
                  }}>
                    {item.status === 'active' ? '活跃' : 
                     item.status === 'inactive' ? '非活跃' : '待审核'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <MinimalButton 
                      size="small" 
                      variant="ghost"
                      onClick={() => console.log('编辑', item.id)}
                    >
                      编辑
                    </MinimalButton>
                    <MinimalButton 
                      size="small" 
                      variant="ghost"
                      onClick={() => console.log('查看', item.id)}
                    >
                      查看
                    </MinimalButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '20px'
      }}>
        <div style={{ color: '#6b7280' }}>
          显示 1-{sampleData.length} 共 {sampleData.length} 条记录
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <MinimalButton variant="ghost" disabled>
            上一页
          </MinimalButton>
          <MinimalButton variant="primary">
            1
          </MinimalButton>
          <MinimalButton variant="ghost" disabled>
            下一页
          </MinimalButton>
        </div>
      </div>
    </div>
  );
};

export default DataTableExample;
```

### 3. 购物车结账流程

```jsx
import React, { useState } from 'react';
import { MinimalButton, TechButton } from 'yggjs-rbutton';

const ShoppingCartCheckout = () => {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'MacBook Pro', price: 12999, quantity: 1, image: '💻' },
    { id: 2, name: 'iPhone 15', price: 6999, quantity: 2, image: '📱' },
    { id: 3, name: 'AirPods Pro', price: 1999, quantity: 1, image: '🎧' },
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [processing, setProcessing] = useState(false);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50;
  const discount = couponCode === 'SAVE10' ? totalAmount * 0.1 : 0;
  const finalAmount = totalAmount + shipping - discount;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      alert('优惠券应用成功！享受 10% 折扣');
    } else {
      alert('无效的优惠券代码');
    }
  };

  const processPayment = async () => {
    setProcessing(true);
    try {
      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 3000));
      setStep(4); // 支付成功页面
    } catch (error) {
      alert('支付失败，请重试');
    } finally {
      setProcessing(false);
    }
  };

  const steps = [
    { number: 1, title: '购物车', icon: '🛒' },
    { number: 2, title: '配送信息', icon: '📋' },
    { number: 3, title: '支付', icon: '💳' },
    { number: 4, title: '完成', icon: '✅' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* 步骤指示器 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        marginBottom: '40px' 
      }}>
        {steps.map((s, index) => (
          <React.Fragment key={s.number}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              opacity: step >= s.number ? 1 : 0.5 
            }}>
              <div style={{ 
                width: '50px', 
                height: '50px',
                borderRadius: '50%',
                backgroundColor: step >= s.number ? '#3b82f6' : '#e5e7eb',
                color: step >= s.number ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginBottom: '8px'
              }}>
                {s.icon}
              </div>
              <span style={{ 
                fontSize: '14px',
                color: step >= s.number ? '#1f2937' : '#6b7280' 
              }}>
                {s.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div style={{ 
                flex: 1, 
                height: '2px', 
                backgroundColor: step > s.number ? '#3b82f6' : '#e5e7eb',
                margin: '25px 20px 0',
                alignSelf: 'flex-start'
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 步骤 1: 购物车 */}
      {step === 1 && (
        <div>
          <h2 style={{ marginBottom: '20px' }}>购物车 ({cartItems.length} 件商品)</h2>
          
          {cartItems.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '20px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '40px', marginRight: '16px' }}>
                {item.image}
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0' }}>{item.name}</h3>
                <p style={{ margin: 0, color: '#6b7280' }}>¥{item.price.toLocaleString()}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MinimalButton
                  size="small"
                  variant="ghost"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </MinimalButton>
                <span style={{ minWidth: '20px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <MinimalButton
                  size="small"
                  variant="ghost"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </MinimalButton>
                
                <MinimalButton
                  size="small"
                  variant="danger"
                  onClick={() => updateQuantity(item.id, 0)}
                  style={{ marginLeft: '12px' }}
                >
                  删除
                </MinimalButton>
              </div>
            </div>
          ))}

          {/* 优惠券 */}
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            marginBottom: '20px',
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <input
              type="text"
              placeholder="输入优惠券代码 (试试 SAVE10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              style={{ 
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}
            />
            <MinimalButton variant="secondary" onClick={applyCoupon}>
              应用优惠券
            </MinimalButton>
          </div>

          {/* 价格汇总 */}
          <div style={{ 
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>商品小计</span>
              <span>¥{totalAmount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>运费</span>
              <span>¥{shipping}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#059669' }}>
                <span>优惠券折扣</span>
                <span>-¥{discount.toLocaleString()}</span>
              </div>
            )}
            <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #d1d5db' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
              <span>总计</span>
              <span>¥{finalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <MinimalButton variant="ghost" style={{ flex: 1 }}>
              继续购物
            </MinimalButton>
            <TechButton 
              variant="primary" 
              style={{ flex: 1 }}
              onClick={() => setStep(2)}
              disabled={cartItems.length === 0}
            >
              去结算 ({cartItems.length})
            </TechButton>
          </div>
        </div>
      )}

      {/* 步骤 2: 配送信息 */}
      {step === 2 && (
        <div>
          <h2>配送信息</h2>
          {/* 这里可以添加地址表单 */}
          <div style={{ 
            padding: '20px',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <p>📋 配送信息表单</p>
            <p style={{ color: '#6b7280' }}>在实际应用中，这里会是收货地址表单</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <MinimalButton variant="secondary" onClick={() => setStep(1)}>
              返回购物车
            </MinimalButton>
            <TechButton variant="primary" onClick={() => setStep(3)} style={{ flex: 1 }}>
              确认配送信息
            </TechButton>
          </div>
        </div>
      )}

      {/* 步骤 3: 支付 */}
      {step === 3 && (
        <div>
          <h2>支付信息</h2>
          
          <div style={{ 
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>订单汇总</h3>
            <div style={{ marginBottom: '12px' }}>
              商品总计: ¥{totalAmount.toLocaleString()}
            </div>
            <div style={{ marginBottom: '12px' }}>
              运费: ¥{shipping}
            </div>
            {discount > 0 && (
              <div style={{ marginBottom: '12px', color: '#059669' }}>
                优惠券折扣: -¥{discount.toLocaleString()}
              </div>
            )}
            <div style={{ fontSize: '18px', fontWeight: 'bold', borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>
              应付金额: ¥{finalAmount.toLocaleString()}
            </div>
          </div>

          <div style={{ 
            padding: '20px',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <p>💳 支付方式选择</p>
            <p style={{ color: '#6b7280' }}>支付宝 / 微信支付 / 银行卡</p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <MinimalButton variant="secondary" onClick={() => setStep(2)}>
              返回配送信息
            </MinimalButton>
            <TechButton 
              variant="success" 
              style={{ flex: 1 }}
              loading={processing}
              loadingText="处理中..."
              onClick={processPayment}
            >
              {processing ? '支付处理中...' : `立即支付 ¥${finalAmount.toLocaleString()}`}
            </TechButton>
          </div>
        </div>
      )}

      {/* 步骤 4: 支付成功 */}
      {step === 4 && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
          <h2>支付成功！</h2>
          <p style={{ marginBottom: '30px', color: '#6b7280' }}>
            您的订单已成功提交，我们将尽快为您安排发货
          </p>
          
          <div style={{ 
            padding: '20px',
            backgroundColor: '#f0f9ff',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '1px solid #bfdbfe'
          }}>
            <p><strong>订单号:</strong> #ORDER-{Date.now()}</p>
            <p><strong>支付金额:</strong> ¥{finalAmount.toLocaleString()}</p>
            <p><strong>预计送达:</strong> 3-5 个工作日</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <MinimalButton variant="secondary">
              查看订单详情
            </MinimalButton>
            <TechButton variant="primary">
              继续购物
            </TechButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartCheckout;
```

## 自定义主题教程

### 1. 创建基础主题

```typescript
// 创建 custom-theme.ts 文件
import { createTheme, BaseButtonProps } from 'yggjs-rbutton/core';

// 定义主题配置
export const customTheme = createTheme({
  id: 'custom-theme',
  name: '自定义主题',
  version: '1.0.0',
  description: '我的个性化主题',
  
  // 颜色系统
  colors: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      900: '#7f1d1d',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#64748b',
      600: '#475569',
      900: '#0f172a',
    },
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
      900: '#14532d',
    },
    danger: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
      900: '#7f1d1d',
    },
  },
  
  // 字体系统
  typography: {
    fontFamily: 'Inter, -apple-system, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // 间距系统
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  
  // 边框半径
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  
  // 阴影系统
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  // 动画配置
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // 断点系统
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
});
```

### 2. 实现自定义按钮组件

```typescript
// 创建 CustomButton.tsx 文件
import React from 'react';
import { css } from '@emotion/react';
import type { BaseButtonProps } from 'yggjs-rbutton/core';
import { customTheme } from './custom-theme';

interface CustomButtonProps extends BaseButtonProps {
  // 自定义属性
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

// 样式计算函数
const computeCustomButtonStyles = (props: CustomButtonProps) => {
  const { variant = 'primary', size = 'medium', fill = 'solid', rounded = 'md', elevation = 'sm' } = props;
  
  // 基础样式
  const baseStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: ${customTheme.typography.fontFamily};
    font-weight: ${customTheme.typography.fontWeight.medium};
    border: none;
    cursor: pointer;
    transition: all ${customTheme.animation.duration.normal} ${customTheme.animation.easing.easeOut};
    text-decoration: none;
    position: relative;
    overflow: hidden;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `;
  
  // 尺寸样式
  const sizeStyles = {
    small: css`
      padding: ${customTheme.spacing.sm} ${customTheme.spacing.md};
      font-size: ${customTheme.typography.fontSize.sm};
      min-height: 2rem;
    `,
    medium: css`
      padding: ${customTheme.spacing.md} ${customTheme.spacing.lg};
      font-size: ${customTheme.typography.fontSize.md};
      min-height: 2.5rem;
    `,
    large: css`
      padding: ${customTheme.spacing.lg} ${customTheme.spacing.xl};
      font-size: ${customTheme.typography.fontSize.lg};
      min-height: 3rem;
    `,
  };
  
  // 颜色和填充样式
  const getVariantStyles = () => {
    const colorSet = customTheme.colors[variant] || customTheme.colors.primary;
    
    if (fill === 'solid') {
      return css`
        background-color: ${colorSet[500]};
        color: white;
        
        &:hover:not(:disabled) {
          background-color: ${colorSet[600]};
          transform: translateY(-1px);
        }
        
        &:active:not(:disabled) {
          background-color: ${colorSet[700]};
          transform: translateY(0);
        }
      `;
    } else if (fill === 'outline') {
      return css`
        background-color: transparent;
        color: ${colorSet[600]};
        border: 1px solid ${colorSet[300]};
        
        &:hover:not(:disabled) {
          background-color: ${colorSet[50]};
          border-color: ${colorSet[400]};
        }
        
        &:active:not(:disabled) {
          background-color: ${colorSet[100]};
        }
      `;
    } else if (fill === 'ghost') {
      return css`
        background-color: transparent;
        color: ${colorSet[600]};
        
        &:hover:not(:disabled) {
          background-color: ${colorSet[50]};
        }
        
        &:active:not(:disabled) {
          background-color: ${colorSet[100]};
        }
      `;
    }
  };
  
  // 圆角样式
  const roundedStyles = css`
    border-radius: ${customTheme.borderRadius[rounded]};
  `;
  
  // 阴影样式
  const elevationStyles = elevation !== 'none' ? css`
    box-shadow: ${customTheme.shadows[elevation]};
    
    &:hover:not(:disabled) {
      box-shadow: ${customTheme.shadows.lg};
    }
  ` : null;
  
  return [
    baseStyles,
    sizeStyles[size],
    getVariantStyles(),
    roundedStyles,
    elevationStyles,
  ];
};

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  loading,
  loadingText,
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const styles = computeCustomButtonStyles(props);
  
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span style={{ marginRight: '8px' }}>⏳</span>
          {loadingText || '加载中...'}
        </>
      );
    }
    
    if (icon) {
      return (
        <>
          {iconPosition === 'left' && <span style={{ marginRight: '8px' }}>{icon}</span>}
          {children}
          {iconPosition === 'right' && <span style={{ marginLeft: '8px' }}>{icon}</span>}
        </>
      );
    }
    
    return children;
  };
  
  return (
    <button css={styles} disabled={loading || props.disabled} {...props}>
      {renderContent()}
    </button>
  );
};
```

### 3. 创建主题提供者

```typescript
// 创建 CustomThemeProvider.tsx 文件
import React, { createContext, useContext } from 'react';
import { customTheme } from './custom-theme';

interface CustomThemeConfig {
  primaryColor?: string;
  borderRadius?: 'sharp' | 'rounded' | 'pill';
  elevation?: boolean;
}

interface CustomThemeContextValue {
  theme: typeof customTheme;
  config: CustomThemeConfig;
  updateConfig: (config: Partial<CustomThemeConfig>) => void;
}

const CustomThemeContext = createContext<CustomThemeContextValue | undefined>(undefined);

export const CustomThemeProvider: React.FC<{
  config?: CustomThemeConfig;
  children: React.ReactNode;
}> = ({ config = {}, children }) => {
  const [themeConfig, setThemeConfig] = React.useState(config);
  
  const updateConfig = React.useCallback((newConfig: Partial<CustomThemeConfig>) => {
    setThemeConfig(prev => ({ ...prev, ...newConfig }));
  }, []);
  
  const contextValue = React.useMemo(() => ({
    theme: customTheme,
    config: themeConfig,
    updateConfig,
  }), [customTheme, themeConfig, updateConfig]);
  
  return (
    <CustomThemeContext.Provider value={contextValue}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};
```

### 4. 使用自定义主题

```jsx
// App.tsx
import React from 'react';
import { CustomThemeProvider, CustomButton, useCustomTheme } from './custom-theme';

const CustomThemeDemo = () => {
  const { config, updateConfig } = useCustomTheme();
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>自定义主题演示</h2>
      
      {/* 主题配置控制 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>主题配置</h3>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <label>
            <input
              type="radio"
              name="borderRadius"
              checked={config.borderRadius === 'sharp'}
              onChange={() => updateConfig({ borderRadius: 'sharp' })}
            />
            尖角
          </label>
          <label>
            <input
              type="radio"
              name="borderRadius"
              checked={config.borderRadius === 'rounded'}
              onChange={() => updateConfig({ borderRadius: 'rounded' })}
            />
            圆角
          </label>
          <label>
            <input
              type="radio"
              name="borderRadius"
              checked={config.borderRadius === 'pill'}
              onChange={() => updateConfig({ borderRadius: 'pill' })}
            />
            胶囊
          </label>
        </div>
        
        <label>
          <input
            type="checkbox"
            checked={config.elevation}
            onChange={(e) => updateConfig({ elevation: e.target.checked })}
          />
          启用阴影效果
        </label>
      </div>
      
      {/* 按钮展示 */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <CustomButton 
          variant="primary" 
          rounded={config.borderRadius === 'sharp' ? 'none' : config.borderRadius === 'pill' ? 'full' : 'md'}
          elevation={config.elevation ? 'md' : 'none'}
        >
          主要按钮
        </CustomButton>
        
        <CustomButton 
          variant="secondary" 
          fill="outline"
          rounded={config.borderRadius === 'sharp' ? 'none' : config.borderRadius === 'pill' ? 'full' : 'md'}
          elevation={config.elevation ? 'md' : 'none'}
        >
          次要按钮
        </CustomButton>
        
        <CustomButton 
          variant="success" 
          fill="ghost"
          icon="✓"
          rounded={config.borderRadius === 'sharp' ? 'none' : config.borderRadius === 'pill' ? 'full' : 'md'}
          elevation={config.elevation ? 'md' : 'none'}
        >
          成功按钮
        </CustomButton>
        
        <CustomButton 
          variant="danger" 
          size="large"
          rounded={config.borderRadius === 'sharp' ? 'none' : config.borderRadius === 'pill' ? 'full' : 'md'}
          elevation={config.elevation ? 'md' : 'none'}
        >
          危险按钮
        </CustomButton>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <CustomThemeProvider config={{ borderRadius: 'rounded', elevation: true }}>
      <CustomThemeDemo />
    </CustomThemeProvider>
  );
};

export default App;
```

## 性能优化实践

### 1. 样式缓存优化

```typescript
// 高性能样式缓存实现
import { LRUCache } from 'lru-cache';

class AdvancedStyleCache {
  private cache: LRUCache<string, CSSObject>;
  private hitCount = 0;
  private missCount = 0;
  
  constructor(options = {}) {
    this.cache = new LRUCache({
      max: options.maxSize || 500,
      ttl: options.ttl || 1000 * 60 * 10, // 10 minutes
    });
  }
  
  get(key: string): CSSObject | undefined {
    const result = this.cache.get(key);
    if (result) {
      this.hitCount++;
    } else {
      this.missCount++;
    }
    return result;
  }
  
  set(key: string, value: CSSObject): void {
    this.cache.set(key, value);
  }
  
  getStats() {
    return {
      size: this.cache.size,
      hitRate: this.hitCount / (this.hitCount + this.missCount),
      hitCount: this.hitCount,
      missCount: this.missCount,
    };
  }
  
  clear(): void {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }
}

// 使用示例
const styleCache = new AdvancedStyleCache({ maxSize: 1000 });

const usePerformantStyles = (variant: string, size: string, fill: string) => {
  const cacheKey = `${variant}-${size}-${fill}`;
  
  return useMemo(() => {
    let styles = styleCache.get(cacheKey);
    
    if (!styles) {
      styles = computeButtonStyles({ variant, size, fill });
      styleCache.set(cacheKey, styles);
    }
    
    return styles;
  }, [cacheKey]);
};
```

### 2. 组件级性能优化

```typescript
import React, { memo, useCallback, useMemo } from 'react';

interface OptimizedButtonProps extends BaseButtonProps {
  // 稳定的引用避免不必要的重渲染
  onClickMemo?: () => void;
}

const OptimizedButton = memo<OptimizedButtonProps>(({
  variant,
  size,
  fill,
  children,
  onClick,
  onClickMemo,
  ...props
}) => {
  // 使用缓存的样式计算
  const styles = usePerformantStyles(variant, size, fill);
  
  // 稳定的事件处理器
  const handleClick = useCallback((event: React.MouseEvent) => {
    // 使用 memoized 回调优先
    if (onClickMemo) {
      onClickMemo();
    } else if (onClick) {
      onClick(event);
    }
  }, [onClick, onClickMemo]);
  
  // 渲染优化：避免创建新对象
  const buttonProps = useMemo(() => ({
    ...props,
    onClick: handleClick,
  }), [props, handleClick]);
  
  return (
    <button css={styles} {...buttonProps}>
      {children}
    </button>
  );
}, (prevProps, nextProps) => {
  // 自定义比较函数
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.size === nextProps.size &&
    prevProps.fill === nextProps.fill &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.loading === nextProps.loading &&
    prevProps.children === nextProps.children
  );
});

OptimizedButton.displayName = 'OptimizedButton';
```

### 3. 批量渲染优化

```typescript
import { unstable_batchedUpdates } from 'react-dom';

// 批量按钮更新 Hook
const useBatchedButtonUpdates = () => {
  const [updates, setUpdates] = useState([]);
  
  const batchUpdate = useCallback((buttonId: string, newState: any) => {
    unstable_batchedUpdates(() => {
      setUpdates(prev => [
        ...prev.filter(update => update.id !== buttonId),
        { id: buttonId, state: newState, timestamp: Date.now() }
      ]);
    });
  }, []);
  
  const flushUpdates = useCallback(() => {
    unstable_batchedUpdates(() => {
      setUpdates([]);
    });
  }, []);
  
  return { updates, batchUpdate, flushUpdates };
};

// 高性能按钮列表组件
const PerformantButtonList = ({ buttons = [] }) => {
  const { updates, batchUpdate } = useBatchedButtonUpdates();
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
  
  // 虚拟滚动优化
  const visibleButtons = useMemo(() => {
    return buttons.slice(visibleRange.start, visibleRange.end);
  }, [buttons, visibleRange]);
  
  // 缓存按钮渲染
  const renderedButtons = useMemo(() => {
    return visibleButtons.map((button) => {
      const update = updates.find(u => u.id === button.id);
      const currentState = update ? { ...button, ...update.state } : button;
      
      return (
        <OptimizedButton
          key={button.id}
          {...currentState}
          onClickMemo={() => {
            // 使用批量更新避免多次重渲染
            batchUpdate(button.id, { 
              clicked: true,
              lastClickTime: Date.now() 
            });
          }}
        />
      );
    });
  }, [visibleButtons, updates, batchUpdate]);
  
  return (
    <div 
      style={{ 
        height: '400px', 
        overflowY: 'auto' 
      }}
      onScroll={(e) => {
        const { scrollTop, clientHeight } = e.currentTarget;
        const itemHeight = 60; // 估算的按钮高度
        const start = Math.floor(scrollTop / itemHeight);
        const end = start + Math.ceil(clientHeight / itemHeight) + 5; // 预渲染几个
        
        setVisibleRange({ start, end });
      }}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px',
        padding: '20px'
      }}>
        {renderedButtons}
      </div>
    </div>
  );
};
```

---

通过这些示例和教程，你可以：

1. **快速上手**：从简单的按钮使用开始
2. **掌握高级功能**：学会使用主题切换、特效等高级特性
3. **应用到实际场景**：参考购物车、表单等实际应用示例
4. **创建自定义主题**：建立符合品牌需求的个性化主题
5. **优化性能**：通过缓存、批量更新等技术提升应用性能

这些示例涵盖了从基础使用到高级定制的各个方面，可以根据实际需求选择合适的实现方式。

---

**版本**: 1.0.0  
**最后更新**: 2024年  
**维护者**: YggJS Team