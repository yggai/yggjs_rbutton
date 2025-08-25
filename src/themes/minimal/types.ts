/**
 * 极简主题 - 类型定义
 * 
 * 定义极简主题的完整类型系统
 * 与科技风主题形成对比，体现极简设计的理念
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import type { ThemeDefinition, BaseButtonProps } from '../../core/types';

/**
 * 极简主题颜色模式
 * 支持浅色、深色和自动模式
 */
export type MinimalColorMode = 'light' | 'dark' | 'auto';

/**
 * 极简主题内容密度
 * 控制组件内部间距的密度级别
 */
export type MinimalDensity = 'compact' | 'comfortable' | 'spacious';

/**
 * 极简主题边框样式
 * 控制边框的显示强度
 */
export type MinimalBorderStyle = 'none' | 'subtle' | 'visible';

/**
 * 极简主题阴影强度
 * 控制阴影效果的显示程度
 */
export type MinimalShadowIntensity = 'none' | 'subtle' | 'visible';

/**
 * 极简主题文字样式
 * 控制文字的字重和风格
 */
export type MinimalTextStyle = 'light' | 'normal' | 'medium';

/**
 * 极简主题配置接口
 * 定义极简主题的全局配置选项
 */
export interface MinimalThemeConfig {
  /**
   * 主题标识符
   */
  id: 'minimal';
  
  /**
   * 主题显示名称
   */
  name: '极简主题';
  
  /**
   * 默认颜色模式
   * @default 'light'
   */
  defaultColorMode: MinimalColorMode;
  
  /**
   * 默认内容密度
   * @default 'comfortable'
   */
  defaultDensity: MinimalDensity;
  
  /**
   * 是否启用深色模式支持
   * @default true
   */
  supportsDarkMode: boolean;
  
  /**
   * 是否启用自动颜色模式（跟随系统）
   * @default true
   */
  supportsAutoMode: boolean;
  
  /**
   * 是否启用动画效果
   * @default true
   */
  enableAnimations: boolean;
  
  /**
   * 是否尊重用户的减少动画偏好
   * @default true
   */
  respectReducedMotion: boolean;
  
  /**
   * 是否启用高对比度支持
   * @default true
   */
  supportsHighContrast: boolean;
  
  /**
   * 默认边框样式
   * @default 'subtle'
   */
  defaultBorderStyle: MinimalBorderStyle;
  
  /**
   * 默认阴影强度
   * @default 'subtle'
   */
  defaultShadowIntensity: MinimalShadowIntensity;
  
  /**
   * 默认文字样式
   * @default 'normal'
   */
  defaultTextStyle: MinimalTextStyle;
}

/**
 * 极简主题组件属性扩展接口
 * 为组件添加极简主题特有的属性
 */
export interface MinimalThemeProps {
  /**
   * 颜色模式
   * @default 'light'
   */
  colorMode?: MinimalColorMode;
  
  /**
   * 内容密度
   * @default 'comfortable'
   */
  density?: MinimalDensity;
  
  /**
   * 边框样式
   * @default 'subtle'
   */
  borderStyle?: MinimalBorderStyle;
  
  /**
   * 阴影强度
   * @default 'subtle'
   */
  shadowIntensity?: MinimalShadowIntensity;
  
  /**
   * 文字样式
   * @default 'normal'
   */
  textStyle?: MinimalTextStyle;
}

/**
 * 极简主题按钮属性接口
 * 扩展基础按钮属性，添加极简主题特有的配置
 */
export interface MinimalButtonProps extends BaseButtonProps, MinimalThemeProps {
  /**
   * 极简主题按钮的特殊配置
   */
  minimalConfig?: {
    /**
     * 是否使用纯净模式
     * 纯净模式下会移除所有装饰性效果
     * @default false
     */
    pureMode?: boolean;
    
    /**
     * 是否启用内容优先模式
     * 内容优先模式会优化文本可读性
     * @default true
     */
    contentFirst?: boolean;
    
    /**
     * 是否启用呼吸空间优化
     * 增加内容周围的空白空间
     * @default true
     */
    breathingSpace?: boolean;
  };
}

/**
 * 极简主题样式计算上下文
 * 提供样式计算所需的上下文信息
 */
export interface MinimalStyleContext {
  /**
   * 当前颜色模式
   */
  colorMode: MinimalColorMode;
  
  /**
   * 当前密度设置
   */
  density: MinimalDensity;
  
  /**
   * 当前边框样式
   */
  borderStyle: MinimalBorderStyle;
  
  /**
   * 当前阴影强度
   */
  shadowIntensity: MinimalShadowIntensity;
  
  /**
   * 当前文字样式
   */
  textStyle: MinimalTextStyle;
  
  /**
   * 用户偏好设置
   */
  userPreferences: {
    /**
     * 是否启用高对比度
     */
    prefersHighContrast: boolean;
    
    /**
     * 是否减少动画
     */
    prefersReducedMotion: boolean;
    
    /**
     * 系统颜色方案偏好
     */
    prefersColorScheme: 'light' | 'dark' | 'no-preference';
  };
  
  /**
   * 设备信息
   */
  device: {
    /**
     * 是否为触摸设备
     */
    isTouchDevice: boolean;
    
    /**
     * 是否为移动设备
     */
    isMobileDevice: boolean;
    
    /**
     * 屏幕密度
     */
    pixelRatio: number;
  };
}

/**
 * 极简主题样式令牌类型
 * 定义样式系统中使用的令牌类型
 */
export interface MinimalStyleTokens {
  /**
   * 颜色令牌
   */
  colors: {
    /**
     * 主色系令牌
     */
    primary: Record<string, string>;
    
    /**
     * 次要色系令牌
     */
    secondary: Record<string, string>;
    
    /**
     * 中性色系令牌
     */
    neutral: Record<string, string>;
    
    /**
     * 语义化颜色令牌
     */
    semantic: {
      background: string;
      surface: string;
      border: string;
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      shadow: string;
      overlay: string;
    };
  };
  
  /**
   * 间距令牌
   */
  spacing: Record<string | number, string>;
  
  /**
   * 字体令牌
   */
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, number>;
    letterSpacing: Record<string, string>;
  };
  
  /**
   * 动画令牌
   */
  animation: {
    duration: Record<string, string>;
    easing: Record<string, string>;
    transition: Record<string, string>;
  };
  
  /**
   * 阴影令牌
   */
  shadows: Record<string, string>;
  
  /**
   * 边框半径令牌
   */
  borderRadius: Record<string, string>;
}

/**
 * 极简主题事件处理器接口
 * 定义主题特有的事件处理逻辑
 */
export interface MinimalThemeEventHandlers {
  /**
   * 颜色模式变化处理器
   * 
   * @param newMode - 新的颜色模式
   * @param context - 变化上下文
   */
  onColorModeChange?: (
    newMode: MinimalColorMode,
    context: { previous: MinimalColorMode; trigger: 'user' | 'system' | 'auto' }
  ) => void;
  
  /**
   * 密度变化处理器
   * 
   * @param newDensity - 新的密度设置
   * @param context - 变化上下文
   */
  onDensityChange?: (
    newDensity: MinimalDensity,
    context: { previous: MinimalDensity; trigger: 'user' | 'responsive' }
  ) => void;
  
  /**
   * 用户偏好变化处理器
   * 
   * @param preferences - 新的用户偏好
   * @param changedKeys - 发生变化的偏好键名
   */
  onUserPreferencesChange?: (
    preferences: MinimalStyleContext['userPreferences'],
    changedKeys: Array<keyof MinimalStyleContext['userPreferences']>
  ) => void;
}

/**
 * 极简主题可访问性配置接口
 * 定义主题的可访问性增强选项
 */
export interface MinimalAccessibilityConfig {
  /**
   * 是否启用高对比度模式
   * @default false
   */
  highContrast?: boolean;
  
  /**
   * 是否减少动画效果
   * @default false
   */
  reducedMotion?: boolean;
  
  /**
   * 是否启用大字体支持
   * @default false
   */
  largeText?: boolean;
  
  /**
   * 是否启用键盘导航增强
   * @default true
   */
  enhancedKeyboardNavigation?: boolean;
  
  /**
   * 是否启用屏幕阅读器优化
   * @default true
   */
  screenReaderOptimized?: boolean;
  
  /**
   * 焦点指示器样式
   * @default 'subtle'
   */
  focusIndicator?: 'none' | 'subtle' | 'visible' | 'enhanced';
  
  /**
   * ARIA标签语言
   * @default 'zh'
   */
  ariaLanguage?: string;
}

/**
 * 极简主题性能配置接口
 * 定义主题的性能优化选项
 */
export interface MinimalPerformanceConfig {
  /**
   * 是否启用样式缓存
   * @default true
   */
  enableStyleCache?: boolean;
  
  /**
   * 是否启用虚拟化渲染
   * @default false
   */
  enableVirtualization?: boolean;
  
  /**
   * 是否启用延迟加载
   * @default true
   */
  enableLazyLoading?: boolean;
  
  /**
   * 是否启用硬件加速
   * @default true
   */
  enableHardwareAcceleration?: boolean;
  
  /**
   * 样式缓存大小限制
   * @default 1000
   */
  styleCacheSize?: number;
  
  /**
   * 渲染防抖延迟（毫秒）
   * @default 16
   */
  renderDebounceDelay?: number;
}

/**
 * 极简主题完整配置接口
 * 整合所有配置选项的顶层接口
 */
export interface MinimalThemeFullConfig extends MinimalThemeConfig {
  /**
   * 可访问性配置
   */
  accessibility: MinimalAccessibilityConfig;
  
  /**
   * 性能配置
   */
  performance: MinimalPerformanceConfig;
  
  /**
   * 事件处理器
   */
  eventHandlers: MinimalThemeEventHandlers;
  
  /**
   * 自定义样式令牌
   * 允许覆盖默认的设计令牌
   */
  customTokens?: Partial<MinimalStyleTokens>;
  
  /**
   * CSS变量前缀
   * @default 'minimal'
   */
  cssVariablePrefix?: string;
  
  /**
   * 调试模式
   * @default false
   */
  debug?: boolean;
}

/**
 * 极简主题工具函数类型
 * 定义主题工具函数的签名
 */
export interface MinimalThemeUtils {
  /**
   * 检测系统颜色方案偏好
   * 
   * @returns 系统颜色方案
   */
  detectSystemColorScheme(): 'light' | 'dark' | 'no-preference';
  
  /**
   * 检测用户减少动画偏好
   * 
   * @returns 是否偏好减少动画
   */
  detectReducedMotionPreference(): boolean;
  
  /**
   * 检测高对比度偏好
   * 
   * @returns 是否偏好高对比度
   */
  detectHighContrastPreference(): boolean;
  
  /**
   * 生成CSS变量映射
   * 
   * @param tokens - 样式令牌
   * @param prefix - CSS变量前缀
   * @returns CSS变量映射
   */
  generateCSSVariables(
    tokens: MinimalStyleTokens,
    prefix?: string
  ): Record<string, string>;
  
  /**
   * 计算最优的颜色对比度
   * 
   * @param foreground - 前景色
   * @param background - 背景色
   * @returns 对比度比值
   */
  calculateColorContrast(foreground: string, background: string): number;
  
  /**
   * 验证可访问性合规性
   * 
   * @param config - 组件配置
   * @returns 验证结果
   */
  validateAccessibility(
    config: MinimalButtonProps
  ): {
    isValid: boolean;
    warnings: string[];
    errors: string[];
    suggestions: string[];
  };
}

/**
 * 极简主题状态管理接口
 * 定义主题状态的管理逻辑
 */
export interface MinimalThemeState {
  /**
   * 当前主题配置
   */
  config: MinimalThemeFullConfig;
  
  /**
   * 当前样式上下文
   */
  context: MinimalStyleContext;
  
  /**
   * 是否已初始化
   */
  isInitialized: boolean;
  
  /**
   * 是否正在加载
   */
  isLoading: boolean;
  
  /**
   * 错误状态
   */
  error: string | null;
  
  /**
   * 性能指标
   */
  metrics: {
    renderCount: number;
    lastRenderTime: number;
    averageRenderTime: number;
    cacheHitRate: number;
  };
}

/**
 * 极简主题动作接口
 * 定义主题状态的变更动作
 */
export interface MinimalThemeActions {
  /**
   * 初始化主题
   * 
   * @param config - 主题配置
   */
  initialize(config: Partial<MinimalThemeFullConfig>): void;
  
  /**
   * 更新主题配置
   * 
   * @param updates - 配置更新
   */
  updateConfig(updates: Partial<MinimalThemeFullConfig>): void;
  
  /**
   * 切换颜色模式
   * 
   * @param mode - 新的颜色模式
   */
  setColorMode(mode: MinimalColorMode): void;
  
  /**
   * 设置密度
   * 
   * @param density - 新的密度设置
   */
  setDensity(density: MinimalDensity): void;
  
  /**
   * 重置主题为默认配置
   */
  reset(): void;
  
  /**
   * 清理主题资源
   */
  cleanup(): void;
}

/**
 * 极简主题提供者属性接口
 * 定义主题提供者组件的属性
 */
export interface MinimalThemeProviderProps {
  /**
   * 子组件
   */
  children: React.ReactNode;
  
  /**
   * 主题配置
   */
  config?: Partial<MinimalThemeFullConfig>;
  
  /**
   * 是否启用严格模式
   * 严格模式下会进行更多的类型检查和验证
   * @default false
   */
  strict?: boolean;
}

/**
 * 极简主题Hook返回值接口
 * 定义主题Hook的返回值类型
 */
export interface UseMinimalThemeReturn {
  /**
   * 当前主题状态
   */
  state: MinimalThemeState;
  
  /**
   * 主题动作
   */
  actions: MinimalThemeActions;
  
  /**
   * 主题工具函数
   */
  utils: MinimalThemeUtils;
  
  /**
   * 是否为深色模式
   */
  isDarkMode: boolean;
  
  /**
   * 当前有效的主题令牌
   */
  tokens: MinimalStyleTokens;
}

/**
 * 导出所有类型
 */
export type {
  // 基础类型
  MinimalColorMode,
  MinimalDensity, 
  MinimalBorderStyle,
  MinimalShadowIntensity,
  MinimalTextStyle,
  
  // 配置接口
  MinimalThemeConfig,
  MinimalThemeProps,
  MinimalButtonProps,
  MinimalAccessibilityConfig,
  MinimalPerformanceConfig,
  MinimalThemeFullConfig,
  
  // 上下文和状态
  MinimalStyleContext,
  MinimalStyleTokens,
  MinimalThemeState,
  MinimalThemeActions,
  
  // 组件接口
  MinimalThemeProviderProps,
  UseMinimalThemeReturn,
  
  // 工具接口
  MinimalThemeUtils,
  MinimalThemeEventHandlers,
};