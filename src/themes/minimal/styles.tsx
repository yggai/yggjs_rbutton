/**
 * 极简主题 - 按钮样式系统
 * 
 * 基于极简主题设计令牌生成按钮样式
 * 与科技风主题形成对比：更简洁、更克制、更优雅
 * 专注于内容可读性和视觉舒适度
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import React from 'react';
import type { BaseButtonProps } from '../../core/types';
import type { UseButtonReturn, StyleCacheValue } from '../../core/types';
import { minimalThemeDefinition } from './tokens';

/**
 * 极简主题按钮样式接口
 * 定义极简按钮的完整样式结构
 */
export interface MinimalButtonStyles {
  // 基础样式
  base: React.CSSProperties;
  
  // 尺寸变体样式
  sizes: {
    small: React.CSSProperties;
    medium: React.CSSProperties;
    large: React.CSSProperties;
  };
  
  // 主题变体样式
  variants: {
    primary: React.CSSProperties;
    secondary: React.CSSProperties;
    danger: React.CSSProperties;
    success: React.CSSProperties;
  };
  
  // 填充模式样式
  fills: {
    solid: React.CSSProperties;
    outline: React.CSSProperties;
    ghost: React.CSSProperties;
    link: React.CSSProperties;
  };
  
  // 形状变体样式
  shapes: {
    default: React.CSSProperties;
    rounded: React.CSSProperties;
    circle: React.CSSProperties;
    square: React.CSSProperties;
  };
  
  // 状态样式
  states: {
    default: React.CSSProperties;
    hover: React.CSSProperties;
    active: React.CSSProperties;
    focus: React.CSSProperties;
    disabled: React.CSSProperties;
    loading: React.CSSProperties;
  };
  
  // 特效样式
  effects: {
    glow: React.CSSProperties;
    fullWidth: React.CSSProperties;
    responsive: React.CSSProperties;
    iconOnly: React.CSSProperties;
  };
  
  // 可访问性样式
  accessibility: {
    highContrast: React.CSSProperties;
    reducedMotion: React.CSSProperties;
    focusVisible: React.CSSProperties;
  };
}

/**
 * 创建极简主题按钮样式
 * 基于极简主题设计令牌生成完整样式系统
 */
function createMinimalButtonStyles(): MinimalButtonStyles {
  const {
    colors,
    typography,
    spacing,
    animation,
    shadows,
    borderRadius,
  } = minimalThemeDefinition;

  return {
    // 基础样式 - 所有极简按钮共享的样式
    base: {
      // 布局属性
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      gap: spacing[2], // 8px 间距，适中而舒适
      
      // 边框和背景
      border: `1px solid ${colors.default.semantic.border}`,
      borderRadius: borderRadius.base, // 4px，适度的圆角
      backgroundColor: colors.default.semantic.surface,
      
      // 文本样式
      fontFamily: typography.fontFamily.sans.join(', '),
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.tight,
      color: colors.default.semantic.text.primary,
      textAlign: 'center' as const,
      textDecoration: 'none',
      letterSpacing: typography.letterSpacing.normal,
      whiteSpace: 'nowrap' as const,
      
      // 交互属性
      cursor: 'pointer',
      outline: 'none',
      userSelect: 'none' as const,
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      
      // 动画过渡 - 极简主题使用更温和的过渡
      transition: animation.transition.all,
      
      // 阴影效果 - 极其微妙的阴影
      boxShadow: shadows.default.xs,
      
      // 性能优化
      willChange: 'transform, box-shadow, border-color, background-color, color',
      transform: 'translateZ(0)', // 启用硬件加速
      
      // 无障碍支持
      touchAction: 'manipulation', // 防止触摸延迟
      WebkitTapHighlightColor: 'transparent', // 移除点击高亮
    },

    // 尺寸变体样式 - 简洁而实用的尺寸设计
    sizes: {
      small: {
        minHeight: spacing[8], // 32px
        padding: `${spacing[2]} ${spacing[4]}`, // 8px 16px
        fontSize: typography.fontSize.xs,
        borderRadius: borderRadius.sm,
        gap: spacing[1.5], // 6px
      },
      medium: {
        minHeight: spacing[10], // 40px  
        padding: `${spacing[2.5]} ${spacing[5]}`, // 10px 20px
        fontSize: typography.fontSize.sm,
        borderRadius: borderRadius.base,
        gap: spacing[2], // 8px
      },
      large: {
        minHeight: spacing[12], // 48px
        padding: `${spacing[3.5]} ${spacing[6]}`, // 14px 24px
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        borderRadius: borderRadius.md,
        gap: spacing[2.5], // 10px
      },
    },

    // 主题变体样式 - 克制的颜色应用
    variants: {
      primary: {
        backgroundColor: colors.default.primary[500],
        borderColor: colors.default.primary[500],
        color: colors.default.neutral[50], // 使用浅色文字确保对比度
        
        // 悬停状态
        '&:hover': {
          backgroundColor: colors.default.primary[600],
          borderColor: colors.default.primary[600],
        },
        
        // 激活状态
        '&:active': {
          backgroundColor: colors.default.primary[700],
          borderColor: colors.default.primary[700],
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: colors.default.secondary[400],
        color: colors.default.secondary[600],
        
        '&:hover': {
          backgroundColor: colors.default.secondary[50],
          borderColor: colors.default.secondary[500],
          color: colors.default.secondary[700],
        },
        
        '&:active': {
          backgroundColor: colors.default.secondary[100],
          borderColor: colors.default.secondary[600],
        },
      },
      danger: {
        backgroundColor: colors.default.danger[500],
        borderColor: colors.default.danger[500],
        color: colors.default.neutral[50],
        
        '&:hover': {
          backgroundColor: colors.default.danger[600],
          borderColor: colors.default.danger[600],
        },
        
        '&:active': {
          backgroundColor: colors.default.danger[700],
          borderColor: colors.default.danger[700],
        },
      },
      success: {
        backgroundColor: colors.default.success[500],
        borderColor: colors.default.success[500],
        color: colors.default.neutral[50],
        
        '&:hover': {
          backgroundColor: colors.default.success[600],
          borderColor: colors.default.success[600],
        },
        
        '&:active': {
          backgroundColor: colors.default.success[700],
          borderColor: colors.default.success[700],
        },
      },
    },

    // 填充模式样式 - 极简主题偏好outline模式
    fills: {
      solid: {
        // 实心填充样式已在variants中定义
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        
        // 悬停时添加微妙的背景色
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        },
        
        '&:active': {
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        
        '&:active': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
      link: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationThickness: '1px',
        minHeight: 'auto',
        padding: spacing[1], // 4px - 最小内边距
        
        '&:hover': {
          textDecorationColor: 'currentColor',
          opacity: 0.8,
        },
        
        '&:active': {
          opacity: 0.6,
        },
      },
    },

    // 形状变体样式 - 简洁的几何形状
    shapes: {
      default: {
        borderRadius: borderRadius.base, // 4px
      },
      rounded: {
        borderRadius: borderRadius.lg, // 8px
      },
      circle: {
        borderRadius: borderRadius.full, // 9999px
        aspectRatio: '1',
        padding: '0',
        width: 'var(--button-size)',
        height: 'var(--button-size)',
      },
      square: {
        borderRadius: borderRadius.none, // 0px
      },
    },

    // 状态样式 - 微妙而清晰的状态变化
    states: {
      default: {
        // 默认状态无额外样式
      },
      hover: {
        transform: 'translateY(-1px)', // 极微妙的上升效果
        boxShadow: shadows.default.sm,
        borderColor: colors.default.neutral[400],
      },
      active: {
        transform: 'translateY(0px)',
        boxShadow: shadows.default.xs,
        transition: animation.transition.all.replace('300ms', '150ms'), // 更快的激活反馈
      },
      focus: {
        outline: 'none',
        boxShadow: `${shadows.default.sm}, 0 0 0 2px ${colors.default.primary[200]}`, // 微妙的焦点环
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none' as const,
        transform: 'none',
        boxShadow: 'none',
        color: colors.default.semantic.text.disabled,
        backgroundColor: colors.default.neutral[100],
        borderColor: colors.default.neutral[200],
      },
      loading: {
        cursor: 'wait',
        opacity: 0.8,
        pointerEvents: 'none' as const,
      },
    },

    // 特效样式 - 极简而实用的特效
    effects: {
      glow: {
        // 极简主题的发光效果非常微妙
        boxShadow: `${shadows.default.base}, 0 0 0 1px rgba(0, 0, 0, 0.05)`,
      },
      fullWidth: {
        width: '100%',
        display: 'flex',
      },
      responsive: {
        // 响应式设计 - 使用保守的缩放
        fontSize: `clamp(${typography.fontSize.xs}, 2vw, ${typography.fontSize.base})`,
        padding: `clamp(${spacing[2]}, 1.5vw, ${spacing[3]}) clamp(${spacing[4]}, 3vw, ${spacing[6]})`,
      },
      iconOnly: {
        // 纯图标按钮的特殊处理
        '--button-size': spacing[10], // 40px
        width: 'var(--button-size)',
        height: 'var(--button-size)',
        padding: '0',
        minWidth: 'var(--button-size)',
        minHeight: 'var(--button-size)',
      },
    },

    // 可访问性样式 - 确保所有用户都能舒适使用
    accessibility: {
      highContrast: {
        borderWidth: '2px',
        fontWeight: typography.fontWeight.semibold,
        outline: '2px solid transparent',
      },
      reducedMotion: {
        transition: 'none',
        transform: 'none',
        animation: 'none',
      },
      focusVisible: {
        // 仅在键盘导航时显示焦点环
        '&:focus-visible': {
          outline: `2px solid ${colors.default.primary[500]}`,
          outlineOffset: '2px',
        },
      },
    },
  };
}

/**
 * 样式缓存实例
 * 提高性能，避免重复创建样式对象
 */
const styleCache = createStyleCache<MinimalButtonStyles>();

/**
 * 获取缓存的极简按钮样式
 * 使用缓存机制提升性能
 */
export function getMinimalButtonStyles(): MinimalButtonStyles {
  return styleCache.get('minimal-button', createMinimalButtonStyles);
}

/**
 * 计算极简按钮的最终样式
 * 
 * 这是提供给BaseButton组件的computeStyles函数
 * 根据props和state计算最终的按钮样式
 * 
 * @param props - 按钮属性
 * @param state - 按钮状态
 * @returns 计算后的样式对象
 */
export function computeMinimalButtonStyles(
  props: BaseButtonProps,
  state: UseButtonReturn['state']
): StyleCacheValue {
  const styles = getMinimalButtonStyles();
  
  // 基础样式
  let computedStyle: React.CSSProperties = {
    ...styles.base,
  };

  // 应用尺寸样式
  if (props.size && styles.sizes[props.size as keyof typeof styles.sizes]) {
    computedStyle = {
      ...computedStyle,
      ...styles.sizes[props.size as keyof typeof styles.sizes],
    };
  }

  // 应用变体样式
  if (props.variant && styles.variants[props.variant as keyof typeof styles.variants]) {
    const variantStyles = styles.variants[props.variant as keyof typeof styles.variants];
    computedStyle = {
      ...computedStyle,
      ...variantStyles,
    };
  }

  // 应用填充模式样式
  if (props.fill && styles.fills[props.fill as keyof typeof styles.fills]) {
    computedStyle = {
      ...computedStyle,
      ...styles.fills[props.fill as keyof typeof styles.fills],
    };
  }

  // 应用形状样式
  if (props.shape && styles.shapes[props.shape as keyof typeof styles.shapes]) {
    computedStyle = {
      ...computedStyle,
      ...styles.shapes[props.shape as keyof typeof styles.shapes],
    };
  }

  // 应用状态样式
  if (state.isDisabled || props.disabled) {
    computedStyle = {
      ...computedStyle,
      ...styles.states.disabled,
    };
  } else if (state.isLoading || props.loading) {
    computedStyle = {
      ...computedStyle,
      ...styles.states.loading,
    };
  } else {
    // 交互状态样式
    if (state.isPressed) {
      computedStyle = {
        ...computedStyle,
        ...styles.states.active,
      };
    } else if (state.isHovered) {
      computedStyle = {
        ...computedStyle,
        ...styles.states.hover,
      };
    }
    
    if (state.isFocused) {
      computedStyle = {
        ...computedStyle,
        ...styles.states.focus,
      };
    }
  }

  // 应用特效样式
  if (props.glow) {
    computedStyle = {
      ...computedStyle,
      ...styles.effects.glow,
    };
  }

  if (props.fullWidth) {
    computedStyle = {
      ...computedStyle,
      ...styles.effects.fullWidth,
    };
  }

  if (props.responsive) {
    computedStyle = {
      ...computedStyle,
      ...styles.effects.responsive,
    };
  }

  if (props.iconOnly) {
    computedStyle = {
      ...computedStyle,
      ...styles.effects.iconOnly,
    };
  }

  // 应用可访问性样式
  if (props.highContrast) {
    computedStyle = {
      ...computedStyle,
      ...styles.accessibility.highContrast,
    };
  }

  if (props.reducedMotion) {
    computedStyle = {
      ...computedStyle,
      ...styles.accessibility.reducedMotion,
    };
  }

  // 添加focus-visible支持
  computedStyle = {
    ...computedStyle,
    ...styles.accessibility.focusVisible,
  };

  return computedStyle;
}

/**
 * 极简主题按钮的加载指示器
 * 
 * @param props - 按钮属性
 * @returns 加载指示器JSX
 */
export function renderMinimalLoadingIndicator(props: BaseButtonProps): React.ReactNode {
  const { reducedMotion } = props;
  
  return (
    <span
      style={{
        display: 'inline-block',
        width: '1em',
        height: '1em',
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: reducedMotion ? 'none' : 'spin 1.5s linear infinite', // 稍慢的旋转
      }}
      aria-hidden="true"
    />
  );
}

/**
 * 极简主题按钮的内容渲染器
 * 
 * @param props - 按钮属性  
 * @param children - 默认内容
 * @returns 渲染后的内容JSX
 */
export function renderMinimalButtonContent(
  props: BaseButtonProps,
  children: React.ReactNode
): React.ReactNode {
  // 极简主题保持简单的内容布局，直接返回默认内容
  return children;
}

/**
 * 清空样式缓存
 * 用于测试或主题切换时重置
 */
export function clearMinimalStylesCache(): void {
  styleCache.clear();
}

/**
 * 极简主题按钮样式工具函数
 */
export const MinimalButtonStyleUtils = {
  /**
   * 获取按钮的CSS变量
   * 
   * @param props - 按钮属性
   * @returns CSS变量对象
   */
  getCSSVariables(props: BaseButtonProps): Record<string, string> {
    const { spacing } = minimalThemeDefinition;
    
    return {
      '--button-size': props.size === 'small' ? spacing[8] : 
                      props.size === 'large' ? spacing[12] : 
                      spacing[10],
    };
  },

  /**
   * 检查按钮是否需要特殊处理
   * 
   * @param props - 按钮属性
   * @returns 检查结果
   */
  needsSpecialHandling(props: BaseButtonProps): {
    isIconOnly: boolean;
    isCircular: boolean;
    isFullWidth: boolean;
    hasGlow: boolean;
  } {
    return {
      isIconOnly: Boolean(props.iconOnly),
      isCircular: props.shape === 'circle',
      isFullWidth: Boolean(props.fullWidth),
      hasGlow: Boolean(props.glow),
    };
  },

  /**
   * 生成极简主题的调试信息
   * 
   * @param props - 按钮属性
   * @param state - 按钮状态
   * @returns 调试信息
   */
  generateDebugInfo(
    props: BaseButtonProps,
    state: UseButtonReturn['state']
  ): Record<string, any> {
    return {
      theme: 'minimal',
      props,
      state,
      specialHandling: this.needsSpecialHandling(props),
      cssVariables: this.getCSSVariables(props),
    };
  },
};