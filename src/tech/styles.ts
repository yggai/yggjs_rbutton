import { TechTheme, TechButtonStyles, TechButtonVariant } from './types';

/**
 * 科技风主题配置
 * 定义了组件库的颜色、效果和过渡动画等样式变量
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
    border: 'rgba(255, 255, 255, 0.2)',
  },
  effects: {
    // 阴影效果
    shadow: '0 4px 14px 0 rgba(0, 0, 0, 0.39)',
    
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
 * 生成CSS-in-JS样式对象的工厂函数
 * 使用高性能的样式缓存机制，避免重复计算
 */
export const createTechButtonStyles = (): TechButtonStyles => {
  const { colors, effects, transitions } = techTheme;

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
    },

    // 尺寸变体样式
    sizes: {
      small: {
        minHeight: '32px',
        padding: '6px 16px',
        fontSize: '12px',
        borderRadius: '6px',
      },
      medium: {
        minHeight: '40px',
        padding: '10px 20px',
        fontSize: '14px',
        borderRadius: '8px',
      },
      large: {
        minHeight: '48px',
        padding: '14px 28px',
        fontSize: '16px',
        borderRadius: '10px',
        fontWeight: '600',
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

    // 状态样式
    states: {
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: `${effects.shadow}, 0 8px 25px 0 rgba(0, 0, 0, 0.2)`,
      },
      active: {
        transform: 'translateY(0)',
        transition: `all ${transitions.fast}`,
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: effects.shadow,
      },
      loading: {
        cursor: 'wait',
        opacity: 0.8,
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
    },
  };
};

/**
 * 获取变体特定的悬停样式
 * 根据不同主题变体返回对应的悬停颜色
 */
export const getVariantHoverStyles = (variant: TechButtonVariant): React.CSSProperties => {
  const { colors } = techTheme;
  
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: colors.primaryHover,
        borderColor: colors.primaryHover,
      };
    case 'secondary':
      return {
        backgroundColor: colors.secondaryHover,
        borderColor: colors.secondaryHover,
        color: colors.text,
      };
    case 'danger':
      return {
        backgroundColor: colors.dangerHover,
        borderColor: colors.dangerHover,
      };
    case 'success':
      return {
        backgroundColor: colors.successHover,
        borderColor: colors.successHover,
      };
    default:
      return {};
  }
};

/**
 * 获取变体特定的激活样式
 * 根据不同主题变体返回对应的激活颜色
 */
export const getVariantActiveStyles = (variant: TechButtonVariant): React.CSSProperties => {
  const { colors } = techTheme;
  
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: colors.primaryActive,
        borderColor: colors.primaryActive,
      };
    case 'secondary':
      return {
        backgroundColor: colors.secondaryActive,
        borderColor: colors.secondaryActive,
        color: colors.text,
      };
    case 'danger':
      return {
        backgroundColor: colors.dangerActive,
        borderColor: colors.dangerActive,
      };
    case 'success':
      return {
        backgroundColor: colors.successActive,
        borderColor: colors.successActive,
      };
    default:
      return {};
  }
};

/**
 * 获取发光效果样式
 * 根据不同主题变体返回对应的发光效果
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
 * 样式缓存
 * 提高性能，避免重复创建样式对象
 */
let stylesCache: TechButtonStyles | null = null;

/**
 * 获取缓存的样式对象
 * 第一次调用时创建样式，之后返回缓存的样式
 */
export const getTechButtonStyles = (): TechButtonStyles => {
  if (!stylesCache) {
    stylesCache = createTechButtonStyles();
  }
  return stylesCache;
};

/**
 * 清空样式缓存
 * 主要用于测试或主题切换时重置样式
 */
export const clearStylesCache = (): void => {
  stylesCache = null;
};