/**
 * useTheme Hook
 * 
 * 提供主题系统的核心功能
 * 包括主题切换、主题上下文管理、样式计算等
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import type { 
  ThemeDefinition, 
  UseThemeReturn,
  DesignTokens,
  ThemeUtilities,
} from '../types';
import { themeRegistry } from '../theme/registry';
import { useThemeManager } from '../theme/manager';
import { generateThemeStyles, generateButtonThemeStyles } from '../utils/theme-style-generator';
import { defaultStyleCache, StyleCacheUtils } from '../utils';
import { THEME_CONSTANTS } from '../../shared/constants';

/**
 * 主题上下文类型定义
 * 
 * 定义主题上下文中传递的数据结构
 */
interface ThemeContextType {
  /**
   * 当前活动主题
   */
  theme: ThemeDefinition | null;
  
  /**
   * 当前主题的设计令牌
   */
  tokens: DesignTokens;
  
  /**
   * 主题工具函数
   */
  utils: ThemeUtilities;
  
  /**
   * 设置主题的函数
   */
  setTheme: (themeId: string) => Promise<void>;
  
  /**
   * 获取可用主题列表
   */
  getAvailableThemes: () => ThemeDefinition[];
  
  /**
   * 主题状态
   */
  state: {
    isLoading: boolean;
    error: Error | null;
  };
}

/**
 * 主题上下文
 * 
 * 用于在组件树中传递主题相关的数据和函数
 */
export const ThemeContext = React.createContext<ThemeContextType | null>(null);

/**
 * useTheme Hook实现（新架构版本）
 * 
 * 基于新的主题管理系统提供主题访问功能
 * 支持主题切换、令牌访问、样式生成等核心功能
 * 
 * @returns 主题相关的数据和操作函数
 */
export function useTheme(): UseThemeReturn {
  const { state, actions } = useThemeManager();
  const { currentTheme, currentVariant } = state;
  
  if (!currentTheme) {
    throw new Error('No theme is currently active. Make sure ThemeManagerProvider is properly configured.');
  }

  // 缓存主题令牌，避免重复计算
  const tokens = useMemo(() => {
    const cacheKey = StyleCacheUtils.generateCacheKey('theme-tokens', {
      themeId: currentTheme.id,
      variant: currentVariant,
      version: currentTheme.version,
    });

    let cachedTokens = defaultStyleCache.get(cacheKey) as DesignTokens;
    if (!cachedTokens) {
      // 合并基础令牌和变体令牌
      const mergedTokens: DesignTokens = { ...currentTheme.tokens };
      
      if (currentVariant && currentTheme.variants?.[currentVariant]) {
        const variant = currentTheme.variants[currentVariant];
        // 深度合并变体令牌
        Object.entries(variant).forEach(([category, variantTokens]) => {
          if (variantTokens && mergedTokens[category as keyof DesignTokens]) {
            (mergedTokens as any)[category] = { 
              ...(mergedTokens as any)[category], 
              ...(variantTokens as any) 
            };
          }
        });
      }
      
      cachedTokens = mergedTokens;
      defaultStyleCache.set(cacheKey, cachedTokens);
    }

    return cachedTokens;
  }, [currentTheme, currentVariant]);

  // 主题工具函数
  const utils = useMemo(() => ({
    /**
     * 获取令牌值
     */
    getToken: (path: string) => {
      const pathSegments = path.split('.');
      let current = tokens;
      for (const segment of pathSegments) {
        if (current && typeof current === 'object' && segment in current) {
          current = current[segment];
        } else {
          return undefined;
        }
      }
      return current;
    },

    /**
     * 生成样式
     */
    generateStyles: <T = Record<string, any>>(
      computeFunction: (context: { theme: ThemeDefinition; tokens: any; props: T }) => React.CSSProperties,
      props: T
    ): React.CSSProperties => {
      return generateThemeStyles(
        (context) => computeFunction({
          theme: context.theme,
          tokens: context.theme.tokens,
          props: context.props,
        }),
        {
          theme: currentTheme,
          variant: currentVariant,
          props,
        }
      );
    },

    /**
     * 生成按钮样式
     */
    generateButtonStyles: (props: {
      size?: 'sm' | 'md' | 'lg';
      variant?: 'primary' | 'secondary' | 'danger' | 'success';
      fill?: 'solid' | 'outline' | 'ghost' | 'link';
      shape?: 'default' | 'rounded' | 'circle' | 'square';
      disabled?: boolean;
      loading?: boolean;
      glow?: boolean;
      fullWidth?: boolean;
    }): React.CSSProperties => {
      return generateButtonThemeStyles({
        theme: currentTheme,
        variant: currentVariant,
        props,
      });
    },

    /**
     * 获取响应式值
     */
    getResponsiveValue: <T>(values: {
      mobile?: T;
      tablet?: T;
      desktop?: T;
      wide?: T;
      default: T;
    }): T => {
      // 简化版本，实际应该基于当前断点
      return values.default;
    },

    /**
     * 获取颜色值
     */
    getColor: (colorPath: string, alpha?: number): string => {
      const color = utils.getToken(`colors.${colorPath}`);
      if (!color || typeof color !== 'string') return '';
      
      if (alpha !== undefined && alpha < 1) {
        // 简单的透明度处理
        if (color.startsWith('#')) {
          const hex = color.slice(1);
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
      }
      
      return color;
    },

    /**
     * 获取间距值
     */
    getSpacing: (spacingKey: string | number): string => {
      const spacing = utils.getToken(`spacing.${spacingKey}`);
      return spacing || '0';
    },
  }), [tokens, currentTheme, currentVariant]);

  // 获取可用主题列表
  const getAvailableThemes = useCallback(() => {
    return state.availableThemes.map(themeId => {
      const theme = themeRegistry.get(themeId);
      return theme ? {
        id: theme.id,
        name: theme.name,
        description: theme.description,
        version: theme.version,
        author: theme.author,
      } : null;
    }).filter(Boolean);
  }, [state.availableThemes]);

  // 主题切换函数
  const setTheme = useCallback((themeId: string, variant?: string) => {
    actions.switchTheme(themeId, variant);
  }, [actions]);

  // 状态对象
  const themeState = useMemo(() => ({
    isLoading: state.isSwitching,
    error: null, // 可以根据需要扩展错误处理
  }), [state.isSwitching]);

  return {
    theme: currentTheme,
    tokens,
    utils,
    setTheme,
    getAvailableThemes,
    state: themeState,
  };
}

/**
 * useThemeTokens Hook
 * 
 * 专门用于访问主题令牌的轻量级Hook
 * 当只需要访问设计令牌时使用，性能更好
 * 
 * @returns 当前主题的设计令牌
 */
export function useThemeTokens() {
  const { tokens } = useTheme();
  return tokens;
}

/**
 * useThemeUtils Hook
 * 
 * 专门用于访问主题工具函数的Hook
 * 提供样式计算、颜色处理等工具函数
 * 
 * @returns 当前主题的工具函数
 */
export function useThemeUtils() {
  const { utils } = useTheme();
  return utils;
}

/**
 * useThemeValue Hook
 * 
 * 用于获取主题中的特定值
 * 支持深度路径访问和默认值
 * 
 * @param path - 属性路径（如 'colors.primary.500'）
 * @param defaultValue - 默认值
 * @returns 主题值
 */
export function useThemeValue<T = any>(path: string, defaultValue?: T): T {
  const { tokens } = useTheme();
  
  return useMemo(() => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], tokens as any);
    return value !== undefined ? value : defaultValue;
  }, [tokens, path, defaultValue]);
}

/**
 * useResponsiveValue Hook
 * 
 * 根据断点返回响应式值
 * 支持移动端、平板、桌面等不同断点
 * 
 * @param values - 响应式值对象
 * @returns 当前断点对应的值
 */
export function useResponsiveValue<T>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
  default: T;
}): T {
  const { utils } = useTheme();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('desktop');

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setCurrentBreakpoint('mobile');
      } else if (width < 1024) {
        setCurrentBreakpoint('tablet');
      } else if (width < 1440) {
        setCurrentBreakpoint('desktop');
      } else {
        setCurrentBreakpoint('wide');
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return useMemo(() => {
    switch (currentBreakpoint) {
      case 'mobile':
        return values.mobile ?? values.default;
      case 'tablet':
        return values.tablet ?? values.mobile ?? values.default;
      case 'desktop':
        return values.desktop ?? values.tablet ?? values.mobile ?? values.default;
      case 'wide':
        return values.wide ?? values.desktop ?? values.tablet ?? values.mobile ?? values.default;
      default:
        return values.default;
    }
  }, [values, currentBreakpoint]);
}

/**
 * useColorScheme Hook
 * 
 * 检测和响应系统颜色方案变化
 * 支持亮色和暗色主题自动切换
 * 
 * @returns 当前颜色方案和切换函数
 */
export function useColorScheme(): {
  colorScheme: 'light' | 'dark';
  systemColorScheme: 'light' | 'dark';
  setColorScheme: (scheme: 'light' | 'dark' | 'system') => void;
} {
  const [userPreference, setUserPreference] = useState<'light' | 'dark' | 'system'>('system');
  const [systemColorScheme, setSystemColorScheme] = useState<'light' | 'dark'>('light');

  // 监听系统颜色方案变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemColorScheme(e.matches ? 'dark' : 'light');
    };

    setSystemColorScheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 从localStorage恢复用户偏好
  useEffect(() => {
    const stored = localStorage.getItem('color-scheme-preference');
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setUserPreference(stored as 'light' | 'dark' | 'system');
    }
  }, []);

  // 计算当前颜色方案
  const colorScheme = useMemo(() => {
    if (userPreference === 'system') {
      return systemColorScheme;
    }
    return userPreference;
  }, [userPreference, systemColorScheme]);

  // 设置颜色方案偏好
  const setColorScheme = useCallback((scheme: 'light' | 'dark' | 'system') => {
    setUserPreference(scheme);
    localStorage.setItem('color-scheme-preference', scheme);
    
    // 触发颜色方案变化事件
    const event = new CustomEvent('colorSchemeChange', {
      detail: { scheme, systemScheme: systemColorScheme },
    });
    window.dispatchEvent(event);
  }, [systemColorScheme]);

  return {
    colorScheme,
    systemColorScheme,
    setColorScheme,
  };
}

/**
 * useThemeTransition Hook
 * 
 * 处理主题切换时的过渡动画
 * 提供平滑的主题切换体验
 * 
 * @param duration - 过渡持续时间（毫秒）
 * @returns 过渡状态和控制函数
 */
export function useThemeTransition(duration: number = 300): {
  isTransitioning: boolean;
  startTransition: () => Promise<void>;
} {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback(async () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // 添加过渡CSS
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color ${duration}ms ease, 
                   color ${duration}ms ease,
                   border-color ${duration}ms ease,
                   box-shadow ${duration}ms ease !important;
      }
    `;
    document.head.appendChild(style);

    // 等待过渡完成
    await new Promise(resolve => setTimeout(resolve, duration));

    // 清理过渡CSS
    document.head.removeChild(style);
    setIsTransitioning(false);
  }, [duration, isTransitioning]);

  return {
    isTransitioning,
    startTransition,
  };
}

/**
 * useMediaQuery Hook
 * 
 * 监听媒体查询变化
 * 用于实现响应式逻辑
 * 
 * @param query - 媒体查询字符串
 * @returns 是否匹配查询条件
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

/**
 * useThemePreference Hook
 * 
 * 管理用户的主题偏好设置
 * 支持持久化存储和偏好同步
 * 
 * @returns 主题偏好管理功能
 */
export function useThemePreference(): {
  preferences: {
    theme: string;
    colorScheme: 'light' | 'dark' | 'system';
    reducedMotion: boolean;
    highContrast: boolean;
  };
  updatePreference: <K extends keyof typeof preferences>(
    key: K, 
    value: typeof preferences[K]
  ) => void;
  resetPreferences: () => void;
} {
  const [preferences, setPreferences] = useState({
    theme: THEME_CONSTANTS.DEFAULT_THEME_ID,
    colorScheme: 'system' as 'light' | 'dark' | 'system',
    reducedMotion: false,
    highContrast: false,
  });

  // 从localStorage加载偏好
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme-preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.warn('Failed to load theme preferences:', error);
    }
  }, []);

  // 更新偏好设置
  const updatePreference = useCallback(<K extends keyof typeof preferences>(
    key: K, 
    value: typeof preferences[K]
  ) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, [key]: value };
      
      // 保存到localStorage
      try {
        localStorage.setItem('theme-preferences', JSON.stringify(newPreferences));
      } catch (error) {
        console.warn('Failed to save theme preferences:', error);
      }
      
      return newPreferences;
    });
  }, []);

  // 重置偏好设置
  const resetPreferences = useCallback(() => {
    const defaultPreferences = {
      theme: THEME_CONSTANTS.DEFAULT_THEME_ID,
      colorScheme: 'system' as const,
      reducedMotion: false,
      highContrast: false,
    };
    
    setPreferences(defaultPreferences);
    
    try {
      localStorage.removeItem('theme-preferences');
    } catch (error) {
      console.warn('Failed to clear theme preferences:', error);
    }
  }, []);

  return {
    preferences,
    updatePreference,
    resetPreferences,
  };
}