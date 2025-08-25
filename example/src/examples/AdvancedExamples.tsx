/**
 * 响应式设计和高级功能演示组件
 * 展示 TechButton 的响应式设计、RTL支持、主题切换等高级功能
 */
import React, { useState, useCallback } from 'react';
import { TechButton } from 'yggjs_rbutton';
import { DemoPanel, DemoGrid, DemoItem } from '@/components/DemoPanel';
import { CodeDisplay } from '@/components/CodeDisplay';
import { 
  ArrowIcon, 
  SettingsIcon, 
  SaveIcon,
  SunIcon,
  MoonIcon
} from '@/components/Icons';

/**
 * 响应式设计演示
 */
export const ResponsiveDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';

function ResponsiveExample() {
  return (
    <div style={{ maxWidth: '600px' }}>
      {/* 响应式按钮会根据容器宽度自动调整 */}
      <TechButton responsive fullWidth variant="primary">
        响应式按钮 - 调整浏览器窗口大小查看效果
      </TechButton>
      
      {/* 最小触摸目标确保移动端易用性 */}
      <TechButton minTouchTarget variant="secondary">
        最小触摸目标（44px x 44px）
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="响应式设计"
      description="根据屏幕尺寸自动适配，确保在所有设备上的良好体验"
      variant="primary"
    >
      <div style={{ marginBottom: '24px' }}>
        <DemoItem label="响应式按钮">
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <TechButton responsive fullWidth variant="primary">
              响应式按钮 - 调整窗口大小查看效果
            </TechButton>
          </div>
        </DemoItem>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <DemoItem label="最小触摸目标（移动端优化）">
          <TechButton minTouchTarget variant="secondary">
            最小触摸目标（44px × 44px）
          </TechButton>
        </DemoItem>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <DemoItem label="响应式 + 最小触摸目标组合">
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <TechButton responsive minTouchTarget fullWidth variant="success">
              移动端友好的响应式按钮
            </TechButton>
          </div>
        </DemoItem>
      </div>
      
      <CodeDisplay
        title="响应式设计示例"
        code={codeExample}
        language="tsx"
      />
    </DemoPanel>
  );
};

/**
 * RTL语言支持演示
 */
export const RTLSupportDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { ArrowIcon, SettingsIcon } from '@/components/Icons';

function RTLSupportExample() {
  return (
    <div>
      {/* LTR模式（从左到右） */}
      <div style={{ direction: 'ltr', marginBottom: '16px' }}>
        <TechButton 
          iconLeft={<ArrowIcon />}
          iconRight={<SettingsIcon />}
          dir="ltr"
        >
          English Button (LTR)
        </TechButton>
      </div>
      
      {/* RTL模式（从右到左） */}
      <div style={{ direction: 'rtl', marginBottom: '16px' }}>
        <TechButton 
          iconLeft={<ArrowIcon />}
          iconRight={<SettingsIcon />}
          dir="rtl"
        >
          العربية زر (RTL)
        </TechButton>
      </div>
      
      {/* 自动检测模式 */}
      <div>
        <TechButton 
          iconLeft={<ArrowIcon />}
          dir="auto"
        >
          Auto Direction Button
        </TechButton>
      </div>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="RTL语言支持"
      description="支持从右到左的语言布局，图标位置自动适配"
      variant="default"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DemoItem label="LTR模式（从左到右）">
          <div style={{ direction: 'ltr' }}>
            <TechButton 
              iconLeft={<ArrowIcon />}
              iconRight={<SettingsIcon />}
              dir="ltr"
            >
              English Button (LTR)
            </TechButton>
          </div>
        </DemoItem>
        
        <DemoItem label="RTL模式（从右到左）">
          <div style={{ direction: 'rtl' }}>
            <TechButton 
              iconLeft={<ArrowIcon />}
              iconRight={<SettingsIcon />}
              dir="rtl"
              variant="primary"
            >
              العربية زر (RTL)
            </TechButton>
          </div>
        </DemoItem>
        
        <DemoItem label="自动检测模式">
          <TechButton 
            iconLeft={<ArrowIcon />}
            dir="auto"
            variant="secondary"
          >
            Auto Direction Button
          </TechButton>
        </DemoItem>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="RTL语言支持示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 主题切换演示
 */
export const ThemeDemo: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'auto'>('light');

  const handleThemeChange = useCallback((theme: 'light' | 'dark' | 'auto'): void => {
    setCurrentTheme(theme);
  }, []);

  const codeExample = `
import React, { useState } from 'react';
import { TechButton } from 'yggjs_rbutton';
import { SunIcon, MoonIcon, SettingsIcon } from '@/components/Icons';

function ThemeExample() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');

  return (
    <div>
      {/* 主题切换按钮 */}
      <div style={{ marginBottom: '16px' }}>
        <TechButton 
          iconLeft={<SunIcon />}
          variant="secondary"
          onClick={() => setTheme('light')}
        >
          亮色主题
        </TechButton>
        <TechButton 
          iconLeft={<MoonIcon />}
          variant="secondary"
          onClick={() => setTheme('dark')}
        >
          暗色主题
        </TechButton>
        <TechButton 
          iconLeft={<SettingsIcon />}
          variant="secondary"
          onClick={() => setTheme('auto')}
        >
          自动主题
        </TechButton>
      </div>

      {/* 使用指定主题的按钮 */}
      <TechButton theme={theme} variant="primary">
        当前主题: {theme}
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="主题系统"
      description="支持亮色、暗色和自动主题切换"
      variant="success"
    >
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          主题切换控制
        </h4>
        <DemoGrid columns={3}>
          <DemoItem center>
            <TechButton 
              iconLeft={<SunIcon />}
              variant={currentTheme === 'light' ? 'primary' : 'secondary'}
              onClick={() => handleThemeChange('light')}
            >
              亮色主题
            </TechButton>
          </DemoItem>
          <DemoItem center>
            <TechButton 
              iconLeft={<MoonIcon />}
              variant={currentTheme === 'dark' ? 'primary' : 'secondary'}
              onClick={() => handleThemeChange('dark')}
            >
              暗色主题
            </TechButton>
          </DemoItem>
          <DemoItem center>
            <TechButton 
              iconLeft={<SettingsIcon />}
              variant={currentTheme === 'auto' ? 'primary' : 'secondary'}
              onClick={() => handleThemeChange('auto')}
            >
              自动主题
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>

      <div style={{ 
        padding: '24px', 
        backgroundColor: currentTheme === 'dark' ? '#1a1a1a' : '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '16px', 
          fontWeight: '600', 
          color: currentTheme === 'dark' ? '#fff' : '#374151' 
        }}>
          当前主题效果预览: {currentTheme}
        </h4>
        <DemoGrid columns={4}>
          <DemoItem center>
            <TechButton theme={currentTheme} variant="primary">
              主要
            </TechButton>
          </DemoItem>
          <DemoItem center>
            <TechButton theme={currentTheme} variant="secondary">
              次要
            </TechButton>
          </DemoItem>
          <DemoItem center>
            <TechButton theme={currentTheme} variant="success">
              成功
            </TechButton>
          </DemoItem>
          <DemoItem center>
            <TechButton theme={currentTheme} variant="danger">
              危险
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="主题系统示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 防重复点击演示
 */
export const DebounceDemo: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [debounceCount, setDebounceCount] = useState(0);

  const handleNormalClick = useCallback((): void => {
    setClickCount(prev => prev + 1);
  }, []);

  const handleDebounceClick = useCallback((): void => {
    setDebounceCount(prev => prev + 1);
  }, []);

  const handleReset = useCallback((): void => {
    setClickCount(0);
    setDebounceCount(0);
  }, []);

  const codeExample = `
import React, { useState, useCallback } from 'react';
import { TechButton } from 'yggjs_rbutton';

function DebounceExample() {
  const [submitCount, setSubmitCount] = useState(0);

  const handleSubmit = useCallback(() => {
    setSubmitCount(prev => prev + 1);
    console.log('表单提交次数:', submitCount + 1);
  }, [submitCount]);

  return (
    <div>
      {/* 普通按钮 - 可能被重复点击 */}
      <TechButton onClick={handleSubmit}>
        普通提交按钮 (可能重复点击)
      </TechButton>

      {/* 防抖按钮 - 防止重复点击 */}
      <TechButton 
        onClick={handleSubmit}
        preventDoubleClick
        debounceDelay={500}
        variant="primary"
      >
        防抖提交按钮 (500ms内只能点击一次)
      </TechButton>

      {/* 自定义延迟的防抖按钮 */}
      <TechButton 
        onClick={handleSubmit}
        preventDoubleClick
        debounceDelay={1000}
        variant="success"
      >
        1秒防抖按钮
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="防重复点击保护"
      description="防止用户快速多次点击导致的意外操作"
      variant="warning"
    >
      <div style={{ marginBottom: '24px' }}>
        <p style={{ 
          margin: '0 0 16px 0', 
          fontSize: '14px', 
          color: '#6b7280',
          lineHeight: '1.5'
        }}>
          快速多次点击下面的按钮，观察计数器的变化：
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          alignItems: 'center',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <TechButton onClick={handleNormalClick}>
            普通按钮 ({clickCount})
          </TechButton>
          
          <TechButton 
            onClick={handleDebounceClick}
            preventDoubleClick
            debounceDelay={500}
            variant="primary"
          >
            防抖按钮 ({debounceCount})
          </TechButton>
          
          <TechButton 
            onClick={handleReset}
            variant="secondary"
            size="small"
          >
            重置计数器
          </TechButton>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          不同延迟时间的防抖效果
        </h4>
        <DemoGrid columns={3}>
          <DemoItem label="300ms防抖（默认）" center>
            <TechButton 
              preventDoubleClick
              debounceDelay={300}
              variant="secondary"
            >
              快速防抖
            </TechButton>
          </DemoItem>
          <DemoItem label="800ms防抖" center>
            <TechButton 
              preventDoubleClick
              debounceDelay={800}
              variant="primary"
            >
              中等防抖
            </TechButton>
          </DemoItem>
          <DemoItem label="1500ms防抖" center>
            <TechButton 
              preventDoubleClick
              debounceDelay={1500}
              variant="success"
            >
              慢速防抖
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>
      
      <CodeDisplay
        title="防重复点击示例"
        code={codeExample}
        language="tsx"
      />
    </DemoPanel>
  );
};

/**
 * 国际化支持演示
 */
export const I18nDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { SaveIcon, UploadIcon } from '@/components/Icons';

function I18nExample() {
  return (
    <div>
      {/* 中文界面 */}
      <TechButton 
        loading 
        i18n={{ 
          loadingText: '正在保存...', 
          ariaLabel: '保存按钮' 
        }}
        iconLeft={<SaveIcon />}
      >
        保存
      </TechButton>

      {/* 英文界面 */}
      <TechButton 
        loading 
        i18n={{ 
          loadingText: 'Uploading...', 
          ariaLabel: 'Upload button' 
        }}
        iconLeft={<UploadIcon />}
        variant="primary"
      >
        Upload
      </TechButton>

      {/* 纯图标按钮的国际化标签 */}
      <TechButton 
        iconLeft={<SaveIcon />}
        iconOnly
        i18n={{ ariaLabel: 'Save file' }}
        variant="success"
      >
        保存文件
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="国际化文本支持"
      description="支持多语言环境下的文本处理和可访问性标签"
      variant="default"
    >
      <DemoGrid columns={3}>
        <DemoItem label="中文加载文本" center>
          <TechButton 
            loading 
            i18n={{ 
              loadingText: '正在保存...', 
              ariaLabel: '保存按钮' 
            }}
            iconLeft={<SaveIcon />}
          >
            保存
          </TechButton>
        </DemoItem>
        <DemoItem label="英文加载文本" center>
          <TechButton 
            loading 
            i18n={{ 
              loadingText: 'Uploading...', 
              ariaLabel: 'Upload button' 
            }}
            variant="primary"
          >
            Upload
          </TechButton>
        </DemoItem>
        <DemoItem label="自定义可访问性标签" center>
          <TechButton 
            iconLeft={<SaveIcon />}
            iconOnly
            i18n={{ ariaLabel: 'Save current document' }}
            variant="success"
          >
            保存文档
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="国际化支持示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};