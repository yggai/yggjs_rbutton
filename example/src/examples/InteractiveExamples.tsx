/**
 * 交互演示组件
 * 展示 TechButton 的路由集成、可访问性和企业级功能
 */
import React, { useState, useCallback } from 'react';
import { TechButton } from 'yggjs_rbutton';
import { DemoPanel, DemoGrid, DemoItem } from '@/components/DemoPanel';
import { CodeDisplay } from '@/components/CodeDisplay';
import {
  ArrowIcon,
  SettingsIcon,
  HeartIcon,
  SaveIcon
} from '@/components/Icons';

/**
 * 路由集成演示
 */
export const RouterIntegrationDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { ArrowIcon } from '@/components/Icons';

function RouterIntegrationExample() {
  return (
    <div>
      {/* 渲染为链接 */}
      <TechButton 
        as="a" 
        href="https://github.com/yggjs/yggjs_rbutton"
        target="_blank"
        iconRight={<ArrowIcon />}
        variant="primary"
      >
        访问GitHub仓库
      </TechButton>

      {/* 内部链接 */}
      <TechButton 
        as="a" 
        href="#documentation"
        iconLeft={<ArrowIcon />}
        variant="secondary"
      >
        跳转到文档
      </TechButton>

      {/* 禁用的链接 */}
      <TechButton 
        as="a" 
        href="#disabled-link"
        disabled
        variant="secondary"
      >
        禁用的链接
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="路由集成支持"
      description="支持渲染为不同类型的元素，无缝集成路由系统"
      variant="primary"
    >
      <DemoGrid columns={3}>
        <DemoItem label="外部链接" center>
          <TechButton 
            as="a" 
            href="https://github.com/yggjs/yggjs_rbutton"
            target="_blank"
            iconRight={<ArrowIcon />}
            variant="primary"
          >
            GitHub仓库
          </TechButton>
        </DemoItem>
        <DemoItem label="内部链接" center>
          <TechButton 
            as="a" 
            href="#documentation"
            iconLeft={<ArrowIcon />}
            variant="secondary"
          >
            文档链接
          </TechButton>
        </DemoItem>
        <DemoItem label="禁用的链接" center>
          <TechButton 
            as="a" 
            href="#disabled-link"
            disabled
            variant="secondary"
          >
            禁用链接
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="路由集成示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 可访问性功能演示
 */
export const AccessibilityDemo: React.FC = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const toggleHighContrast = useCallback((): void => {
    setHighContrast(!highContrast);
  }, [highContrast]);

  const toggleReduceMotion = useCallback((): void => {
    setReduceMotion(!reduceMotion);
  }, [reduceMotion]);

  const codeExample = `
import React, { useState } from 'react';
import { TechButton } from 'yggjs_rbutton';
import { SettingsIcon, HeartIcon } from '@/components/Icons';

function AccessibilityExample() {
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div>
      {/* 高对比度模式 */}
      <TechButton 
        accessibility={{ 
          highContrast: true,
          ariaDescribedBy: 'high-contrast-help' 
        }}
        variant="primary"
      >
        高对比度按钮
      </TechButton>

      {/* 减少动画效果 */}
      <TechButton 
        accessibility={{ 
          reduceMotion: true 
        }}
        loading
        variant="secondary"
      >
        无动画加载按钮
      </TechButton>

      {/* 完整可访问性配置 */}
      <TechButton 
        iconLeft={<HeartIcon />}
        iconOnly
        accessibility={{
          highContrast: true,
          reduceMotion: true,
          ariaDescribedBy: 'favorite-help'
        }}
        i18n={{ 
          ariaLabel: 'Add to favorites' 
        }}
        variant="danger"
      >
        收藏
      </TechButton>

      {/* 隐藏的帮助文本 */}
      <div id="high-contrast-help" style={{ display: 'none' }}>
        此按钮使用高对比度模式以提高可读性
      </div>
      <div id="favorite-help" style={{ display: 'none' }}>
        点击此按钮将项目添加到收藏夹
      </div>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="高级可访问性功能"
      description="支持高对比度模式、减少动画效果等无障碍访问功能"
      variant="success"
    >
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          可访问性设置控制
        </h4>
        <DemoGrid columns={2}>
          <DemoItem center>
            <TechButton 
              onClick={toggleHighContrast}
              variant={highContrast ? 'primary' : 'secondary'}
            >
              {highContrast ? '关闭' : '开启'}高对比度
            </TechButton>
          </DemoItem>
          <DemoItem center>
            <TechButton 
              onClick={toggleReduceMotion}
              variant={reduceMotion ? 'primary' : 'secondary'}
            >
              {reduceMotion ? '开启' : '关闭'}动画效果
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          可访问性功能演示
        </h4>
        <DemoGrid columns={3}>
          <DemoItem label="高对比度" center>
            <TechButton 
              accessibility={{ 
                highContrast: true,
                ariaDescribedBy: 'high-contrast-help' 
              }}
              variant="primary"
            >
              高对比度按钮
            </TechButton>
          </DemoItem>
          <DemoItem label="减少动画" center>
            <TechButton 
              accessibility={{ 
                reduceMotion: true 
              }}
              loading
              variant="secondary"
            >
              无动画加载
            </TechButton>
          </DemoItem>
          <DemoItem label="完整可访问性" center>
            <TechButton 
              iconLeft={<HeartIcon />}
              iconOnly
              accessibility={{
                highContrast: highContrast,
                reduceMotion: reduceMotion,
                ariaDescribedBy: 'favorite-help'
              }}
              i18n={{ 
                ariaLabel: 'Add to favorites' 
              }}
              variant="danger"
            >
              收藏
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>

      {/* 隐藏的帮助文本 */}
      <div id="high-contrast-help" style={{ display: 'none' }}>
        此按钮使用高对比度模式以提高可读性
      </div>
      <div id="favorite-help" style={{ display: 'none' }}>
        点击此按钮将项目添加到收藏夹
      </div>
      
      <CodeDisplay
        title="高级可访问性示例"
        code={codeExample}
        language="tsx"
      />
    </DemoPanel>
  );
};

/**
 * 企业级功能组合演示
 */
export const EnterpriseDemo: React.FC = () => {
  const [formState, setFormState] = useState({
    loading: false,
    submitted: false,
  });

  const handleSubmit = useCallback(async (): Promise<void> => {
    setFormState({ loading: true, submitted: false });
    
    // 模拟异步提交
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormState({ loading: false, submitted: true });
    
    // 重置状态
    setTimeout(() => {
      setFormState({ loading: false, submitted: false });
    }, 3000);
  }, []);

  const codeExample = `
import React, { useState, useCallback } from 'react';
import { TechButton } from 'yggjs_rbutton';
import { SaveIcon, SettingsIcon, ArrowIcon } from '@/components/Icons';

function EnterpriseExample() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      // 企业级表单提交逻辑
      await submitToAPI({
        data: formData,
        headers: { 'Authorization': \`Bearer \${token}\` }
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {/* 企业级主提交按钮 */}
      <TechButton 
        type="submit"
        variant="primary"
        size="large"
        iconLeft={<SaveIcon />}
        loading={loading}
        preventDoubleClick
        debounceDelay={500}
        glowing
        fullWidth
        accessibility={{
          highContrast: true,
          ariaDescribedBy: 'submit-help'
        }}
        i18n={{
          loadingText: '正在提交表单...',
          ariaLabel: '提交企业级表单'
        }}
      >
        {loading ? '提交中...' : '提交企业级表单'}
      </TechButton>

      {/* 次要操作按钮 */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <TechButton 
          variant="secondary"
          iconLeft={<SettingsIcon />}
          disabled={loading}
        >
          高级设置
        </TechButton>
        <TechButton 
          as="a"
          href="/help"
          variant="secondary"
          fill="link"
          iconRight={<ArrowIcon />}
        >
          获取帮助
        </TechButton>
      </div>

      <div id="submit-help" style={{ display: 'none' }}>
        点击此按钮将提交表单数据到服务器
      </div>
    </form>
  );
}`;

  return (
    <DemoPanel
      title="企业级功能组合"
      description="展示所有高级功能的综合应用场景"
      variant="primary"
    >
      <div style={{ maxWidth: '500px' }}>
        {/* 主要提交按钮 */}
        <TechButton 
          variant="primary"
          size="large"
          iconLeft={<SaveIcon />}
          loading={formState.loading}
          preventDoubleClick
          debounceDelay={500}
          glowing={!formState.loading}
          fullWidth
          accessibility={{
            highContrast: true,
            ariaDescribedBy: 'submit-help'
          }}
          i18n={{
            loadingText: '正在提交表单...',
            ariaLabel: '提交企业级表单'
          }}
          onClick={handleSubmit}
        >
          {formState.loading 
            ? '提交中...' 
            : formState.submitted 
              ? '提交成功！' 
              : '提交企业级表单'
          }
        </TechButton>

        {/* 次要操作按钮 */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'center' }}>
          <TechButton 
            variant="secondary"
            iconLeft={<SettingsIcon />}
            disabled={formState.loading}
            size="medium"
          >
            高级设置
          </TechButton>
          <TechButton 
            as="a"
            href="https://github.com/yggjs/yggjs_rbutton"
            target="_blank"
            variant="secondary"
            fill="link"
            iconRight={<ArrowIcon />}
            size="medium"
          >
            获取帮助
          </TechButton>
        </div>

        {/* 状态提示 */}
        {formState.submitted && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '6px',
            color: '#059669',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            ✅ 表单提交成功！演示了防重复点击、加载状态等企业级功能。
          </div>
        )}
      </div>

      <div id="submit-help" style={{ display: 'none' }}>
        点击此按钮将提交表单数据到服务器
      </div>
      
      <div style={{ marginTop: '32px' }}>
        <CodeDisplay
          title="企业级功能组合示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 键盘导航演示
 */
export const KeyboardNavigationDemo: React.FC = () => {
  const [focusedButton, setFocusedButton] = useState<string | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleFocus = useCallback((buttonId: string) => (): void => {
    setFocusedButton(buttonId);
  }, []);

  const handleBlur = useCallback((): void => {
    setFocusedButton(null);
  }, []);

  const handleClick = useCallback((buttonId: string) => (): void => {
    setClickedButton(buttonId);
    setTimeout(() => setClickedButton(null), 1000);
  }, []);

  const codeExample = `
import React, { useState, useCallback } from 'react';
import { TechButton } from 'yggjs_rbutton';

function KeyboardNavigationExample() {
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const handleKeyboardClick = useCallback((buttonId: string) => () => {
    setLastClicked(buttonId);
    console.log(\`键盘激活按钮: \${buttonId}\`);
  }, []);

  return (
    <div>
      <p>使用 Tab 键导航，使用 Enter 或 Space 键激活按钮：</p>
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <TechButton 
          variant="primary"
          onClick={handleKeyboardClick('primary')}
          onFocus={() => console.log('主按钮获得焦点')}
        >
          主要按钮 (Tab + Enter)
        </TechButton>
        
        <TechButton 
          variant="secondary"
          onClick={handleKeyboardClick('secondary')}
        >
          次要按钮 (Tab + Space)
        </TechButton>
        
        <TechButton 
          variant="success"
          disabled
        >
          禁用按钮 (跳过焦点)
        </TechButton>
        
        <TechButton 
          variant="danger"
          iconLeft={<SettingsIcon />}
          onClick={handleKeyboardClick('icon-button')}
        >
          图标按钮
        </TechButton>
      </div>
      
      {lastClicked && (
        <p>最后激活的按钮: {lastClicked}</p>
      )}
    </div>
  );
}`;

  return (
    <DemoPanel
      title="键盘导航支持"
      description="完整的键盘导航支持，符合WCAG 2.1 AA标准"
      variant="default"
    >
      <div style={{ marginBottom: '16px' }}>
        <p style={{ 
          margin: '0 0 16px 0', 
          fontSize: '14px', 
          color: '#6b7280',
          lineHeight: '1.5'
        }}>
          使用 <kbd style={{ 
            padding: '2px 6px', 
            backgroundColor: '#f3f4f6', 
            border: '1px solid #d1d5db',
            borderRadius: '3px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>Tab</kbd> 键导航，
          使用 <kbd style={{ 
            padding: '2px 6px', 
            backgroundColor: '#f3f4f6', 
            border: '1px solid #d1d5db',
            borderRadius: '3px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>Enter</kbd> 或 <kbd style={{ 
            padding: '2px 6px', 
            backgroundColor: '#f3f4f6', 
            border: '1px solid #d1d5db',
            borderRadius: '3px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>Space</kbd> 键激活按钮
        </p>
      </div>

      <DemoGrid columns={4}>
        <DemoItem center>
          <TechButton 
            variant="primary"
            onClick={handleClick('primary')}
            onFocus={handleFocus('primary')}
            onBlur={handleBlur}
          >
            主要按钮
          </TechButton>
        </DemoItem>
        <DemoItem center>
          <TechButton 
            variant="secondary"
            onClick={handleClick('secondary')}
            onFocus={handleFocus('secondary')}
            onBlur={handleBlur}
          >
            次要按钮
          </TechButton>
        </DemoItem>
        <DemoItem center>
          <TechButton 
            variant="success"
            disabled
          >
            禁用按钮
          </TechButton>
        </DemoItem>
        <DemoItem center>
          <TechButton 
            variant="danger"
            iconLeft={<SettingsIcon />}
            onClick={handleClick('icon-button')}
            onFocus={handleFocus('icon-button')}
            onBlur={handleBlur}
          >
            图标按钮
          </TechButton>
        </DemoItem>
      </DemoGrid>

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        {focusedButton && (
          <div style={{
            display: 'inline-block',
            padding: '8px 12px',
            backgroundColor: '#eff6ff',
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            color: '#1d4ed8',
            fontSize: '14px',
          }}>
            当前焦点: {focusedButton}
          </div>
        )}
        {clickedButton && (
          <div style={{
            display: 'inline-block',
            marginLeft: focusedButton ? '12px' : '0',
            padding: '8px 12px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '4px',
            color: '#059669',
            fontSize: '14px',
          }}>
            已激活: {clickedButton}
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="键盘导航示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};