/**
 * 共享常量定义
 * 
 * 定义组件库中使用的各种常量
 * 包括默认值、配置项、魔法数字等
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

/**
 * 按钮相关常量
 */
export const BUTTON_CONSTANTS = {
  /**
   * 默认属性值
   */
  DEFAULTS: {
    SIZE: 'md' as const,
    VARIANT: 'primary' as const,
    FILL: 'solid' as const,
    SHAPE: 'default' as const,
    DISABLED: false,
    LOADING: false,
    ICON_ONLY: false,
    FULL_WIDTH: false,
    GLOW: false,
    RESPONSIVE: false,
    HIGH_CONTRAST: false,
    REDUCED_MOTION: false,
  },
  
  /**
   * 防抖配置
   */
  DEBOUNCE: {
    DEFAULT_DELAY: 300,
    MIN_DELAY: 50,
    MAX_DELAY: 1000,
  },
  
  /**
   * 尺寸映射
   */
  SIZES: {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
  } as const,
  
  /**
   * 变体映射
   */
  VARIANTS: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
    SUCCESS: 'success',
  } as const,
  
  /**
   * 填充模式映射
   */
  FILLS: {
    SOLID: 'solid',
    OUTLINE: 'outline',
    GHOST: 'ghost',
    LINK: 'link',
  } as const,
  
  /**
   * 形状映射
   */
  SHAPES: {
    DEFAULT: 'default',
    ROUNDED: 'rounded',
    CIRCLE: 'circle',
    SQUARE: 'square',
  } as const,
  
  /**
   * 图标位置映射
   */
  ICON_POSITIONS: {
    LEFT: 'left',
    RIGHT: 'right',
  } as const,
  
  /**
   * 最小触摸目标尺寸（符合无障碍标准）
   */
  MIN_TOUCH_TARGET: 44,
  
  /**
   * 动画持续时间（毫秒）
   */
  ANIMATION: {
    FAST: 150,
    NORMAL: 250,
    SLOW: 350,
  },
  
  /**
   * Z-Index 层级
   */
  Z_INDEX: {
    BASE: 1,
    HOVER: 2,
    ACTIVE: 3,
    FOCUS: 4,
  },
} as const;

/**
 * 主题系统常量
 */
export const THEME_CONSTANTS = {
  /**
   * 默认主题ID
   */
  DEFAULT_THEME_ID: 'tech',
  
  /**
   * 主题缓存配置
   */
  CACHE: {
    DEFAULT_MAX_SIZE: 100,
    DEFAULT_TTL: 300000, // 5分钟
    STORAGE_KEY: 'yggjs-theme-cache',
  },
  
  /**
   * 主题持久化配置
   */
  PERSISTENCE: {
    STORAGE_KEY: 'yggjs-current-theme',
    STORAGE_TYPE: 'localStorage',
  },
  
  /**
   * 响应式断点
   */
  BREAKPOINTS: {
    MOBILE: '320px',
    TABLET: '768px',
    DESKTOP: '1024px',
    WIDE: '1440px',
  },
  
  /**
   * 媒体查询
   */
  MEDIA_QUERIES: {
    MOBILE: '(max-width: 767px)',
    TABLET: '(min-width: 768px) and (max-width: 1023px)',
    DESKTOP: '(min-width: 1024px) and (max-width: 1439px)',
    WIDE: '(min-width: 1440px)',
    
    // 特性查询
    PREFERS_REDUCED_MOTION: '(prefers-reduced-motion: reduce)',
    PREFERS_HIGH_CONTRAST: '(prefers-contrast: high)',
    PREFERS_COLOR_SCHEME_DARK: '(prefers-color-scheme: dark)',
  },
  
  /**
   * CSS自定义属性前缀
   */
  CSS_VARIABLES: {
    PREFIX: '--ygg',
    THEME_PREFIX: '--ygg-theme',
    COMPONENT_PREFIX: '--ygg-component',
  },
  
  /**
   * 颜色相关常量
   */
  COLORS: {
    OPACITY_LEVELS: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
    COLOR_STEPS: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  
  /**
   * 间距比例
   */
  SPACING: {
    BASE_UNIT: 4, // 4px
    SCALE_RATIO: 1.25,
  },
  
  /**
   * 字体相关常量
   */
  TYPOGRAPHY: {
    BASE_FONT_SIZE: 16, // 16px
    SCALE_RATIO: 1.25,
    BASE_LINE_HEIGHT: 1.5,
  },
} as const;

/**
 * 样式缓存相关常量
 */
export const CACHE_CONSTANTS = {
  /**
   * 默认缓存配置
   */
  DEFAULTS: {
    MAX_SIZE: 100,
    TTL: 300000, // 5分钟
    ENABLE_PERSISTENCE: false,
  },
  
  /**
   * 缓存键前缀
   */
  KEY_PREFIXES: {
    BUTTON_STYLE: 'btn-style',
    COMPONENT_STYLE: 'comp-style',
    THEME_STYLE: 'theme-style',
  },
  
  /**
   * 缓存清理策略
   */
  CLEANUP: {
    INTERVAL: 60000, // 1分钟检查一次过期缓存
    BATCH_SIZE: 10, // 每次清理的最大数量
  },
  
  /**
   * 性能相关
   */
  PERFORMANCE: {
    BATCH_UPDATE_INTERVAL: 16, // ~60fps
    MAX_STYLE_RULES: 1000,
    DEBOUNCE_CLEANUP: 5000, // 5秒后清理
  },
} as const;

/**
 * 可访问性相关常量
 */
export const ACCESSIBILITY_CONSTANTS = {
  /**
   * ARIA属性
   */
  ARIA: {
    ROLES: {
      BUTTON: 'button',
      LINK: 'link',
      MENUITEM: 'menuitem',
    },
    PROPERTIES: {
      LABEL: 'aria-label',
      LABELLEDBY: 'aria-labelledby',
      DESCRIBEDBY: 'aria-describedby',
      BUSY: 'aria-busy',
      DISABLED: 'aria-disabled',
      PRESSED: 'aria-pressed',
      EXPANDED: 'aria-expanded',
    },
  },
  
  /**
   * 键盘导航
   */
  KEYBOARD: {
    KEYS: {
      ENTER: 'Enter',
      SPACE: ' ',
      TAB: 'Tab',
      ESCAPE: 'Escape',
      ARROW_UP: 'ArrowUp',
      ARROW_DOWN: 'ArrowDown',
      ARROW_LEFT: 'ArrowLeft',
      ARROW_RIGHT: 'ArrowRight',
    },
    CODES: {
      ENTER: 13,
      SPACE: 32,
      TAB: 9,
      ESCAPE: 27,
      ARROW_UP: 38,
      ARROW_DOWN: 40,
      ARROW_LEFT: 37,
      ARROW_RIGHT: 39,
    },
  },
  
  /**
   * 对比度要求
   */
  CONTRAST: {
    AA_NORMAL: 4.5,
    AA_LARGE: 3,
    AAA_NORMAL: 7,
    AAA_LARGE: 4.5,
  },
  
  /**
   * 最小尺寸要求
   */
  MIN_SIZES: {
    TOUCH_TARGET: 44, // px
    FOCUS_INDICATOR: 2, // px
    TEXT_SIZE: 12, // px
  },
} as const;

/**
 * 开发环境相关常量
 */
export const DEVELOPMENT_CONSTANTS = {
  /**
   * 日志级别
   */
  LOG_LEVELS: {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug',
  } as const,
  
  /**
   * 性能监控阈值
   */
  PERFORMANCE_THRESHOLDS: {
    RENDER_TIME: 16, // ms (60fps)
    UPDATE_TIME: 8, // ms
    MEMORY_USAGE: 50 * 1024 * 1024, // 50MB
    CACHE_HIT_RATE: 0.8, // 80%
  },
  
  /**
   * 调试模式配置
   */
  DEBUG: {
    ENABLE_WARNINGS: true,
    ENABLE_PERFORMANCE_MONITORING: true,
    ENABLE_STYLE_DEBUGGING: true,
    ENABLE_A11Y_CHECKS: true,
  },
  
  /**
   * 热重载配置
   */
  HOT_RELOAD: {
    ENABLE_THEME_HOT_RELOAD: true,
    ENABLE_COMPONENT_HOT_RELOAD: true,
    DEBOUNCE_DELAY: 100,
  },
} as const;

/**
 * 浏览器相关常量
 */
export const BROWSER_CONSTANTS = {
  /**
   * 浏览器能力检测
   */
  FEATURES: {
    SUPPORTS_CSS_VARIABLES: 'CSS' in window && 'supports' in CSS && CSS.supports('color', 'var(--test)'),
    SUPPORTS_INTERSECTION_OBSERVER: 'IntersectionObserver' in window,
    SUPPORTS_RESIZE_OBSERVER: 'ResizeObserver' in window,
    SUPPORTS_PASSIVE_EVENTS: (() => {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get() {
            supportsPassive = true;
            return false;
          },
        });
        window.addEventListener('testPassive', () => {}, opts);
        window.removeEventListener('testPassive', () => {}, opts);
      } catch {
        // ignore
      }
      return supportsPassive;
    })(),
  },
  
  /**
   * 用户代理检测（仅在必要时使用）
   */
  USER_AGENT: {
    IS_MAC: typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform),
    IS_WINDOWS: typeof navigator !== 'undefined' && /Win/.test(navigator.platform),
    IS_IOS: typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent),
    IS_ANDROID: typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent),
    IS_TOUCH_DEVICE: typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
  },
  
  /**
   * 存储限制
   */
  STORAGE: {
    LOCAL_STORAGE_LIMIT: 5 * 1024 * 1024, // 5MB
    SESSION_STORAGE_LIMIT: 5 * 1024 * 1024, // 5MB
    MEMORY_STORAGE_LIMIT: 10 * 1024 * 1024, // 10MB
  },
} as const;

/**
 * 版本信息
 */
export const VERSION_CONSTANTS = {
  /**
   * 当前版本
   */
  CURRENT: '1.0.0',
  
  /**
   * API版本
   */
  API_VERSION: '1.0',
  
  /**
   * 主题系统版本
   */
  THEME_SYSTEM_VERSION: '1.0',
  
  /**
   * 兼容的版本范围
   */
  COMPATIBLE_VERSIONS: ['1.0.x'],
  
  /**
   * 最小支持版本
   */
  MIN_SUPPORTED_VERSION: '1.0.0',
} as const;

/**
 * 错误代码常量
 */
export const ERROR_CODES = {
  // 主题相关错误
  THEME_NOT_FOUND: 'THEME_NOT_FOUND',
  THEME_INVALID: 'THEME_INVALID',
  THEME_LOAD_FAILED: 'THEME_LOAD_FAILED',
  
  // 组件相关错误
  COMPONENT_RENDER_ERROR: 'COMPONENT_RENDER_ERROR',
  COMPONENT_PROPS_INVALID: 'COMPONENT_PROPS_INVALID',
  
  // 样式相关错误
  STYLE_GENERATION_ERROR: 'STYLE_GENERATION_ERROR',
  STYLE_CACHE_ERROR: 'STYLE_CACHE_ERROR',
  
  // 可访问性相关错误
  A11Y_VIOLATION: 'A11Y_VIOLATION',
  A11Y_WARNING: 'A11Y_WARNING',
  
  // 性能相关警告
  PERFORMANCE_WARNING: 'PERFORMANCE_WARNING',
  MEMORY_LEAK_WARNING: 'MEMORY_LEAK_WARNING',
} as const;

/**
 * 导出所有常量的联合类型
 */
export type ButtonConstants = typeof BUTTON_CONSTANTS;
export type ThemeConstants = typeof THEME_CONSTANTS;
export type CacheConstants = typeof CACHE_CONSTANTS;
export type AccessibilityConstants = typeof ACCESSIBILITY_CONSTANTS;
export type DevelopmentConstants = typeof DEVELOPMENT_CONSTANTS;
export type BrowserConstants = typeof BROWSER_CONSTANTS;
export type VersionConstants = typeof VERSION_CONSTANTS;
export type ErrorCodes = typeof ERROR_CODES;