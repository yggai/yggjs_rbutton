/**
 * 全局类型声明文件
 * 为第三方模块和全局变量提供类型声明
 */

import type { ReactNode, ButtonHTMLAttributes, FC } from 'react';

/**
 * 为 yggjs_rbutton 模块提供基本类型声明
 */
declare module 'yggjs_rbutton' {
  export interface TechButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
    /** 按钮变体 */
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
    /** 按钮大小 */
    size?: 'small' | 'medium' | 'large';
    /** 填充模式 */
    fill?: 'solid' | 'outline' | 'ghost' | 'link';
    /** 按钮形状 */
    shape?: 'rounded' | 'square' | 'circle' | 'circular' | 'default';
    /** 是否全宽 */
    fullWidth?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否显示加载状态 */
    loading?: boolean;
    /** 加载文本 */
    loadingText?: string;
    /** 左侧图标 */
    iconLeft?: ReactNode;
    /** 右侧图标 */
    iconRight?: ReactNode;
    /** 是否只显示图标 */
    iconOnly?: boolean;
    /** 图标大小 */
    iconSize?: string | number;
    /** 是否发光 */
    glowing?: boolean;
    /** 是否防止双击 */
    preventDoubleClick?: boolean;
    /** 防抖延迟 */
    debounceDelay?: number;
    /** 响应式支持 */
    responsive?: boolean;
    /** 最小触摸目标 */
    minTouchTarget?: boolean;
    /** 主题模式 */
    theme?: 'light' | 'dark' | 'auto';
    /** 渲染为何种元素 */
    as?: 'button' | 'a' | 'div';
    /** 作为链接时的 href */
    href?: string;
    /** 链接目标 */
    target?: string;
    /** 国际化配置 */
    i18n?: {
      loadingText?: string;
      ariaLabel?: string;
    };
    /** 可访问性配置 */
    accessibility?: {
      highContrast?: boolean;
      reduceMotion?: boolean;
      ariaDescribedBy?: string;
    };
    /** 按钮内容 */
    children?: ReactNode;
  }

  export const TechButton: FC<TechButtonProps>;
}