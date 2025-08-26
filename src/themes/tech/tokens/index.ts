/**
 * 科技风主题 - 设计令牌统一导出
 * 
 * 聚合所有设计令牌，提供统一的主题接口
 * 确保主题系统的完整性和一致性
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import type { ThemeDefinition } from '../../../core/types';
import { 
  techColorTokens, 
  techColorTokensLight, 
  techGradients, 
  techColorUtils 
} from './colors';
import { 
  techTypographyTokens, 
  techTypographyPresets, 
  techTypographyUtils 
} from './typography';
import { 
  techSpacingTokens, 
  techSpacingPresets, 
  techSpacingUtils 
} from './spacing';
import { 
  techAnimationTokens, 
  techShadowTokens, 
  techBorderRadiusTokens,
  techEffectsPresets,
  techAnimationUtils
} from './animation';

/**
 * 科技风主题完整定义
 * 
 * 特点：
 * - 现代科技感的视觉风格
 * - 蓝色系主色调
 * - 支持深色/浅色模式
 * - 优化的动画和交互效果
 * - 完善的无障碍支持
 */
export const techThemeDefinition: ThemeDefinition = {
  /**
   * 主题基本信息
   */
  id: 'tech',
  name: '科技风主题',
  description: '现代科技感设计，以蓝色为主基调，适合科技产品和专业应用',
  version: '1.0.0',
  
  /**
   * 主题作者信息
   */
  author: {
    name: '源滚滚AI编程',
    email: 'team@yggjs.org',
    url: 'https://yggjs.org',
  },
  
  /**
   * 设计令牌系统
   */
  tokens: {
    /**
     * 颜色系统
     */
    colors: techColorTokens,
    
    /**
     * 字体排版系统
     */
    typography: techTypographyTokens,
    
    /**
     * 间距系统
     */
    spacing: techSpacingTokens,
    
    /**
     * 动画系统
     */
    animation: techAnimationTokens,
    
    /**
     * 阴影系统
     */
    shadow: techShadowTokens,
    
    /**
     * 边框半径系统
     */
    borderRadius: techBorderRadiusTokens,
  },
  
  /**
   * 主题变体支持
   */
  variants: {
    /**
     * 深色模式（默认）
     */
    dark: {
      colors: techColorTokens,
    },
    
    /**
     * 浅色模式
     */
    light: {
      colors: techColorTokensLight,
    },
  },
  
  /**
   * 响应式断点配置
   */
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  
  /**
   * 主题特性标识
   */
  features: {
    /**
     * 支持深色模式
     */
    supportsDarkMode: true,
    
    /**
     * 支持浅色模式
     */
    supportsLightMode: true,
    
    /**
     * 支持高对比度模式
     */
    supportsHighContrast: true,
    
    /**
     * 支持减少动画
     */
    supportsReducedMotion: true,
    
    /**
     * 支持响应式设计
     */
    supportsResponsive: true,
    
    /**
     * 支持RTL布局
     */
    supportsRTL: false,
    
    /**
     * 支持主题定制
     */
    supportsCustomization: true,
  },
  
  /**
   * 主题配置选项
   */
  config: {
    /**
     * 默认变体
     */
    defaultVariant: 'dark',
    
    /**
     * CSS变量前缀
     */
    cssVariablePrefix: '--tech',
    
    /**
     * 是否自动注入CSS变量
     */
    autoInjectCSSVariables: true,
    
    /**
     * 是否支持主题缓存
     */
    enableCaching: true,
    
    /**
     * 缓存TTL（毫秒）
     */
    cacheTTL: 300000, // 5分钟
  },
};

/**
 * 科技风主题预设样式
 * 预定义的组件样式配置
 */
export const techThemePresets = {
  /**
   * 字体预设
   */
  typography: techTypographyPresets,
  
  /**
   * 间距预设
   */
  spacing: techSpacingPresets,
  
  /**
   * 效果预设
   */
  effects: techEffectsPresets,
  
  /**
   * 渐变预设
   */
  gradients: techGradients,
  
  /**
   * 按钮预设样式
   */
  button: {
    /**
     * 基础样式
     */
    base: {
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
      fontWeight: techTypographyTokens.fontWeight.medium,
      borderRadius: techBorderRadiusTokens.base,
      transition: techAnimationTokens.transition.all,
      cursor: 'pointer',
      userSelect: 'none' as const,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      border: 'none',
      outline: 'none',
    },
    
    /**
     * 尺寸变体
     */
    sizes: {
      sm: {
        fontSize: techTypographyTokens.fontSize.xs,
        padding: `${techSpacingTokens[2]} ${techSpacingTokens[3]}`,
        minHeight: techSpacingTokens[8],
        gap: techSpacingTokens[1.5],
      },
      md: {
        fontSize: techTypographyTokens.fontSize.sm,
        padding: `${techSpacingTokens[3]} ${techSpacingTokens[4]}`,
        minHeight: techSpacingTokens[11],
        gap: techSpacingTokens[2],
      },
      lg: {
        fontSize: techTypographyTokens.fontSize.base,
        padding: `${techSpacingTokens[4]} ${techSpacingTokens[6]}`,
        minHeight: techSpacingTokens[12],
        gap: techSpacingTokens[2.5],
      },
    },
    
    /**
     * 颜色变体
     */
    variants: {
      primary: {
        backgroundColor: techColorTokens.primary[500],
        color: techColorTokens.neutral[50],
        '&:hover': {
          backgroundColor: techColorTokens.primary[400],
          boxShadow: techEffectsPresets.glow.subtle.boxShadow,
        },
        '&:active': {
          backgroundColor: techColorTokens.primary[600],
        },
        '&:disabled': {
          backgroundColor: techColorTokens.neutral[600],
          color: techColorTokens.neutral[400],
          cursor: 'not-allowed',
        },
      },
      secondary: {
        backgroundColor: techColorTokens.secondary[500],
        color: techColorTokens.neutral[900],
        '&:hover': {
          backgroundColor: techColorTokens.secondary[400],
          boxShadow: `0 0 10px ${techColorTokens.secondary[300]}`,
        },
        '&:active': {
          backgroundColor: techColorTokens.secondary[600],
        },
        '&:disabled': {
          backgroundColor: techColorTokens.neutral[600],
          color: techColorTokens.neutral[400],
          cursor: 'not-allowed',
        },
      },
      danger: {
        backgroundColor: techColorTokens.danger[500],
        color: techColorTokens.neutral[50],
        '&:hover': {
          backgroundColor: techColorTokens.danger[400],
          boxShadow: `0 0 10px ${techColorTokens.danger[300]}`,
        },
        '&:active': {
          backgroundColor: techColorTokens.danger[600],
        },
        '&:disabled': {
          backgroundColor: techColorTokens.neutral[600],
          color: techColorTokens.neutral[400],
          cursor: 'not-allowed',
        },
      },
      success: {
        backgroundColor: techColorTokens.success[500],
        color: techColorTokens.neutral[900],
        '&:hover': {
          backgroundColor: techColorTokens.success[400],
          boxShadow: `0 0 10px ${techColorTokens.success[300]}`,
        },
        '&:active': {
          backgroundColor: techColorTokens.success[600],
        },
        '&:disabled': {
          backgroundColor: techColorTokens.neutral[600],
          color: techColorTokens.neutral[400],
          cursor: 'not-allowed',
        },
      },
    },
    
    /**
     * 填充模式
     */
    fills: {
      outline: {
        backgroundColor: 'transparent',
        border: `1px solid currentColor`,
      },
      ghost: {
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: techColorTokens.neutral[800],
        },
      },
      link: {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
    
    /**
     * 形状变体
     */
    shapes: {
      rounded: {
        borderRadius: techBorderRadiusTokens.lg,
      },
      circle: {
        borderRadius: techBorderRadiusTokens.full,
      },
      square: {
        borderRadius: techBorderRadiusTokens.none,
      },
    },
  },
};

/**
 * 科技风主题工具函数
 * 提供主题相关的计算和生成功能
 */
export const techThemeUtils = {
  /**
   * 颜色工具
   */
  colors: techColorUtils,
  
  /**
   * 字体工具
   */
  typography: techTypographyUtils,
  
  /**
   * 间距工具
   */
  spacing: techSpacingUtils,
  
  /**
   * 动画工具
   */
  animation: techAnimationUtils,
  
  /**
   * 生成CSS变量
   * 
   * @param tokens - 设计令牌
   * @param prefix - 变量前缀
   * @returns CSS变量对象
   */
  generateCSSVariables(
    tokens: Record<string, unknown>,
    prefix: string = '--tech'
  ): Record<string, string> {
    const variables: Record<string, string> = {};
    
    function processTokens(obj: Record<string, unknown>, path: string = '') {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = path ? `${path}-${key}` : key;
        
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
          processTokens(value as Record<string, unknown>, currentPath);
        } else {
          const variableName = `${prefix}-${currentPath}`;
          variables[variableName] = String(value);
        }
      });
    }
    
    processTokens(tokens);
    return variables;
  },
  
  /**
   * 生成主题CSS
   * 
   * @param variant - 主题变体
   * @returns CSS字符串
   */
  generateThemeCSS(variant: 'dark' | 'light' = 'dark'): string {
    const tokens = variant === 'light' ? techColorTokensLight : techColorTokens;
    const cssVariables = this.generateCSSVariables({
      colors: tokens,
      typography: techTypographyTokens,
      spacing: techSpacingTokens,
      animation: techAnimationTokens,
      shadow: techShadowTokens,
      borderRadius: techBorderRadiusTokens,
    });
    
    const cssRules = Object.entries(cssVariables)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');
    
    return `
:root {
${cssRules}
}

[data-theme="tech-${variant}"] {
${cssRules}
}
    `.trim();
  },
  
  /**
   * 获取响应式样式
   * 
   * @param property - CSS属性
   * @param values - 响应式值
   * @returns 响应式CSS对象
   */
  getResponsiveStyles(
    property: string,
    values: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
      wide?: string;
    }
  ): Record<string, unknown> {
    const breakpoints = techThemeDefinition.breakpoints;
    const styles: Record<string, unknown> = {};
    
    if (values.mobile) {
      styles[property] = values.mobile;
    }
    
    if (values.tablet) {
      styles[`@media (min-width: ${breakpoints.tablet})`] = {
        [property]: values.tablet,
      };
    }
    
    if (values.desktop) {
      styles[`@media (min-width: ${breakpoints.desktop})`] = {
        [property]: values.desktop,
      };
    }
    
    if (values.wide) {
      styles[`@media (min-width: ${breakpoints.wide})`] = {
        [property]: values.wide,
      };
    }
    
    return styles;
  },
};

/**
 * 默认导出科技风主题定义
 */
export default techThemeDefinition;