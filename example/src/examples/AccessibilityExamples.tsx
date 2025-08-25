/**
 * 可访问性示例组件
 * 
 * 展示YggJS多主题按钮系统的无障碍访问特性
 * 包括键盘导航、屏幕阅读器支持、高对比度模式等
 * 
 * @version 1.0.0
 * @author YggJS Team
 */
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { css } from '@emotion/react';

// 导入按钮组件
import { TechButton } from 'yggjs_rbutton';

/**
 * 组件属性接口
 */
interface AccessibilityExamplesProps {
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
 * 无障碍功能状态接口
 */
interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  increasedTextSize: boolean;
  focusVisible: boolean;
  screenReaderMode: boolean;
}

/**
 * 演示容器组件
 */
interface DemoSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  theme: AccessibilityExamplesProps['theme'];
  highlight?: boolean;
}

const DemoSection: React.FC<DemoSectionProps> = React.memo(({ 
  title, 
  description, 
  children, 
  theme,
  highlight = false 
}) => {
  const sectionStyles = useMemo(() => css`
    margin-bottom: ${theme.spacing['2xl']};
    padding: ${theme.spacing['2xl']};
    background-color: ${theme.colors.surface};
    border: 1px solid ${highlight ? theme.colors.primary : theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${highlight ? theme.shadows.lg : theme.shadows.sm};
    transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
    
    ${highlight && css`
      background: linear-gradient(
        135deg, 
        ${theme.colors.primary}08 0%, 
        ${theme.colors.surface} 100%
      );
    `}
    
    .section-header {
      margin-bottom: ${theme.spacing.xl};
      
      .section-title {
        margin: 0 0 ${theme.spacing.sm} 0;
        font-size: ${theme.typography.fontSize.xl};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${highlight ? theme.colors.primary : theme.colors.text};
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};
        
        .accessibility-badge {
          display: inline-flex;
          align-items: center;
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          background-color: ${theme.colors.success}15;
          color: ${theme.colors.success};
          border-radius: ${theme.borderRadius.full};
          font-size: ${theme.typography.fontSize.xs};
          font-weight: ${theme.typography.fontWeight.medium};
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
      }
      
      .section-description {
        margin: 0;
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        line-height: ${theme.typography.lineHeight.relaxed};
      }
    }
    
    .section-content {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.lg};
    }
  `, [theme, highlight]);

  return (
    <section css={sectionStyles} role="region" aria-labelledby={`section-${title.replace(/\s+/g, '-')}`}>
      <div className="section-header">
        <h2 className="section-title" id={`section-${title.replace(/\s+/g, '-')}`}>
          {title}
          {highlight && <span className="accessibility-badge">无障碍</span>}
        </h2>
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
 * 无障碍设置控制面板
 */
const AccessibilityControls: React.FC<{ 
  theme: AccessibilityExamplesProps['theme'];
  settings: AccessibilitySettings;
  onSettingsChange: (settings: AccessibilitySettings) => void;
}> = React.memo(({ theme, settings, onSettingsChange }) => {
  const controlsStyles = useMemo(() => css`
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
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: ${theme.spacing.lg};
      
      .control-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${theme.spacing.md};
        background-color: ${theme.colors.surface};
        border-radius: ${theme.borderRadius.md};
        border: 1px solid ${theme.colors.border};
        
        .control-info {
          flex: 1;
          
          .control-label {
            font-size: ${theme.typography.fontSize.md};
            font-weight: ${theme.typography.fontWeight.medium};
            color: ${theme.colors.text};
            margin: 0 0 ${theme.spacing.xs} 0;
          }
          
          .control-description {
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.textSecondary};
            margin: 0;
            line-height: ${theme.typography.lineHeight.normal};
          }
        }
        
        .control-toggle {
          position: relative;
          width: 48px;
          height: 24px;
          border-radius: ${theme.borderRadius.full};
          cursor: pointer;
          transition: background-color ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
          margin-left: ${theme.spacing.md};
          
          &::after {
            content: '';
            position: absolute;
            top: 2px;
            width: 20px;
            height: 20px;
            background-color: white;
            border-radius: 50%;
            transition: left ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
            box-shadow: ${theme.shadows.sm};
          }
          
          &.active {
            background-color: ${theme.colors.success};
            
            &::after {
              left: 26px;
            }
          }
          
          &.inactive {
            background-color: ${theme.colors.border};
            
            &::after {
              left: 2px;
            }
          }
        }
      }
    }
  `, [theme]);

  const controlItems = [
    {
      key: 'highContrast' as keyof AccessibilitySettings,
      label: '高对比度模式',
      description: '增强颜色对比度，改善视觉识别',
    },
    {
      key: 'reducedMotion' as keyof AccessibilitySettings,
      label: '减少动画效果',
      description: '降低动画强度，适合动作敏感用户',
    },
    {
      key: 'increasedTextSize' as keyof AccessibilitySettings,
      label: '增大文字尺寸',
      description: '提升文字可读性，辅助视觉困难用户',
    },
    {
      key: 'focusVisible' as keyof AccessibilitySettings,
      label: '增强焦点提示',
      description: '加强键盘导航的焦点指示器',
    },
    {
      key: 'screenReaderMode' as keyof AccessibilitySettings,
      label: '屏幕阅读器优化',
      description: '优化语音识别和屏幕阅读器体验',
    },
  ];

  const handleToggle = useCallback((key: keyof AccessibilitySettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key]
    });
  }, [settings, onSettingsChange]);

  return (
    <div css={controlsStyles} role="region" aria-labelledby="accessibility-controls-title">
      <h3 className="controls-title" id="accessibility-controls-title">无障碍设置</h3>
      <div className="controls-grid">
        {controlItems.map((item) => (
          <div key={item.key} className="control-item">
            <div className="control-info">
              <h4 className="control-label">{item.label}</h4>
              <p className="control-description">{item.description}</p>
            </div>
            <button
              className={`control-toggle ${settings[item.key] ? 'active' : 'inactive'}`}
              onClick={() => handleToggle(item.key)}
              aria-pressed={settings[item.key]}
              aria-label={`${item.label}${settings[item.key] ? ' (已启用)' : ' (已禁用)'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

AccessibilityControls.displayName = 'AccessibilityControls';

/**
 * 键盘导航演示组件
 */
const KeyboardNavigationDemo: React.FC<{ 
  theme: AccessibilityExamplesProps['theme'];
  settings: AccessibilitySettings;
}> = React.memo(({ theme, settings }) => {
  const [currentFocus, setCurrentFocus] = useState<number>(-1);
  const [instructions, setInstructions] = useState('使用 Tab 键开始导航');
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const navigationStyles = useMemo(() => css`
    .demo-container {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
    }
    
    .demo-header {
      margin-bottom: ${theme.spacing.lg};
      
      .demo-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.sm} 0;
      }
      
      .instructions {
        padding: ${theme.spacing.md};
        background-color: ${theme.colors.primary}10;
        border: 1px solid ${theme.colors.primary}30;
        border-radius: ${theme.borderRadius.md};
        color: ${theme.colors.primary};
        font-size: ${theme.typography.fontSize.sm};
        margin: 0;
        
        &[aria-live="polite"] {
          position: absolute;
          left: -10000px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
      }
    }
    
    .button-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: ${theme.spacing.md};
      margin-bottom: ${theme.spacing.lg};
      
      .nav-button {
        position: relative;
        
        &:focus-within {
          .focus-indicator {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        .focus-indicator {
          position: absolute;
          inset: -4px;
          border: 2px solid ${theme.colors.primary};
          border-radius: ${theme.borderRadius.md};
          opacity: 0;
          transition: all ${settings.reducedMotion ? '0ms' : theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          pointer-events: none;
          z-index: 1;
          
          ${settings.focusVisible && css`
            border-width: 3px;
            box-shadow: 0 0 0 1px white, 0 0 0 4px ${theme.colors.primary};
          `}
        }
      }
    }
    
    .keyboard-shortcuts {
      padding: ${theme.spacing.md};
      background-color: ${theme.colors.surface};
      border-radius: ${theme.borderRadius.md};
      border: 1px solid ${theme.colors.border};
      
      .shortcuts-title {
        font-size: ${theme.typography.fontSize.md};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.sm} 0;
      }
      
      .shortcuts-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: ${theme.spacing.sm};
        margin: 0;
        padding: 0;
        list-style: none;
        
        .shortcut-item {
          display: flex;
          align-items: center;
          gap: ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          
          .shortcut-key {
            padding: ${theme.spacing.xs};
            background-color: ${theme.colors.background};
            border: 1px solid ${theme.colors.border};
            border-radius: ${theme.borderRadius.sm};
            font-family: monospace;
            font-size: ${theme.typography.fontSize.xs};
            color: ${theme.colors.text};
            min-width: 32px;
            text-align: center;
          }
        }
      }
    }
  `, [theme, settings]);

  // 处理键盘事件
  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    const buttons = buttonsRef.current.filter(Boolean);
    let newInstructions = instructions;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (index + 1) % buttons.length;
        buttons[nextIndex]?.focus();
        setCurrentFocus(nextIndex);
        newInstructions = `已移动到按钮 ${nextIndex + 1}，共 ${buttons.length} 个按钮`;
        break;
        
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = (index - 1 + buttons.length) % buttons.length;
        buttons[prevIndex]?.focus();
        setCurrentFocus(prevIndex);
        newInstructions = `已移动到按钮 ${prevIndex + 1}，共 ${buttons.length} 个按钮`;
        break;
        
      case 'Home':
        event.preventDefault();
        buttons[0]?.focus();
        setCurrentFocus(0);
        newInstructions = '已移动到第一个按钮';
        break;
        
      case 'End':
        event.preventDefault();
        const lastIndex = buttons.length - 1;
        buttons[lastIndex]?.focus();
        setCurrentFocus(lastIndex);
        newInstructions = '已移动到最后一个按钮';
        break;
        
      case 'Enter':
      case ' ':
        newInstructions = `已激活按钮 ${index + 1}`;
        break;
    }

    if (newInstructions !== instructions) {
      setInstructions(newInstructions);
    }
  }, [instructions]);

  const buttons = [
    { label: '主要按钮', variant: 'primary' as const, component: TechButton },
    { label: '次要按钮', variant: 'secondary' as const, component: TechButton },
    { label: '成功按钮', variant: 'success' as const, component: TechButton },
    { label: '警告按钮', variant: 'warning' as const, component: TechButton },
    { label: '危险按钮', variant: 'danger' as const, component: TechButton },
    { label: '极简主要', variant: 'primary' as const, component: TechButton, fill: 'outline' },
    { label: '极简次要', variant: 'secondary' as const, component: TechButton, fill: 'ghost' },
    { label: '极简成功', variant: 'success' as const, component: TechButton, fill: 'outline' },
  ];

  return (
    <div css={navigationStyles}>
      <div className="demo-container">
        <div className="demo-header">
          <h3 className="demo-title">键盘导航演示</h3>
          <p className="instructions" aria-live="polite" aria-atomic="true">
            {instructions}
          </p>
          {/* 屏幕阅读器专用指令 */}
          <div className="instructions" aria-live="polite">
            {instructions}
          </div>
        </div>

        <div className="button-grid" role="grid" aria-label="可键盘导航的按钮网格">
          {buttons.map((button, index) => {
            const ButtonComponent = button.component;
            return (
              <div key={`nav-button-${index}`} className="nav-button" role="gridcell">
                <div className="focus-indicator" />
                <ButtonComponent
                  ref={(el: HTMLButtonElement | null) => {
                    buttonsRef.current[index] = el;
                  }}
                  variant={button.variant}
                  size="medium"
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => setCurrentFocus(index)}
                  onBlur={() => setCurrentFocus(-1)}
                  aria-describedby="keyboard-shortcuts"
                  tabIndex={index === 0 ? 0 : -1}
                >
                  {button.label}
                </ButtonComponent>
              </div>
            );
          })}
        </div>

        <div className="keyboard-shortcuts" id="keyboard-shortcuts">
          <h4 className="shortcuts-title">键盘快捷键</h4>
          <ul className="shortcuts-list">
            <li className="shortcut-item">
              <span className="shortcut-key">Tab</span>
              <span>进入导航</span>
            </li>
            <li className="shortcut-item">
              <span className="shortcut-key">↑↓←→</span>
              <span>移动焦点</span>
            </li>
            <li className="shortcut-item">
              <span className="shortcut-key">Home</span>
              <span>跳到开始</span>
            </li>
            <li className="shortcut-item">
              <span className="shortcut-key">End</span>
              <span>跳到结尾</span>
            </li>
            <li className="shortcut-item">
              <span className="shortcut-key">Enter</span>
              <span>激活按钮</span>
            </li>
            <li className="shortcut-item">
              <span className="shortcut-key">Space</span>
              <span>激活按钮</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

KeyboardNavigationDemo.displayName = 'KeyboardNavigationDemo';

/**
 * 颜色对比度演示组件
 */
const ColorContrastDemo: React.FC<{ 
  theme: AccessibilityExamplesProps['theme'];
  settings: AccessibilitySettings;
}> = React.memo(({ theme, settings }) => {
  const [selectedPair, setSelectedPair] = useState(0);

  // 计算对比度的辅助函数
  const calculateContrast = useCallback((color1: string, color2: string): number => {
    // 简化的对比度计算，实际应用中应该使用更精确的算法
    const getLuminance = (color: string): number => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const linearRGB = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      
      return 0.2126 * linearRGB(r) + 0.7152 * linearRGB(g) + 0.0722 * linearRGB(b);
    };

    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }, []);

  const contrastPairs = [
    {
      name: '主要按钮对比',
      foreground: '#ffffff',
      background: theme.colors.primary,
      description: '白色文字在主色背景上'
    },
    {
      name: '次要按钮对比',
      foreground: theme.colors.textSecondary,
      background: theme.colors.surface,
      description: '次要文字在表面色上'
    },
    {
      name: '成功状态对比',
      foreground: '#ffffff',
      background: theme.colors.success,
      description: '白色文字在成功色背景上'
    },
    {
      name: '警告状态对比',
      foreground: '#ffffff',
      background: theme.colors.warning,
      description: '白色文字在警告色背景上'
    },
    {
      name: '错误状态对比',
      foreground: '#ffffff',
      background: theme.colors.danger,
      description: '白色文字在错误色背景上'
    }
  ];

  const contrastStyles = useMemo(() => css`
    .contrast-demo {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
    }
    
    .demo-title {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.text};
      margin: 0 0 ${theme.spacing.lg} 0;
    }
    
    .contrast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.lg};
      
      .contrast-card {
        border: 1px solid ${theme.colors.border};
        border-radius: ${theme.borderRadius.lg};
        overflow: hidden;
        transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
        
        &:hover {
          border-color: ${theme.colors.primary};
          box-shadow: ${theme.shadows.md};
        }
        
        .color-preview {
          padding: ${theme.spacing.xl};
          text-align: center;
          position: relative;
          
          .preview-text {
            font-size: ${settings.increasedTextSize ? theme.typography.fontSize.lg : theme.typography.fontSize.md};
            font-weight: ${theme.typography.fontWeight.semibold};
            margin: 0;
            transition: font-size ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
          }
        }
        
        .contrast-info {
          padding: ${theme.spacing.lg};
          background-color: ${theme.colors.surface};
          
          .contrast-ratio {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: ${theme.spacing.md};
            
            .ratio-value {
              font-size: ${theme.typography.fontSize.xl};
              font-weight: ${theme.typography.fontWeight.bold};
              color: ${theme.colors.text};
            }
            
            .ratio-label {
              font-size: ${theme.typography.fontSize.sm};
              color: ${theme.colors.textSecondary};
            }
          }
          
          .compliance-badges {
            display: flex;
            gap: ${theme.spacing.sm};
            margin-bottom: ${theme.spacing.md};
            
            .compliance-badge {
              padding: ${theme.spacing.xs} ${theme.spacing.sm};
              border-radius: ${theme.borderRadius.sm};
              font-size: ${theme.typography.fontSize.xs};
              font-weight: ${theme.typography.fontWeight.medium};
              text-transform: uppercase;
              
              &.pass {
                background-color: ${theme.colors.success}15;
                color: ${theme.colors.success};
                border: 1px solid ${theme.colors.success}30;
              }
              
              &.fail {
                background-color: ${theme.colors.danger}15;
                color: ${theme.colors.danger};
                border: 1px solid ${theme.colors.danger}30;
              }
            }
          }
          
          .card-description {
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.textSecondary};
            margin: 0;
            line-height: ${theme.typography.lineHeight.relaxed};
          }
        }
      }
    }
    
    .accessibility-guidelines {
      padding: ${theme.spacing.lg};
      background-color: ${theme.colors.surface};
      border-radius: ${theme.borderRadius.md};
      border: 1px solid ${theme.colors.border};
      
      .guidelines-title {
        font-size: ${theme.typography.fontSize.md};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.md} 0;
      }
      
      .guidelines-list {
        margin: 0;
        padding-left: ${theme.spacing.lg};
        
        .guideline-item {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          line-height: ${theme.typography.lineHeight.relaxed};
          margin-bottom: ${theme.spacing.xs};
          
          .guideline-standard {
            font-weight: ${theme.typography.fontWeight.semibold};
            color: ${theme.colors.text};
          }
        }
      }
    }
  `, [theme, settings]);

  return (
    <div css={contrastStyles}>
      <div className="contrast-demo">
        <h3 className="demo-title">颜色对比度检测</h3>
        
        <div className="contrast-grid">
          {contrastPairs.map((pair, index) => {
            const contrast = calculateContrast(pair.foreground, pair.background);
            const wcagAAText = contrast >= 4.5;
            const wcagAAAText = contrast >= 7;
            const wcagAALarge = contrast >= 3;
            
            return (
              <div key={index} className="contrast-card">
                <div 
                  className="color-preview"
                  style={{
                    backgroundColor: pair.background,
                    color: pair.foreground,
                  }}
                >
                  <p className="preview-text">
                    {pair.name}示例文字
                  </p>
                </div>
                
                <div className="contrast-info">
                  <div className="contrast-ratio">
                    <span className="ratio-value">
                      {contrast.toFixed(2)}:1
                    </span>
                    <span className="ratio-label">对比度</span>
                  </div>
                  
                  <div className="compliance-badges">
                    <span className={`compliance-badge ${wcagAAText ? 'pass' : 'fail'}`}>
                      AA级普通文字
                    </span>
                    <span className={`compliance-badge ${wcagAAAText ? 'pass' : 'fail'}`}>
                      AAA级普通文字
                    </span>
                    <span className={`compliance-badge ${wcagAALarge ? 'pass' : 'fail'}`}>
                      AA级大文字
                    </span>
                  </div>
                  
                  <p className="card-description">{pair.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="accessibility-guidelines">
          <h4 className="guidelines-title">WCAG 2.1 对比度标准</h4>
          <ul className="guidelines-list">
            <li className="guideline-item">
              <span className="guideline-standard">AA级普通文字</span>：最小对比度 4.5:1
            </li>
            <li className="guideline-item">
              <span className="guideline-standard">AAA级普通文字</span>：最小对比度 7:1
            </li>
            <li className="guideline-item">
              <span className="guideline-standard">AA级大文字</span>：最小对比度 3:1（18pt+或14pt粗体+）
            </li>
            <li className="guideline-item">
              <span className="guideline-standard">图标和图形</span>：最小对比度 3:1
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

ColorContrastDemo.displayName = 'ColorContrastDemo';

/**
 * 屏幕阅读器优化演示组件
 */
const ScreenReaderDemo: React.FC<{ 
  theme: AccessibilityExamplesProps['theme'];
  settings: AccessibilitySettings;
}> = React.memo(({ theme, settings }) => {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addAnnouncement = useCallback((message: string) => {
    setAnnouncements(prev => [...prev.slice(-4), message]);
  }, []);

  const simulateScreenReader = useCallback((action: string) => {
    setIsProcessing(true);
    let message = '';
    
    switch (action) {
      case 'button-focus':
        message = '按钮，主要按钮，可点击';
        break;
      case 'button-click':
        message = '主要按钮已激活';
        break;
      case 'form-focus':
        message = '编辑框，用户名，必填项';
        break;
      case 'navigation':
        message = '导航区域，包含5个链接';
        break;
      case 'heading':
        message = '标题，级别2，屏幕阅读器演示';
        break;
    }
    
    setTimeout(() => {
      addAnnouncement(message);
      setIsProcessing(false);
    }, 500);
  }, [addAnnouncement]);

  const screenReaderStyles = useMemo(() => css`
    .screen-reader-demo {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
    }
    
    .demo-title {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.text};
      margin: 0 0 ${theme.spacing.lg} 0;
    }
    
    .demo-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${theme.spacing.xl};
      
      @media (max-width: ${theme.breakpoints.md}) {
        grid-template-columns: 1fr;
      }
    }
    
    .interactive-section {
      .section-title {
        font-size: ${theme.typography.fontSize.md};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.md} 0;
      }
      
      .demo-elements {
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.md};
        
        .demo-button {
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.md};
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          cursor: pointer;
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          text-align: left;
          
          &:hover {
            border-color: ${theme.colors.primary};
            background-color: ${theme.colors.primary}10;
          }
          
          &:focus {
            outline: 2px solid ${theme.colors.primary};
            outline-offset: 2px;
          }
          
          .button-label {
            font-weight: ${theme.typography.fontWeight.medium};
            margin-bottom: ${theme.spacing.xs};
          }
          
          .button-description {
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.textSecondary};
            margin: 0;
          }
        }
      }
    }
    
    .announcements-section {
      .section-title {
        font-size: ${theme.typography.fontSize.md};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.md} 0;
      }
      
      .announcements-container {
        min-height: 200px;
        padding: ${theme.spacing.lg};
        background-color: ${theme.colors.surface};
        border-radius: ${theme.borderRadius.md};
        border: 1px solid ${theme.colors.border};
        position: relative;
        
        ${isProcessing && css`
          &::after {
            content: '正在处理...';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.textSecondary};
            font-style: italic;
          }
        `}
        
        .announcements-list {
          display: flex;
          flex-direction: column;
          gap: ${theme.spacing.sm};
          
          .announcement-item {
            padding: ${theme.spacing.md};
            background-color: ${theme.colors.background};
            border-left: 4px solid ${theme.colors.primary};
            border-radius: ${theme.borderRadius.sm};
            font-family: monospace;
            font-size: ${theme.typography.fontSize.sm};
            color: ${theme.colors.text};
            animation: slideIn 0.3s ${theme.animations.easing.easeOut};
            
            .announcement-timestamp {
              font-size: ${theme.typography.fontSize.xs};
              color: ${theme.colors.textSecondary};
              margin-bottom: ${theme.spacing.xs};
            }
            
            .announcement-text {
              margin: 0;
              line-height: ${theme.typography.lineHeight.relaxed};
            }
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
    
    .screen-reader-tips {
      grid-column: 1 / -1;
      padding: ${theme.spacing.lg};
      background-color: ${theme.colors.surface};
      border-radius: ${theme.borderRadius.md};
      border: 1px solid ${theme.colors.border};
      
      .tips-title {
        font-size: ${theme.typography.fontSize.md};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.md} 0;
      }
      
      .tips-list {
        margin: 0;
        padding-left: ${theme.spacing.lg};
        
        .tip-item {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          line-height: ${theme.typography.lineHeight.relaxed};
          margin-bottom: ${theme.spacing.xs};
          
          .tip-highlight {
            font-weight: ${theme.typography.fontWeight.semibold};
            color: ${theme.colors.text};
          }
        }
      }
    }
  `, [theme, isProcessing]);

  return (
    <div css={screenReaderStyles}>
      <div className="screen-reader-demo">
        <h3 className="demo-title">屏幕阅读器体验模拟</h3>
        
        <div className="demo-sections">
          <div className="interactive-section">
            <h4 className="section-title">交互元素</h4>
            <div className="demo-elements">
              <button 
                className="demo-button"
                onClick={() => simulateScreenReader('button-focus')}
                aria-label="模拟按钮焦点获取"
              >
                <div className="button-label">按钮焦点</div>
                <p className="button-description">模拟屏幕阅读器读取按钮信息</p>
              </button>
              
              <button 
                className="demo-button"
                onClick={() => simulateScreenReader('button-click')}
                aria-label="模拟按钮点击操作"
              >
                <div className="button-label">按钮激活</div>
                <p className="button-description">模拟按钮被点击时的语音反馈</p>
              </button>
              
              <button 
                className="demo-button"
                onClick={() => simulateScreenReader('form-focus')}
                aria-label="模拟表单元素焦点"
              >
                <div className="button-label">表单焦点</div>
                <p className="button-description">模拟表单输入框的语音提示</p>
              </button>
              
              <button 
                className="demo-button"
                onClick={() => simulateScreenReader('navigation')}
                aria-label="模拟导航区域识别"
              >
                <div className="button-label">导航识别</div>
                <p className="button-description">模拟导航区域的结构化读取</p>
              </button>
              
              <button 
                className="demo-button"
                onClick={() => simulateScreenReader('heading')}
                aria-label="模拟标题层级读取"
              >
                <div className="button-label">标题层级</div>
                <p className="button-description">模拟标题的层级结构识别</p>
              </button>
            </div>
          </div>
          
          <div className="announcements-section">
            <h4 className="section-title">语音播报输出</h4>
            <div className="announcements-container">
              {announcements.length === 0 && !isProcessing && (
                <p style={{ 
                  textAlign: 'center', 
                  color: theme.colors.textSecondary,
                  fontStyle: 'italic',
                  margin: `${theme.spacing['2xl']} 0`
                }}>
                  点击左侧按钮体验屏幕阅读器效果
                </p>
              )}
              
              <div className="announcements-list">
                {announcements.map((announcement, index) => (
                  <div key={`announcement-${index}`} className="announcement-item">
                    <div className="announcement-timestamp">
                      {new Date().toLocaleTimeString()}
                    </div>
                    <p className="announcement-text">"{announcement}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="screen-reader-tips">
            <h4 className="tips-title">屏幕阅读器优化技巧</h4>
            <ul className="tips-list">
              <li className="tip-item">
                使用 <span className="tip-highlight">aria-label</span> 为按钮提供描述性标签
              </li>
              <li className="tip-item">
                通过 <span className="tip-highlight">aria-live</span> 区域实时播报状态变化
              </li>
              <li className="tip-item">
                使用 <span className="tip-highlight">role</span> 属性明确元素的语义角色
              </li>
              <li className="tip-item">
                为表单元素提供 <span className="tip-highlight">aria-describedby</span> 关联帮助信息
              </li>
              <li className="tip-item">
                使用 <span className="tip-highlight">aria-expanded</span> 指示可折叠内容状态
              </li>
              <li className="tip-item">
                通过 <span className="tip-highlight">tabindex</span> 管理键盘导航顺序
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 屏幕阅读器专用的实时通知区域 */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements.length > 0 && announcements[announcements.length - 1]}
      </div>
    </div>
  );
});

ScreenReaderDemo.displayName = 'ScreenReaderDemo';

/**
 * 可访问性示例主组件
 */
const AccessibilityExamples: React.FC<AccessibilityExamplesProps> = ({ theme }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    increasedTextSize: false,
    focusVisible: false,
    screenReaderMode: false,
  });

  // 应用可访问性设置到主题
  const accessibleTheme = useMemo(() => {
    let modifiedTheme = { ...theme };

    if (settings.highContrast) {
      // 高对比度模式调整
      modifiedTheme.colors = {
        ...modifiedTheme.colors,
        primary: theme.mode === 'dark' ? '#60a5fa' : '#1d4ed8',
        text: theme.mode === 'dark' ? '#ffffff' : '#000000',
        background: theme.mode === 'dark' ? '#000000' : '#ffffff',
      };
    }

    if (settings.reducedMotion) {
      // 减少动画效果
      modifiedTheme.animations = {
        ...modifiedTheme.animations,
        duration: {
          fast: '0ms',
          normal: '0ms',
          slow: '0ms',
        }
      };
    }

    return modifiedTheme;
  }, [theme, settings]);

  const containerStyles = useMemo(() => css`
    ${settings.increasedTextSize && css`
      font-size: 120%;
    `}
    
    .sr-only {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
  `, [settings]);

  return (
    <div css={containerStyles}>
      <DemoSection
        title="可访问性设置"
        description="调整各种无障碍功能设置，体验不同用户群体的使用需求"
        theme={accessibleTheme}
        highlight={true}
      >
        <AccessibilityControls
          theme={accessibleTheme}
          settings={settings}
          onSettingsChange={setSettings}
        />
      </DemoSection>

      <DemoSection
        title="键盘导航支持"
        description="完整的键盘导航体验，支持Tab、方向键、回车等标准操作"
        theme={accessibleTheme}
      >
        <KeyboardNavigationDemo 
          theme={accessibleTheme} 
          settings={settings} 
        />
      </DemoSection>

      <DemoSection
        title="颜色对比度标准"
        description="符合WCAG 2.1标准的颜色对比度检测和优化建议"
        theme={accessibleTheme}
      >
        <ColorContrastDemo 
          theme={accessibleTheme} 
          settings={settings} 
        />
      </DemoSection>

      <DemoSection
        title="屏幕阅读器支持"
        description="优化的屏幕阅读器体验，包含语义化标记和实时状态播报"
        theme={accessibleTheme}
      >
        <ScreenReaderDemo 
          theme={accessibleTheme} 
          settings={settings} 
        />
      </DemoSection>
    </div>
  );
};

export default React.memo(AccessibilityExamples);