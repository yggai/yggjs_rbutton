/**
 * 主题系统核心类型定义
 * 
 * 定义主题系统的基础架构和接口规范
 * 为多主题扩展提供统一的类型约束和标准
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import { ReactNode } from 'react';
import { ButtonStyleConfig } from './button';

/**
 * 颜色值类型
 * 支持多种颜色格式
 */
export type ColorValue = string;

/**
 * 颜色系统接口
 * 定义主题的色彩体系
 */
export interface ColorSystem {
  /**
   * 主色系
   */
  primary: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };
  
  /**
   * 次要色系
   */
  secondary: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };
  
  /**
   * 危险色系
   */
  danger: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };
  
  /**
   * 成功色系
   */
  success: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };
  
  /**
   * 中性色系
   */
  neutral: {
    50: ColorValue;
    100: ColorValue;
    200: ColorValue;
    300: ColorValue;
    400: ColorValue;
    500: ColorValue;
    600: ColorValue;
    700: ColorValue;
    800: ColorValue;
    900: ColorValue;
  };
  
  /**
   * 语义化颜色
   */
  semantic: {
    background: ColorValue;
    surface: ColorValue;
    border: ColorValue;
    text: {
      primary: ColorValue;
      secondary: ColorValue;
      disabled: ColorValue;
    };
    shadow: ColorValue;
    overlay: ColorValue;
  };
}

/**
 * 字体权重类型
 */
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';

/**
 * 字体大小类型
 */
export type FontSize = string;

/**
 * 行高类型
 */
export type LineHeight = string | number;

/**
 * 字体系统接口
 * 定义主题的字体排版体系
 */
export interface TypographySystem {
  /**
   * 字体家族
   */
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  
  /**
   * 字体大小
   */
  fontSize: {
    xs: FontSize;
    sm: FontSize;
    base: FontSize;
    lg: FontSize;
    xl: FontSize;
    '2xl': FontSize;
    '3xl': FontSize;
    '4xl': FontSize;
    '5xl': FontSize;
  };
  
  /**
   * 字体权重
   */
  fontWeight: {
    thin: FontWeight;
    light: FontWeight;
    normal: FontWeight;
    medium: FontWeight;
    semibold: FontWeight;
    bold: FontWeight;
    extrabold: FontWeight;
  };
  
  /**
   * 行高
   */
  lineHeight: {
    tight: LineHeight;
    snug: LineHeight;
    normal: LineHeight;
    relaxed: LineHeight;
    loose: LineHeight;
  };
  
  /**
   * 字母间距
   */
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
}

/**
 * 间距值类型
 */
export type SpacingValue = string | number;

/**
 * 间距系统接口
 * 定义主题的空间体系
 */
export interface SpacingSystem {
  /**
   * 基础间距单位
   */
  0: SpacingValue;
  0.5: SpacingValue;
  1: SpacingValue;
  1.5: SpacingValue;
  2: SpacingValue;
  2.5: SpacingValue;
  3: SpacingValue;
  3.5: SpacingValue;
  4: SpacingValue;
  5: SpacingValue;
  6: SpacingValue;
  7: SpacingValue;
  8: SpacingValue;
  9: SpacingValue;
  10: SpacingValue;
  11: SpacingValue;
  12: SpacingValue;
  14: SpacingValue;
  16: SpacingValue;
  20: SpacingValue;
  24: SpacingValue;
  28: SpacingValue;
  32: SpacingValue;
  36: SpacingValue;
  40: SpacingValue;
  44: SpacingValue;
  48: SpacingValue;
  52: SpacingValue;
  56: SpacingValue;
  60: SpacingValue;
  64: SpacingValue;
  72: SpacingValue;
  80: SpacingValue;
  96: SpacingValue;
}

/**
 * 动画时间类型
 */
export type AnimationDuration = string;

/**
 * 动画缓动函数类型
 */
export type AnimationTimingFunction = string;

/**
 * 动画系统接口
 * 定义主题的动画体系
 */
export interface AnimationSystem {
  /**
   * 动画持续时间
   */
  duration: {
    instant: AnimationDuration;
    fast: AnimationDuration;
    normal: AnimationDuration;
    slow: AnimationDuration;
    slower: AnimationDuration;
  };
  
  /**
   * 缓动函数
   */
  easing: {
    linear: AnimationTimingFunction;
    ease: AnimationTimingFunction;
    easeIn: AnimationTimingFunction;
    easeOut: AnimationTimingFunction;
    easeInOut: AnimationTimingFunction;
    bounce: AnimationTimingFunction;
    elastic: AnimationTimingFunction;
  };
  
  /**
   * 过渡配置
   */
  transition: {
    all: string;
    colors: string;
    opacity: string;
    shadow: string;
    transform: string;
  };
}

/**
 * 阴影系统接口
 * 定义主题的阴影体系
 */
export interface ShadowSystem {
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

/**
 * 边框半径系统接口
 * 定义主题的圆角体系
 */
export interface BorderRadiusSystem {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

/**
 * 设计令牌接口
 * 聚合所有设计系统的令牌
 */
export interface DesignTokens {
  /**
   * 色彩系统
   */
  colors: ColorSystem;
  
  /**
   * 字体系统
   */
  typography: TypographySystem;
  
  /**
   * 间距系统
   */
  spacing: SpacingSystem;
  
  /**
   * 动画系统
   */
  animation: AnimationSystem;
  
  /**
   * 阴影系统
   */
  shadow: ShadowSystem;
  
  /**
   * 边框半径系统
   */
  borderRadius: BorderRadiusSystem;
}

/**
 * 组件样式映射接口
 * 定义主题中各组件的样式配置
 */
export interface ComponentStyleMap {
  /**
   * 按钮组件样式配置
   */
  button: ButtonStyleConfig;
  
  /**
   * 可扩展的其他组件样式配置
   */
  [componentName: string]: any;
}

/**
 * 主题工具函数接口
 * 定义主题提供的工具函数
 */
export interface ThemeUtilities {
  /**
   * 颜色工具函数
   */
  colors: {
    /**
     * 获取颜色值
     */
    getColor: (path: string) => ColorValue | undefined;
    
    /**
     * 颜色透明度调整
     */
    alpha: (color: ColorValue, alpha: number) => ColorValue;
    
    /**
     * 颜色混合
     */
    mix: (color1: ColorValue, color2: ColorValue, weight?: number) => ColorValue;
  };
  
  /**
   * 间距工具函数
   */
  spacing: {
    /**
     * 获取间距值
     */
    getSpacing: (value: keyof SpacingSystem) => SpacingValue;
    
    /**
     * 间距计算
     */
    calculate: (base: SpacingValue, multiplier: number) => SpacingValue;
  };
  
  /**
   * 响应式工具函数
   */
  responsive: {
    /**
     * 媒体查询断点
     */
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    
    /**
     * 生成媒体查询
     */
    mediaQuery: (breakpoint: keyof ThemeUtilities['responsive']['breakpoints']) => string;
  };
  
  /**
   * 样式混合工具
   */
  mixins: {
    /**
     * 文本截断
     */
    truncate: () => React.CSSProperties;
    
    /**
     * 居中对齐
     */
    center: () => React.CSSProperties;
    
    /**
     * 绝对定位填满
     */
    absoluteFill: () => React.CSSProperties;
  };
}

/**
 * 主题元数据接口
 * 定义主题的基本信息
 */
export interface ThemeMetadata {
  /**
   * 主题唯一标识符
   */
  id: string;
  
  /**
   * 主题名称
   */
  name: string;
  
  /**
   * 主题描述
   */
  description: string;
  
  /**
   * 主题版本
   */
  version: string;
  
  /**
   * 主题作者
   */
  author: string;
  
  /**
   * 主题标签
   */
  tags: string[];
  
  /**
   * 目标使用场景
   */
  targetScenario: string[];
  
  /**
   * 主题预览图
   */
  preview?: string;
  
  /**
   * 主题文档链接
   */
  documentation?: string;
}

/**
 * 主题变体接口
 * 定义主题的不同变体（如深色、浅色模式）
 */
export interface ThemeVariant {
  /**
   * 变体的令牌覆盖
   */
  colors?: Partial<ColorSystem>;
  typography?: Partial<TypographySystem>;
  spacing?: Partial<SpacingSystem>;
  animation?: Partial<AnimationSystem>;
  shadows?: Partial<ShadowSystem>;
  borderRadius?: Partial<BorderRadiusSystem>;
}

/**
 * 主题定义接口
 * 完整的主题定义结构
 */
export interface ThemeDefinition {
  /**
   * 主题唯一标识符
   */
  id: string;
  
  /**
   * 主题名称
   */
  name: string;
  
  /**
   * 主题描述
   */
  description?: string;
  
  /**
   * 主题版本
   */
  version: string;
  
  /**
   * 主题作者信息
   */
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  
  /**
   * 设计令牌
   */
  tokens: {
    colors: ColorSystem;
    typography: TypographySystem;
    spacing: SpacingSystem;
    animation: AnimationSystem;
    shadows: ShadowSystem;
    borderRadius: BorderRadiusSystem;
    [key: string]: any;
  };
  
  /**
   * 主题变体（如深色、浅色模式）
   */
  variants?: Record<string, ThemeVariant>;
  
  /**
   * 响应式断点配置
   */
  breakpoints?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    wide?: string;
    [key: string]: string | undefined;
  };
  
  /**
   * 主题特性标识
   */
  features?: {
    supportsDarkMode?: boolean;
    supportsLightMode?: boolean;
    supportsHighContrast?: boolean;
    supportsReducedMotion?: boolean;
    supportsResponsive?: boolean;
    supportsRTL?: boolean;
    supportsCustomization?: boolean;
    [key: string]: boolean | undefined;
  };
  
  /**
   * 主题配置选项
   */
  config?: {
    defaultVariant?: string;
    cssVariablePrefix?: string;
    autoInjectCSSVariables?: boolean;
    enableCaching?: boolean;
    cacheTTL?: number;
    [key: string]: any;
  };
}

/**
 * 主题注册表接口
 * 定义主题注册和管理功能
 */
export interface ThemeRegistry {
  /**
   * 注册主题
   */
  register: (theme: ThemeDefinition) => void;
  
  /**
   * 注销主题
   */
  unregister: (themeId: string) => boolean;
  
  /**
   * 获取主题
   */
  get: (themeId: string) => ThemeDefinition | null;
  
  /**
   * 获取所有主题
   */
  getAll: () => string[];
  
  /**
   * 检查主题是否存在
   */
  has: (themeId: string) => boolean;
  
  /**
   * 设置活跃主题
   */
  setActiveTheme: (themeId: string) => void;
  
  /**
   * 获取活跃主题
   */
  getActiveTheme: () => ThemeDefinition | null;
  
  /**
   * 清除所有主题
   */
  clear: () => void;
}

/**
 * 主题上下文接口
 * 定义主题上下文的数据结构
 */
export interface ThemeContext {
  /**
   * 当前激活的主题
   */
  currentTheme: ThemeDefinition;
  
  /**
   * 可用的主题列表
   */
  availableThemes: ThemeDefinition[];
  
  /**
   * 切换主题函数
   */
  setTheme: (themeId: string) => void;
  
  /**
   * 注册新主题
   */
  registerTheme: (theme: ThemeDefinition) => void;
  
  /**
   * 注销主题
   */
  unregisterTheme: (themeId: string) => void;
  
  /**
   * 主题是否正在加载
   */
  isLoading: boolean;
  
  /**
   * 主题加载错误
   */
  error: Error | null;
}

/**
 * 主题Provider属性接口
 * 定义ThemeProvider组件的属性
 */
export interface ThemeProviderProps {
  /**
   * 子组件
   */
  children: ReactNode;
  
  /**
   * 默认主题ID
   */
  defaultTheme?: string;
  
  /**
   * 初始主题列表
   */
  themes?: ThemeDefinition[];
  
  /**
   * 主题变化回调
   */
  onThemeChange?: (theme: ThemeDefinition) => void;
  
  /**
   * 是否启用主题缓存
   * @default true
   */
  enableCache?: boolean;
  
  /**
   * 是否启用主题持久化
   * @default true
   */
  enablePersistence?: boolean;
  
  /**
   * 持久化存储键名
   * @default 'yggjs-theme'
   */
  persistenceKey?: string;
}

/**
 * 使用主题Hook的返回值接口
 */
export interface UseThemeReturn {
  /**
   * 当前主题
   */
  theme: ThemeDefinition;
  
  /**
   * 主题令牌
   */
  tokens: DesignTokens;
  
  /**
   * 主题工具函数
   */
  utils: ThemeUtilities;
  
  /**
   * 切换主题
   */
  setTheme: (themeId: string) => void;
  
  /**
   * 获取可用主题列表
   */
  getAvailableThemes: () => ThemeDefinition[];
  
  /**
   * 主题状态
   */
  state: {
    isLoading: boolean;
    error: Error | null;
  };
}

/**
 * 主题配置接口
 * 用于主题系统的全局配置
 */
export interface ThemeConfig {
  /**
   * 是否启用开发模式
   * 开发模式下会输出更多调试信息
   * @default false
   */
  development?: boolean;
  
  /**
   * 样式缓存配置
   */
  cache?: {
    /**
     * 是否启用样式缓存
     * @default true
     */
    enabled: boolean;
    
    /**
     * 缓存最大大小
     * @default 100
     */
    maxSize: number;
    
    /**
     * 缓存TTL（毫秒）
     * @default 300000 (5分钟)
     */
    ttl: number;
  };
  
  /**
   * 性能配置
   */
  performance?: {
    /**
     * 是否启用样式懒加载
     * @default true
     */
    lazyLoadStyles: boolean;
    
    /**
     * 是否启用样式去重
     * @default true
     */
    deduplicateStyles: boolean;
    
    /**
     * 批量样式更新间隔（毫秒）
     * @default 16
     */
    batchUpdateInterval: number;
  };
}

/**
 * 主题验证器接口
 * 用于验证主题定义的完整性和正确性
 */
export interface ThemeValidator {
  /**
   * 验证主题定义
   */
  validate: (theme: Partial<ThemeDefinition>) => ValidationResult;
  
  /**
   * 验证设计令牌
   */
  validateTokens: (tokens: Partial<DesignTokens>) => ValidationResult;
  
  /**
   * 验证组件样式
   */
  validateComponents: (components: Partial<ComponentStyleMap>) => ValidationResult;
}

/**
 * 验证结果接口
 */
export interface ValidationResult {
  /**
   * 是否验证通过
   */
  isValid: boolean;
  
  /**
   * 错误信息列表
   */
  errors: ValidationError[];
  
  /**
   * 警告信息列表
   */
  warnings: ValidationWarning[];
}

/**
 * 验证错误接口
 */
export interface ValidationError {
  /**
   * 错误路径
   */
  path: string;
  
  /**
   * 错误消息
   */
  message: string;
  
  /**
   * 错误代码
   */
  code: string;
}

/**
 * 验证警告接口
 */
export interface ValidationWarning {
  /**
   * 警告路径
   */
  path: string;
  
  /**
   * 警告消息
   */
  message: string;
  
  /**
   * 警告代码
   */
  code: string;
}