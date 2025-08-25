import { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * 科技风按钮尺寸枚举
 * 支持小、中、大三种尺寸
 */
export type TechButtonSize = 'small' | 'medium' | 'large';

/**
 * 科技风按钮变体枚举
 * primary: 主要按钮，使用科技蓝色主题
 * secondary: 次要按钮，使用灰色主题
 * danger: 危险按钮，使用红色主题
 * success: 成功按钮，使用绿色主题
 */
export type TechButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

/**
 * 科技风按钮填充模式枚举
 * solid: 实心填充（默认）
 * outline: 边框模式，透明背景
 * ghost: 幽灵模式，无背景无边框
 * link: 链接模式，类似文本链接
 */
export type TechButtonFill = 'solid' | 'outline' | 'ghost' | 'link';

/**
 * 科技风按钮形状枚举
 * default: 标准圆角
 * rounded: 大圆角
 * circular: 圆形（主要用于图标按钮）
 * square: 方形（无圆角）
 */
export type TechButtonShape = 'default' | 'rounded' | 'circular' | 'square';

/**
 * 图标尺寸枚举
 * 根据改进计划规格，使用简化的尺寸命名
 */
export type TechButtonIconSize = 'sm' | 'md' | 'lg';

/**
 * 科技风按钮组件属性接口
 * 继承原生HTML button元素的所有属性
 */
export interface TechButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮内容
   * 可以是文本、图标或任何React节点
   * 当使用iconOnly时，children将用作可访问性标签
   */
  children: ReactNode;

  /**
   * 按钮尺寸
   * @default 'medium'
   */
  size?: TechButtonSize;

  /**
   * 按钮变体/主题
   * @default 'primary'
   */
  variant?: TechButtonVariant;

  /**
   * 填充模式
   * @default 'solid'
   */
  fill?: TechButtonFill;

  /**
   * 按钮形状
   * @default 'default'
   */
  shape?: TechButtonShape;

  /**
   * 左侧图标
   * 可以是任何React节点（图标组件、SVG等）
   */
  iconLeft?: ReactNode;

  /**
   * 右侧图标
   * 可以是任何React节点（图标组件、SVG等）
   */
  iconRight?: ReactNode;

  /**
   * 是否为纯图标按钮
   * 为true时，只显示图标，children作为可访问性标签
   * @default false
   */
  iconOnly?: boolean;

  /**
   * 图标尺寸
   * 如果不指定，将根据按钮尺寸自动适配
   */
  iconSize?: TechButtonIconSize;

  /**
   * 是否为加载状态
   * 加载时显示动画效果并禁用交互
   * @default false
   */
  loading?: boolean;

  /**
   * 是否启用发光效果
   * 科技风特有的霓虹灯发光效果
   * @default false
   */
  glowing?: boolean;

  /**
   * 是否为全宽按钮
   * 占满父容器的宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 是否启用防重复点击保护
   * 启用后，在指定延迟时间内防止重复点击
   * @default false
   */
  preventDoubleClick?: boolean;

  /**
   * 防抖延迟时间（毫秒）
   * 仅在 preventDoubleClick 为 true 时生效
   * @default 300
   */
  debounceDelay?: number;

  /**
   * 是否启用响应式设计
   * 根据屏幕尺寸自动适配大小
   * @default false
   */
  responsive?: boolean;

  /**
   * 是否保证最小触摸目标尺寸
   * 移动端最小点击区域（44px x 44px）
   * @default false
   */
  minTouchTarget?: boolean;

  /**
   * 文本方向，支持RTL语言
   * @default 'ltr'
   */
  dir?: 'ltr' | 'rtl' | 'auto';

  /**
   * 主题模式
   * @default 'light'
   */
  theme?: 'light' | 'dark' | 'auto';

  /**
   * 路由集成支持 - 组件渲染类型
   * 支持渲染为按钮、链接或自定义组件
   * @default 'button'
   */
  as?: 'button' | 'a' | React.ComponentType<unknown>;

  /**
   * 链接地址
   * 当as='a'时使用
   */
  href?: string;

  /**
   * 链接打开方式
   * 当as='a'时使用
   */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * 国际化文本配置
   * 支持加载状态文本和可访问性标签的国际化
   */
  i18n?: {
    loadingText?: string;
    ariaLabel?: string;
  };

  /**
   * 高级可访问性配置
   */
  accessibility?: {
    /**
     * 是否启用高对比度模式适配
     * @default false
     */
    highContrast?: boolean;
    
    /**
     * 是否减少动画效果（支持 prefers-reduced-motion）
     * @default false
     */
    reduceMotion?: boolean;
    
    /**
     * 自定义ARIA描述
     */
    ariaDescribedBy?: string;
  };

  /**
   * 自定义类名
   * 用于扩展样式
   */
  className?: string;
}

/**
 * CSS-in-JS 样式对象接口
 * 定义按钮组件的样式结构
 */
export interface TechButtonStyles {
  /**
   * 基础样式对象
   */
  base: React.CSSProperties;

  /**
   * 尺寸样式映射
   */
  sizes: Record<TechButtonSize, React.CSSProperties>;

  /**
   * 变体样式映射
   */
  variants: Record<TechButtonVariant, React.CSSProperties>;

  /**
   * 填充模式样式映射
   */
  fills: Record<TechButtonFill, React.CSSProperties>;

  /**
   * 形状样式映射
   */
  shapes: Record<TechButtonShape, React.CSSProperties>;

  /**
   * 状态样式
   */
  states: {
    hover: React.CSSProperties;
    active: React.CSSProperties;
    focus: React.CSSProperties;
    disabled: React.CSSProperties;
    loading: React.CSSProperties;
  };

  /**
   * 特效样式
   */
  effects: {
    glowing: React.CSSProperties;
    fullWidth: React.CSSProperties;
    responsive: React.CSSProperties;
    minTouchTarget: React.CSSProperties;
  };

  /**
   * 图标样式
   */
  icons: {
    base: React.CSSProperties;
    sizes: Record<TechButtonIconSize, React.CSSProperties>;
    left: React.CSSProperties;
    right: React.CSSProperties;
    only: React.CSSProperties;
    loading: React.CSSProperties;
  };
}

/**
 * 科技风主题色彩配置接口
 */
export interface TechTheme {
  colors: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    secondary: string;
    secondaryHover: string;
    secondaryActive: string;
    danger: string;
    dangerHover: string;
    dangerActive: string;
    success: string;
    successHover: string;
    successActive: string;
    text: string;
    textSecondary: string;
    disabled: string;
    background: string;
    backgroundHover: string;
    border: string;
    borderHover: string;
    focus: string;
  };
  effects: {
    shadow: string;
    shadowHover: string;
    glowPrimary: string;
    glowSecondary: string;
    glowDanger: string;
    glowSuccess: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

/**
 * 防重复点击Hook的返回值接口
 */
export interface UseDebounceClickReturn {
  /**
   * 是否正在防抖状态
   */
  isPending: boolean;
  
  /**
   * 包装后的点击处理函数
   */
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}