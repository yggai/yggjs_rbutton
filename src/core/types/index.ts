/**
 * 核心类型系统统一导出
 * 
 * 提供组件库核心类型的统一入口
 * 便于外部使用和内部引用
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

// 按钮相关类型导出
export type {
  BaseButtonSize,
  BaseButtonVariant,
  BaseButtonFill,
  BaseButtonShape,
  ButtonState,
  IconPosition,
  ButtonClickHandler,
  ButtonKeyboardHandler,
  BaseButtonProps,
  ButtonStyleConfig,
  UseButtonConfig,
  UseButtonReturn,
  StyleCacheKey,
  StyleCacheValue,
  CSSWithPseudoSelectors,
  StyleCache,
} from './button';

// 主题相关类型导出
export type {
  ColorValue,
  ColorSystem,
  FontWeight,
  FontSize,
  LineHeight,
  TypographySystem,
  SpacingValue,
  SpacingSystem,
  AnimationDuration,
  AnimationTimingFunction,
  AnimationSystem,
  ShadowSystem,
  BorderRadiusSystem,
  DesignTokens,
  ComponentStyleMap,
  ThemeUtilities,
  ThemeMetadata,
  ThemeDefinition,
  ThemeVariant,
  ThemeRegistry,
  ThemeContext,
  ThemeProviderProps,
  UseThemeReturn,
  ThemeConfig,
  ThemeValidator,
  ValidationResult,
  ValidationError,
  ValidationWarning,
} from './theme';

/**
 * 通用工具类型
 */

/**
 * 深度只读类型
 * 将对象的所有属性递归设为只读
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 深度部分类型
 * 将对象的所有属性递归设为可选
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 字符串字面量联合类型转元组类型
 */
export type UnionToTuple<T> = T extends unknown ? (t: T) => T : never extends (t: infer U) => unknown ? U : never;

/**
 * 递归键路径类型
 * 用于获取对象的所有可能的键路径
 */
export type KeyPath<T, K extends keyof T = keyof T> = K extends string | number
  ? T[K] extends Record<string, unknown>
    ? `${K}` | `${K}.${KeyPath<T[K]>}`
    : `${K}`
  : never;

/**
 * 根据键路径获取值的类型
 */
export type GetValueByPath<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? GetValueByPath<T[K], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;

/**
 * CSS属性值类型
 * 扩展React.CSSProperties以支持CSS变量
 */
export interface CSSPropertiesWithVars extends React.CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}

/**
 * 响应式值类型
 * 支持响应式的属性值定义
 */
export type ResponsiveValue<T> = T | {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
};

/**
 * 条件类型工具
 * 根据条件返回不同的类型
 */
export type If<C extends boolean, T, F = never> = C extends true ? T : F;

/**
 * 非空类型
 * 排除null和undefined
 */
export type NonNull<T> = T extends null | undefined ? never : T;

/**
 * 函数参数类型提取
 */
export type Parameters<T extends (...args: unknown[]) => unknown> = T extends (...args: infer P) => unknown ? P : never;

/**
 * 函数返回类型提取
 */
export type ReturnType<T extends (...args: unknown[]) => unknown> = T extends (...args: unknown[]) => infer R ? R : unknown;

/**
 * 类构造函数类型
 */
export type Constructor<T = Record<string, unknown>> = new (...args: unknown[]) => T;

/**
 * 混入类型
 * 用于类型的混合和扩展
 */
export type Mixin<T, U> = T & U;

/**
 * 品牌类型
 * 用于创建名义类型
 */
export type Brand<T, B> = T & { __brand: B };

/**
 * 组件引用类型
 * 用于组件的ref属性类型定义
 */
export type ComponentRef<T extends React.ElementType> = React.ComponentRef<T>;

/**
 * 多态组件属性类型
 * 支持as属性的多态组件类型定义
 */
export type PolymorphicComponentProps<T extends React.ElementType, P = Record<string, unknown>> = P &
  Omit<React.ComponentPropsWithoutRef<T>, keyof P> & {
    as?: T;
  };

/**
 * 带引用的多态组件属性类型
 */
export type PolymorphicComponentPropsWithRef<T extends React.ElementType, P = Record<string, unknown>> = P &
  Omit<React.ComponentPropsWithRef<T>, keyof P> & {
    as?: T;
  };

/**
 * 主题感知组件属性类型
 * 为组件添加主题感知能力
 */
export type ThemeAwareProps<T = Record<string, unknown>> = T & {
  /**
   * 主题变体名称
   */
  themeVariant?: string;
  
  /**
   * 自定义主题覆盖
   */
  themeOverride?: DeepPartial<Record<string, unknown>>;
};

/**
 * 样式属性类型
 * 组合CSS属性和主题感知属性
 */
export type StyleProps = {
  /**
   * 内联样式
   */
  style?: CSSPropertiesWithVars;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 主题感知的样式属性
   */
  sx?: ResponsiveValue<CSSPropertiesWithVars>;
};

/**
 * 事件处理器映射类型
 * 用于定义组件支持的所有事件处理器
 */
export type EventHandlers<T extends Record<string, unknown>> = {
  [K in keyof T as K extends `on${string}` ? K : never]: T[K];
};

/**
 * 异步组件状态类型
 * 用于异步操作的状态管理
 */
export type AsyncState<T, E = Error> = {
  data: T | null;
  loading: boolean;
  error: E | null;
};

/**
 * 缓存项类型
 * 用于缓存系统的数据结构
 */
export type CacheItem<T> = {
  value: T;
  timestamp: number;
  ttl?: number;
};

/**
 * 性能指标类型
 * 用于性能监控和分析
 */
export type PerformanceMetrics = {
  renderTime: number;
  updateTime: number;
  memoryUsage: number;
  cacheHitRate: number;
};

/**
 * 开发模式类型
 * 用于开发环境的特殊处理
 */
export type DevModeFlags = {
  enableDevWarnings: boolean;
  enablePerformanceMonitoring: boolean;
  enableStyleDebugging: boolean;
  enableAccessibilityChecks: boolean;
};