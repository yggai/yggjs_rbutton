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
 * 科技风按钮组件属性接口
 * 继承原生HTML button元素的所有属性
 */
export interface TechButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮内容
   * 可以是文本、图标或任何React节点
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
   * 状态样式
   */
  states: {
    hover: React.CSSProperties;
    active: React.CSSProperties;
    disabled: React.CSSProperties;
    loading: React.CSSProperties;
  };

  /**
   * 特效样式
   */
  effects: {
    glowing: React.CSSProperties;
    fullWidth: React.CSSProperties;
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
    border: string;
  };
  effects: {
    shadow: string;
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