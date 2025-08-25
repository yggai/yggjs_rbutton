import { 
  TechTheme, 
  TechButtonStyles, 
  TechButtonVariant, 
  TechButtonFill,
  TechButtonShape,
  TechButtonIconSize 
} from './types';

/**
 * 科技风主题配置
 * 定义了组件库的颜色、效果和过渡动画等样式变量
 * v1.1.0 - 新增更多颜色定义和效果
 */
export const techTheme: TechTheme = {
  colors: {
    // 主色调 - 科技蓝
    primary: '#00d4ff',
    primaryHover: '#00bfea',
    primaryActive: '#00aacc',

    // 次要色调 - 深空灰
    secondary: '#6b7280',
    secondaryHover: '#5b616b',
    secondaryActive: '#4b515a',

    // 危险色调 - 警示红
    danger: '#ef4444',
    dangerHover: '#dc2626',
    dangerActive: '#b91c1c',

    // 成功色调 - 科技绿
    success: '#10b981',
    successHover: '#059669',
    successActive: '#047857',

    // 文本颜色
    text: '#ffffff',
    textSecondary: '#d1d5db',

    // 禁用状态
    disabled: '#4b5563',

    // 背景和边框
    background: 'rgba(0, 0, 0, 0.8)',
    backgroundHover: 'rgba(0, 0, 0, 0.9)',
    border: 'rgba(255, 255, 255, 0.2)',
    borderHover: 'rgba(255, 255, 255, 0.3)',

    // 焦点颜色
    focus: '#00d4ff',
  },
  effects: {
    // 阴影效果
    shadow: '0 4px 14px 0 rgba(0, 0, 0, 0.39)',
    shadowHover: '0 8px 25px 0 rgba(0, 0, 0, 0.2)',
    
    // 发光效果
    glowPrimary: '0 0 20px rgba(0, 212, 255, 0.6)',
    glowSecondary: '0 0 20px rgba(107, 114, 128, 0.6)',
    glowDanger: '0 0 20px rgba(239, 68, 68, 0.6)',
    glowSuccess: '0 0 20px rgba(16, 185, 129, 0.6)',
  },
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
};

/**
 * 暗色主题配置
 * 为暗色模式优化的颜色和效果
 */
export const techDarkTheme: TechTheme = {
  colors: {
    // 主色调 - 更亮的科技蓝
    primary: '#00d4ff',
    primaryHover: '#33ddff',
    primaryActive: '#00bfea',

    // 次要色调 - 更亮的灰色
    secondary: '#9ca3af',
    secondaryHover: '#d1d5db',
    secondaryActive: '#f3f4f6',

    // 危险色调
    danger: '#f87171',
    dangerHover: '#fca5a5',
    dangerActive: '#ef4444',

    // 成功色调
    success: '#34d399',
    successHover: '#6ee7b7',
    successActive: '#10b981',

    // 文本颜色
    text: '#ffffff',
    textSecondary: '#d1d5db',

    // 禁用状态
    disabled: '#6b7280',

    // 背景和边框 - 暗色模式适配
    background: 'rgba(17, 24, 39, 0.9)',
    backgroundHover: 'rgba(31, 41, 55, 0.95)',
    border: 'rgba(75, 85, 99, 0.5)',
    borderHover: 'rgba(156, 163, 175, 0.7)',

    // 焦点颜色
    focus: '#00d4ff',
  },
  effects: {
    // 阴影效果 - 暗色模式调整
    shadow: '0 4px 14px 0 rgba(0, 0, 0, 0.7)',
    shadowHover: '0 8px 25px 0 rgba(0, 0, 0, 0.4)',
    
    // 发光效果 - 增强发光效果
    glowPrimary: '0 0 25px rgba(0, 212, 255, 0.8)',
    glowSecondary: '0 0 25px rgba(156, 163, 175, 0.8)',
    glowDanger: '0 0 25px rgba(248, 113, 113, 0.8)',
    glowSuccess: '0 0 25px rgba(52, 211, 153, 0.8)',
  },
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
};

/**
 * 亮色主题配置（原有的主题作为亮色主题）
 */
export const techLightTheme: TechTheme = techTheme;

/**
 * 获取当前主题
 * 根据主题模式返回相应的主题配置
 */
export const getCurrentTheme = (themeMode: 'light' | 'dark' | 'auto' = 'light'): TechTheme => {
  if (themeMode === 'dark') {
    return techDarkTheme;
  }
  
  if (themeMode === 'auto') {
    // 检查系统主题偏好
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
      return prefersColorScheme.matches ? techDarkTheme : techLightTheme;
    }
  }
  
  return techLightTheme;
};

/**
 * 生成CSS-in-JS样式对象的工厂函数
 * v1.1.0 - 新增图标、填充模式、形状变体等样式支持
 */
export const createTechButtonStyles = (theme?: TechTheme): TechButtonStyles => {
  const currentTheme = theme || techTheme;
  const { colors, effects, transitions } = currentTheme;

  return {
    // 基础样式 - 所有按钮共享的样式
    base: {
      // 布局相关
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      
      // 边框和圆角
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      
      // 背景
      background: colors.background,
      backdropFilter: 'blur(10px)',
      
      // 文本
      color: colors.text,
      fontSize: '14px',
      fontWeight: '500',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      textAlign: 'center',
      textDecoration: 'none',
      lineHeight: 1.5,
      
      // 交互
      cursor: 'pointer',
      outline: 'none',
      userSelect: 'none',
      
      // 动画过渡
      transition: `all ${transitions.fast}, box-shadow ${transitions.normal}`,
      
      // 阴影效果
      boxShadow: effects.shadow,
      
      // 性能优化
      willChange: 'transform, box-shadow',
      transform: 'translateZ(0)', // 开启硬件加速
      
      // 防止双击选中
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',

      // 最小尺寸确保可点击性
      minWidth: '32px',
      minHeight: '32px',
    },

    // 尺寸变体样式
    sizes: {
      small: {
        minHeight: '32px',
        padding: '6px 16px',
        fontSize: '12px',
        borderRadius: '6px',
        gap: '6px',
      },
      medium: {
        minHeight: '40px',
        padding: '10px 20px',
        fontSize: '14px',
        borderRadius: '8px',
        gap: '8px',
      },
      large: {
        minHeight: '48px',
        padding: '14px 28px',
        fontSize: '16px',
        borderRadius: '10px',
        fontWeight: '600',
        gap: '10px',
      },
    },

    // 主题变体样式
    variants: {
      primary: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        color: '#000000',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: colors.secondary,
        color: colors.secondary,
      },
      danger: {
        backgroundColor: colors.danger,
        borderColor: colors.danger,
        color: colors.text,
      },
      success: {
        backgroundColor: colors.success,
        borderColor: colors.success,
        color: colors.text,
      },
    },

    // 填充模式样式
    fills: {
      solid: {
        // 默认实心填充样式已在 variants 中定义
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: '2px',
        borderStyle: 'solid',
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      link: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
        minHeight: 'auto',
        padding: '4px 0',
      },
    },

    // 形状变体样式
    shapes: {
      default: {
        borderRadius: '8px',
      },
      rounded: {
        borderRadius: '16px',
      },
      circular: {
        borderRadius: '50%',
        aspectRatio: '1',
        padding: '0',
        minWidth: '40px',
        width: '40px',
        height: '40px',
      },
      square: {
        borderRadius: '0px',
      },
    },

    // 状态样式
    states: {
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: `${effects.shadow}, ${effects.shadowHover}`,
      },
      active: {
        transform: 'translateY(0)',
        transition: `all ${transitions.fast}`,
      },
      focus: {
        outline: `2px solid ${colors.focus}`,
        outlineOffset: '2px',
        boxShadow: `${effects.shadow}, 0 0 0 3px rgba(0, 212, 255, 0.2)`,
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: effects.shadow,
        pointerEvents: 'none',
      },
      loading: {
        cursor: 'wait',
        opacity: 0.8,
        pointerEvents: 'none',
      },
    },

    // 特效样式
    effects: {
      glowing: {
        boxShadow: `${effects.shadow}, ${effects.glowPrimary}`,
      },
      fullWidth: {
        width: '100%',
        display: 'flex',
      },
      responsive: {
        // 响应式样式通过CSS变量实现，避免直接使用媒体查询
        fontSize: 'clamp(13px, 2.5vw, 16px)',
        padding: 'clamp(6px, 1.5vw, 20px) clamp(12px, 3vw, 28px)',
      },
      minTouchTarget: {
        minWidth: '44px',
        minHeight: '44px',
        // 触摸设备优化
        touchAction: 'manipulation',
      },
    },

    // 图标样式
    icons: {
      base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        pointerEvents: 'none',
        transition: `all ${transitions.fast}`,
      },
      sizes: {
        small: {
          width: '16px',
          height: '16px',
          fontSize: '14px',
        },
        medium: {
          width: '18px',
          height: '18px',
          fontSize: '16px',
        },
        large: {
          width: '20px',
          height: '20px',
          fontSize: '18px',
        },
      },
      left: {
        order: -1,
        marginRight: '0',
      },
      right: {
        order: 1,
        marginLeft: '0',
      },
      only: {
        margin: '0',
      },
      loading: {
        animation: 'techButtonSpin 1s linear infinite',
      },
    },
  };
};

/**
 * 获取变体特定的悬停样式
 * v1.1.0 - 更新支持新的填充模式
 */
export const getVariantHoverStyles = (
  variant: TechButtonVariant, 
  fill: TechButtonFill = 'solid'
): React.CSSProperties => {
  const { colors } = techTheme;
  
  const baseHoverStyles = (() => {
    switch (variant) {
      case 'primary':
        return fill === 'solid' 
          ? { backgroundColor: colors.primaryHover, borderColor: colors.primaryHover }
          : { color: colors.primaryHover, borderColor: colors.primaryHover };
      case 'secondary':
        return fill === 'solid' 
          ? { backgroundColor: colors.secondaryHover, borderColor: colors.secondaryHover, color: colors.text }
          : { color: colors.secondaryHover, borderColor: colors.secondaryHover };
      case 'danger':
        return fill === 'solid'
          ? { backgroundColor: colors.dangerHover, borderColor: colors.dangerHover }
          : { color: colors.dangerHover, borderColor: colors.dangerHover };
      case 'success':
        return fill === 'solid'
          ? { backgroundColor: colors.successHover, borderColor: colors.successHover }
          : { color: colors.successHover, borderColor: colors.successHover };
      default:
        return {};
    }
  })();

  // 根据填充模式调整悬停效果
  if (fill === 'ghost') {
    return {
      ...baseHoverStyles,
      backgroundColor: `${baseHoverStyles.color || colors.primary}20`,
    };
  }

  if (fill === 'link') {
    return {
      ...baseHoverStyles,
      textDecorationColor: baseHoverStyles.color || colors.primary,
    };
  }

  return baseHoverStyles;
};

/**
 * 获取变体特定的激活样式
 * v1.1.0 - 更新支持新的填充模式
 */
export const getVariantActiveStyles = (
  variant: TechButtonVariant,
  fill: TechButtonFill = 'solid'
): React.CSSProperties => {
  const { colors } = techTheme;
  
  const baseActiveStyles = (() => {
    switch (variant) {
      case 'primary':
        return fill === 'solid'
          ? { backgroundColor: colors.primaryActive, borderColor: colors.primaryActive }
          : { color: colors.primaryActive, borderColor: colors.primaryActive };
      case 'secondary':
        return fill === 'solid'
          ? { backgroundColor: colors.secondaryActive, borderColor: colors.secondaryActive, color: colors.text }
          : { color: colors.secondaryActive, borderColor: colors.secondaryActive };
      case 'danger':
        return fill === 'solid'
          ? { backgroundColor: colors.dangerActive, borderColor: colors.dangerActive }
          : { color: colors.dangerActive, borderColor: colors.dangerActive };
      case 'success':
        return fill === 'solid'
          ? { backgroundColor: colors.successActive, borderColor: colors.successActive }
          : { color: colors.successActive, borderColor: colors.successActive };
      default:
        return {};
    }
  })();

  // 根据填充模式调整激活效果
  if (fill === 'ghost') {
    return {
      ...baseActiveStyles,
      backgroundColor: `${baseActiveStyles.color || colors.primary}30`,
    };
  }

  return baseActiveStyles;
};

/**
 * 获取发光效果样式
 * v1.1.0 - 根据不同主题变体返回对应的发光效果
 */
export const getGlowStyles = (variant: TechButtonVariant): React.CSSProperties => {
  const { effects } = techTheme;
  
  const glowMap = {
    primary: effects.glowPrimary,
    secondary: effects.glowSecondary,
    danger: effects.glowDanger,
    success: effects.glowSuccess,
  };
  
  return {
    boxShadow: `${effects.shadow}, ${glowMap[variant]}`,
  };
};

/**
 * 获取图标尺寸样式
 * 根据按钮尺寸自动匹配合适的图标尺寸
 */
export const getIconSizeForButton = (buttonSize: string): TechButtonIconSize => {
  switch (buttonSize) {
    case 'small':
      return 'small';
    case 'large':
      return 'large';
    case 'medium':
    default:
      return 'medium';
  }
};

/**
 * 获取形状特定的尺寸调整
 * 圆形按钮需要特殊处理以保持正方形比例
 */
export const getShapeAdjustedStyles = (
  shape: TechButtonShape,
  size: string,
  iconOnly: boolean
): React.CSSProperties => {
  if (shape === 'circular' || iconOnly) {
    const sizeMap = {
      small: { width: '32px', height: '32px', minWidth: '32px' },
      medium: { width: '40px', height: '40px', minWidth: '40px' },
      large: { width: '48px', height: '48px', minWidth: '48px' },
    };
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
  }
  return {};
};

/**
 * 获取响应式样式
 * 根据屏幕尺寸提供不同的样式
 */
export const getResponsiveStyles = (): React.CSSProperties => {
  return {
    // 使用 clamp() 实现响应式，避免CSS自定义属性在样式对象中的问题
    fontSize: 'clamp(13px, 2.5vw, 16px)',
    padding: 'clamp(6px, 1.5vw, 20px) clamp(12px, 3vw, 28px)',
  };
};

/**
 * 样式缓存
 * 提高性能，避免重复创建样式对象
 * 支持不同主题的缓存
 */
const stylesCache = new Map<string, TechButtonStyles>();

/**
 * 获取缓存的样式对象
 * 第一次调用时创建样式，之后返回缓存的样式
 */
export const getTechButtonStyles = (themeMode: 'light' | 'dark' | 'auto' = 'light'): TechButtonStyles => {
  const cacheKey = themeMode;
  
  if (!stylesCache.has(cacheKey)) {
    const theme = getCurrentTheme(themeMode);
    stylesCache.set(cacheKey, createTechButtonStyles(theme));
  }
  
  return stylesCache.get(cacheKey)!;
};

/**
 * 清空样式缓存
 * 主要用于测试或主题切换时重置样式
 */
export const clearStylesCache = (): void => {
  stylesCache.clear();
};

/**
 * 获取RTL语言支持的样式
 * 根据文本方向调整图标位置和内容对齐
 */
export const getRTLStyles = (dir: 'ltr' | 'rtl' | 'auto'): React.CSSProperties => {
  if (dir === 'rtl') {
    return {
      direction: 'rtl' as const,
      textAlign: 'right' as const,
    };
  }
  
  if (dir === 'auto') {
    return {
      textAlign: 'start' as const,
    };
  }
  
  return {
    direction: 'ltr' as const,
    textAlign: 'left' as const,
  };
};

/**
 * 获取RTL语言下的图标样式
 * 在RTL模式下，左右图标的位置需要互换
 */
export const getRTLIconStyles = (
  position: 'left' | 'right' | 'only',
  dir: 'ltr' | 'rtl' | 'auto'
): React.CSSProperties => {
  if (dir !== 'rtl') {
    return {};
  }
  
  // 在RTL模式下，左图标变为右图标，右图标变为左图标
  if (position === 'left') {
    return {
      order: 1,
      marginLeft: '0',
      marginRight: '0',
    };
  }
  
  if (position === 'right') {
    return {
      order: -1,
      marginRight: '0',
      marginLeft: '0',
    };
  }
  
  return {};
};

/**
 * 动态生成组合样式
 * 高性能的样式合并函数，避免运行时的重复计算
 */
export const getCombinedStyles = (
  baseStyles: React.CSSProperties,
  ...additionalStyles: (React.CSSProperties | undefined)[]
): React.CSSProperties => {
  return Object.assign({}, baseStyles, ...additionalStyles.filter(Boolean));
};