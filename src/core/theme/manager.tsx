/**
 * 主题切换API系统
 * 
 * 提供主题动态切换、变体管理和状态持久化功能
 * 支持平滑过渡动画和用户偏好保存
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { themeRegistry, type ThemeRegistryEvent } from './registry';
import type { ThemeDefinition } from '../types';
import { THEME_CONSTANTS } from '../../shared/constants';

/**
 * 主题切换器配置接口
 */
export interface ThemeManagerConfig {
  /**
   * 默认主题ID
   */
  defaultThemeId?: string;
  
  /**
   * 默认主题变体
   */
  defaultVariant?: string;
  
  /**
   * 是否启用持久化
   */
  enablePersistence?: boolean;
  
  /**
   * 存储键前缀
   */
  storageKeyPrefix?: string;
  
  /**
   * 是否启用过渡动画
   */
  enableTransitions?: boolean;
  
  /**
   * 过渡动画持续时间（毫秒）
   */
  transitionDuration?: number;
  
  /**
   * 是否自动检测系统主题偏好
   */
  detectSystemTheme?: boolean;
  
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
}

/**
 * 主题切换状态接口
 */
export interface ThemeManagerState {
  /**
   * 当前主题定义
   */
  currentTheme: ThemeDefinition | null;
  
  /**
   * 当前主题ID
   */
  currentThemeId: string | null;
  
  /**
   * 当前变体
   */
  currentVariant: string;
  
  /**
   * 所有可用主题
   */
  availableThemes: string[];
  
  /**
   * 所有可用变体
   */
  availableVariants: string[];
  
  /**
   * 是否正在切换主题
   */
  isSwitching: boolean;
  
  /**
   * 是否支持系统主题检测
   */
  supportsSystemTheme: boolean;
  
  /**
   * 当前系统主题偏好
   */
  systemThemePreference: 'light' | 'dark' | null;
}

/**
 * 主题切换操作接口
 */
export interface ThemeManagerActions {
  /**
   * 切换主题
   * 
   * @param themeId - 主题ID
   * @param variant - 变体（可选）
   * @param options - 切换选项
   */
  switchTheme: (
    themeId: string,
    variant?: string,
    options?: ThemeSwitchOptions
  ) => Promise<void>;
  
  /**
   * 切换变体
   * 
   * @param variant - 变体名称
   * @param options - 切换选项
   */
  switchVariant: (variant: string, options?: ThemeSwitchOptions) => Promise<void>;
  
  /**
   * 切换到下一个主题
   */
  nextTheme: () => Promise<void>;
  
  /**
   * 切换到上一个主题
   */
  previousTheme: () => Promise<void>;
  
  /**
   * 切换深色/浅色模式
   */
  toggleDarkMode: () => Promise<void>;
  
  /**
   * 重置到默认主题
   */
  resetToDefault: () => Promise<void>;
  
  /**
   * 刷新主题列表
   */
  refreshThemes: () => void;
  
  /**
   * 清除持久化存储
   */
  clearStorage: () => void;
}

/**
 * 主题切换选项接口
 */
export interface ThemeSwitchOptions {
  /**
   * 是否保存到存储
   */
  persist?: boolean;
  
  /**
   * 是否启用过渡动画
   */
  animated?: boolean;
  
  /**
   * 自定义过渡持续时间
   */
  duration?: number;
  
  /**
   * 切换完成回调
   */
  onComplete?: () => void;
  
  /**
   * 切换失败回调
   */
  onError?: (error: Error) => void;
}

/**
 * 主题管理器Context
 */
export interface ThemeManagerContextValue {
  state: ThemeManagerState;
  actions: ThemeManagerActions;
  config: ThemeManagerConfig;
}

/**
 * 主题管理器Context
 */
const ThemeManagerContext = createContext<ThemeManagerContextValue | null>(null);

/**
 * 主题管理器Hook
 * 
 * @returns 主题管理器上下文
 */
export const useThemeManager = (): ThemeManagerContextValue => {
  const context = useContext(ThemeManagerContext);
  if (!context) {
    throw new Error('useThemeManager 必须在 ThemeManagerProvider 内使用');
  }
  return context;
};

/**
 * 主题管理器Provider组件
 */
export const ThemeManagerProvider: React.FC<{
  children: React.ReactNode;
  config?: Partial<ThemeManagerConfig>;
}> = ({ children, config: userConfig = {} }) => {
  // 合并配置
  const config: ThemeManagerConfig = useMemo(() => ({
    defaultThemeId: THEME_CONSTANTS.DEFAULT_THEME_ID,
    defaultVariant: 'dark',
    enablePersistence: true,
    storageKeyPrefix: THEME_CONSTANTS.PERSISTENCE.STORAGE_KEY,
    enableTransitions: true,
    transitionDuration: 300,
    detectSystemTheme: true,
    debug: false,
    ...userConfig,
  }), [userConfig]);
  
  // 状态管理
  const [currentThemeId, setCurrentThemeId] = useState<string | null>(null);
  const [currentVariant, setCurrentVariant] = useState<string>(config.defaultVariant!);
  const [isSwitching, setIsSwitching] = useState(false);
  const [availableThemes, setAvailableThemes] = useState<string[]>([]);
  const [systemThemePreference, setSystemThemePreference] = useState<'light' | 'dark' | null>(null);
  
  // 计算当前主题
  const currentTheme = useMemo(() => {
    return currentThemeId ? themeRegistry.get(currentThemeId) : null;
  }, [currentThemeId]);
  
  // 计算可用变体
  const availableVariants = useMemo(() => {
    if (!currentTheme || !currentTheme.variants) return [];
    return Object.keys(currentTheme.variants);
  }, [currentTheme]);
  
  // 检测系统主题偏好
  const detectSystemPreference = useCallback(() => {
    if (!config.detectSystemTheme || typeof window === 'undefined') return null;
    
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // 忽略不支持的浏览器
    }
    
    return null;
  }, [config.detectSystemTheme]);
  
  // 从存储加载主题设置
  const loadFromStorage = useCallback((): { themeId: string | null; variant: string } => {
    if (!config.enablePersistence || typeof window === 'undefined') {
      return { themeId: null, variant: config.defaultVariant! };
    }
    
    try {
      const stored = localStorage.getItem(`${config.storageKeyPrefix}-theme`);
      const variantStored = localStorage.getItem(`${config.storageKeyPrefix}-variant`);
      
      return {
        themeId: stored || null,
        variant: variantStored || config.defaultVariant!,
      };
    } catch {
      return { themeId: null, variant: config.defaultVariant! };
    }
  }, [config.enablePersistence, config.storageKeyPrefix, config.defaultVariant]);
  
  // 保存到存储
  const saveToStorage = useCallback((themeId: string, variant: string) => {
    if (!config.enablePersistence || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(`${config.storageKeyPrefix}-theme`, themeId);
      localStorage.setItem(`${config.storageKeyPrefix}-variant`, variant);
    } catch (error) {
      if (config.debug) {
        console.warn('保存主题设置到存储失败:', error);
      }
    }
  }, [config.enablePersistence, config.storageKeyPrefix, config.debug]);
  
  // 应用主题到DOM
  const applyThemeToDOM = useCallback((theme: ThemeDefinition, variant: string) => {
    if (typeof document === 'undefined') return;
    
    // 设置data-theme属性
    document.documentElement.setAttribute('data-theme', `${theme.id}-${variant}`);
    
    // 注入CSS变量（如果主题支持）
    if (theme.config?.autoInjectCSSVariables) {
      // 这里可以注入CSS变量到:root
      // 具体实现取决于主题的令牌结构
    }
    
    if (config.debug) {
      console.info(`🎨 应用主题: ${theme.id}-${variant}`);
    }
  }, [config.debug]);
  
  // 切换主题实现
  const switchTheme = useCallback(async (
    themeId: string,
    variant: string = currentVariant,
    options: ThemeSwitchOptions = {}
  ): Promise<void> => {
    if (isSwitching) {
      if (config.debug) {
        console.warn('主题切换中，忽略新的切换请求');
      }
      return;
    }
    
    try {
      setIsSwitching(true);
      
      // 验证主题是否存在
      const theme = themeRegistry.get(themeId);
      if (!theme) {
        throw new Error(`主题 "${themeId}" 不存在`);
      }
      
      // 验证变体是否存在
      if (variant && theme.variants && !theme.variants[variant]) {
        throw new Error(`主题 "${themeId}" 不支持变体 "${variant}"`);
      }
      
      // 设置过渡动画
      if (options.animated ?? config.enableTransitions) {
        const duration = options.duration ?? config.transitionDuration!;
        if (typeof document !== 'undefined') {
          document.documentElement.style.setProperty(
            '--theme-transition-duration',
            `${duration}ms`
          );
        }
      }
      
      // 应用主题
      applyThemeToDOM(theme, variant);
      setCurrentThemeId(themeId);
      setCurrentVariant(variant);
      
      // 保存到存储
      if (options.persist ?? config.enablePersistence) {
        saveToStorage(themeId, variant);
      }
      
      // 等待过渡完成
      if (options.animated ?? config.enableTransitions) {
        const duration = options.duration ?? config.transitionDuration!;
        await new Promise(resolve => setTimeout(resolve, duration));
      }
      
      options.onComplete?.();
      
      if (config.debug) {
        console.info(`✅ 主题切换完成: ${themeId}-${variant}`);
      }
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      options.onError?.(errorObj);
      
      if (config.debug) {
        console.error('❌ 主题切换失败:', errorObj);
      }
      
      throw errorObj;
    } finally {
      setIsSwitching(false);
    }
  }, [
    currentVariant,
    isSwitching,
    config.debug,
    config.enableTransitions,
    config.transitionDuration,
    config.enablePersistence,
    applyThemeToDOM,
    saveToStorage,
  ]);
  
  // 切换变体
  const switchVariant = useCallback(async (
    variant: string,
    options: ThemeSwitchOptions = {}
  ): Promise<void> => {
    if (!currentThemeId) {
      throw new Error('没有活跃的主题');
    }
    
    await switchTheme(currentThemeId, variant, options);
  }, [currentThemeId, switchTheme]);
  
  // 切换到下一个主题
  const nextTheme = useCallback(async (): Promise<void> => {
    if (availableThemes.length === 0) return;
    
    const currentIndex = availableThemes.indexOf(currentThemeId || '');
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    const nextThemeId = availableThemes[nextIndex];
    
    await switchTheme(nextThemeId);
  }, [availableThemes, currentThemeId, switchTheme]);
  
  // 切换到上一个主题
  const previousTheme = useCallback(async (): Promise<void> => {
    if (availableThemes.length === 0) return;
    
    const currentIndex = availableThemes.indexOf(currentThemeId || '');
    const prevIndex = (currentIndex - 1 + availableThemes.length) % availableThemes.length;
    const prevThemeId = availableThemes[prevIndex];
    
    await switchTheme(prevThemeId);
  }, [availableThemes, currentThemeId, switchTheme]);
  
  // 切换深色/浅色模式
  const toggleDarkMode = useCallback(async (): Promise<void> => {
    if (!currentTheme) return;
    
    const targetVariant = currentVariant === 'dark' ? 'light' : 'dark';
    
    // 检查目标变体是否存在
    if (currentTheme.variants && !currentTheme.variants[targetVariant]) {
      if (config.debug) {
        console.warn(`主题 "${currentThemeId}" 不支持 "${targetVariant}" 变体`);
      }
      return;
    }
    
    await switchVariant(targetVariant);
  }, [currentTheme, currentThemeId, currentVariant, switchVariant, config.debug]);
  
  // 重置到默认主题
  const resetToDefault = useCallback(async (): Promise<void> => {
    await switchTheme(config.defaultThemeId!, config.defaultVariant!);
  }, [config.defaultThemeId, config.defaultVariant, switchTheme]);
  
  // 刷新主题列表
  const refreshThemes = useCallback(() => {
    setAvailableThemes(themeRegistry.getAll());
  }, []);
  
  // 清除存储
  const clearStorage = useCallback(() => {
    if (!config.enablePersistence || typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(`${config.storageKeyPrefix}-theme`);
      localStorage.removeItem(`${config.storageKeyPrefix}-variant`);
      
      if (config.debug) {
        console.info('🧹 主题存储已清除');
      }
    } catch (error) {
      if (config.debug) {
        console.warn('清除主题存储失败:', error);
      }
    }
  }, [config.enablePersistence, config.storageKeyPrefix, config.debug]);
  
  // 初始化
  useEffect(() => {
    // 检测系统偏好
    const systemPreference = detectSystemPreference();
    setSystemThemePreference(systemPreference);
    
    // 刷新主题列表
    refreshThemes();
    
    // 从存储加载或使用默认值
    const { themeId: storedThemeId, variant: storedVariant } = loadFromStorage();
    const initialThemeId = storedThemeId || config.defaultThemeId!;
    const initialVariant = storedVariant;
    
    // 如果启用了系统主题检测且没有存储的设置，使用系统偏好
    const finalVariant = (!storedThemeId && systemPreference) ? systemPreference : initialVariant;
    
    // 设置初始主题
    if (themeRegistry.has(initialThemeId)) {
      switchTheme(initialThemeId, finalVariant, { persist: false });
    }
  }, [
    config.defaultThemeId,
    config.defaultVariant,
    detectSystemPreference,
    refreshThemes,
    loadFromStorage,
    switchTheme,
  ]);
  
  // 监听主题注册表变化
  useEffect(() => {
    const handleRegistryEvent = (event: ThemeRegistryEvent) => {
      if (event.type === 'theme-registered' || event.type === 'theme-unregistered') {
        refreshThemes();
      }
    };
    
    themeRegistry.addEventListener(handleRegistryEvent);
    
    return () => {
      themeRegistry.removeEventListener(handleRegistryEvent);
    };
  }, [refreshThemes]);
  
  // 监听系统主题变化
  useEffect(() => {
    if (!config.detectSystemTheme || typeof window === 'undefined') return;
    
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    const handleChange = () => {
      const newPreference = detectSystemPreference();
      setSystemThemePreference(newPreference);
      
      // 如果没有用户自定义设置，跟随系统变化
      const { themeId: storedThemeId } = loadFromStorage();
      if (!storedThemeId && newPreference && currentTheme?.variants?.[newPreference]) {
        switchVariant(newPreference, { persist: false });
      }
    };
    
    darkModeQuery.addEventListener('change', handleChange);
    lightModeQuery.addEventListener('change', handleChange);
    
    return () => {
      darkModeQuery.removeEventListener('change', handleChange);
      lightModeQuery.removeEventListener('change', handleChange);
    };
  }, [
    config.detectSystemTheme,
    detectSystemPreference,
    loadFromStorage,
    currentTheme,
    switchVariant,
  ]);
  
  // 构建Context值
  const contextValue: ThemeManagerContextValue = useMemo(() => ({
    state: {
      currentTheme,
      currentThemeId,
      currentVariant,
      availableThemes,
      availableVariants,
      isSwitching,
      supportsSystemTheme: config.detectSystemTheme!,
      systemThemePreference,
    },
    actions: {
      switchTheme,
      switchVariant,
      nextTheme,
      previousTheme,
      toggleDarkMode,
      resetToDefault,
      refreshThemes,
      clearStorage,
    },
    config,
  }), [
    currentTheme,
    currentThemeId,
    currentVariant,
    availableThemes,
    availableVariants,
    isSwitching,
    config,
    systemThemePreference,
    switchTheme,
    switchVariant,
    nextTheme,
    previousTheme,
    toggleDarkMode,
    resetToDefault,
    refreshThemes,
    clearStorage,
  ]);
  
  return (
    <ThemeManagerContext.Provider value={contextValue}>
      {children}
    </ThemeManagerContext.Provider>
  );
};

/**
 * 便捷Hook：获取当前主题
 */
export const useCurrentTheme = () => {
  const { state } = useThemeManager();
  return state.currentTheme;
};

/**
 * 便捷Hook：主题切换操作
 */
export const useThemeSwitcher = () => {
  const { actions } = useThemeManager();
  return actions;
};

/**
 * 便捷Hook：主题状态
 */
export const useThemeState = () => {
  const { state } = useThemeManager();
  return state;
};