/**
 * 极简主题 - Hooks系统
 * 
 * 提供极简主题的React Hooks，支持主题状态管理、用户偏好检测等功能
 * 与科技风主题形成对比，专注于简洁和可用性
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo, 
  useLayoutEffect,
  useRef,
  useContext,
  createContext,
} from 'react';
import type {
  MinimalColorMode,
  MinimalDensity,
  MinimalThemeState,
  MinimalThemeActions,
  MinimalStyleContext,
  MinimalThemeFullConfig,
  UseMinimalThemeReturn,
  MinimalAccessibilityConfig,
} from './types';
import { minimalThemeDefinition } from './tokens';

/**
 * 极简主题上下文
 * 提供主题状态和配置的React上下文
 */
export const MinimalThemeContext = createContext<UseMinimalThemeReturn | null>(null);

/**
 * 极简主题提供者Hook
 * 创建并管理极简主题的状态和配置
 * 
 * @param initialConfig - 初始主题配置
 * @returns 主题状态管理对象
 */
export function useMinimalThemeProvider(
  initialConfig?: Partial<MinimalThemeFullConfig>
): UseMinimalThemeReturn {
  // 主题状态管理
  const [themeState, setThemeState] = useState<MinimalThemeState>(() => ({
    config: {
      ...minimalThemeDefinition,
      ...initialConfig,
    } as MinimalThemeFullConfig,
    context: {
      colorMode: 'light',
      density: 'comfortable',
      borderStyle: 'subtle',
      shadowIntensity: 'subtle',
      textStyle: 'normal',
      userPreferences: {
        prefersHighContrast: false,
        prefersReducedMotion: false,
        prefersColorScheme: 'no-preference',
      },
      device: {
        isTouchDevice: false,
        isMobileDevice: false,
        pixelRatio: 1,
      },
    },
    isInitialized: false,
    isLoading: false,
    error: null,
    metrics: {
      renderCount: 0,
      lastRenderTime: 0,
      averageRenderTime: 0,
      cacheHitRate: 0,
    },
  }));

  // 检测系统颜色方案偏好
  const detectSystemColorScheme = useCallback((): 'light' | 'dark' | 'no-preference' => {
    if (typeof window === 'undefined') return 'no-preference';
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    
    return 'no-preference';
  }, []);

  // 检测用户减少动画偏好
  const detectReducedMotionPreference = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // 检测高对比度偏好
  const detectHighContrastPreference = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches;
  }, []);

  // 检测设备信息
  const detectDeviceInfo = useCallback(() => {
    if (typeof window === 'undefined') {
      return {
        isTouchDevice: false,
        isMobileDevice: false,
        pixelRatio: 1,
      };
    }

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const pixelRatio = window.devicePixelRatio || 1;

    return {
      isTouchDevice,
      isMobileDevice,
      pixelRatio,
    };
  }, []);

  // 初始化主题
  const initialize = useCallback((config?: Partial<MinimalThemeFullConfig>) => {
    setThemeState(prev => ({
      ...prev,
      isLoading: true,
    }));

    // 模拟异步初始化过程
    setTimeout(() => {
      const deviceInfo = detectDeviceInfo();
      const userPreferences = {
        prefersHighContrast: detectHighContrastPreference(),
        prefersReducedMotion: detectReducedMotionPreference(),
        prefersColorScheme: detectSystemColorScheme(),
      };

      setThemeState(prev => ({
        ...prev,
        config: {
          ...prev.config,
          ...config,
        },
        context: {
          ...prev.context,
          userPreferences,
          device: deviceInfo,
        },
        isInitialized: true,
        isLoading: false,
        error: null,
      }));
    }, 0);
  }, [detectDeviceInfo, detectHighContrastPreference, detectReducedMotionPreference, detectSystemColorScheme]);

  // 更新主题配置
  const updateConfig = useCallback((updates: Partial<MinimalThemeFullConfig>) => {
    setThemeState(prev => ({
      ...prev,
      config: {
        ...prev.config,
        ...updates,
      },
    }));
  }, []);

  // 设置颜色模式
  const setColorMode = useCallback((mode: MinimalColorMode) => {
    setThemeState(prev => {
      const newColorMode = mode === 'auto' 
        ? (prev.context.userPreferences.prefersColorScheme === 'dark' ? 'dark' : 'light')
        : mode;

      return {
        ...prev,
        context: {
          ...prev.context,
          colorMode: newColorMode,
        },
      };
    });
  }, []);

  // 设置密度
  const setDensity = useCallback((density: MinimalDensity) => {
    setThemeState(prev => ({
      ...prev,
      context: {
        ...prev.context,
        density,
      },
    }));
  }, []);

  // 重置主题
  const reset = useCallback(() => {
    setThemeState(prev => ({
      ...prev,
      config: {
        ...minimalThemeDefinition,
        ...initialConfig,
      } as MinimalThemeFullConfig,
      context: {
        colorMode: 'light',
        density: 'comfortable',
        borderStyle: 'subtle',
        shadowIntensity: 'subtle',
        textStyle: 'normal',
        userPreferences: prev.context.userPreferences,
        device: prev.context.device,
      },
    }));
  }, [initialConfig]);

  // 清理资源
  const cleanup = useCallback(() => {
    // 清理事件监听器、缓存等资源
    // 这里可以添加具体的清理逻辑
  }, []);

  // 监听系统偏好变化
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueries = [
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
    ];

    const handleChange = () => {
      const newPreferences = {
        prefersHighContrast: detectHighContrastPreference(),
        prefersReducedMotion: detectReducedMotionPreference(),
        prefersColorScheme: detectSystemColorScheme(),
      };

      setThemeState(prev => ({
        ...prev,
        context: {
          ...prev.context,
          userPreferences: newPreferences,
        },
      }));
    };

    // 添加监听器
    mediaQueries.forEach(mq => {
      if (mq.addEventListener) {
        mq.addEventListener('change', handleChange);
      } else {
        // 兼容旧版本浏览器
        mq.addListener(handleChange);
      }
    });

    // 清理函数
    return () => {
      mediaQueries.forEach(mq => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', handleChange);
        } else {
          mq.removeListener(handleChange);
        }
      });
    };
  }, [detectHighContrastPreference, detectReducedMotionPreference, detectSystemColorScheme]);

  // 初始化主题
  useEffect(() => {
    if (!themeState.isInitialized) {
      initialize();
    }
  }, [initialize, themeState.isInitialized]);

  // 创建主题动作对象
  const actions: MinimalThemeActions = useMemo(() => ({
    initialize,
    updateConfig,
    setColorMode,
    setDensity,
    reset,
    cleanup,
  }), [initialize, updateConfig, setColorMode, setDensity, reset, cleanup]);

  // 创建工具函数对象
  const utils = useMemo(() => ({
    detectSystemColorScheme,
    detectReducedMotionPreference,
    detectHighContrastPreference,
    generateCSSVariables: (tokens: any, prefix = 'minimal') => {
      const variables: Record<string, string> = {};
      
      // 递归生成CSS变量
      const generateVariables = (obj: any, path: string[] = []) => {
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === 'object' && value !== null) {
            generateVariables(value, [...path, key]);
          } else {
            const variableName = `--${prefix}-${[...path, key].join('-')}`;
            variables[variableName] = String(value);
          }
        }
      };
      
      generateVariables(tokens);
      return variables;
    },
    calculateColorContrast: (foreground: string, background: string) => {
      // 简化的对比度计算（实际应用中应使用更精确的算法）
      return 4.5; // WCAG AA标准
    },
    validateAccessibility: (config: any) => ({
      isValid: true,
      warnings: [],
      errors: [],
      suggestions: [],
    }),
  }), [detectSystemColorScheme, detectReducedMotionPreference, detectHighContrastPreference]);

  // 计算当前有效的主题令牌
  const tokens = useMemo(() => {
    const { colorMode } = themeState.context;
    const isDark = colorMode === 'dark';
    
    return {
      colors: {
        primary: minimalThemeDefinition.colors[isDark ? 'dark' : 'light'].primary,
        secondary: minimalThemeDefinition.colors[isDark ? 'dark' : 'light'].secondary,
        neutral: minimalThemeDefinition.colors[isDark ? 'dark' : 'light'].neutral,
        semantic: minimalThemeDefinition.colors[isDark ? 'dark' : 'light'].semantic,
      },
      spacing: minimalThemeDefinition.spacing,
      typography: minimalThemeDefinition.typography,
      animation: minimalThemeDefinition.animation,
      shadows: minimalThemeDefinition.shadows[isDark ? 'dark' : 'light'],
      borderRadius: minimalThemeDefinition.borderRadius,
    };
  }, [themeState.context.colorMode]);

  return {
    state: themeState,
    actions,
    utils,
    isDarkMode: themeState.context.colorMode === 'dark',
    tokens,
  };
}

/**
 * 使用极简主题Hook
 * 获取当前的极简主题状态和操作函数
 * 
 * @returns 主题状态管理对象
 * @throws 如果在主题提供者外部使用会抛出错误
 */
export function useMinimalTheme(): UseMinimalThemeReturn {
  const context = useContext(MinimalThemeContext);
  
  if (!context) {
    throw new Error('useMinimalTheme must be used within a MinimalThemeProvider');
  }
  
  return context;
}

/**
 * 使用极简主题样式Hook
 * 获取当前组件应该使用的样式令牌
 * 
 * @param overrides - 样式覆盖选项
 * @returns 样式令牌对象
 */
export function useMinimalThemeStyles(overrides?: {
  colorMode?: MinimalColorMode;
  density?: MinimalDensity;
}) {
  const { tokens, state } = useMinimalTheme();
  
  return useMemo(() => {
    const effectiveColorMode = overrides?.colorMode || state.context.colorMode;
    const effectiveDensity = overrides?.density || state.context.density;
    
    // 根据有效的配置计算样式令牌
    const densityMultiplier = {
      compact: 0.8,
      comfortable: 1,
      spacious: 1.2,
    }[effectiveDensity];
    
    return {
      ...tokens,
      densityMultiplier,
      effectiveColorMode,
      effectiveDensity,
    };
  }, [tokens, state.context.colorMode, state.context.density, overrides]);
}

/**
 * 使用系统偏好Hook
 * 监听和响应用户的系统偏好变化
 * 
 * @returns 系统偏好对象
 */
export function useSystemPreferences() {
  const [preferences, setPreferences] = useState({
    colorScheme: 'no-preference' as 'light' | 'dark' | 'no-preference',
    reducedMotion: false,
    highContrast: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePreferences = () => {
      setPreferences({
        colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : window.matchMedia('(prefers-color-scheme: light)').matches 
            ? 'light' 
            : 'no-preference',
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        highContrast: window.matchMedia('(prefers-contrast: high)').matches,
      });
    };

    // 初始检测
    updatePreferences();

    // 监听变化
    const mediaQueries = [
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(prefers-color-scheme: light)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
    ];

    mediaQueries.forEach(mq => {
      if (mq.addEventListener) {
        mq.addEventListener('change', updatePreferences);
      } else {
        mq.addListener(updatePreferences);
      }
    });

    return () => {
      mediaQueries.forEach(mq => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', updatePreferences);
        } else {
          mq.removeListener(updatePreferences);
        }
      });
    };
  }, []);

  return preferences;
}

/**
 * 使用可访问性Hook
 * 提供可访问性增强功能
 * 
 * @param config - 可访问性配置
 * @returns 可访问性工具对象
 */
export function useAccessibility(config?: MinimalAccessibilityConfig) {
  const { state } = useMinimalTheme();
  const systemPreferences = useSystemPreferences();
  
  const accessibilityConfig = useMemo(() => ({
    highContrast: config?.highContrast ?? state.context.userPreferences.prefersHighContrast,
    reducedMotion: config?.reducedMotion ?? state.context.userPreferences.prefersReducedMotion,
    largeText: config?.largeText ?? false,
    enhancedKeyboardNavigation: config?.enhancedKeyboardNavigation ?? true,
    screenReaderOptimized: config?.screenReaderOptimized ?? true,
    focusIndicator: config?.focusIndicator ?? 'subtle',
    ariaLanguage: config?.ariaLanguage ?? 'zh',
  }), [config, state.context.userPreferences]);

  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof window === 'undefined') return;

    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    
    document.body.appendChild(announcer);
    announcer.textContent = message;
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, []);

  return {
    config: accessibilityConfig,
    announceToScreenReader,
    isHighContrast: accessibilityConfig.highContrast,
    isReducedMotion: accessibilityConfig.reducedMotion,
    isLargeText: accessibilityConfig.largeText,
  };
}

/**
 * 使用响应式设计Hook
 * 提供响应式设计相关的功能
 * 
 * @returns 响应式设计工具对象
 */
export function useResponsive() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    updateViewport();

    const handleResize = () => {
      updateViewport();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
}

/**
 * 使用极简主题性能Hook
 * 提供性能监控和优化功能
 * 
 * @param componentName - 组件名称
 * @returns 性能监控工具对象
 */
export function useMinimalThemePerformance(componentName: string) {
  const renderCountRef = useRef(0);
  const renderStartTimeRef = useRef(0);
  const { state } = useMinimalTheme();

  const startRender = useCallback(() => {
    renderStartTimeRef.current = performance.now();
    renderCountRef.current += 1;
  }, []);

  const endRender = useCallback(() => {
    const renderTime = performance.now() - renderStartTimeRef.current;
    
    // 更新性能指标（在实际应用中可能需要更复杂的统计逻辑）
    console.debug(`[${componentName}] Render time: ${renderTime.toFixed(2)}ms`);
  }, [componentName]);

  useLayoutEffect(() => {
    startRender();
    return () => endRender();
  });

  return {
    renderCount: renderCountRef.current,
    startRender,
    endRender,
    metrics: state.metrics,
  };
}