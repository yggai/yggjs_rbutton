/**
 * 极简主题 - 设计令牌统一导出
 * 
 * 整合所有极简主题的设计令牌系统
 * 创建完整的主题定义，与科技风形成鲜明对比
 * 强调简洁、纯净、优雅的设计理念
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import type { ThemeDefinition } from '../../../core/types';

// 导入各个设计令牌系统
import { 
  minimalColorTokens, 
  minimalColorTokensLight, 
  minimalColorTokensDark, 
  minimalColorUtils 
} from './colors';

import { 
  minimalTypographyTokens, 
  minimalTypographyPresets, 
  minimalTypographyUtils 
} from './typography';

import { 
  minimalSpacingTokens, 
  minimalSpacingPresets, 
  minimalSpacingUtils 
} from './spacing';

import { 
  minimalAnimationTokens, 
  minimalShadowTokens, 
  minimalShadowTokensDark, 
  minimalBorderRadiusTokens, 
  minimalEffectsPresets, 
  minimalAnimationUtils 
} from './animation';

// 重新导出所有令牌，以保持向后兼容性
export {
  minimalColorTokens,
  minimalColorTokensLight, 
  minimalColorTokensDark,
  minimalColorUtils,
  minimalTypographyTokens,
  minimalTypographyPresets,
  minimalTypographyUtils,
  minimalSpacingTokens,
  minimalSpacingPresets,
  minimalSpacingUtils,
  minimalAnimationTokens,
  minimalShadowTokens,
  minimalShadowTokensDark,
  minimalBorderRadiusTokens,
  minimalEffectsPresets,
  minimalAnimationUtils
};

/**
 * 极简主题完整定义
 * 
 * 特点说明：
 * - 与科技风主题形成鲜明对比
 * - 科技风：蓝色基调、丰富效果、现代几何
 * - 极简风：灰色基调、微妙效果、经典阅读
 * 
 * 设计原则：
 * - 克制的色彩：以灰度为主，避免强烈色彩冲击
 * - 微妙的动效：温和过渡，避免突兀的视觉变化
 * - 舒适的间距：充分的呼吸空间，提升内容可读性
 * - 经典的字体：系统字体优先，确保跨平台一致性
 * - 纯净的阴影：极其微妙的阴影效果，保持轻盈感
 */
export const minimalThemeDefinition: ThemeDefinition = {
  /**
   * 主题基本信息
   */
  name: 'minimal',
  id: 'minimal',
  description: '追求纯净简洁的设计美学，以灰度色彩和微妙效果营造优雅平静的使用体验',
  version: '1.0.0',
  
  /**
   * 设计令牌
   */
  tokens: {
    /**
     * 颜色系统
     * 使用灰度为主的色彩体系
     */
    colors: minimalColorTokens,
    
    /**
     * 字体系统
     * 强调可读性和跨平台一致性
     */
    typography: minimalTypographyTokens,
    
    /**
     * 间距系统
     * 创造舒适的呼吸空间
     */
    spacing: minimalSpacingTokens,
    
    /**
     * 动画系统
     * 温和微妙的过渡效果
     */
    animation: minimalAnimationTokens,
    
    /**
     * 阴影系统
     * 极其微妙的层次表现
     */
    shadow: minimalShadowTokens,
    
    /**
     * 边框半径系统
     * 细腻的圆角处理
     */
    borderRadius: minimalBorderRadiusTokens,
  },
  
  /**
   * 主题变体
   * 支持浅色和深色模式
   */
  variants: {
    light: {
      colors: minimalColorTokensLight,
    },
    dark: {
      colors: minimalColorTokensDark,
    },
  },
  
  /**
   * 主题特性标识
   */
  features: {
    supportsDarkMode: true,
    supportsLightMode: true,
    supportsHighContrast: true,
    supportsReducedMotion: true,
    supportsResponsive: true,
    supportsRTL: false,
    supportsCustomization: true,
  },
};

/**
 * 主题预设组合（独立导出）
 * 常用的设计模式组合
 */
export const minimalThemePresets = {
  typography: minimalTypographyPresets,
  spacing: minimalSpacingPresets,
  effects: minimalEffectsPresets,
};

/**
 * 主题工具函数（独立导出）
 * 提供主题相关的计算和生成功能
 */
export const minimalThemeUtils = {
  color: minimalColorUtils,
  typography: minimalTypographyUtils,
  spacing: minimalSpacingUtils,
  animation: minimalAnimationUtils,
};

export default minimalThemeDefinition;
