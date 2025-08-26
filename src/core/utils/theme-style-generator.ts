/**
 * 主题感知的样式生成器
 * 
 * 基于主题系统生成组件样式
 * 支持主题变体、响应式设计、样式缓存等高级特性
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import React from 'react';
import type { 
  ThemeDefinition
} from '../types';
import { StyleCacheImpl, StyleCacheUtils, type CacheStats } from './style-cache';

/**
 * 样式生成选项接口
 */
export interface StyleGeneratorOptions {
  /**
   * 是否启用样式缓存
   */
  enableCache?: boolean;
  
  /**
   * 缓存键前缀
   */
  cachePrefix?: string;
  
  /**
   * 是否启用响应式样式
   */
  enableResponsive?: boolean;
  
  /**
   * 是否启用变体样式
   */
  enableVariants?: boolean;
  
  /**
   * 自定义样式转换器
   */
  styleTransformer?: (styles: React.CSSProperties) => React.CSSProperties;
  
  /**
   * 是否启用CSS变量回退
   */
  enableCSSVariableFallback?: boolean;
}

/**
 * 样式生成上下文接口
 */
export interface StyleGenerationContext {
  /**
   * 当前主题
   */
  theme: ThemeDefinition;
  
  /**
   * 当前变体
   */
  variant?: string;
  
  /**
   * 响应式断点
   */
  breakpoint?: 'mobile' | 'tablet' | 'desktop' | 'wide';
  
  /**
   * 组件属性
   */
  props: Record<string, unknown>;
  
  /**
   * 组件状态
   */
  state?: Record<string, unknown>;
}

/**
 * 样式计算函数类型
 */
export type StyleComputeFunction<T = Record<string, unknown>> = (
  context: StyleGenerationContext & { props: T }
) => React.CSSProperties;

/**
 * 主题感知样式生成器类
 */
export class ThemeAwareStyleGenerator {
  private cache: StyleCacheImpl;
  private options: Required<Omit<StyleGeneratorOptions, 'styleTransformer'>>;
  private styleTransformer?: StyleGeneratorOptions['styleTransformer'];
  
  constructor(options: StyleGeneratorOptions = {}) {
    this.options = {
      enableCache: options.enableCache ?? true,
      cachePrefix: options.cachePrefix ?? 'theme-style',
      enableResponsive: options.enableResponsive ?? true,
      enableVariants: options.enableVariants ?? true,
      enableCSSVariableFallback: options.enableCSSVariableFallback ?? true,
    };
    
    this.styleTransformer = options.styleTransformer;
    this.cache = new StyleCacheImpl({
      maxSize: 500,
      ttl: 300000, // 5分钟
      enablePersistence: false,
    });
  }
  
  /**
   * 生成组件样式
   * 
   * @param computeFunction - 样式计算函数
   * @param context - 样式生成上下文
   * @returns 生成的样式对象
   */
  public generateStyles<T = Record<string, unknown>>(
    computeFunction: StyleComputeFunction<T>,
    context: StyleGenerationContext & { props: T }
  ): React.CSSProperties {
    // 生成缓存键
    const cacheKey = this.generateCacheKey(context);
    
    // 尝试从缓存获取
    if (this.options.enableCache) {
      const cached = this.cache.get(cacheKey);
      if (cached) {
        return cached as React.CSSProperties;
      }
    }
    
    // 计算基础样式
    let styles = computeFunction(context);
    
    // 应用变体样式
    if (this.options.enableVariants && context.variant) {
      styles = this.applyVariantStyles(styles, context);
    }
    
    // 应用响应式样式
    if (this.options.enableResponsive && context.breakpoint) {
      styles = this.applyResponsiveStyles(styles, context);
    }
    
    // 应用CSS变量回退
    if (this.options.enableCSSVariableFallback) {
      styles = this.applyCSSVariableFallback(styles, context);
    }
    
    // 应用自定义样式转换器
    if (this.styleTransformer) {
      styles = this.styleTransformer(styles);
    }
    
    // 缓存结果
    if (this.options.enableCache) {
      this.cache.set(cacheKey, styles as unknown as import('../types').CSSWithPseudoSelectors);
    }
    
    return styles;
  }
  
  /**
   * 生成按钮样式
   * 
   * @param context - 样式生成上下文
   * @returns 按钮样式
   */
  public generateButtonStyles(context: StyleGenerationContext & {
    props: {
      size?: 'sm' | 'md' | 'lg';
      variant?: 'primary' | 'secondary' | 'danger' | 'success';
      fill?: 'solid' | 'outline' | 'ghost' | 'link';
      shape?: 'default' | 'rounded' | 'circle' | 'square';
      disabled?: boolean;
      loading?: boolean;
      glow?: boolean;
      fullWidth?: boolean;
    };
  }): React.CSSProperties {
    return this.generateStyles(this.computeButtonStyles.bind(this), context);
  }
  
  /**
   * 计算按钮样式
   */
  private computeButtonStyles(context: StyleGenerationContext & {
    props: {
      size?: 'sm' | 'md' | 'lg';
      variant?: 'primary' | 'secondary' | 'danger' | 'success';
      fill?: 'solid' | 'outline' | 'ghost' | 'link';
      shape?: 'default' | 'rounded' | 'circle' | 'square';
      disabled?: boolean;
      loading?: boolean;
      glow?: boolean;
      fullWidth?: boolean;
    };
  }): React.CSSProperties {
    const { theme, props } = context;
    const { tokens } = theme;
    
    const {
      size = 'md',
      variant = 'primary',
      fill = 'solid',
      shape = 'default',
      disabled = false,
      loading = false,
      glow = false,
      fullWidth = false,
    } = props;
    
    // 基础样式
    let styles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontWeight: tokens.typography.fontWeight.medium,
      lineHeight: tokens.typography.lineHeight.tight,
      textDecoration: 'none',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      userSelect: 'none',
      transition: tokens.animation.transition.all,
      borderRadius: this.getTokenValue(tokens.borderRadius, 'base'),
    };
    
    // 尺寸样式
    const sizeStyles = this.getSizeStyles(tokens, size);
    styles = { ...styles, ...sizeStyles };
    
    // 颜色样式
    const colorStyles = this.getColorStyles(tokens, variant, fill);
    styles = { ...styles, ...colorStyles };
    
    // 形状样式
    const shapeStyles = this.getShapeStyles(tokens, shape);
    styles = { ...styles, ...shapeStyles };
    
    // 状态样式
    if (disabled) {
      styles = {
        ...styles,
        ...this.getDisabledStyles(tokens),
      };
    }
    
    if (loading) {
      styles = {
        ...styles,
        cursor: 'wait',
        opacity: 0.8,
      };
    }
    
    // 发光效果
    if (glow && !disabled) {
      const colorGroup = tokens.colors[variant as keyof typeof tokens.colors] as unknown as Record<string, string>;
      const glowColor = colorGroup['400'] || '#3b82f6'; // 默认蓝色
      styles = {
        ...styles,
        boxShadow: `0 0 20px ${glowColor}33`, // 20% 透明度
      };
    }
    
    // 全宽样式
    if (fullWidth) {
      styles = {
        ...styles,
        width: '100%',
      };
    }
    
    return styles;
  }
  
  /**
   * 获取尺寸样式
   */
  private getSizeStyles(
    tokens: ThemeDefinition['tokens'],
    size: 'sm' | 'md' | 'lg'
  ): React.CSSProperties {
    const sizeMap = {
      sm: {
        fontSize: tokens.typography.fontSize.xs,
        padding: `${this.getTokenValue(tokens.spacing, 2)} ${this.getTokenValue(tokens.spacing, 3)}`,
        minHeight: this.getTokenValue(tokens.spacing, 8),
        gap: this.getTokenValue(tokens.spacing, 1.5),
      },
      md: {
        fontSize: tokens.typography.fontSize.sm,
        padding: `${this.getTokenValue(tokens.spacing, 3)} ${this.getTokenValue(tokens.spacing, 4)}`,
        minHeight: this.getTokenValue(tokens.spacing, 11),
        gap: this.getTokenValue(tokens.spacing, 2),
      },
      lg: {
        fontSize: tokens.typography.fontSize.base,
        padding: `${this.getTokenValue(tokens.spacing, 4)} ${this.getTokenValue(tokens.spacing, 6)}`,
        minHeight: this.getTokenValue(tokens.spacing, 12),
        gap: this.getTokenValue(tokens.spacing, 2.5),
      },
    };
    
    return sizeMap[size];
  }
  
  /**
   * 获取颜色样式
   */
  private getColorStyles(
    tokens: ThemeDefinition['tokens'],
    variant: 'primary' | 'secondary' | 'danger' | 'success',
    fill: 'solid' | 'outline' | 'ghost' | 'link'
  ): React.CSSProperties {
    const colorSystem = tokens.colors[variant] as Record<string, string>;
    
    const baseStyles = {
      backgroundColor: colorSystem[500],
      color: tokens.colors.neutral[50],
    };
    
    switch (fill) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${colorSystem[500]}`,
          color: colorSystem[500],
        };
        
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colorSystem[500],
        };
        
      case 'link':
        return {
          backgroundColor: 'transparent',
          color: colorSystem[500],
          textDecoration: 'underline',
        };
        
      default:
        return baseStyles;
    }
  }
  
  /**
   * 获取形状样式
   */
  private getShapeStyles(
    tokens: ThemeDefinition['tokens'],
    shape: 'default' | 'rounded' | 'circle' | 'square'
  ): React.CSSProperties {
    const shapeMap = {
      default: {
        borderRadius: this.getTokenValue(tokens.borderRadius, 'base'),
      },
      rounded: {
        borderRadius: this.getTokenValue(tokens.borderRadius, 'lg'),
      },
      circle: {
        borderRadius: this.getTokenValue(tokens.borderRadius, 'full'),
        aspectRatio: '1',
      },
      square: {
        borderRadius: this.getTokenValue(tokens.borderRadius, 'none'),
      },
    };
    
    return shapeMap[shape];
  }
  
  /**
   * 获取禁用状态样式
   */
  private getDisabledStyles(tokens: ThemeDefinition['tokens']): React.CSSProperties {
    return {
      backgroundColor: this.getTokenValue(tokens.colors.neutral, 600),
      color: this.getTokenValue(tokens.colors.neutral, 400),
      cursor: 'not-allowed',
      opacity: 0.6,
    };
  }
  
  /**
   * 应用变体样式
   */
  private applyVariantStyles(
    baseStyles: React.CSSProperties,
    context: StyleGenerationContext
  ): React.CSSProperties {
    if (!context.variant || !context.theme.variants) {
      return baseStyles;
    }
    
    const variant = context.theme.variants[context.variant];
    if (!variant) {
      return baseStyles;
    }
    
    // 这里可以根据变体覆盖特定的样式属性
    // 具体实现依赖于变体的定义结构
    
    return baseStyles;
  }
  
  /**
   * 应用响应式样式
   */
  private applyResponsiveStyles(
    baseStyles: React.CSSProperties,
    context: StyleGenerationContext
  ): React.CSSProperties {
    if (!context.breakpoint || !context.theme.breakpoints) {
      return baseStyles;
    }
    
    // 这里可以根据断点应用不同的样式
    // 具体实现依赖于响应式样式的定义
    
    return baseStyles;
  }
  
  /**
   * 应用CSS变量回退
   */
  private applyCSSVariableFallback(
    styles: React.CSSProperties,
    _context: StyleGenerationContext
  ): React.CSSProperties {
    if (!this.options.enableCSSVariableFallback) {
      return styles;
    }
    
    // 将硬编码的值替换为CSS变量（如果主题支持）
    const newStyles = { ...styles };
    
    // 示例：将颜色值替换为CSS变量
    Object.entries(newStyles).forEach(([, value]) => {
      if (typeof value === 'string' && value.startsWith('#')) {
        // 这里可以实现更复杂的CSS变量替换逻辑
        // 例如查找对应的令牌路径并生成CSS变量名
      }
    });
    
    return newStyles;
  }
  
  /**
   * 生成缓存键
   */
  private generateCacheKey(context: StyleGenerationContext): string {
    const keyData = {
      themeId: context.theme.id,
      variant: context.variant,
      breakpoint: context.breakpoint,
      props: context.props,
      state: context.state,
    };
    
    return StyleCacheUtils.generateCacheKey(this.options.cachePrefix, keyData);
  }
  
  /**
   * 获取令牌值的辅助方法
   */
  private getTokenValue<T>(tokenGroup: T, key: keyof T): T[keyof T] {
    return tokenGroup[key];
  }
  
  /**
   * 清除缓存
   */
  public clearCache(): void {
    this.cache.clear();
  }
  
  /**
   * 获取缓存统计信息
   */
  public getCacheStats(): CacheStats {
    return this.cache.getStats();
  }
  
  /**
   * 销毁生成器
   */
  public destroy(): void {
    this.cache.destroy();
  }
}

/**
 * 样式生成器工厂
 */
export class StyleGeneratorFactory {
  private generators = new Map<string, ThemeAwareStyleGenerator>();
  
  /**
   * 创建或获取样式生成器
   * 
   * @param theme - 主题定义
   * @param options - 生成器选项
   * @returns 样式生成器实例
   */
  public getGenerator(
    theme: ThemeDefinition,
    options?: StyleGeneratorOptions
  ): ThemeAwareStyleGenerator {
    const key = `${theme.id}-${JSON.stringify(options || {})}`;
    
    if (!this.generators.has(key)) {
      const generator = new ThemeAwareStyleGenerator(options);
      this.generators.set(key, generator);
    }
    
    return this.generators.get(key)!;
  }
  
  /**
   * 清除所有生成器
   */
  public clearAll(): void {
    this.generators.forEach(generator => generator.destroy());
    this.generators.clear();
  }
  
  /**
   * 清除特定主题的生成器
   * 
   * @param themeId - 主题ID
   */
  public clearTheme(themeId: string): void {
    const keysToDelete: string[] = [];
    
    this.generators.forEach((generator, key) => {
      if (key.startsWith(`${themeId}-`)) {
        generator.destroy();
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.generators.delete(key));
  }
}

/**
 * 全局样式生成器工厂实例
 */
export const styleGeneratorFactory = new StyleGeneratorFactory();

/**
 * 便捷的样式生成函数
 * 
 * @param computeFunction - 样式计算函数
 * @param context - 样式生成上下文
 * @param options - 生成器选项
 * @returns 生成的样式对象
 */
export const generateThemeStyles = <T = Record<string, unknown>>(
  computeFunction: StyleComputeFunction<T>,
  context: StyleGenerationContext & { props: T },
  options?: StyleGeneratorOptions
): React.CSSProperties => {
  const generator = styleGeneratorFactory.getGenerator(context.theme, options);
  return generator.generateStyles(computeFunction, context);
};

/**
 * 便捷的按钮样式生成函数
 * 
 * @param context - 按钮样式生成上下文
 * @param options - 生成器选项
 * @returns 按钮样式对象
 */
export const generateButtonThemeStyles = (
  context: StyleGenerationContext & {
    props: {
      size?: 'sm' | 'md' | 'lg';
      variant?: 'primary' | 'secondary' | 'danger' | 'success';
      fill?: 'solid' | 'outline' | 'ghost' | 'link';
      shape?: 'default' | 'rounded' | 'circle' | 'square';
      disabled?: boolean;
      loading?: boolean;
      glow?: boolean;
      fullWidth?: boolean;
    };
  },
  options?: StyleGeneratorOptions
): React.CSSProperties => {
  const generator = styleGeneratorFactory.getGenerator(context.theme, options);
  return generator.generateButtonStyles(context);
};