/**
 * 科技风主题 - 动画与阴影系统设计令牌
 * 
 * 定义科技风主题的动画时间、缓动函数和阴影效果
 * 营造现代科技感的交互体验
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import type { AnimationSystem, ShadowSystem, BorderRadiusSystem } from '../../../core/types';

/**
 * 科技风主题动画系统
 * 
 * 特点：
 * - 快速响应的交互动画
 * - 流畅的过渡效果
 * - 符合科技感的缓动曲线
 * - 支持减少动画偏好
 */
export const techAnimationTokens: AnimationSystem = {
  /**
   * 动画持续时间系统
   * 基于人机工程学的时间设置
   */
  duration: {
    /**
     * 瞬间 - 75ms
     * 用于即时反馈，如按钮点击
     */
    instant: '75ms',

    /**
     * 快速 - 150ms
     * 用于悬停效果、焦点变化
     */
    fast: '150ms',

    /**
     * 正常 - 250ms
     * 用于标准过渡效果
     */
    normal: '250ms',

    /**
     * 慢速 - 350ms
     * 用于复杂动画、页面切换
     */
    slow: '350ms',

    /**
     * 更慢 - 500ms
     * 用于大型元素动画
     */
    slower: '500ms',
  },

  /**
   * 缓动函数系统
   * 创造自然流畅的动画感觉
   */
  easing: {
    /**
     * 线性 - 匀速运动
     * 用于加载动画、旋转等
     */
    linear: 'linear',

    /**
     * 标准缓动
     * 通用的自然缓动
     */
    ease: 'ease',

    /**
     * 缓入 - 慢开始
     * 用于元素进入动画
     */
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',

    /**
     * 缓出 - 慢结束
     * 用于元素退出动画
     */
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',

    /**
     * 缓入缓出 - 两端慢
     * 用于状态变化动画
     */
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    /**
     * 弹性 - 科技感弹性效果
     * 用于特殊交互反馈
     */
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    /**
     * 弹性 - 更自然的弹性
     * 用于按钮点击等交互
     */
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  /**
   * 过渡配置系统
   * 预定义的过渡组合
   */
  transition: {
    /**
     * 全部属性过渡
     * 用于不确定变化属性的情况
     */
    all: `all 250ms cubic-bezier(0.4, 0, 0.2, 1)`,

    /**
     * 颜色过渡
     * 用于主题切换、状态变化
     */
    colors: `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), 
             border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), 
             color 250ms cubic-bezier(0.4, 0, 0.2, 1)`,

    /**
     * 透明度过渡
     * 用于元素显示隐藏
     */
    opacity: `opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)`,

    /**
     * 阴影过渡
     * 用于悬停效果、层级变化
     */
    shadow: `box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)`,

    /**
     * 变换过渡
     * 用于缩放、旋转、移动
     */
    transform: `transform 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
  },
};

/**
 * 科技风主题阴影系统
 * 
 * 特点：
 * - 层次清晰的阴影层级
 * - 科技感的蓝色阴影
 * - 支持发光效果
 * - 适配深色和浅色模式
 */
export const techShadowTokens: ShadowSystem = {
  /**
   * 超小阴影
   * 用于轻微层级区分
   */
  xs: '0 1px 2px 0 rgba(0, 102, 204, 0.05)',

  /**
   * 小阴影
   * 用于按钮、小卡片
   */
  sm: '0 1px 3px 0 rgba(0, 102, 204, 0.1), 0 1px 2px 0 rgba(0, 102, 204, 0.06)',

  /**
   * 基础阴影
   * 用于卡片、表单等
   */
  base: '0 4px 6px -1px rgba(0, 102, 204, 0.1), 0 2px 4px -1px rgba(0, 102, 204, 0.06)',

  /**
   * 中等阴影
   * 用于较重要的元素
   */
  md: '0 10px 15px -3px rgba(0, 102, 204, 0.1), 0 4px 6px -2px rgba(0, 102, 204, 0.05)',

  /**
   * 大阴影
   * 用于模态框、重要卡片
   */
  lg: '0 20px 25px -5px rgba(0, 102, 204, 0.1), 0 10px 10px -5px rgba(0, 102, 204, 0.04)',

  /**
   * 超大阴影
   * 用于浮动面板、抽屉等
   */
  xl: '0 25px 50px -12px rgba(0, 102, 204, 0.25)',

  /**
   * 2倍大阴影
   * 用于最高层级元素
   */
  '2xl': '0 50px 100px -20px rgba(0, 102, 204, 0.25)',

  /**
   * 内阴影
   * 用于输入框、内嵌效果
   */
  inner: 'inset 0 2px 4px 0 rgba(0, 102, 204, 0.06)',

  /**
   * 无阴影
   * 用于重置阴影
   */
  none: 'none',
};

/**
 * 科技风主题边框半径系统
 * 
 * 特点：
 * - 现代感的圆角设计
 * - 层次化的半径值
 * - 支持特殊形状需求
 */
export const techBorderRadiusTokens: BorderRadiusSystem = {
  /**
   * 无圆角
   * 用于方形设计
   */
  none: '0',

  /**
   * 小圆角 - 2px
   * 用于小按钮、标签
   */
  sm: '0.125rem',

  /**
   * 基础圆角 - 4px
   * 默认圆角，用于大多数元素
   */
  base: '0.25rem',

  /**
   * 中等圆角 - 6px
   * 用于卡片、表单字段
   */
  md: '0.375rem',

  /**
   * 大圆角 - 8px
   * 用于较大的容器元素
   */
  lg: '0.5rem',

  /**
   * 超大圆角 - 12px
   * 用于特殊设计需求
   */
  xl: '0.75rem',

  /**
   * 2倍大圆角 - 16px
   * 用于大型卡片、面板
   */
  '2xl': '1rem',

  /**
   * 3倍大圆角 - 24px
   * 用于特大型元素
   */
  '3xl': '1.5rem',

  /**
   * 完全圆角
   * 用于圆形按钮、头像等
   */
  full: '9999px',
};

/**
 * 科技风主题特效预设
 * 组合动画、阴影等效果的预设配置
 */
export const techEffectsPresets = {
  /**
   * 发光效果预设
   */
  glow: {
    /**
     * 轻微发光
     */
    subtle: {
      boxShadow: `0 0 10px rgba(0, 102, 204, 0.3)`,
      transition: techAnimationTokens.transition.shadow,
    },

    /**
     * 中等发光
     */
    medium: {
      boxShadow: `
        0 0 15px rgba(0, 102, 204, 0.4),
        0 0 30px rgba(0, 102, 204, 0.2)
      `,
      transition: techAnimationTokens.transition.shadow,
    },

    /**
     * 强烈发光
     */
    intense: {
      boxShadow: `
        0 0 20px rgba(0, 102, 204, 0.5),
        0 0 40px rgba(0, 102, 204, 0.3),
        0 0 60px rgba(0, 102, 204, 0.1)
      `,
      transition: techAnimationTokens.transition.shadow,
    },
  },

  /**
   * 悬停效果预设
   */
  hover: {
    /**
     * 轻微上升
     */
    lift: {
      transform: 'translateY(-2px)',
      boxShadow: techShadowTokens.lg,
      transition: `${techAnimationTokens.transition.transform}, ${techAnimationTokens.transition.shadow}`,
    },

    /**
     * 缩放效果
     */
    scale: {
      transform: 'scale(1.02)',
      transition: techAnimationTokens.transition.transform,
    },

    /**
     * 发光悬停
     */
    glow: {
      boxShadow: `0 0 20px rgba(0, 102, 204, 0.4)`,
      transition: techAnimationTokens.transition.shadow,
    },
  },

  /**
   * 加载动画预设
   */
  loading: {
    /**
     * 旋转动画
     */
    spin: {
      animation: `spin 1s ${techAnimationTokens.easing.linear} infinite`,
      '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },

    /**
     * 脉冲动画
     */
    pulse: {
      animation: `pulse 2s ${techAnimationTokens.easing.easeInOut} infinite`,
      '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
      },
    },

    /**
     * 呼吸灯效果
     */
    breathe: {
      animation: `breathe 2s ${techAnimationTokens.easing.easeInOut} infinite`,
      '@keyframes breathe': {
        '0%, 100%': { 
          boxShadow: '0 0 10px rgba(0, 102, 204, 0.3)' 
        },
        '50%': { 
          boxShadow: '0 0 20px rgba(0, 102, 204, 0.6)' 
        },
      },
    },
  },

  /**
   * 焦点效果预设
   */
  focus: {
    /**
     * 标准焦点环
     */
    ring: {
      outline: 'none',
      boxShadow: `0 0 0 3px rgba(0, 102, 204, 0.3)`,
      transition: techAnimationTokens.transition.shadow,
    },

    /**
     * 内焦点
     */
    inset: {
      outline: 'none',
      boxShadow: `inset 0 0 0 2px rgba(0, 102, 204, 0.5)`,
      transition: techAnimationTokens.transition.shadow,
    },
  },

  /**
   * 过渡效果预设
   */
  transition: {
    /**
     * 淡入
     */
    fadeIn: {
      opacity: 0,
      animation: `fadeIn ${techAnimationTokens.duration.normal} ${techAnimationTokens.easing.easeOut} forwards`,
      '@keyframes fadeIn': {
        to: { opacity: 1 },
      },
    },

    /**
     * 滑入
     */
    slideIn: {
      transform: 'translateY(20px)',
      opacity: 0,
      animation: `slideIn ${techAnimationTokens.duration.normal} ${techAnimationTokens.easing.easeOut} forwards`,
      '@keyframes slideIn': {
        to: { 
          transform: 'translateY(0)', 
          opacity: 1 
        },
      },
    },
  },
};

/**
 * 科技风主题动画工具函数
 * 提供动画相关的计算和生成功能
 */
export const techAnimationUtils = {
  /**
   * 生成延迟动画
   * 
   * @param baseAnimation - 基础动画
   * @param delay - 延迟时间
   * @returns 带延迟的动画样式
   */
  withDelay(baseAnimation: string, delay: string): string {
    return baseAnimation.replace(/animation:\s*([^;]+)/, `animation: $1, animation-delay: ${delay}`);
  },

  /**
   * 生成响应动画偏好的样式
   * 
   * @param animatedStyles - 动画样式
   * @param staticStyles - 静态样式（减少动画时使用）
   * @returns CSS样式对象
   */
  respectMotionPreference(
    animatedStyles: React.CSSProperties,
    staticStyles: React.CSSProperties = {}
  ): React.CSSProperties {
    return {
      '@media (prefers-reduced-motion: no-preference)': animatedStyles,
      '@media (prefers-reduced-motion: reduce)': {
        ...staticStyles,
        animation: 'none',
        transition: 'none',
      },
    } as React.CSSProperties;
  },

  /**
   * 生成渐进增强的动画
   * 
   * @param baseStyles - 基础样式
   * @param enhancedStyles - 增强样式
   * @returns 渐进增强的样式
   */
  progressiveEnhancement(
    baseStyles: React.CSSProperties,
    enhancedStyles: React.CSSProperties
  ): React.CSSProperties {
    return {
      ...baseStyles,
      '@supports (backdrop-filter: blur(10px))': enhancedStyles,
    } as React.CSSProperties;
  },

  /**
   * 计算动画持续时间
   * 
   * @param distance - 动画距离（px）
   * @param speed - 速度因子（可选）
   * @returns 计算后的持续时间
   */
  calculateDuration(distance: number, speed: number = 1): string {
    // 基于距离的动画时间计算
    const baseDuration = Math.sqrt(distance) * 10;
    const adjustedDuration = Math.max(150, Math.min(500, baseDuration / speed));
    return `${Math.round(adjustedDuration)}ms`;
  },

  /**
   * 生成交错动画
   * 
   * @param itemCount - 元素数量
   * @param baseDelay - 基础延迟
   * @returns 交错延迟数组
   */
  generateStaggeredDelays(itemCount: number, baseDelay: number = 50): string[] {
    return Array.from({ length: itemCount }, (_, i) => `${i * baseDelay}ms`);
  },
};