/**
 * 极简主题 - 动画与阴影系统设计令牌
 * 
 * 定义极简主题的动画时间、缓动函数和阴影效果
 * 追求克制、优雅的过渡效果，避免过度装饰
 * 营造平静、专注的交互体验
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import type { AnimationSystem, ShadowSystem, BorderRadiusSystem } from '../../../core/types';

/**
 * 极简主题动画系统
 * 
 * 特点：
 * - 温和的过渡动画，避免突兀感
 * - 自然的缓动曲线，符合物理直觉
 * - 相对较慢的动画时间，营造从容感
 * - 尊重用户的减少动画偏好
 */
export const minimalAnimationTokens: AnimationSystem = {
  /**
   * 动画持续时间系统
   * 基于用户感知的舒适时间设置，相对科技风更温和
   */
  duration: {
    /**
     * 瞬间 - 100ms
     * 用于即时反馈，比科技风稍慢，更温和
     */
    instant: '100ms',

    /**
     * 快速 - 200ms
     * 用于悬停效果、焦点变化
     */
    fast: '200ms',

    /**
     * 正常 - 300ms
     * 用于标准过渡效果，极简主题常用
     */
    normal: '300ms',

    /**
     * 慢速 - 400ms
     * 用于复杂动画、页面切换
     */
    slow: '400ms',

    /**
     * 更慢 - 600ms
     * 用于大型元素动画、重要状态变化
     */
    slower: '600ms',
  },

  /**
   * 缓动函数系统
   * 创造自然、平静的动画感觉
   */
  easing: {
    /**
     * 线性 - 匀速运动
     * 用于加载动画、简单过渡
     */
    linear: 'linear',

    /**
     * 标准缓动 - 温和的标准缓动
     */
    ease: 'ease',

    /**
     * 缓入 - 温和开始
     * 用于元素进入动画
     */
    easeIn: 'cubic-bezier(0.32, 0, 0.67, 0)',

    /**
     * 缓出 - 温和结束
     * 用于元素退出动画，极简主题常用
     */
    easeOut: 'cubic-bezier(0.33, 1, 0.68, 1)',

    /**
     * 缓入缓出 - 两端温和
     * 用于状态变化动画，自然流畅
     */
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',

    /**
     * 极简弹性 - 非常温和的弹性效果
     * 相比科技风更加克制
     */
    bounce: 'cubic-bezier(0.68, -0.2, 0.265, 1.2)',

    /**
     * 自然弹性 - 接近物理的自然感
     * 用于重要的交互反馈
     */
    elastic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  /**
   * 过渡配置系统
   * 预定义的过渡组合，专为极简主题优化
   */
  transition: {
    /**
     * 全部属性过渡
     * 温和的全属性过渡
     */
    all: `all 300ms cubic-bezier(0.65, 0, 0.35, 1)`,

    /**
     * 颜色过渡
     * 用于主题切换、状态变化
     */
    colors: `background-color 300ms cubic-bezier(0.65, 0, 0.35, 1), 
             border-color 300ms cubic-bezier(0.65, 0, 0.35, 1), 
             color 300ms cubic-bezier(0.65, 0, 0.35, 1)`,

    /**
     * 透明度过渡
     * 用于元素显示隐藏，极简主题常用
     */
    opacity: `opacity 300ms cubic-bezier(0.33, 1, 0.68, 1)`,

    /**
     * 阴影过渡
     * 用于悬停效果、层级变化，极简主题使用微妙阴影
     */
    shadow: `box-shadow 300ms cubic-bezier(0.65, 0, 0.35, 1)`,

    /**
     * 变换过渡
     * 用于缩放、移动，避免旋转等复杂变换
     */
    transform: `transform 300ms cubic-bezier(0.65, 0, 0.35, 1)`,
  },
};

/**
 * 极简主题阴影系统
 * 
 * 特点：
 * - 极其微妙的阴影效果
 * - 使用黑色或深灰阴影，避免彩色阴影
 * - 低透明度，营造轻盈感
 * - 适配深色和浅色模式
 */
export const minimalShadowTokens: ShadowSystem = {
  /**
   * 超小阴影
   * 几乎不可见的轻微阴影
   */
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',

  /**
   * 小阴影
   * 用于按钮、小卡片的微妙层次
   */
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',

  /**
   * 基础阴影
   * 用于卡片、表单等，极简主题的标准阴影
   */
  base: '0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',

  /**
   * 中等阴影
   * 用于较重要的元素
   */
  md: '0 4px 6px 0 rgba(0, 0, 0, 0.07), 0 2px 4px 0 rgba(0, 0, 0, 0.04)',

  /**
   * 大阴影
   * 用于模态框、重要卡片
   */
  lg: '0 8px 15px 0 rgba(0, 0, 0, 0.08), 0 4px 6px 0 rgba(0, 0, 0, 0.05)',

  /**
   * 超大阴影
   * 用于浮动面板、抽屉等
   */
  xl: '0 12px 25px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.06)',

  /**
   * 2倍大阴影
   * 用于最高层级元素
   */
  '2xl': '0 20px 40px 0 rgba(0, 0, 0, 0.12), 0 8px 16px 0 rgba(0, 0, 0, 0.08)',

  /**
   * 内阴影
   * 用于输入框、内嵌效果
   */
  inner: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.04)',

  /**
   * 无阴影
   * 用于重置阴影，极简主题常用
   */
  none: 'none',
};

/**
 * 极简主题深色模式阴影系统
 * 深色模式下的阴影调整
 */
export const minimalShadowTokensDark: ShadowSystem = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  base: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.12)',
  md: '0 4px 6px 0 rgba(0, 0, 0, 0.25), 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
  lg: '0 8px 15px 0 rgba(0, 0, 0, 0.3), 0 4px 6px 0 rgba(0, 0, 0, 0.2)',
  xl: '0 12px 25px 0 rgba(0, 0, 0, 0.35), 0 6px 12px 0 rgba(0, 0, 0, 0.25)',
  '2xl': '0 20px 40px 0 rgba(0, 0, 0, 0.4), 0 8px 16px 0 rgba(0, 0, 0, 0.3)',
  inner: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.15)',
  none: 'none',
};

/**
 * 极简主题边框半径系统
 * 
 * 特点：
 * - 温和的圆角设计
 * - 避免过度圆润，保持简洁
 * - 层次化的半径值
 */
export const minimalBorderRadiusTokens: BorderRadiusSystem = {
  /**
   * 无圆角
   * 用于完全方形设计，极简主题常用
   */
  none: '0',

  /**
   * 微小圆角 - 2px
   * 用于微妙的边缘软化
   */
  sm: '0.125rem',

  /**
   * 基础圆角 - 4px
   * 默认圆角，极简主题的标准选择
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
   * 用于特殊设计需求，使用较少
   */
  xl: '0.75rem',

  /**
   * 2倍大圆角 - 16px
   * 用于大型卡片、面板，极简主题较少使用
   */
  '2xl': '1rem',

  /**
   * 3倍大圆角 - 24px
   * 极少使用，仅用于特殊设计
   */
  '3xl': '1.5rem',

  /**
   * 完全圆角
   * 用于圆形按钮、头像等
   */
  full: '9999px',
};

/**
 * 极简主题特效预设
 * 组合动画、阴影等效果的预设配置，强调简洁
 */
export const minimalEffectsPresets = {
  /**
   * 微妙效果预设
   * 极简主题的核心设计原则
   */
  subtle: {
    /**
     * 微妙悬停
     */
    hover: {
      transform: 'translateY(-1px)', // 极微妙的上移
      boxShadow: minimalShadowTokens.sm,
      transition: minimalAnimationTokens.transition.all,
    },

    /**
     * 微妙焦点
     */
    focus: {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)', // 极淡的焦点环
      transition: minimalAnimationTokens.transition.shadow,
    },

    /**
     * 微妙激活
     */
    active: {
      transform: 'translateY(0px)',
      boxShadow: minimalShadowTokens.xs,
      transition: minimalAnimationTokens.transition.all,
    },
  },

  /**
   * 悬停效果预设
   */
  hover: {
    /**
     * 轻微上升 - 极简版本
     */
    lift: {
      transform: 'translateY(-2px)',
      boxShadow: minimalShadowTokens.md,
      transition: `${minimalAnimationTokens.transition.transform}, ${minimalAnimationTokens.transition.shadow}`,
    },

    /**
     * 微妙缩放
     */
    scale: {
      transform: 'scale(1.01)', // 非常微妙的缩放
      transition: minimalAnimationTokens.transition.transform,
    },

    /**
     * 透明度变化
     */
    opacity: {
      opacity: 0.8,
      transition: minimalAnimationTokens.transition.opacity,
    },
  },

  /**
   * 加载动画预设
   */
  loading: {
    /**
     * 脉冲动画 - 极简版本
     */
    pulse: {
      animation: `pulse 2s ${minimalAnimationTokens.easing.easeInOut} infinite`,
      '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.6 }, // 更温和的透明度变化
      },
    },

    /**
     * 呼吸动画
     */
    breathe: {
      animation: `breathe 3s ${minimalAnimationTokens.easing.easeInOut} infinite`,
      '@keyframes breathe': {
        '0%, 100%': { 
          transform: 'scale(1)',
          opacity: 1,
        },
        '50%': { 
          transform: 'scale(1.02)',
          opacity: 0.8,
        },
      },
    },

    /**
     * 淡入淡出
     */
    fade: {
      animation: `fade 2s ${minimalAnimationTokens.easing.easeInOut} infinite`,
      '@keyframes fade': {
        '0%, 100%': { opacity: 0.4 },
        '50%': { opacity: 1 },
      },
    },
  },

  /**
   * 焦点效果预设
   */
  focus: {
    /**
     * 简洁焦点环
     */
    ring: {
      outline: 'none',
      boxShadow: `0 0 0 2px rgba(0, 0, 0, 0.15)`, // 使用黑色焦点环
      transition: minimalAnimationTokens.transition.shadow,
    },

    /**
     * 内焦点
     */
    inset: {
      outline: 'none',
      boxShadow: `inset 0 0 0 1px rgba(0, 0, 0, 0.2)`,
      transition: minimalAnimationTokens.transition.shadow,
    },

    /**
     * 边框焦点
     */
    border: {
      outline: 'none',
      borderColor: 'rgba(0, 0, 0, 0.3)',
      transition: minimalAnimationTokens.transition.colors,
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
      animation: `fadeIn ${minimalAnimationTokens.duration.normal} ${minimalAnimationTokens.easing.easeOut} forwards`,
      '@keyframes fadeIn': {
        to: { opacity: 1 },
      },
    },

    /**
     * 微妙滑入
     */
    slideIn: {
      transform: 'translateY(10px)', // 更小的移动距离
      opacity: 0,
      animation: `slideIn ${minimalAnimationTokens.duration.normal} ${minimalAnimationTokens.easing.easeOut} forwards`,
      '@keyframes slideIn': {
        to: { 
          transform: 'translateY(0)', 
          opacity: 1 
        },
      },
    },

    /**
     * 展开动画
     */
    expand: {
      transform: 'scaleY(0)',
      transformOrigin: 'top',
      animation: `expand ${minimalAnimationTokens.duration.slow} ${minimalAnimationTokens.easing.easeOut} forwards`,
      '@keyframes expand': {
        to: { 
          transform: 'scaleY(1)' 
        },
      },
    },
  },
};

/**
 * 极简主题动画工具函数
 * 提供动画相关的计算和生成功能
 */
export const minimalAnimationUtils = {
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
   * 极简主题特别注重用户的动画偏好
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
        transition: `opacity ${minimalAnimationTokens.duration.fast} ${minimalAnimationTokens.easing.easeOut}`,
      },
    } as React.CSSProperties;
  },

  /**
   * 生成温和的过渡
   * 
   * @param properties - 要过渡的属性
   * @param duration - 持续时间
   * @param easing - 缓动函数
   * @returns 过渡CSS值
   */
  generateGentleTransition(
    properties: string[],
    duration: keyof typeof minimalAnimationTokens.duration = 'normal',
    easing: keyof typeof minimalAnimationTokens.easing = 'easeOut'
  ): string {
    const durationValue = minimalAnimationTokens.duration[duration];
    const easingValue = minimalAnimationTokens.easing[easing];
    
    return properties
      .map(property => `${property} ${durationValue} ${easingValue}`)
      .join(', ');
  },

  /**
   * 创建交错动画延迟
   * 
   * @param itemCount - 元素数量
   * @param baseDelay - 基础延迟
   * @param increment - 增量延迟
   * @returns 交错延迟数组
   */
  generateStaggeredDelays(itemCount: number, baseDelay: number = 100, increment: number = 50): string[] {
    return Array.from({ length: itemCount }, (_, i) => `${baseDelay + i * increment}ms`);
  },

  /**
   * 计算自适应动画持续时间
   * 基于距离或复杂度计算合适的动画时间
   * 
   * @param complexity - 复杂度因子 (0-1)
   * @returns 动画持续时间
   */
  calculateAdaptiveDuration(complexity: number = 0.5): string {
    const baseMs = 200; // 基础时间
    const maxMs = 600;  // 最大时间
    const duration = Math.round(baseMs + (maxMs - baseMs) * complexity);
    return `${duration}ms`;
  },

  /**
   * 生成微妙的阴影过渡
   * 
   * @param fromShadow - 起始阴影
   * @param toShadow - 结束阴影
   * @returns 阴影过渡样式
   */
  createShadowTransition(
    fromShadow: keyof typeof minimalShadowTokens,
    toShadow: keyof typeof minimalShadowTokens
  ): React.CSSProperties {
    return {
      boxShadow: minimalShadowTokens[fromShadow],
      transition: minimalAnimationTokens.transition.shadow,
      '&:hover': {
        boxShadow: minimalShadowTokens[toShadow],
      },
    };
  },
};