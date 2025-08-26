/**
 * 核心按钮类型定义
 * 
 * 定义所有主题共享的基础按钮类型和接口
 * 为多主题架构提供统一的类型约束
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import { ReactNode, ButtonHTMLAttributes, MouseEvent, KeyboardEvent } from 'react';

/**
 * 按钮基础尺寸类型
 * 所有主题都应支持这些基础尺寸
 */
export type BaseButtonSize = 'sm' | 'md' | 'lg';

/**
 * 按钮基础变体类型
 * 所有主题都应支持这些基础变体
 */
export type BaseButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

/**
 * 按钮基础填充模式类型
 * 定义按钮的视觉填充风格
 */
export type BaseButtonFill = 'solid' | 'outline' | 'ghost' | 'link';

/**
 * 按钮基础形状类型
 * 定义按钮的几何形状
 */
export type BaseButtonShape = 'default' | 'rounded' | 'circle' | 'square';

/**
 * 按钮状态类型
 * 定义按钮的交互状态
 */
export type ButtonState = 'normal' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';

/**
 * 图标位置类型
 * 定义图标在按钮中的位置
 */
export type IconPosition = 'left' | 'right';

/**
 * 按钮点击事件处理器类型
 */
export type ButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => void;

/**
 * 按钮键盘事件处理器类型
 */
export type ButtonKeyboardHandler = (event: KeyboardEvent<HTMLButtonElement>) => void;

/**
 * 基础按钮属性接口
 * 
 * 定义所有主题按钮组件都应该支持的核心属性
 * 这是主题无关的最小属性集合
 */
export interface BaseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onKeyDown'> {
  /**
   * 按钮内容
   */
  children?: ReactNode;
  
  /**
   * 按钮尺寸
   * @default 'md'
   */
  size?: BaseButtonSize;
  
  /**
   * 按钮变体
   * @default 'primary'
   */
  variant?: BaseButtonVariant;
  
  /**
   * 按钮填充模式
   * @default 'solid'
   */
  fill?: BaseButtonFill;
  
  /**
   * 按钮形状
   * @default 'default'
   */
  shape?: BaseButtonShape;
  
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean;
  
  /**
   * 加载状态下显示的文本
   */
  loadingText?: string;
  
  /**
   * 左侧图标
   */
  leftIcon?: ReactNode;
  
  /**
   * 右侧图标
   */
  rightIcon?: ReactNode;
  
  /**
   * 是否为纯图标按钮
   * @default false
   */
  iconOnly?: boolean;
  
  /**
   * 是否全宽显示
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * 是否启用发光效果
   * @default false
   */
  glow?: boolean;
  
  /**
   * 是否响应式设计
   * @default false
   */
  responsive?: boolean;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理器
   */
  onClick?: ButtonClickHandler;
  
  /**
   * 键盘事件处理器
   */
  onKeyDown?: ButtonKeyboardHandler;
  
  /**
   * 可访问性标签
   */
  'aria-label'?: string;
  
  /**
   * 可访问性描述
   */
  'aria-describedby'?: string;
  
  /**
   * 高对比度模式支持
   * @default false
   */
  highContrast?: boolean;
  
  /**
   * 减少动画模式支持
   * @default false
   */
  reducedMotion?: boolean;
}

/**
 * 按钮样式配置接口
 * 
 * 定义主题需要实现的样式配置结构
 */
export interface ButtonStyleConfig {
  /**
   * 基础样式
   */
  base: React.CSSProperties;
  
  /**
   * 尺寸样式映射
   */
  sizes: Record<BaseButtonSize, React.CSSProperties>;
  
  /**
   * 变体样式映射
   */
  variants: Record<BaseButtonVariant, React.CSSProperties>;
  
  /**
   * 填充模式样式映射
   */
  fills: Record<BaseButtonFill, React.CSSProperties>;
  
  /**
   * 形状样式映射
   */
  shapes: Record<BaseButtonShape, React.CSSProperties>;
  
  /**
   * 状态样式映射
   */
  states: Record<ButtonState, React.CSSProperties>;
  
  /**
   * 图标样式配置
   */
  icon: {
    base: React.CSSProperties;
    sizes: Record<BaseButtonSize, React.CSSProperties>;
    positions: Record<IconPosition, React.CSSProperties>;
  };
  
  /**
   * 加载动画样式
   */
  loading: React.CSSProperties;
  
  /**
   * 响应式样式配置
   */
  responsive?: {
    mobile: React.CSSProperties;
    tablet: React.CSSProperties;
    desktop: React.CSSProperties;
  };
}

/**
 * 按钮Hook配置接口
 * 
 * 定义useButton Hook的配置参数
 */
export interface UseButtonConfig {
  /**
   * 防抖延迟时间（毫秒）
   * @default 300
   */
  debounceDelay?: number;
  
  /**
   * 是否启用防重复点击
   * @default true
   */
  preventDoubleClick?: boolean;
  
  /**
   * 是否启用键盘导航
   * @default true
   */
  enableKeyboardNavigation?: boolean;
  
  /**
   * 是否启用焦点管理
   * @default true
   */
  enableFocusManagement?: boolean;
  
  /**
   * 是否启用可访问性增强
   * @default true
   */
  enableA11yEnhancements?: boolean;
  
  /**
   * 是否为切换按钮
   * @default false
   */
  toggle?: boolean;
  
  /**
   * ARIA标签
   */
  ariaLabel?: string;
  
  /**
   * ARIA描述ID
   */
  ariaDescribedBy?: string;
  
  /**
   * 是否为纯图标按钮
   */
  iconOnly?: boolean;
  
  /**
   * 按钮子元素
   */
  children?: React.ReactNode;
}

/**
 * 按钮Hook返回值接口
 * 
 * 定义useButton Hook的返回值结构
 */
export interface UseButtonReturn {
  /**
   * 按钮DOM属性
   */
  buttonProps: {
    type: 'button';
    disabled: boolean;
    tabIndex: number;
    onClick: ButtonClickHandler;
    onKeyDown: ButtonKeyboardHandler;
    onFocus: () => void;
    onBlur: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    role?: string;
    'aria-busy'?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-pressed'?: boolean;
    'aria-expanded'?: boolean;
    'aria-disabled'?: boolean;
  };
  
  /**
   * 按钮当前状态
   */
  state: {
    isDisabled: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isHovered: boolean;
    isPressed: boolean;
    isPending: boolean;
  };
  
  /**
   * 状态控制函数
   */
  actions: {
    setFocused: (focused: boolean) => void;
    setHovered: (hovered: boolean) => void;
    setPressed: (pressed: boolean) => void;
    handleClick: ButtonClickHandler;
    handleKeyDown: ButtonKeyboardHandler;
  };
}

/**
 * 样式缓存键类型
 * 用于样式缓存系统的键值定义
 */
export type StyleCacheKey = string;

/**
 * CSS-in-JS样式对象类型
 * 支持伪选择器和CSS自定义属性
 */
export type CSSWithPseudoSelectors = React.CSSProperties & {
  [key: `&:${string}`]: React.CSSProperties;
  [key: `--${string}`]: string | number;
};

/**
 * 样式缓存值类型
 * 缓存的样式对象类型
 */
export type StyleCacheValue = CSSWithPseudoSelectors;

/**
 * 样式缓存接口
 * 定义样式缓存系统的接口
 */
export interface StyleCache {
  /**
   * 获取缓存的样式
   */
  get: (key: StyleCacheKey) => StyleCacheValue | undefined;
  
  /**
   * 设置样式缓存
   */
  set: (key: StyleCacheKey, value: StyleCacheValue) => void;
  
  /**
   * 检查是否存在缓存
   */
  has: (key: StyleCacheKey) => boolean;
  
  /**
   * 清除特定缓存
   */
  delete: (key: StyleCacheKey) => boolean;
  
  /**
   * 清除所有缓存
   */
  clear: () => void;
  
  /**
   * 获取缓存大小
   */
  size: number;
}