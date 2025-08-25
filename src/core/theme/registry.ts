/**
 * 主题注册系统
 * 
 * 提供主题的注册、管理和访问功能
 * 支持动态主题加载和热更新
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import type { ThemeDefinition, ThemeVariant, ThemeRegistry } from '../../core/types';
import { THEME_CONSTANTS, ERROR_CODES } from '../../shared/constants';

/**
 * 主题注册错误类
 */
export class ThemeRegistrationError extends Error {
  constructor(
    message: string,
    public code: string,
    public themeId?: string
  ) {
    super(message);
    this.name = 'ThemeRegistrationError';
  }
}

/**
 * 主题注册表实现
 * 
 * 特点：
 * - 类型安全的主题管理
 * - 支持主题版本控制
 * - 提供主题验证功能
 * - 支持主题依赖管理
 * - 热更新和缓存支持
 */
class ThemeRegistryImpl implements ThemeRegistry {
  /**
   * 已注册的主题Map
   */
  private themes = new Map<string, ThemeDefinition>();
  
  /**
   * 主题依赖关系Map
   */
  private dependencies = new Map<string, Set<string>>();
  
  /**
   * 主题加载状态Map
   */
  private loadingStates = new Map<string, Promise<ThemeDefinition>>();
  
  /**
   * 主题变更监听器
   */
  private listeners = new Set<(event: ThemeRegistryEvent) => void>();
  
  /**
   * 当前活跃主题ID
   */
  private activeThemeId: string | null = null;
  
  /**
   * 注册主题
   * 
   * @param theme - 主题定义
   * @param options - 注册选项
   */
  public register(
    theme: ThemeDefinition,
    options: ThemeRegistrationOptions = {}
  ): void {
    try {
      // 验证主题定义
      this.validateTheme(theme);
      
      // 检查主题是否已存在
      if (this.themes.has(theme.id) && !options.overwrite) {
        throw new ThemeRegistrationError(
          `主题 "${theme.id}" 已存在，使用 overwrite: true 选项来覆盖`,
          ERROR_CODES.THEME_INVALID,
          theme.id
        );
      }
      
      // 处理依赖关系
      if (options.dependencies) {
        this.validateDependencies(theme.id, options.dependencies);
        this.dependencies.set(theme.id, new Set(options.dependencies));
      }
      
      // 注册主题
      this.themes.set(theme.id, { ...theme });
      
      // 触发注册事件
      this.emitEvent({
        type: 'theme-registered',
        themeId: theme.id,
        theme,
        timestamp: Date.now(),
      });
      
      // 如果是第一个主题或指定为默认主题，设置为活跃主题
      if (!this.activeThemeId || options.setAsDefault) {
        this.setActiveTheme(theme.id);
      }
      
      console.info(`✅ 主题 "${theme.id}" 注册成功`);
    } catch (error) {
      console.error(`❌ 主题 "${theme.id}" 注册失败:`, error);
      throw error;
    }
  }
  
  /**
   * 异步注册主题
   * 
   * @param themeLoader - 主题加载函数
   * @param options - 注册选项
   */
  public async registerAsync(
    themeLoader: () => Promise<ThemeDefinition>,
    options: ThemeRegistrationOptions = {}
  ): Promise<void> {
    const loadingKey = options.id || 'async-theme';
    
    // 避免重复加载
    if (this.loadingStates.has(loadingKey)) {
      await this.loadingStates.get(loadingKey);
      return;
    }
    
    // 创建加载Promise
    const loadingPromise = themeLoader()
      .then((theme) => {
        this.register(theme, options);
        return theme;
      })
      .catch((error) => {
        throw new ThemeRegistrationError(
          `异步加载主题失败: ${error.message}`,
          ERROR_CODES.THEME_LOAD_FAILED
        );
      })
      .finally(() => {
        this.loadingStates.delete(loadingKey);
      });
    
    this.loadingStates.set(loadingKey, loadingPromise);
    await loadingPromise;
  }
  
  /**
   * 注销主题
   * 
   * @param themeId - 主题ID
   */
  public unregister(themeId: string): boolean {
    if (!this.themes.has(themeId)) {
      return false;
    }
    
    // 检查依赖关系
    const dependentThemes = this.getDependentThemes(themeId);
    if (dependentThemes.length > 0) {
      throw new ThemeRegistrationError(
        `无法注销主题 "${themeId}"，以下主题依赖于它: ${dependentThemes.join(', ')}`,
        ERROR_CODES.THEME_INVALID,
        themeId
      );
    }
    
    // 删除主题
    this.themes.delete(themeId);
    this.dependencies.delete(themeId);
    
    // 如果是当前活跃主题，切换到默认主题
    if (this.activeThemeId === themeId) {
      const defaultThemeId = THEME_CONSTANTS.DEFAULT_THEME_ID;
      if (this.themes.has(defaultThemeId)) {
        this.setActiveTheme(defaultThemeId);
      } else {
        // 选择第一个可用主题
        const firstTheme = this.themes.keys().next().value;
        if (firstTheme) {
          this.setActiveTheme(firstTheme);
        } else {
          this.activeThemeId = null;
        }
      }
    }
    
    // 触发注销事件
    this.emitEvent({
      type: 'theme-unregistered',
      themeId,
      timestamp: Date.now(),
    });
    
    console.info(`🗑️ 主题 "${themeId}" 已注销`);
    return true;
  }
  
  /**
   * 获取主题
   * 
   * @param themeId - 主题ID
   * @returns 主题定义
   */
  public get(themeId: string): ThemeDefinition | null {
    return this.themes.get(themeId) || null;
  }
  
  /**
   * 获取所有已注册的主题
   * 
   * @returns 主题ID数组
   */
  public getAll(): string[] {
    return Array.from(this.themes.keys());
  }
  
  /**
   * 检查主题是否已注册
   * 
   * @param themeId - 主题ID
   * @returns 是否已注册
   */
  public has(themeId: string): boolean {
    return this.themes.has(themeId);
  }
  
  /**
   * 获取主题信息
   * 
   * @param themeId - 主题ID
   * @returns 主题信息
   */
  public getThemeInfo(themeId: string): ThemeInfo | null {
    const theme = this.themes.get(themeId);
    if (!theme) return null;
    
    return {
      id: theme.id,
      name: theme.name,
      description: theme.description,
      version: theme.version,
      author: theme.author,
      features: theme.features,
      dependencies: Array.from(this.dependencies.get(themeId) || []),
      isActive: this.activeThemeId === themeId,
    };
  }
  
  /**
   * 获取所有主题信息
   * 
   * @returns 主题信息数组
   */
  public getAllThemeInfo(): ThemeInfo[] {
    return this.getAll()
      .map(themeId => this.getThemeInfo(themeId))
      .filter(Boolean) as ThemeInfo[];
  }
  
  /**
   * 设置活跃主题
   * 
   * @param themeId - 主题ID
   */
  public setActiveTheme(themeId: string): void {
    if (!this.themes.has(themeId)) {
      throw new ThemeRegistrationError(
        `主题 "${themeId}" 未注册`,
        ERROR_CODES.THEME_NOT_FOUND,
        themeId
      );
    }
    
    const previousThemeId = this.activeThemeId;
    this.activeThemeId = themeId;
    
    // 触发主题切换事件
    this.emitEvent({
      type: 'theme-changed',
      themeId,
      previousThemeId,
      theme: this.themes.get(themeId)!,
      timestamp: Date.now(),
    });
    
    console.info(`🎨 切换到主题: "${themeId}"`);
  }
  
  /**
   * 获取当前活跃主题
   * 
   * @returns 活跃主题定义
   */
  public getActiveTheme(): ThemeDefinition | null {
    return this.activeThemeId ? this.themes.get(this.activeThemeId) || null : null;
  }
  
  /**
   * 获取当前活跃主题ID
   * 
   * @returns 活跃主题ID
   */
  public getActiveThemeId(): string | null {
    return this.activeThemeId;
  }
  
  /**
   * 添加事件监听器
   * 
   * @param listener - 监听器函数
   */
  public addEventListener(listener: (event: ThemeRegistryEvent) => void): void {
    this.listeners.add(listener);
  }
  
  /**
   * 移除事件监听器
   * 
   * @param listener - 监听器函数
   */
  public removeEventListener(listener: (event: ThemeRegistryEvent) => void): void {
    this.listeners.delete(listener);
  }
  
  /**
   * 清除所有主题
   */
  public clear(): void {
    const themeIds = Array.from(this.themes.keys());
    
    this.themes.clear();
    this.dependencies.clear();
    this.loadingStates.clear();
    this.activeThemeId = null;
    
    // 触发清除事件
    this.emitEvent({
      type: 'registry-cleared',
      clearedThemes: themeIds,
      timestamp: Date.now(),
    });
    
    console.info('🧹 主题注册表已清空');
  }
  
  /**
   * 验证主题定义
   * 
   * @param theme - 主题定义
   */
  private validateTheme(theme: ThemeDefinition): void {
    // 基本属性验证
    if (!theme.id || typeof theme.id !== 'string') {
      throw new ThemeRegistrationError(
        '主题必须包含有效的id属性',
        ERROR_CODES.THEME_INVALID
      );
    }
    
    if (!theme.name || typeof theme.name !== 'string') {
      throw new ThemeRegistrationError(
        '主题必须包含有效的name属性',
        ERROR_CODES.THEME_INVALID,
        theme.id
      );
    }
    
    if (!theme.version || typeof theme.version !== 'string') {
      throw new ThemeRegistrationError(
        '主题必须包含有效的version属性',
        ERROR_CODES.THEME_INVALID,
        theme.id
      );
    }
    
    // 令牌验证
    if (!theme.tokens || typeof theme.tokens !== 'object') {
      throw new ThemeRegistrationError(
        '主题必须包含tokens对象',
        ERROR_CODES.THEME_INVALID,
        theme.id
      );
    }
    
    // 必需的令牌类型验证
    const requiredTokens = ['colors', 'typography', 'spacing'];
    for (const tokenType of requiredTokens) {
      if (!theme.tokens[tokenType]) {
        throw new ThemeRegistrationError(
          `主题必须包含${tokenType}令牌`,
          ERROR_CODES.THEME_INVALID,
          theme.id
        );
      }
    }
  }
  
  /**
   * 验证主题依赖
   * 
   * @param themeId - 主题ID
   * @param dependencies - 依赖列表
   */
  private validateDependencies(themeId: string, dependencies: string[]): void {
    // 检查循环依赖
    for (const depId of dependencies) {
      if (this.hasCircularDependency(themeId, depId)) {
        throw new ThemeRegistrationError(
          `检测到循环依赖: ${themeId} <-> ${depId}`,
          ERROR_CODES.THEME_INVALID,
          themeId
        );
      }
    }
    
    // 检查依赖是否存在
    for (const depId of dependencies) {
      if (!this.themes.has(depId)) {
        throw new ThemeRegistrationError(
          `依赖的主题 "${depId}" 未注册`,
          ERROR_CODES.THEME_NOT_FOUND,
          themeId
        );
      }
    }
  }
  
  /**
   * 检查循环依赖
   * 
   * @param themeId - 主题ID
   * @param targetId - 目标ID
   * @param visited - 已访问的节点
   * @returns 是否存在循环依赖
   */
  private hasCircularDependency(
    themeId: string,
    targetId: string,
    visited = new Set<string>()
  ): boolean {
    if (visited.has(themeId)) {
      return true;
    }
    
    visited.add(themeId);
    
    const deps = this.dependencies.get(targetId);
    if (deps) {
      for (const depId of deps) {
        if (depId === themeId || this.hasCircularDependency(themeId, depId, visited)) {
          return true;
        }
      }
    }
    
    visited.delete(themeId);
    return false;
  }
  
  /**
   * 获取依赖当前主题的主题列表
   * 
   * @param themeId - 主题ID
   * @returns 依赖主题列表
   */
  private getDependentThemes(themeId: string): string[] {
    const dependents: string[] = [];
    
    for (const [id, deps] of this.dependencies.entries()) {
      if (deps.has(themeId)) {
        dependents.push(id);
      }
    }
    
    return dependents;
  }
  
  /**
   * 触发事件
   * 
   * @param event - 事件对象
   */
  private emitEvent(event: ThemeRegistryEvent): void {
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('主题注册表事件监听器错误:', error);
      }
    });
  }
}

/**
 * 主题注册选项接口
 */
export interface ThemeRegistrationOptions {
  /**
   * 主题ID（用于异步注册）
   */
  id?: string;
  
  /**
   * 是否覆盖已存在的主题
   */
  overwrite?: boolean;
  
  /**
   * 是否设置为默认主题
   */
  setAsDefault?: boolean;
  
  /**
   * 主题依赖列表
   */
  dependencies?: string[];
}

/**
 * 主题信息接口
 */
export interface ThemeInfo {
  id: string;
  name: string;
  description?: string;
  version: string;
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  features?: Record<string, boolean>;
  dependencies: string[];
  isActive: boolean;
}

/**
 * 主题注册表事件接口
 */
export interface ThemeRegistryEvent {
  type: 'theme-registered' | 'theme-unregistered' | 'theme-changed' | 'registry-cleared';
  themeId?: string;
  previousThemeId?: string | null;
  theme?: ThemeDefinition;
  clearedThemes?: string[];
  timestamp: number;
}

/**
 * 主题注册表单例实例
 */
export const themeRegistry = new ThemeRegistryImpl();

/**
 * 便捷的主题注册函数
 * 
 * @param theme - 主题定义
 * @param options - 注册选项
 */
export const registerTheme = (
  theme: ThemeDefinition,
  options?: ThemeRegistrationOptions
): void => {
  themeRegistry.register(theme, options);
};

/**
 * 便捷的异步主题注册函数
 * 
 * @param themeLoader - 主题加载函数
 * @param options - 注册选项
 */
export const registerThemeAsync = (
  themeLoader: () => Promise<ThemeDefinition>,
  options?: ThemeRegistrationOptions
): Promise<void> => {
  return themeRegistry.registerAsync(themeLoader, options);
};

/**
 * 便捷的主题获取函数
 * 
 * @param themeId - 主题ID
 * @returns 主题定义
 */
export const getTheme = (themeId: string): ThemeDefinition | null => {
  return themeRegistry.get(themeId);
};

/**
 * 便捷的活跃主题获取函数
 * 
 * @returns 当前活跃主题
 */
export const getActiveTheme = (): ThemeDefinition | null => {
  return themeRegistry.getActiveTheme();
};

/**
 * 便捷的主题切换函数
 * 
 * @param themeId - 主题ID
 */
export const setActiveTheme = (themeId: string): void => {
  themeRegistry.setActiveTheme(themeId);
};