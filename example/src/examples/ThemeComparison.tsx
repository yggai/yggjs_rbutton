/**
 * 主题对比组件
 * 
 * 深度对比科技风主题和极简主题的设计理念和视觉效果
 * 提供详细的设计系统分析和交互式对比功能
 * 
 * @version 1.0.0
 * @author YggJS Team
 */
import React, { useState, useCallback, useMemo } from 'react';
import { css } from '@emotion/react';

// 导入按钮组件
import { TechButton } from 'yggjs_rbutton';
import { MinimalButton } from 'yggjs_rbutton/minimal';

/**
 * 组件属性接口
 */
interface ThemeComparisonProps {
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
 * 主题特征数据接口
 */
interface ThemeFeature {
  id: string;
  name: string;
  description: string;
  techValue: string;
  minimalValue: string;
  category: 'color' | 'typography' | 'spacing' | 'animation' | 'visual';
}

/**
 * 设计对比卡片组件
 */
interface ComparisonCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  theme: ThemeComparisonProps['theme'];
  highlight?: boolean;
}

const ComparisonCard: React.FC<ComparisonCardProps> = React.memo(({ 
  title, 
  description, 
  children, 
  theme, 
  highlight = false 
}) => {
  const cardStyles = useMemo(() => css`
    padding: ${theme.spacing['2xl']};
    background-color: ${theme.colors.surface};
    border: 1px solid ${highlight ? theme.colors.primary : theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${highlight ? theme.shadows.md : theme.shadows.sm};
    transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
    position: relative;
    
    ${highlight && css`
      background: linear-gradient(
        135deg, 
        ${theme.colors.primary}05 0%, 
        ${theme.colors.surface} 100%
      );
    `}
    
    &:hover {
      box-shadow: ${theme.shadows.lg};
      border-color: ${theme.colors.primary};
      transform: translateY(-2px);
    }
    
    .card-header {
      margin-bottom: ${theme.spacing.xl};
      
      .card-title {
        margin: 0 0 ${theme.spacing.sm} 0;
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        
        ${highlight && css`
          color: ${theme.colors.primary};
        `}
      }
      
      .card-description {
        margin: 0;
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        line-height: ${theme.typography.lineHeight.relaxed};
      }
    }
    
    .card-content {
      position: relative;
    }
    
    ${highlight && css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(
          180deg,
          ${theme.colors.primary} 0%,
          ${theme.colors.primary}80 100%
        );
        border-radius: ${theme.borderRadius.sm};
      }
    `}
    
    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.xl};
    }
  `, [theme, highlight]);

  return (
    <div css={cardStyles}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
});

ComparisonCard.displayName = 'ComparisonCard';

/**
 * 视觉特征对比组件
 */
const VisualFeaturesComparison: React.FC<{ theme: ThemeComparisonProps['theme'] }> = React.memo(({ theme }) => {
  // 主题特征对比数据
  const features: ThemeFeature[] = [
    {
      id: 'primary-color',
      name: '主色调',
      description: '品牌识别的核心颜色',
      techValue: '鲜艳蓝色 (#2563eb)',
      minimalValue: '沉稳灰色 (#6b7280)',
      category: 'color'
    },
    {
      id: 'visual-effects',
      name: '视觉效果',
      description: '界面装饰和视觉层次',
      techValue: '渐变、发光、阴影',
      minimalValue: '纯色、微妙阴影',
      category: 'visual'
    },
    {
      id: 'typography',
      name: '字体策略',
      description: '文字呈现和层次构建',
      techValue: '现代字体、多样权重',
      minimalValue: '系统字体、简洁统一',
      category: 'typography'
    },
    {
      id: 'spacing',
      name: '间距系统',
      description: '元素之间的空间关系',
      techValue: '紧凑高效布局',
      minimalValue: '宽松呼吸空间',
      category: 'spacing'
    },
    {
      id: 'animations',
      name: '动画风格',
      description: '交互反馈的动态表现',
      techValue: '活跃弹性动画',
      minimalValue: '温和淡入淡出',
      category: 'animation'
    }
  ];

  const featuresStyles = useMemo(() => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    
    .feature-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: ${theme.spacing.md};
      align-items: center;
      padding: ${theme.spacing.lg};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.md};
      border: 1px solid ${theme.colors.border};
      
      &:hover {
        background-color: ${theme.colors.surface};
        border-color: ${theme.colors.borderHover};
      }
      
      .feature-info {
        .feature-name {
          font-size: ${theme.typography.fontSize.md};
          font-weight: ${theme.typography.fontWeight.semibold};
          color: ${theme.colors.text};
          margin: 0 0 ${theme.spacing.xs} 0;
        }
        
        .feature-description {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          margin: 0;
          line-height: ${theme.typography.lineHeight.normal};
        }
      }
      
      .tech-value,
      .minimal-value {
        font-size: ${theme.typography.fontSize.sm};
        font-weight: ${theme.typography.fontWeight.medium};
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        border-radius: ${theme.borderRadius.sm};
        text-align: center;
      }
      
      .tech-value {
        background-color: ${theme.colors.primary}15;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary}30;
      }
      
      .minimal-value {
        background-color: ${theme.colors.textSecondary}15;
        color: ${theme.colors.textSecondary};
        border: 1px solid ${theme.colors.textSecondary}30;
      }
    }
    
    @media (max-width: ${theme.breakpoints.md}) {
      .feature-row {
        grid-template-columns: 1fr;
        gap: ${theme.spacing.sm};
        text-align: center;
        
        .tech-value,
        .minimal-value {
          width: 100%;
        }
      }
    }
  `, [theme]);

  return (
    <ComparisonCard
      title="设计特征对比"
      description="深度分析两种主题在设计理念和视觉表现上的核心差异"
      theme={theme}
      highlight={true}
    >
      <div css={featuresStyles}>
        {features.map((feature) => (
          <div key={feature.id} className="feature-row">
            <div className="feature-info">
              <h4 className="feature-name">{feature.name}</h4>
              <p className="feature-description">{feature.description}</p>
            </div>
            <div className="tech-value">
              科技风：{feature.techValue}
            </div>
            <div className="minimal-value">
              极简风：{feature.minimalValue}
            </div>
          </div>
        ))}
      </div>
    </ComparisonCard>
  );
});

VisualFeaturesComparison.displayName = 'VisualFeaturesComparison';

/**
 * 交互式按钮对比组件
 */
const InteractiveButtonComparison: React.FC<{ theme: ThemeComparisonProps['theme'] }> = React.memo(({ theme }) => {
  const [selectedVariant, setSelectedVariant] = useState<'primary' | 'secondary' | 'success' | 'danger' | 'warning'>('primary');
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedFill, setSelectedFill] = useState<'solid' | 'outline' | 'ghost'>('solid');
  const [showStates, setShowStates] = useState(false);

  const comparisonStyles = useMemo(() => css`
    .controls-section {
      margin-bottom: ${theme.spacing['2xl']};
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .controls-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.lg} 0;
      }
      
      .controls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: ${theme.spacing.lg};
        
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
            
            .control-option {
              padding: ${theme.spacing.xs} ${theme.spacing.sm};
              border: 1px solid ${theme.colors.border};
              border-radius: ${theme.borderRadius.sm};
              background-color: ${theme.colors.surface};
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
        }
        
        .toggle-control {
          display: flex;
          align-items: center;
          gap: ${theme.spacing.sm};
          
          .toggle-switch {
            position: relative;
            width: 48px;
            height: 24px;
            background-color: ${showStates ? theme.colors.primary : theme.colors.border};
            border-radius: ${theme.borderRadius.full};
            cursor: pointer;
            transition: background-color ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
            
            &::after {
              content: '';
              position: absolute;
              top: 2px;
              left: ${showStates ? '26px' : '2px'};
              width: 20px;
              height: 20px;
              background-color: white;
              border-radius: 50%;
              transition: left ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
              box-shadow: ${theme.shadows.sm};
            }
          }
          
          .toggle-label {
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.text};
            cursor: pointer;
          }
        }
      }
    }
    
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${theme.spacing.xl};
      
      .theme-section {
        padding: ${theme.spacing.xl};
        background-color: ${theme.colors.surface};
        border-radius: ${theme.borderRadius.lg};
        border: 1px solid ${theme.colors.border};
        
        .theme-header {
          display: flex;
          align-items: center;
          gap: ${theme.spacing.sm};
          margin-bottom: ${theme.spacing.lg};
          
          .theme-icon {
            font-size: ${theme.typography.fontSize.xl};
          }
          
          .theme-title {
            font-size: ${theme.typography.fontSize.lg};
            font-weight: ${theme.typography.fontWeight.semibold};
            color: ${theme.colors.text};
            margin: 0;
          }
        }
        
        .button-showcase {
          display: flex;
          flex-direction: column;
          gap: ${theme.spacing.lg};
          align-items: center;
          
          .primary-button {
            min-width: 160px;
          }
          
          ${showStates && css`
            .state-buttons {
              display: flex;
              flex-direction: column;
              gap: ${theme.spacing.md};
              width: 100%;
              align-items: center;
              
              .state-group {
                display: flex;
                gap: ${theme.spacing.sm};
                align-items: center;
                
                .state-label {
                  font-size: ${theme.typography.fontSize.xs};
                  color: ${theme.colors.textSecondary};
                  min-width: 60px;
                  text-align: right;
                }
              }
            }
          `}
        }
      }
      
      @media (max-width: ${theme.breakpoints.md}) {
        grid-template-columns: 1fr;
      }
    }
  `, [theme, showStates]);

  const variants = [
    { key: 'primary' as const, label: '主要' },
    { key: 'secondary' as const, label: '次要' },
    { key: 'success' as const, label: '成功' },
    { key: 'danger' as const, label: '危险' },
    { key: 'warning' as const, label: '警告' },
  ];

  const sizes = [
    { key: 'small' as const, label: '小' },
    { key: 'medium' as const, label: '中' },
    { key: 'large' as const, label: '大' },
  ];

  const fills = [
    { key: 'solid' as const, label: '填充' },
    { key: 'outline' as const, label: '边框' },
    { key: 'ghost' as const, label: '透明' },
  ];

  return (
    <ComparisonCard
      title="交互式按钮对比"
      description="实时对比两种主题下按钮的视觉效果和交互体验"
      theme={theme}
    >
      <div css={comparisonStyles}>
        <div className="controls-section">
          <h4 className="controls-title">调整参数</h4>
          <div className="controls-grid">
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

            <div className="control-group">
              <label className="control-label">填充模式：</label>
              <div className="control-options">
                {fills.map((fill) => (
                  <button
                    key={fill.key}
                    className={`control-option ${selectedFill === fill.key ? 'active' : ''}`}
                    onClick={() => setSelectedFill(fill.key)}
                  >
                    {fill.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="toggle-control">
              <div 
                className="toggle-switch"
                onClick={() => setShowStates(!showStates)}
              />
              <label 
                className="toggle-label"
                onClick={() => setShowStates(!showStates)}
              >
                显示状态对比
              </label>
            </div>
          </div>
        </div>

        <div className="comparison-grid">
          <div className="theme-section">
            <div className="theme-header">
              <span className="theme-icon">🚀</span>
              <h4 className="theme-title">科技风主题</h4>
            </div>
            <div className="button-showcase">
              <TechButton 
                variant={selectedVariant} 
                size={selectedSize}
                fill={selectedFill}
                className="primary-button"
              >
                {selectedVariant} {selectedSize}
              </TechButton>
              
              {showStates && (
                <div className="state-buttons">
                  <div className="state-group">
                    <span className="state-label">正常：</span>
                    <TechButton variant={selectedVariant} size={selectedSize} fill={selectedFill}>
                      正常
                    </TechButton>
                  </div>
                  <div className="state-group">
                    <span className="state-label">悬浮：</span>
                    <TechButton variant={selectedVariant} size={selectedSize} fill={selectedFill} style={{ filter: 'brightness(1.1)' }}>
                      悬浮
                    </TechButton>
                  </div>
                  <div className="state-group">
                    <span className="state-label">禁用：</span>
                    <TechButton variant={selectedVariant} size={selectedSize} fill={selectedFill} disabled>
                      禁用
                    </TechButton>
                  </div>
                  <div className="state-group">
                    <span className="state-label">加载：</span>
                    <TechButton variant={selectedVariant} size={selectedSize} fill={selectedFill} loading>
                      加载
                    </TechButton>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="theme-section">
            <div className="theme-header">
              <span className="theme-icon">✨</span>
              <h4 className="theme-title">极简主题</h4>
            </div>
            <div className="button-showcase">
              <MinimalButton 
                variant={selectedVariant} 
                size={selectedSize}
                fill={selectedFill}
                className="primary-button"
              >
                {selectedVariant} {selectedSize}
              </MinimalButton>
              
              {showStates && (
                <div className="state-buttons">
                  <div className="state-group">
                    <span className="state-label">正常：</span>
                    <MinimalButton variant={selectedVariant} size={selectedSize} fill={selectedFill}>
                      正常
                    </MinimalButton>
                  </div>
                  <div className="state-group">
                    <span className="state-label">悬浮：</span>
                    <MinimalButton variant={selectedVariant} size={selectedSize} fill={selectedFill} style={{ opacity: 0.8 }}>
                      悬浮
                    </MinimalButton>
                  </div>
                  <div className="state-group">
                    <span className="state-label">禁用：</span>
                    <MinimalButton variant={selectedVariant} size={selectedSize} fill={selectedFill} disabled>
                      禁用
                    </MinimalButton>
                  </div>
                  <div className="state-group">
                    <span className="state-label">加载：</span>
                    <MinimalButton variant={selectedVariant} size={selectedSize} fill={selectedFill} loading>
                      加载
                    </MinimalButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ComparisonCard>
  );
});

InteractiveButtonComparison.displayName = 'InteractiveButtonComparison';

/**
 * 使用场景分析组件
 */
const UseCaseAnalysis: React.FC<{ theme: ThemeComparisonProps['theme'] }> = React.memo(({ theme }) => {
  const useCases = [
    {
      category: '科技风适用场景',
      icon: '🚀',
      color: theme.colors.primary,
      items: [
        { name: '游戏界面', description: '需要强烈视觉冲击和科技感' },
        { name: 'SaaS 产品', description: '突出创新和专业的技术形象' },
        { name: '数据大屏', description: '营造未来科技的视觉氛围' },
        { name: '创意工具', description: '激发用户的创造力和探索欲' },
        { name: '年轻群体应用', description: '符合Z世代的审美偏好' },
      ]
    },
    {
      category: '极简风适用场景',
      icon: '✨',
      color: theme.colors.textSecondary,
      items: [
        { name: '内容阅读', description: '不干扰用户专注于内容本身' },
        { name: '办公软件', description: '提供舒适的长时间工作体验' },
        { name: '文档工具', description: '突出内容的重要性和可读性' },
        { name: '企业系统', description: '传达专业稳重的品牌形象' },
        { name: '无障碍应用', description: '确保所有用户都能顺畅使用' },
      ]
    }
  ];

  const analysisStyles = useMemo(() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing.xl};
    
    .use-case-section {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .section-header {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};
        margin-bottom: ${theme.spacing.lg};
        
        .section-icon {
          font-size: ${theme.typography.fontSize.xl};
        }
        
        .section-title {
          font-size: ${theme.typography.fontSize.lg};
          font-weight: ${theme.typography.fontWeight.semibold};
          margin: 0;
        }
      }
      
      .use-case-list {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.md};
        
        .use-case-item {
          padding: ${theme.spacing.md};
          background-color: ${theme.colors.surface};
          border-radius: ${theme.borderRadius.md};
          border-left: 4px solid transparent;
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          
          &:hover {
            border-left-color: ${theme.colors.primary};
            background-color: ${theme.colors.surface};
            transform: translateX(4px);
          }
          
          .case-name {
            font-size: ${theme.typography.fontSize.md};
            font-weight: ${theme.typography.fontWeight.semibold};
            color: ${theme.colors.text};
            margin: 0 0 ${theme.spacing.xs} 0;
          }
          
          .case-description {
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.textSecondary};
            margin: 0;
            line-height: ${theme.typography.lineHeight.relaxed};
          }
        }
      }
      
      &.tech-theme {
        .section-title {
          color: ${theme.colors.primary};
        }
        
        .use-case-item:hover {
          border-left-color: ${theme.colors.primary};
        }
      }
      
      &.minimal-theme {
        .section-title {
          color: ${theme.colors.textSecondary};
        }
        
        .use-case-item:hover {
          border-left-color: ${theme.colors.textSecondary};
        }
      }
    }
    
    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: 1fr;
    }
  `, [theme]);

  return (
    <ComparisonCard
      title="使用场景分析"
      description="根据不同的应用场景和用户群体，选择最适合的主题风格"
      theme={theme}
    >
      <div css={analysisStyles}>
        {useCases.map((useCase, index) => (
          <div 
            key={useCase.category} 
            className={`use-case-section ${index === 0 ? 'tech-theme' : 'minimal-theme'}`}
          >
            <div className="section-header">
              <span className="section-icon">{useCase.icon}</span>
              <h4 className="section-title">{useCase.category}</h4>
            </div>
            <div className="use-case-list">
              {useCase.items.map((item) => (
                <div key={item.name} className="use-case-item">
                  <h5 className="case-name">{item.name}</h5>
                  <p className="case-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ComparisonCard>
  );
});

UseCaseAnalysis.displayName = 'UseCaseAnalysis';

/**
 * 主题对比主组件
 */
const ThemeComparison: React.FC<ThemeComparisonProps> = ({ theme }) => {
  const containerStyles = useMemo(() => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing['2xl']};
  `, [theme]);

  return (
    <div css={containerStyles}>
      <VisualFeaturesComparison theme={theme} />
      <InteractiveButtonComparison theme={theme} />
      <UseCaseAnalysis theme={theme} />
    </div>
  );
};

export default React.memo(ThemeComparison);