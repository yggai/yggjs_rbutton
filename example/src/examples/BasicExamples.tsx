/**
 * 基础示例组件
 * 
 * 展示YggJS多主题按钮系统的基础功能：
 * - 科技风主题和极简主题的基本用法
 * - 不同尺寸和变体的展示
 * - 按钮状态和交互效果
 * - 响应式布局适配
 * 
 * @version 1.0.0
 * @author YggJS Team
 */
import React, { useState, useCallback, useMemo } from 'react';
import { css } from '@emotion/react';

// 导入按钮组件
import { TechButton } from 'yggjs_rbutton';

/**
 * 组件属性接口
 */
interface BasicExamplesProps {
  theme: {
    mode: 'light' | 'dark';
    colors: Record<string, string>;
    typography: Record<string, any>;
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
    shadows: Record<string, string>;
    animations: Record<string, any>;
    breakpoints: Record<string, string>;
  };
}

/**
 * 演示容器组件
 */
interface DemoSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  theme: BasicExamplesProps['theme'];
}

const DemoSection: React.FC<DemoSectionProps> = React.memo(({ 
  title, 
  description, 
  children, 
  theme 
}) => {
  const sectionStyles = useMemo(() => css`
    margin-bottom: ${theme.spacing['2xl']};
    padding: ${theme.spacing['2xl']};
    background-color: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.sm};
    
    .section-header {
      margin-bottom: ${theme.spacing.xl};
      
      .section-title {
        margin: 0 0 ${theme.spacing.sm} 0;
        font-size: ${theme.typography.fontSize.xl};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        line-height: ${theme.typography.lineHeight.tight};
      }
      
      .section-description {
        margin: 0;
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        line-height: ${theme.typography.lineHeight.normal};
      }
    }
    
    .section-content {
      display: flex;
      flex-wrap: wrap;
      gap: ${theme.spacing.lg};
      align-items: flex-start;
      
      @media (max-width: ${theme.breakpoints.md}) {
        gap: ${theme.spacing.md};
      }
      
      @media (max-width: ${theme.breakpoints.sm}) {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `, [theme]);

  return (
    <section css={sectionStyles}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
});

DemoSection.displayName = 'DemoSection';

/**
 * 主题对比演示
 */
const ThemeComparisonDemo: React.FC<{ theme: BasicExamplesProps['theme'] }> = React.memo(({ theme }) => {
  const [selectedVariant, setSelectedVariant] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning'>('primary');
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');

  const variants: Array<{ key: typeof selectedVariant; label: string; color: string }> = [
    { key: 'primary', label: '主要', color: theme.colors.primary },
    { key: 'secondary', label: '次要', color: theme.colors.secondary },
    { key: 'success', label: '成功', color: theme.colors.success },
    { key: 'danger', label: '危险', color: theme.colors.danger },
    { key: 'warning', label: '警告', color: theme.colors.warning },
  ];

  const sizes: Array<{ key: typeof selectedSize; label: string }> = [
    { key: 'small', label: '小' },
    { key: 'medium', label: '中' },
    { key: 'large', label: '大' },
  ];

  const controlStyles = useMemo(() => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.lg};
    min-width: 280px;
    
    .control-group {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.sm};
      
      .control-label {
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.medium};
        color: ${theme.colors.text};
      }
      
      .control-options {
        display: flex;
        flex-wrap: wrap;
        gap: ${theme.spacing.xs};
      }
      
      .control-option {
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        border: 1px solid ${theme.colors.border};
        border-radius: ${theme.borderRadius.md};
        background-color: ${theme.colors.background};
        color: ${theme.colors.textSecondary};
        cursor: pointer;
        font-size: ${theme.typography.fontSize.sm};
        transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
        
        &:hover {
          border-color: ${theme.colors.primary};
          color: ${theme.colors.text};
        }
        
        &.active {
          background-color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          color: white;
        }
      }
    }
  `, [theme]);

  const comparisonStyles = useMemo(() => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xl};
    flex: 1;
    
    .theme-group {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.md};
      padding: ${theme.spacing.lg};
      border: 1px solid ${theme.colors.border};
      border-radius: ${theme.borderRadius.lg};
      background-color: ${theme.colors.background};
      
      .theme-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.md} 0;
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};
        
        .theme-icon {
          font-size: ${theme.typography.fontSize.xl};
        }
      }
      
      .theme-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: ${theme.spacing.md};
        align-items: center;
      }
    }
  `, [theme]);

  return (
    <DemoSection
      title="主题对比演示"
      description="直观对比科技风主题和极简主题的视觉差异，支持实时调整变体和尺寸参数"
      theme={theme}
    >
      <div css={controlStyles}>
        <div className="control-group">
          <label className="control-label">按钮变体：</label>
          <div className="control-options">
            {variants.map((variant) => (
              <button
                key={variant.key}
                className={`control-option ${selectedVariant === variant.key ? 'active' : ''}`}
                onClick={() => setSelectedVariant(variant.key)}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">按钮尺寸：</label>
          <div className="control-options">
            {sizes.map((size) => (
              <button
                key={size.key}
                className={`control-option ${selectedSize === size.key ? 'active' : ''}`}
                onClick={() => setSelectedSize(size.key)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div css={comparisonStyles}>
        <div className="theme-group">
          <h3 className="theme-title">
            <span className="theme-icon">🚀</span>
            科技风主题
          </h3>
          <div className="theme-buttons">
            <TechButton variant={selectedVariant} size={selectedSize}>
              {selectedVariant} {selectedSize}
            </TechButton>
            <TechButton variant={selectedVariant} size={selectedSize} disabled>
              禁用状态
            </TechButton>
            <TechButton variant={selectedVariant} size={selectedSize} loading>
              加载中...
            </TechButton>
          </div>
        </div>

        <div className="theme-group">
          <h3 className="theme-title">
            <span className="theme-icon">✨</span>
            极简主题
          </h3>
          <div className="theme-buttons">
            <TechButton variant={selectedVariant} size={selectedSize} fill="outline">
              {selectedVariant} {selectedSize}
            </TechButton>
            <TechButton variant={selectedVariant} size={selectedSize} fill="outline" disabled>
              禁用状态
            </TechButton>
            <TechButton variant={selectedVariant} size={selectedSize} fill="outline" loading>
              加载中...
            </TechButton>
          </div>
        </div>
      </div>
    </DemoSection>
  );
});

ThemeComparisonDemo.displayName = 'ThemeComparisonDemo';

/**
 * 尺寸和变体展示
 */
const SizesAndVariantsDemo: React.FC<{ theme: BasicExamplesProps['theme'] }> = React.memo(({ theme }) => {
  const matrixStyles = useMemo(() => css`
    display: grid;
    grid-template-columns: auto repeat(3, 1fr);
    gap: ${theme.spacing.md};
    align-items: center;
    background-color: ${theme.colors.background};
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.border};
    
    .matrix-header {
      font-size: ${theme.typography.fontSize.sm};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.text};
      text-align: center;
      padding: ${theme.spacing.sm};
      background-color: ${theme.colors.surface};
      border-radius: ${theme.borderRadius.sm};
    }
    
    .matrix-label {
      font-size: ${theme.typography.fontSize.sm};
      font-weight: ${theme.typography.fontWeight.medium};
      color: ${theme.colors.textSecondary};
      padding: ${theme.spacing.sm};
      text-align: right;
    }
    
    .matrix-cell {
      display: flex;
      justify-content: center;
      padding: ${theme.spacing.sm};
    }
    
    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: 1fr;
      gap: ${theme.spacing.lg};
      
      .matrix-header {
        display: none;
      }
      
      .matrix-label {
        text-align: center;
        background-color: ${theme.colors.surface};
        border-radius: ${theme.borderRadius.sm};
      }
      
      .matrix-cell {
        border-bottom: 1px solid ${theme.colors.border};
        padding-bottom: ${theme.spacing.lg};
        
        &:last-child {
          border-bottom: none;
        }
      }
    }
  `, [theme]);

  const variants = ['primary', 'secondary', 'success', 'danger', 'warning'] as const;
  const sizes = ['small', 'medium', 'large'] as const;

  return (
    <DemoSection
      title="尺寸和变体矩阵"
      description="系统化展示所有尺寸和变体的组合效果，便于选择合适的按钮样式"
      theme={theme}
    >
      <div css={matrixStyles}>
        {/* 表头 */}
        <div></div>
        {sizes.map((size) => (
          <div key={size} className="matrix-header">
            {size === 'small' ? '小尺寸' : size === 'medium' ? '中尺寸' : '大尺寸'}
          </div>
        ))}
        
        {/* 矩阵内容 */}
        {variants.map((variant) => (
          <React.Fragment key={variant}>
            <div className="matrix-label">
              {variant === 'primary' ? '主要按钮' :
               variant === 'secondary' ? '次要按钮' :
               variant === 'success' ? '成功按钮' :
               variant === 'danger' ? '危险按钮' : '警告按钮'}
            </div>
            {sizes.map((size) => (
              <div key={`${variant}-${size}`} className="matrix-cell">
                <TechButton variant={variant} size={size}>
                  {variant}
                </TechButton>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </DemoSection>
  );
});

SizesAndVariantsDemo.displayName = 'SizesAndVariantsDemo';

/**
 * 交互状态演示
 */
const InteractiveStatesDemo: React.FC<{ theme: BasicExamplesProps['theme'] }> = React.memo(({ theme }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleAsyncAction = useCallback(async () => {
    setIsLoading(true);
    try {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 2000));
      setClickCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const interactiveStyles = useMemo(() => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xl};
    
    .state-group {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.md};
      
      .state-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.medium};
        color: ${theme.colors.text};
        margin: 0;
      }
      
      .state-description {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        margin: 0 0 ${theme.spacing.md} 0;
      }
      
      .state-examples {
        display: flex;
        flex-wrap: wrap;
        gap: ${theme.spacing.md};
        align-items: center;
        
        @media (max-width: ${theme.breakpoints.sm}) {
          flex-direction: column;
          align-items: stretch;
        }
      }
    }
    
    .click-counter {
      padding: ${theme.spacing.md};
      background-color: ${theme.colors.surface};
      border-radius: ${theme.borderRadius.md};
      border: 1px solid ${theme.colors.border};
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.textSecondary};
    }
  `, [theme]);

  return (
    <DemoSection
      title="交互状态演示"
      description="展示按钮在不同交互状态下的视觉反馈和用户体验"
      theme={theme}
    >
      <div css={interactiveStyles}>
        <div className="state-group">
          <h3 className="state-title">基本状态</h3>
          <p className="state-description">正常、禁用和加载状态的对比</p>
          <div className="state-examples">
            <TechButton variant="primary">正常状态</TechButton>
            <TechButton variant="primary" disabled>禁用状态</TechButton>
            <TechButton variant="primary" loading>加载状态</TechButton>
          </div>
        </div>

        <div className="state-group">
          <h3 className="state-title">异步操作</h3>
          <p className="state-description">模拟真实的异步操作场景</p>
          <div className="state-examples">
            <TechButton
              variant="success"
              loading={isLoading}
              onClick={handleAsyncAction}
              disabled={isLoading}
            >
              {isLoading ? '处理中...' : '点击执行异步操作'}
            </TechButton>
            {clickCount > 0 && (
              <div className="click-counter">
                已执行 {clickCount} 次操作
              </div>
            )}
          </div>
        </div>

        <div className="state-group">
          <h3 className="state-title">填充模式对比</h3>
          <p className="state-description">solid、outline和ghost三种填充模式</p>
          <div className="state-examples">
            <TechButton variant="primary" fill="solid">Solid 填充</TechButton>
            <TechButton variant="primary" fill="outline">Outline 边框</TechButton>
            <TechButton variant="primary" fill="ghost">Ghost 透明</TechButton>
          </div>
        </div>
      </div>
    </DemoSection>
  );
});

InteractiveStatesDemo.displayName = 'InteractiveStatesDemo';

/**
 * 基础示例主组件
 */
const BasicExamples: React.FC<BasicExamplesProps> = ({ theme }) => {
  return (
    <div>
      <ThemeComparisonDemo theme={theme} />
      <SizesAndVariantsDemo theme={theme} />
      <InteractiveStatesDemo theme={theme} />
    </div>
  );
};

export default React.memo(BasicExamples);