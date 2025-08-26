/**
 * 科技风主题 - 主题定义入口
 * 
 * 将科技风主题集成到新的主题系统架构中
 * 提供完整的主题定义和初始化功能
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import { techThemeDefinition, techThemePresets, techThemeUtils } from './tokens';
import { registerTheme } from '../../core/theme';

/**
 * 科技风主题完整导出
 */
export { 
  techThemeDefinition, 
  techThemePresets, 
  techThemeUtils 
} from './tokens';

/**
 * 科技风主题自动注册函数
 * 
 * 在应用启动时调用，自动注册科技风主题到主题系统
 * 
 * @param setAsDefault - 是否设置为默认主题
 */
export const registerTechTheme = (setAsDefault: boolean = true): void => {
  try {
    registerTheme(techThemeDefinition, {
      setAsDefault,
      overwrite: true,
    });
    
    console.info(`🎨 科技风主题已注册${setAsDefault ? '并设置为默认主题' : ''}`);
  } catch (error) {
    console.error('❌ 科技风主题注册失败:', error);
    throw error;
  }
};

/**
 * 科技风主题按钮组件样式生成器
 * 
 * 根据按钮属性生成对应的样式对象
 * 
 * @param props - 按钮属性
 * @returns 样式对象
 */
export const generateTechButtonStyles = (props: {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  fill?: 'solid' | 'outline' | 'ghost' | 'link';
  shape?: 'default' | 'rounded' | 'circle' | 'square';
  disabled?: boolean;
  loading?: boolean;
  glow?: boolean;
  fullWidth?: boolean;
}): React.CSSProperties => {
  const {
    size = 'md',
    variant = 'primary',
    fill = 'solid',
    shape = 'default',
    disabled = false,
    loading = false,
    glow = false,
    fullWidth = false,
  } = props;
  
  // 基础样式
  let styles: React.CSSProperties = {
    ...techThemePresets.button.base,
  };
  
  // 尺寸样式
  if (techThemePresets.button.sizes[size]) {
    styles = {
      ...styles,
      ...techThemePresets.button.sizes[size],
    };
  }
  
  // 颜色变体样式
  if (techThemePresets.button.variants[variant]) {
    const variantStyles = techThemePresets.button.variants[variant];
    styles = {
      ...styles,
      ...variantStyles,
    };
  }
  
  // 填充模式样式
  if (fill !== 'solid' && techThemePresets.button.fills[fill]) {
    styles = {
      ...styles,
      ...techThemePresets.button.fills[fill],
    };
  }
  
  // 形状样式
  if (shape !== 'default' && techThemePresets.button.shapes[shape]) {
    styles = {
      ...styles,
      ...techThemePresets.button.shapes[shape],
    };
  }
  
  // 禁用状态
  if (disabled) {
    styles = {
      ...styles,
      backgroundColor: techThemeDefinition.tokens.colors.neutral[600],
      color: techThemeDefinition.tokens.colors.neutral[400],
      cursor: 'not-allowed',
      opacity: 0.6,
    };
  }
  
  // 加载状态
  if (loading) {
    styles = {
      ...styles,
      cursor: 'wait',
      opacity: 0.8,
    };
  }
  
  // 发光效果
  if (glow && !disabled) {
    const glowColor = techThemeDefinition.tokens.colors[variant]?.[400] || 
                     techThemeDefinition.tokens.colors.primary[400];
    styles = {
      ...styles,
      boxShadow: techThemeUtils.colors.generateGlow(glowColor, 0.5),
    };
  }
  
  // 全宽样式
  if (fullWidth) {
    styles = {
      ...styles,
      width: '100%',
    };
  }
  
  return styles;
};

/**
 * 科技风主题响应式样式生成器
 * 
 * 生成响应式的按钮样式
 * 
 * @param props - 响应式属性配置
 * @returns 响应式样式对象
 */
export const generateTechResponsiveStyles = (props: {
  mobile?: Partial<Parameters<typeof generateTechButtonStyles>[0]>;
  tablet?: Partial<Parameters<typeof generateTechButtonStyles>[0]>;
  desktop?: Partial<Parameters<typeof generateTechButtonStyles>[0]>;
  wide?: Partial<Parameters<typeof generateTechButtonStyles>[0]>;
}): Record<string, React.CSSProperties> => {
  const { mobile, tablet, desktop, wide } = props;
  const breakpoints = techThemeDefinition.breakpoints;
  
  const responsiveStyles: Record<string, React.CSSProperties> = {};
  
  // 移动端样式（默认）
  if (mobile) {
    responsiveStyles['@media (max-width: 767px)'] = generateTechButtonStyles(mobile);
  }
  
  // 平板样式
  if (tablet) {
    responsiveStyles[`@media (min-width: ${breakpoints.tablet}) and (max-width: 1023px)`] = 
      generateTechButtonStyles(tablet);
  }
  
  // 桌面样式
  if (desktop) {
    responsiveStyles[`@media (min-width: ${breakpoints.desktop}) and (max-width: 1439px)`] = 
      generateTechButtonStyles(desktop);
  }
  
  // 宽屏样式
  if (wide) {
    responsiveStyles[`@media (min-width: ${breakpoints.wide})`] = 
      generateTechButtonStyles(wide);
  }
  
  return responsiveStyles;
};

/**
 * 科技风主题CSS变量注入器
 * 
 * 将主题令牌转换为CSS变量并注入到DOM中
 * 
 * @param variant - 主题变体
 */
export const injectTechThemeVariables = (variant: 'dark' | 'light' = 'dark'): void => {
  if (typeof document === 'undefined') return;
  
  // 生成CSS变量
  const cssVariables = techThemeUtils.generateCSSVariables(
    techThemeDefinition.tokens,
    '--tech'
  );
  
  // 如果是浅色变体，覆盖颜色变量
  if (variant === 'light' && techThemeDefinition.variants.light) {
    const lightVariables = techThemeUtils.generateCSSVariables(
      techThemeDefinition.variants.light,
      '--tech'
    );
    Object.assign(cssVariables, lightVariables);
  }
  
  // 创建或更新样式标签
  let styleElement = document.getElementById('tech-theme-variables') as HTMLStyleElement;
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'tech-theme-variables';
    document.head.appendChild(styleElement);
  }
  
  // 生成CSS内容
  const cssContent = `
    :root {
      ${Object.entries(cssVariables).map(([name, value]) => `${name}: ${value};`).join('\n      ')}
    }
    
    [data-theme="tech-${variant}"] {
      ${Object.entries(cssVariables).map(([name, value]) => `${name}: ${value};`).join('\n      ')}
    }
  `;
  
  styleElement.textContent = cssContent;
  
  console.info(`🎨 科技风主题CSS变量已注入 (${variant}变体)`);
};

/**
 * 科技风主题初始化函数
 * 
 * 完整的主题初始化流程
 * 
 * @param options - 初始化选项
 */
export const initializeTechTheme = (options: {
  setAsDefault?: boolean;
  variant?: 'dark' | 'light';
  injectVariables?: boolean;
} = {}): void => {
  const {
    setAsDefault = true,
    variant = 'dark',
    injectVariables = true,
  } = options;
  
  try {
    // 注册主题
    registerTechTheme(setAsDefault);
    
    // 注入CSS变量
    if (injectVariables) {
      injectTechThemeVariables(variant);
    }
    
    console.info(`✅ 科技风主题初始化完成`);
  } catch (error) {
    console.error('❌ 科技风主题初始化失败:', error);
    throw error;
  }
};

/**
 * 默认导出：主题定义
 */
export default techThemeDefinition;