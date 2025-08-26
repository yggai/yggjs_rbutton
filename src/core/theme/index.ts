/**
 * 主题系统统一导出
 * 
 * 提供主题系统的所有核心功能
 * 包括注册机制、切换API和管理工具
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import type { DesignTokens } from '../types';

// 主题注册系统
export {
  themeRegistry,
  registerTheme,
  registerThemeAsync,
  getTheme,
  getActiveTheme,
  setActiveTheme,
  ThemeRegistrationError,
  type ThemeRegistrationOptions,
  type ThemeInfo,
  type ThemeRegistryEvent,
} from './registry';

// 主题管理系统
export {
  ThemeManagerProvider,
  useThemeManager,
  useCurrentTheme,
  useThemeSwitcher,
  useThemeState,
  type ThemeManagerConfig,
  type ThemeManagerState,
  type ThemeManagerActions,
  type ThemeManagerContextValue,
  type ThemeSwitchOptions,
} from './manager';

// 类型定义
export type {
  ThemeDefinition,
  ThemeVariant,
  ThemeRegistry,
  DesignTokens,
  ColorSystem,
  TypographySystem,
  SpacingSystem,
  AnimationSystem,
  ShadowSystem,
  BorderRadiusSystem,
} from '../types';

/**
 * 主题系统工具函数
 */
export const ThemeUtils = {
  /**
   * 创建主题实例
   * 
   * @param definition - 主题定义
   * @returns 主题实例
   */
  createTheme: (definition: Partial<import('../types').ThemeDefinition>): import('../types').ThemeDefinition => {
    const defaultDefinition: import('../types').ThemeDefinition = {
      id: definition.id || 'custom-theme',
      name: definition.name || 'Custom Theme',
      version: definition.version || '1.0.0',
      tokens: definition.tokens || {} as DesignTokens,
      variants: definition.variants || {},
      breakpoints: definition.breakpoints || {},
      features: definition.features || {},
      config: definition.config || {},
      ...definition,
    };
    
    return defaultDefinition;
  },
  
  /**
   * 验证主题定义
   * 
   * @param theme - 主题定义
   * @returns 验证结果
   */
  validateTheme: (theme: Partial<import('../types').ThemeDefinition>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!theme.id || typeof theme.id !== 'string') {
      errors.push('主题必须包含有效的id属性');
    }
    
    if (!theme.name || typeof theme.name !== 'string') {
      errors.push('主题必须包含有效的name属性');
    }
    
    if (!theme.version || typeof theme.version !== 'string') {
      errors.push('主题必须包含有效的version属性');
    }
    
    if (!theme.tokens || typeof theme.tokens !== 'object') {
      errors.push('主题必须包含tokens对象');
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  },
  
  /**
   * 合并主题
   * 
   * @param baseTheme - 基础主题
   * @param overrides - 覆盖配置
   * @returns 合并后的主题
   */
  mergeThemes: (
    baseTheme: import('../types').ThemeDefinition,
    overrides: Partial<import('../types').ThemeDefinition>
  ): import('../types').ThemeDefinition => {
    return {
      ...baseTheme,
      ...overrides,
      tokens: {
        ...baseTheme.tokens,
        ...overrides.tokens,
      },
      variants: {
        ...baseTheme.variants,
        ...overrides.variants,
      },
      breakpoints: {
        ...baseTheme.breakpoints,
        ...overrides.breakpoints,
      },
      features: {
        ...baseTheme.features,
        ...overrides.features,
      },
      config: {
        ...baseTheme.config,
        ...overrides.config,
      },
    };
  },
  
  /**
   * 获取主题令牌值
   * 
   * @param theme - 主题定义
   * @param tokenPath - 令牌路径（如：'colors.primary.500'）
   * @param variant - 变体名称（可选）
   * @returns 令牌值
   */
  getTokenValue: (
    theme: import('../types').ThemeDefinition,
    tokenPath: string,
    variant?: string
  ): unknown => {
    const pathSegments = tokenPath.split('.');
    const tokens = theme.tokens;
    
    // 如果指定了变体，尝试从变体中获取
    if (variant && theme.variants && theme.variants[variant]) {
      const variantTokens = theme.variants[variant];
      let currentVariantTokens = variantTokens;
      
      // 检查变体中是否有这个路径
      for (const segment of pathSegments) {
        if (currentVariantTokens && typeof currentVariantTokens === 'object' && segment in currentVariantTokens) {
          currentVariantTokens = currentVariantTokens[segment];
        } else {
          currentVariantTokens = null;
          break;
        }
      }
      
      // 如果变体中找到了值，返回它
      if (currentVariantTokens !== null) {
        return currentVariantTokens;
      }
    }
    
    // 从基础令牌中获取
    let current: unknown = tokens;
    for (const segment of pathSegments) {
      if (current && typeof current === 'object' && segment in current) {
        current = (current as Record<string, unknown>)[segment];
      } else {
        return undefined;
      }
    }
    
    return current;
  },
};

// 主题提取工具
export {
  DesignTokenExtractor,
  tokenExtractor,
  extractTokens,
  generateCSSVariables,
  generateJSONTokens,
  type TokenExtractionOptions,
  type ExtractionResult,
} from './extractor';