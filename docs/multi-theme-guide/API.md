# yggjs_rbutton React按钮组件v1.0.0 API 参考文档

## 概述

本文档提供了 YggJS 多主题按钮系统的完整 API 参考，包括所有组件、Hook、工具函数和类型定义。

## 目录

- [核心类型](#核心类型)
- [按钮组件](#按钮组件)
- [主题系统](#主题系统)
- [Hook 函数](#hook-函数)
- [工具函数](#工具函数)
- [配置选项](#配置选项)

## 核心类型

### BaseButtonProps

所有按钮组件的基础属性接口。

```typescript
interface BaseButtonProps {
  /**
   * 按钮变体类型
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  
  /**
   * 按钮尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 填充样式
   * @default 'solid'
   */
  fill?: 'solid' | 'outline' | 'ghost';
  
  /**
   * 按钮形状
   * @default 'round'
   */
  shape?: 'square' | 'round' | 'pill';
  
  /**
   * 是否禁用按钮
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean;
  
  /**
   * 加载状态时显示的文本
   * @default '加载中...'
   */
  loadingText?: string;
  
  /**
   * 按钮图标
   */
  icon?: React.ReactNode;
  
  /**
   * 图标位置
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * 聚焦事件处理器
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  /**
   * 失焦事件处理器
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  /**
   * 键盘事件处理器
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  
  /**
   * 鼠标进入事件处理器
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * 鼠标离开事件处理器
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * 子元素内容
   */
  children?: React.ReactNode;
  
  /**
   * 自定义CSS类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * HTML button 元素的原生属性
   */
  [key: string]: any;
}
```

### ThemeDefinition

主题定义的核心接口。

```typescript
interface ThemeDefinition {
  /**
   * 主题唯一标识
   */
  id: string;
  
  /**
   * 主题显示名称
   */
  name: string;
  
  /**
   * 主题版本号
   */
  version: string;
  
  /**
   * 主题描述
   */
  description?: string;
  
  /**
   * 颜色系统定义
   */
  colors: {
    [colorName: string]: {
      [shade: string]: string;
    };
  };
  
  /**
   * 字体排版系统
   */
  typography: {
    fontFamily: string;
    fontSize: {
      [size: string]: string;
    };
    fontWeight: {
      [weight: string]: string | number;
    };
    lineHeight: {
      [height: string]: string | number;
    };
  };
  
  /**
   * 间距系统
   */
  spacing: {
    [size: string]: string;
  };
  
  /**
   * 边框半径系统
   */
  borderRadius: {
    [size: string]: string;
  };
  
  /**
   * 阴影系统
   */
  shadows: {
    [level: string]: string;
  };
  
  /**
   * 动画配置
   */
  animation: {
    duration: {
      [speed: string]: string;
    };
    easing: {
      [type: string]: string;
    };
  };
  
  /**
   * 断点配置
   */
  breakpoints: {
    [size: string]: string;
  };
}
```

## 按钮组件

### TechButton

科技风格按钮组件。

```typescript
interface TechButtonProps extends BaseButtonProps {
  /**
   * 发光效果强度
   * @default 'medium'
   */
  glow?: 'none' | 'low' | 'medium' | 'high' | 'ultra';
  
  /**
   * 边框样式类型
   * @default 'solid'
   */
  borderStyle?: 'solid' | 'neon' | 'pulse' | 'gradient';
  
  /**
   * 动画效果类型
   * @default 'glow'
   */
  animation?: 'none' | 'glow' | 'pulse' | 'matrix' | 'cyberpunk';
  
  /**
   * 是否启用粒子效果
   * @default false
   */
  particles?: boolean;
  
  /**
   * 粒子效果配置
   */
  particleConfig?: {
    count?: number;
    color?: string;
    speed?: number;
    size?: number;
  };
  
  /**
   * 音效类型
   * @default 'none'
   */
  sound?: 'none' | 'click' | 'hover' | 'futuristic';
  
  /**
   * 全息效果
   * @default false
   */
  holographic?: boolean;
  
  /**
   * 扫描线效果
   * @default false
   */
  scanlines?: boolean;
}

/**
 * 科技风按钮组件
 * 
 * @example
 * ```jsx
 * <TechButton 
 *   variant="primary" 
 *   glow="high"
 *   animation="cyberpunk"
 * >
 *   科技按钮
 * </TechButton>
 * ```
 */
declare const TechButton: React.FC<TechButtonProps>;
```

### MinimalButton

极简风格按钮组件。

```typescript
interface MinimalButtonProps extends BaseButtonProps {
  /**
   * 颜色模式
   * @default 'auto'
   */
  colorMode?: 'light' | 'dark' | 'auto';
  
  /**
   * 字体粗细
   * @default 'normal'
   */
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  
  /**
   * 边框半径大小
   * @default 'medium'
   */
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  
  /**
   * 阴影级别
   * @default 'subtle'
   */
  shadow?: 'none' | 'subtle' | 'soft' | 'medium' | 'strong';
  
  /**
   * 是否启用平滑过渡
   * @default true
   */
  smoothTransition?: boolean;
  
  /**
   * 悬停提升效果
   * @default false
   */
  hoverElevation?: boolean;
  
  /**
   * 聚焦样式类型
   * @default 'ring'
   */
  focusStyle?: 'ring' | 'outline' | 'shadow' | 'border';
}

/**
 * 极简风按钮组件
 * 
 * @example
 * ```jsx
 * <MinimalButton 
 *   variant="primary" 
 *   fill="outline"
 *   shadow="soft"
 * >
 *   极简按钮
 * </MinimalButton>
 * ```
 */
declare const MinimalButton: React.FC<MinimalButtonProps>;
```

## 主题系统

### ThemeProvider

主题上下文提供者组件。

```typescript
interface ThemeProviderProps {
  /**
   * 主题配置对象
   */
  theme: ThemeDefinition;
  
  /**
   * 是否启用样式缓存
   * @default true
   */
  enableCache?: boolean;
  
  /**
   * 缓存大小限制
   * @default 100
   */
  cacheSize?: number;
  
  /**
   * 是否启用开发者工具
   * @default false
   */
  enableDevTools?: boolean;
  
  /**
   * 是否启用性能监控
   * @default false
   */
  enablePerformanceMonitoring?: boolean;
  
  /**
   * 子组件
   */
  children: React.ReactNode;
}

/**
 * 通用主题提供者
 * 
 * @example
 * ```jsx
 * <ThemeProvider theme={techTheme} enableCache>
 *   <App />
 * </ThemeProvider>
 * ```
 */
declare const ThemeProvider: React.FC<ThemeProviderProps>;
```

### TechThemeProvider

科技主题专用提供者。

```typescript
interface TechThemeConfig {
  /**
   * 发光效果全局配置
   */
  glowConfig?: {
    enabled?: boolean;
    intensity?: 'low' | 'medium' | 'high';
    color?: string;
  };
  
  /**
   * 动画配置
   */
  animationConfig?: {
    enabled?: boolean;
    speed?: 'slow' | 'normal' | 'fast';
    type?: 'glow' | 'pulse' | 'matrix';
  };
  
  /**
   * 音效配置
   */
  soundConfig?: {
    enabled?: boolean;
    volume?: number;
    theme?: 'cyberpunk' | 'futuristic' | 'matrix';
  };
  
  /**
   * 粒子系统配置
   */
  particleConfig?: {
    enabled?: boolean;
    density?: number;
    color?: string;
    speed?: number;
  };
}

interface TechThemeProviderProps {
  /**
   * 科技主题配置
   */
  config?: TechThemeConfig;
  
  /**
   * 子组件
   */
  children: React.ReactNode;
}

/**
 * 科技主题提供者
 * 
 * @example
 * ```jsx
 * <TechThemeProvider config={{ glowConfig: { intensity: 'high' } }}>
 *   <TechButton>按钮</TechButton>
 * </TechThemeProvider>
 * ```
 */
declare const TechThemeProvider: React.FC<TechThemeProviderProps>;
```

### MinimalThemeProvider

极简主题专用提供者。

```typescript
interface MinimalThemeConfig {
  /**
   * 默认颜色模式
   * @default 'auto'
   */
  defaultColorMode?: 'light' | 'dark' | 'auto';
  
  /**
   * 边框半径配置
   */
  borderRadiusConfig?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  
  /**
   * 阴影配置
   */
  shadowConfig?: {
    subtle?: string;
    soft?: string;
    medium?: string;
  };
  
  /**
   * 动画配置
   */
  animationConfig?: {
    enabled?: boolean;
    duration?: string;
    easing?: string;
  };
  
  /**
   * 是否遵循用户的减少动画偏好
   * @default true
   */
  respectReducedMotion?: boolean;
}

interface MinimalThemeProviderProps {
  /**
   * 极简主题配置
   */
  config?: MinimalThemeConfig;
  
  /**
   * 子组件
   */
  children: React.ReactNode;
}

/**
 * 极简主题提供者
 * 
 * @example
 * ```jsx
 * <MinimalThemeProvider config={{ defaultColorMode: 'dark' }}>
 *   <MinimalButton>按钮</MinimalButton>
 * </MinimalThemeProvider>
 * ```
 */
declare const MinimalThemeProvider: React.FC<MinimalThemeProviderProps>;
```

## Hook 函数

### useTheme

获取当前主题上下文的 Hook。

```typescript
interface ThemeContext {
  /**
   * 当前主题定义
   */
  theme: ThemeDefinition;
  
  /**
   * 切换主题函数
   */
  setTheme: (theme: ThemeDefinition) => void;
  
  /**
   * 主题样式计算函数
   */
  computeStyles: (component: string, props: any) => CSSObject;
  
  /**
   * 样式缓存访问
   */
  cache: StyleCache;
}

/**
 * 获取主题上下文
 * 
 * @returns 主题上下文对象
 * 
 * @example
 * ```tsx
 * const { theme, setTheme } = useTheme();
 * ```
 */
declare function useTheme(): ThemeContext;
```

### useTechTheme

科技主题专用 Hook。

```typescript
interface TechThemeContext {
  /**
   * 科技主题配置
   */
  config: TechThemeConfig;
  
  /**
   * 更新配置函数
   */
  updateConfig: (config: Partial<TechThemeConfig>) => void;
  
  /**
   * 发光效果控制
   */
  setGlowIntensity: (intensity: 'low' | 'medium' | 'high') => void;
  
  /**
   * 动画控制
   */
  toggleAnimations: () => void;
  
  /**
   * 音效控制
   */
  toggleSound: () => void;
  
  /**
   * 粒子效果控制
   */
  toggleParticles: () => void;
}

/**
 * 获取科技主题上下文
 * 
 * @returns 科技主题上下文对象
 * 
 * @example
 * ```tsx
 * const { config, setGlowIntensity } = useTechTheme();
 * ```
 */
declare function useTechTheme(): TechThemeContext;
```

### useMinimalTheme

极简主题专用 Hook。

```typescript
interface MinimalThemeContext {
  /**
   * 极简主题配置
   */
  config: MinimalThemeConfig;
  
  /**
   * 更新配置函数
   */
  updateConfig: (config: Partial<MinimalThemeConfig>) => void;
  
  /**
   * 颜色模式控制
   */
  colorMode: 'light' | 'dark';
  
  /**
   * 切换颜色模式
   */
  toggleColorMode: () => void;
  
  /**
   * 设置颜色模式
   */
  setColorMode: (mode: 'light' | 'dark' | 'auto') => void;
}

/**
 * 获取极简主题上下文
 * 
 * @returns 极简主题上下文对象
 * 
 * @example
 * ```tsx
 * const { colorMode, toggleColorMode } = useMinimalTheme();
 * ```
 */
declare function useMinimalTheme(): MinimalThemeContext;
```

### useSystemPreferences

系统偏好设置 Hook。

```typescript
interface SystemPreferences {
  /**
   * 用户偏好的颜色方案
   */
  colorScheme: 'light' | 'dark' | 'no-preference';
  
  /**
   * 用户是否偏好减少动画
   */
  prefersReducedMotion: boolean;
  
  /**
   * 用户是否偏好高对比度
   */
  prefersHighContrast: boolean;
  
  /**
   * 用户是否偏好减少透明度
   */
  prefersReducedTransparency: boolean;
}

/**
 * 获取系统用户偏好设置
 * 
 * @returns 系统偏好设置对象
 * 
 * @example
 * ```tsx
 * const { colorScheme, prefersReducedMotion } = useSystemPreferences();
 * ```
 */
declare function useSystemPreferences(): SystemPreferences;
```

### useAccessibility

可访问性增强 Hook。

```typescript
interface AccessibilityFeatures {
  /**
   * 是否启用键盘导航
   */
  keyboardNavigation: boolean;
  
  /**
   * 是否启用屏幕阅读器优化
   */
  screenReaderOptimization: boolean;
  
  /**
   * 是否启用高对比度模式
   */
  highContrastMode: boolean;
  
  /**
   * 当前焦点元素管理
   */
  focusManagement: {
    trapFocus: (container: HTMLElement) => () => void;
    restoreFocus: (element: HTMLElement) => void;
  };
  
  /**
   * ARIA 标签助手
   */
  ariaHelpers: {
    generateId: (prefix?: string) => string;
    announceToScreenReader: (message: string) => void;
  };
}

/**
 * 获取可访问性增强功能
 * 
 * @returns 可访问性功能对象
 * 
 * @example
 * ```tsx
 * const { keyboardNavigation, ariaHelpers } = useAccessibility();
 * ```
 */
declare function useAccessibility(): AccessibilityFeatures;
```

### useResponsive

响应式设计 Hook。

```typescript
interface ResponsiveContext {
  /**
   * 当前屏幕尺寸
   */
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'large';
  
  /**
   * 窗口尺寸
   */
  windowSize: {
    width: number;
    height: number;
  };
  
  /**
   * 是否为移动设备
   */
  isMobile: boolean;
  
  /**
   * 是否为平板设备
   */
  isTablet: boolean;
  
  /**
   * 是否为桌面设备
   */
  isDesktop: boolean;
  
  /**
   * 响应式值计算
   */
  responsive: <T>(values: {
    mobile?: T;
    tablet?: T;
    desktop?: T;
    large?: T;
  }) => T | undefined;
}

/**
 * 获取响应式设计上下文
 * 
 * @returns 响应式上下文对象
 * 
 * @example
 * ```tsx
 * const { isMobile, responsive } = useResponsive();
 * const buttonSize = responsive({
 *   mobile: 'small',
 *   desktop: 'medium'
 * });
 * ```
 */
declare function useResponsive(): ResponsiveContext;
```

## 工具函数

### 样式计算工具

```typescript
/**
 * 计算科技主题按钮样式
 * 
 * @param props 按钮属性
 * @param theme 主题定义
 * @returns CSS样式对象
 */
declare function computeTechButtonStyles(
  props: TechButtonProps,
  theme: ThemeDefinition
): CSSObject;

/**
 * 计算极简主题按钮样式
 * 
 * @param props 按钮属性
 * @param theme 主题定义
 * @returns CSS样式对象
 */
declare function computeMinimalButtonStyles(
  props: MinimalButtonProps,
  theme: ThemeDefinition
): CSSObject;

/**
 * 生成CSS变量映射
 * 
 * @param theme 主题定义
 * @param prefix CSS变量前缀
 * @returns CSS变量对象
 */
declare function generateCSSVariables(
  theme: ThemeDefinition,
  prefix?: string
): Record<string, string>;
```

### 主题管理工具

```typescript
/**
 * 创建新主题
 * 
 * @param config 主题配置
 * @returns 主题定义对象
 */
declare function createTheme(config: Partial<ThemeDefinition>): ThemeDefinition;

/**
 * 扩展现有主题
 * 
 * @param baseTheme 基础主题
 * @param extensions 扩展配置
 * @returns 新的主题定义对象
 */
declare function extendTheme(
  baseTheme: ThemeDefinition,
  extensions: Partial<ThemeDefinition>
): ThemeDefinition;

/**
 * 合并多个主题
 * 
 * @param themes 主题数组
 * @returns 合并后的主题定义对象
 */
declare function mergeThemes(...themes: ThemeDefinition[]): ThemeDefinition;

/**
 * 验证主题定义
 * 
 * @param theme 主题定义
 * @returns 验证结果
 */
declare function validateTheme(theme: ThemeDefinition): {
  valid: boolean;
  errors: string[];
  warnings: string[];
};
```

### 性能优化工具

```typescript
/**
 * 样式缓存接口
 */
interface StyleCache {
  get: (key: string) => CSSObject | undefined;
  set: (key: string, value: CSSObject) => void;
  clear: () => void;
  size: number;
}

/**
 * 创建样式缓存
 * 
 * @param maxSize 最大缓存大小
 * @returns 样式缓存实例
 */
declare function createStyleCache(maxSize?: number): StyleCache;

/**
 * 预加载主题资源
 * 
 * @param theme 主题名称或定义
 * @returns Promise
 */
declare function preloadTheme(theme: string | ThemeDefinition): Promise<void>;

/**
 * 性能监控工具
 */
interface PerformanceMonitor {
  measureRender: (
    name: string,
    component: React.ReactElement,
    options?: { threshold?: number; onSlowRender?: (duration: number) => void }
  ) => React.ReactElement;
  
  getMetrics: () => {
    averageRenderTime: number;
    maxRenderTime: number;
    renderCount: number;
  };
  
  reset: () => void;
}

/**
 * 创建性能监控器
 * 
 * @returns 性能监控器实例
 */
declare function createPerformanceMonitor(): PerformanceMonitor;
```

## 配置选项

### 全局配置

```typescript
interface GlobalConfig {
  /**
   * 默认主题
   */
  defaultTheme?: 'tech' | 'minimal' | string;
  
  /**
   * 是否启用样式缓存
   * @default true
   */
  enableStyleCache?: boolean;
  
  /**
   * 缓存大小限制
   * @default 100
   */
  styleCacheSize?: number;
  
  /**
   * 是否启用开发者工具
   * @default false
   */
  enableDevTools?: boolean;
  
  /**
   * 是否启用性能监控
   * @default false
   */
  enablePerformanceMonitoring?: boolean;
  
  /**
   * 是否自动适配系统偏好
   * @default true
   */
  autoAdaptSystemPreferences?: boolean;
  
  /**
   * 是否启用严格模式
   * @default false
   */
  strictMode?: boolean;
}

/**
 * 设置全局配置
 * 
 * @param config 配置选项
 */
declare function setGlobalConfig(config: GlobalConfig): void;

/**
 * 获取当前全局配置
 * 
 * @returns 当前配置
 */
declare function getGlobalConfig(): GlobalConfig;
```

### 构建配置

```typescript
interface BuildConfig {
  /**
   * 是否启用 Tree Shaking
   * @default true
   */
  enableTreeShaking?: boolean;
  
  /**
   * 是否启用代码分割
   * @default true
   */
  enableCodeSplitting?: boolean;
  
  /**
   * 是否压缩样式
   * @default true
   */
  minifyStyles?: boolean;
  
  /**
   * 是否生成源映射
   * @default true
   */
  generateSourceMaps?: boolean;
  
  /**
   * 输出目录
   * @default 'dist'
   */
  outputDir?: string;
  
  /**
   * 需要排除的文件模式
   */
  excludePatterns?: string[];
}
```

---

**版本**: 1.0.0  
**最后更新**: 2025年  
**维护者**: 源滚滚AI编程