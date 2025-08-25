/**
 * 极简主题 - 设计令牌统一导出
 * 
 * 整合所有极简主题的设计令牌系统
 * 创建完整的主题定义，与科技风形成鲜明对比
 * 强调简洁、纯净、优雅的设计理念
 * 
 * @version 1.0.0
 * @author YggJS Team
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
  displayName: '极简主题',
  description: '追求纯净简洁的设计美学，以灰度色彩和微妙效果营造优雅平静的使用体验',
  version: '1.0.0',
  
  /**
   * 主题类别和标签
   */
  category: 'minimal',
  tags: ['简约', '灰度', '优雅', '阅读友好', '经典'],
  
  /**
   * 主题特性标识
   */
  features: {
    /**
     * 支持深色模式
     * 提供完整的深色和浅色模式切换
     */
    darkMode: true,
    
    /**
     * 高对比度支持
     * 确保内容的清晰可读性
     */
    highContrast: true,
    
    /**
     * 动画偏好支持
     * 尊重用户的动画偏好设置
     */
    respectsMotionPreference: true,
    
    /**
     * 响应式设计
     * 支持各种屏幕尺寸的适配
     */
    responsive: true,
    
    /**
     * 无障碍优化
     * 遵循WCAG可访问性标准
     */
    accessibility: true,
  },
  
  /**
   * 颜色系统
   * 使用灰度为主的色彩体系
   */
  colors: {
    // 浅色模式颜色
    light: minimalColorTokensLight,
    
    // 深色模式颜色
    dark: minimalColorTokensDark,
    
    // 默认使用浅色模式
    default: minimalColorTokens,
  },
  
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
  shadows: {
    light: minimalShadowTokens,
    dark: minimalShadowTokensDark,
    default: minimalShadowTokens,
  },
  
  /**
   * 边框圆角系统
   * 适度的圆角设计
   */
  borderRadius: minimalBorderRadiusTokens,
  
  /**
   * 主题预设组合
   * 常用的设计模式组合
   */
  presets: {
    typography: minimalTypographyPresets,
    spacing: minimalSpacingPresets,
    effects: minimalEffectsPresets,
  },
  
  /**
   * 主题工具函数
   * 提供主题相关的计算和生成功能
   */
  utils: {
    color: minimalColorUtils,
    typography: minimalTypographyUtils,
    spacing: minimalSpacingUtils,
    animation: minimalAnimationUtils,
  },
  
  /**
   * 组件默认配置
   * 为组件提供主题特定的默认设置
   */
  componentDefaults: {
    /**
     * 按钮组件默认配置
     */
    button: {
      // 默认变体：outline（极简风格偏好）
      variant: 'outline',
      
      // 默认尺寸：medium
      size: 'medium',
      
      // 默认圆角：适中的圆角
      borderRadius: 'base',
      
      // 默认动画：微妙过渡
      transition: 'all',
      
      // 禁用渐变效果（保持纯净）
      gradient: false,
      
      // 启用微妙阴影
      shadow: 'sm',
    },
    
    /**
     * 卡片组件默认配置
     */
    card: {
      // 默认背景：surface色
      background: 'surface',
      
      // 默认边框：subtle边框
      border: 'base',
      
      // 默认圆角：中等圆角
      borderRadius: 'md',
      
      // 默认内边距：comfortable
      padding: 'comfortable',
      
      // 默认阴影：基础阴影
      shadow: 'base',
    },
    
    /**
     * 输入框组件默认配置
     */
    input: {
      // 默认变体：outline
      variant: 'outline',
      
      // 默认尺寸：medium
      size: 'medium',
      
      // 默认圆角：小圆角
      borderRadius: 'sm',
      
      // 启用焦点环
      focusRing: true,
      
      // 使用微妙的焦点效果
      focusStyle: 'subtle',
    },
  },
  
  /**
   * 主题级别的CSS变量定义
   * 用于CSS-in-JS和样式系统集成
   */
  cssVariables: {
    // 基础颜色变量
    '--minimal-color-primary': minimalColorTokens.primary[500],
    '--minimal-color-secondary': minimalColorTokens.secondary[500],
    '--minimal-color-background': minimalColorTokens.semantic.background,
    '--minimal-color-surface': minimalColorTokens.semantic.surface,
    '--minimal-color-text-primary': minimalColorTokens.semantic.text.primary,
    '--minimal-color-text-secondary': minimalColorTokens.semantic.text.secondary,
    '--minimal-color-border': minimalColorTokens.semantic.border,
    
    // 字体变量
    '--minimal-font-family-sans': minimalTypographyTokens.fontFamily.sans.join(', '),
    '--minimal-font-family-serif': minimalTypographyTokens.fontFamily.serif.join(', '),
    '--minimal-font-family-mono': minimalTypographyTokens.fontFamily.mono.join(', '),
    
    // 间距变量
    '--minimal-spacing-unit': '0.25rem', // 4px基础单位
    '--minimal-spacing-page': minimalSpacingPresets.layout.pageMargin.desktop,
    
    // 动画变量
    '--minimal-duration-fast': minimalAnimationTokens.duration.fast,
    '--minimal-duration-normal': minimalAnimationTokens.duration.normal,
    '--minimal-easing-default': minimalAnimationTokens.easing.easeOut,
    
    // 阴影变量
    '--minimal-shadow-subtle': minimalShadowTokens.sm,
    '--minimal-shadow-base': minimalShadowTokens.base,
    
    // 圆角变量
    '--minimal-radius-base': minimalBorderRadiusTokens.base,
    '--minimal-radius-md': minimalBorderRadiusTokens.md,
  },
  
  /**
   * 主题兼容性信息
   */
  compatibility: {
    // 最低React版本要求
    react: '>=18.0.0',
    
    // 支持的浏览器
    browsers: ['chrome >= 88', 'firefox >= 78', 'safari >= 14'],
    
    // 支持的设备类型
    devices: ['desktop', 'tablet', 'mobile'],
  },
  
  /**
   * 主题性能配置
   */
  performance: {
    // 启用CSS-in-JS优化
    cssInJsOptimization: true,
    
    // 启用主题令牌缓存
    tokenCaching: true,
    
    // 启用运行时优化
    runtimeOptimization: true,
    
    // 预计算样式映射
    precomputedStyles: true,
  },
};

/**
 * 导出所有极简主题相关的设计令牌和工具
 */
export {
  // 颜色系统
  minimalColorTokens,
  minimalColorTokensLight,
  minimalColorTokensDark,
  minimalColorUtils,
  
  // 字体系统
  minimalTypographyTokens,
  minimalTypographyPresets,
  minimalTypographyUtils,
  
  // 间距系统
  minimalSpacingTokens,
  minimalSpacingPresets,
  minimalSpacingUtils,
  
  // 动画和效果系统
  minimalAnimationTokens,
  minimalShadowTokens,
  minimalShadowTokensDark,
  minimalBorderRadiusTokens,
  minimalEffectsPresets,
  minimalAnimationUtils,
};

/**
   * 极简主题的核心设计原则
   * 
   * 与科技风主题的对比：
   * 
   * 1. 颜色理念对比：
   *    - 科技风：蓝色为主导，强调科技感和未来感
   *    - 极简风：灰度为主导，强调纯净感和经典感
   * 
   * 2. 动效理念对比：
   *    - 科技风：丰富的动效，包括发光、脉冲、弹性等
   *    - 极简风：微妙的动效，温和过渡，避免视觉干扰
   * 
   * 3. 间距理念对比：
   *    - 科技风：紧凑高效的间距，体现现代感
   *    - 极简风：充分的呼吸空间，体现舒适感
   * 
   * 4. 字体理念对比：
   *    - 科技风：现代几何字体，强调技术感
   *    - 极简风：经典系统字体，强调可读性
   * 
   * 5. 阴影理念对比：
   *    - 科技风：丰富的阴影层次，包括彩色阴影
   *    - 极简风：极其微妙的阴影，保持轻盈感
   * 
   * 适用场景：
   * - 内容阅读类应用
   * - 文档和写作工具
   * - 极简设计偏好的用户界面
   * - 需要长时间使用的工具应用
   * - 强调内容而非装饰的应用场景
   */

/**
 * 默认导出极简主题定义
 * 方便其他模块直接导入使用
 */
export default minimalThemeDefinition;