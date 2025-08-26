/**
 * 设计令牌提取器
 * 
 * 提供从主题中提取、转换和导出设计令牌的功能
 * 支持多种输出格式：CSS变量、JSON、TypeScript类型等
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import type { 
  ThemeDefinition, 
  ThemeVariant, 
  // ColorSystem, 
  // TypographySystem, 
  // SpacingSystem,
  // AnimationSystem,
  // ShadowSystem,
  // BorderRadiusSystem 
} from '../types';

/**
 * 令牌提取选项接口
 */
export interface TokenExtractionOptions {
  /**
   * 变量前缀
   */
  prefix?: string;
  
  /**
   * 是否包含变体令牌
   */
  includeVariants?: boolean;
  
  /**
   * 输出格式
   */
  format?: 'css' | 'json' | 'typescript' | 'scss' | 'less';
  
  /**
   * 是否格式化输出
   */
  formatted?: boolean;
  
  /**
   * 是否包含注释
   */
  includeComments?: boolean;
  
  /**
   * 自定义令牌过滤器
   */
  filter?: (path: string, value: unknown) => boolean;
  
  /**
   * 自定义令牌转换器
   */
  transform?: (path: string, value: unknown) => unknown;
}

/**
 * 提取结果接口
 */
export interface ExtractionResult {
  /**
   * 提取的令牌
   */
  tokens: Record<string, unknown>;
  
  /**
   * 输出内容
   */
  content: string;
  
  /**
   * 统计信息
   */
  stats: {
    totalTokens: number;
    categories: Record<string, number>;
  };
}

/**
 * 设计令牌提取器类
 */
export class DesignTokenExtractor {
  private defaultOptions: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>> = {
    prefix: '--token',
    includeVariants: true,
    format: 'css',
    formatted: true,
    includeComments: true,
  };

  /**
   * 从主题中提取令牌
   * 
   * @param theme - 主题定义
   * @param options - 提取选项
   * @returns 提取结果
   */
  public extract(
    theme: ThemeDefinition,
    options: TokenExtractionOptions = {}
  ): ExtractionResult {
    const config = { ...this.defaultOptions, ...options };
    
    // 提取基础令牌
    const baseTokens = this.extractBaseTokens(theme.tokens, config);
    
    // 提取变体令牌
    const variantTokens = config.includeVariants && theme.variants
      ? this.extractVariantTokens(theme.variants, config)
      : {};
    
    // 合并令牌
    const allTokens = { ...baseTokens, ...variantTokens };
    
    // 生成输出内容
    const content = this.generateOutput(allTokens, config, theme);
    
    // 计算统计信息
    const stats = this.calculateStats(allTokens);
    
    return {
      tokens: allTokens,
      content,
      stats,
    };
  }

  /**
   * 提取基础令牌
   * 
   * @param tokens - 令牌对象
   * @param options - 选项
   * @returns 扁平化的令牌对象
   */
  private extractBaseTokens(
    tokens: ThemeDefinition['tokens'],
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    
    // 遍历各个令牌类别
    Object.entries(tokens).forEach(([category, categoryTokens]) => {
      this.flattenTokens(categoryTokens as Record<string, unknown>, result, category, options);
    });
    
    return result;
  }

  /**
   * 提取变体令牌
   * 
   * @param variants - 变体对象
   * @param options - 选项
   * @returns 扁平化的变体令牌对象
   */
  private extractVariantTokens(
    variants: Record<string, ThemeVariant>,
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    
    Object.entries(variants).forEach(([variantName, variant]) => {
      Object.entries(variant).forEach(([category, categoryTokens]) => {
        if (categoryTokens) {
          this.flattenTokens(
            categoryTokens,
            result,
            `${category}-${variantName}`,
            options
          );
        }
      });
    });
    
    return result;
  }

  /**
   * 扁平化令牌对象
   * 
   * @param obj - 要扁平化的对象
   * @param result - 结果对象
   * @param prefix - 前缀
   * @param options - 选项
   */
  private flattenTokens(
    obj: Record<string, unknown>,
    result: Record<string, unknown>,
    prefix: string,
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>,
    path: string = ''
  ): void {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // 递归处理嵌套对象
        this.flattenTokens(value as Record<string, unknown>, result, prefix, options, currentPath);
      } else {
        // 叶子节点，添加到结果中
        const tokenName = `${options.prefix}-${prefix}-${currentPath.replace(/\./g, '-')}`;
        result[tokenName] = value;
      }
    });
  }

  /**
   * 生成输出内容
   * 
   * @param tokens - 令牌对象
   * @param options - 选项
   * @param theme - 主题定义
   * @returns 输出内容
   */
  private generateOutput(
    tokens: Record<string, unknown>,
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>,
    theme: ThemeDefinition
  ): string {
    switch (options.format) {
      case 'css':
        return this.generateCSS(tokens, options, theme);
      case 'json':
        return this.generateJSON(tokens, options);
      case 'typescript':
        return this.generateTypeScript(tokens, options, theme);
      case 'scss':
        return this.generateSCSS(tokens, options, theme);
      case 'less':
        return this.generateLess(tokens, options, theme);
      default:
        throw new Error(`不支持的输出格式: ${options.format}`);
    }
  }

  /**
   * 生成CSS输出
   * 
   * @param tokens - 令牌对象
   * @param options - 选项
   * @param theme - 主题定义
   * @returns CSS内容
   */
  private generateCSS(
    tokens: Record<string, unknown>,
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>,
    theme: ThemeDefinition
  ): string {
    let css = '';
    
    if (options.includeComments) {
      css += `/**\n * ${theme.name} - 设计令牌\n * 版本: ${theme.version}\n * 生成时间: ${new Date().toISOString()}\n */\n\n`;
    }
    
    css += ':root {\n';
    
    Object.entries(tokens).forEach(([name, value]) => {
      if (options.includeComments) {
        css += `  /* ${name} */\n`;
      }
      css += `  ${name}: ${value};\n`;
    });
    
    css += '}\n';
    
    // 如果有变体，为每个变体生成选择器
    if (theme.variants && options.includeVariants) {
      Object.keys(theme.variants).forEach(variantName => {
        css += `\n[data-theme="${theme.id}-${variantName}"] {\n`;
        
        Object.entries(tokens).forEach(([name, value]) => {
          if (name.includes(`-${variantName}`)) {
            const baseName = name.replace(`-${variantName}`, '');
            css += `  ${baseName}: ${value};\n`;
          }
        });
        
        css += '}\n';
      });
    }
    
    return options.formatted ? css : css.replace(/\s+/g, ' ').trim();
  }

  /**
   * 生成JSON输出
   * 
   * @param tokens - 令牌对象
   * @param options - 选项
   * @returns JSON内容
   */
  private generateJSON(
    tokens: Record<string, unknown>,
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>
  ): string {
    return JSON.stringify(tokens, null, options.formatted ? 2 : 0);
  }

  /**
   * 生成TypeScript输出
   * 
   * @param tokens - 令牌对象
   * @param options - 选项
   * @param theme - 主题定义
   * @returns TypeScript内容
   */
  private generateTypeScript(
    tokens: Record<string, unknown>,
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>,
    theme: ThemeDefinition
  ): string {
    let ts = '';
    
    if (options.includeComments) {
      ts += `/**\n * ${theme.name} - 设计令牌\n * 版本: ${theme.version}\n * 生成时间: ${new Date().toISOString()}\n */\n\n`;
    }
    
    ts += 'export const designTokens = {\n';
    
    Object.entries(tokens).forEach(([name, value]) => {
      const key = name.replace(/^--token-/, '').replace(/-/g, '_').toUpperCase();
      ts += `  ${key}: '${value}',\n`;
    });
    
    ts += '} as const;\n\n';
    
    ts += 'export type DesignTokens = typeof designTokens;\n';
    
    return ts;
  }

  /**
   * 生成SCSS输出
   * 
   * @param tokens - 令牌对象
   * @param options - 选项
   * @param theme - 主题定义
   * @returns SCSS内容
   */
  private generateSCSS(
    tokens: Record<string, unknown>,
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>,
    theme: ThemeDefinition
  ): string {
    let scss = '';
    
    if (options.includeComments) {
      scss += `/**\n * ${theme.name} - 设计令牌\n * 版本: ${theme.version}\n * 生成时间: ${new Date().toISOString()}\n */\n\n`;
    }
    
    Object.entries(tokens).forEach(([name, value]) => {
      const varName = name.replace(/^--token-/, '').replace(/-/g, '_');
      scss += `$${varName}: ${value};\n`;
    });
    
    return scss;
  }

  /**
   * 生成Less输出
   * 
   * @param tokens - 令牌对象
   * @param options - 选项
   * @param theme - 主题定义
   * @returns Less内容
   */
  private generateLess(
    tokens: Record<string, unknown>,
    options: Required<Omit<TokenExtractionOptions, 'filter' | 'transform'>>,
    theme: ThemeDefinition
  ): string {
    let less = '';
    
    if (options.includeComments) {
      less += `/**\n * ${theme.name} - 设计令牌\n * 版本: ${theme.version}\n * 生成时间: ${new Date().toISOString()}\n */\n\n`;
    }
    
    Object.entries(tokens).forEach(([name, value]) => {
      const varName = name.replace(/^--token-/, '').replace(/-/g, '_');
      less += `@${varName}: ${value};\n`;
    });
    
    return less;
  }

  /**
   * 计算统计信息
   * 
   * @param tokens - 令牌对象
   * @returns 统计信息
   */
  private calculateStats(tokens: Record<string, unknown>): ExtractionResult['stats'] {
    const stats = {
      totalTokens: Object.keys(tokens).length,
      categories: {} as Record<string, number>,
    };
    
    Object.keys(tokens).forEach(name => {
      // 从令牌名称中提取类别
      const parts = name.split('-');
      if (parts.length >= 3) {
        const category = parts[2]; // --token-colors-primary-500 -> colors
        stats.categories[category] = (stats.categories[category] || 0) + 1;
      }
    });
    
    return stats;
  }

  /**
   * 批量提取多个主题的令牌
   * 
   * @param themes - 主题列表
   * @param options - 提取选项
   * @returns 批量提取结果
   */
  public extractMultiple(
    themes: ThemeDefinition[],
    options: TokenExtractionOptions = {}
  ): Record<string, ExtractionResult> {
    const results: Record<string, ExtractionResult> = {};
    
    themes.forEach(theme => {
      results[theme.id] = this.extract(theme, options);
    });
    
    return results;
  }

  /**
   * 生成令牌对比报告
   * 
   * @param theme1 - 第一个主题
   * @param theme2 - 第二个主题
   * @returns 对比报告
   */
  public compareThemes(
    theme1: ThemeDefinition,
    theme2: ThemeDefinition
  ): {
    added: string[];
    removed: string[];
    changed: Array<{ token: string; from: unknown; to: unknown }>;
    common: string[];
  } {
    const tokens1 = this.extract(theme1, { includeComments: false }).tokens;
    const tokens2 = this.extract(theme2, { includeComments: false }).tokens;
    
    const keys1 = new Set(Object.keys(tokens1));
    const keys2 = new Set(Object.keys(tokens2));
    
    const added: string[] = [];
    const removed: string[] = [];
    const changed: Array<{ token: string; from: unknown; to: unknown }> = [];
    const common: string[] = [];
    
    // 检查新增的令牌
    keys2.forEach(key => {
      if (!keys1.has(key)) {
        added.push(key);
      }
    });
    
    // 检查删除的令牌
    keys1.forEach(key => {
      if (!keys2.has(key)) {
        removed.push(key);
      }
    });
    
    // 检查变化的令牌
    keys1.forEach(key => {
      if (keys2.has(key)) {
        if (tokens1[key] !== tokens2[key]) {
          changed.push({
            token: key,
            from: tokens1[key],
            to: tokens2[key],
          });
        } else {
          common.push(key);
        }
      }
    });
    
    return { added, removed, changed, common };
  }
}

/**
 * 创建令牌提取器实例
 */
export const tokenExtractor = new DesignTokenExtractor();

/**
 * 便捷的令牌提取函数
 * 
 * @param theme - 主题定义
 * @param options - 提取选项
 * @returns 提取结果
 */
export const extractTokens = (
  theme: ThemeDefinition,
  options?: TokenExtractionOptions
): ExtractionResult => {
  return tokenExtractor.extract(theme, options);
};

/**
 * 便捷的CSS变量生成函数
 * 
 * @param theme - 主题定义
 * @param options - 选项
 * @returns CSS内容
 */
export const generateCSSVariables = (
  theme: ThemeDefinition,
  options?: Omit<TokenExtractionOptions, 'format'>
): string => {
  return tokenExtractor.extract(theme, {
    ...options,
    format: 'css',
  }).content;
};

/**
 * 便捷的JSON令牌生成函数
 * 
 * @param theme - 主题定义
 * @param options - 选项
 * @returns JSON内容
 */
export const generateJSONTokens = (
  theme: ThemeDefinition,
  options?: Omit<TokenExtractionOptions, 'format'>
): string => {
  return tokenExtractor.extract(theme, {
    ...options,
    format: 'json',
  }).content;
};