/**
 * 跨主题API一致性验证系统
 * 
 * 确保所有主题的API接口保持一致性，遵循统一的设计规范
 * 验证组件接口、类型定义、方法签名等的一致性
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import type { 
  BaseButtonProps, 
  ThemeDefinition, 
  ButtonVariant,
  ButtonSize,
  ButtonFill,
  ButtonShape 
} from '../core/types';

/**
 * API一致性验证配置
 */
export interface ApiConsistencyConfig {
  /**
   * 是否启用严格模式验证
   * 严格模式下会检查更多细节
   */
  strictMode: boolean;
  
  /**
   * 忽略的检查项目
   */
  ignoreChecks: string[];
  
  /**
   * 自定义验证规则
   */
  customRules: ValidationRule[];
  
  /**
   * 错误级别配置
   */
  errorLevels: {
    apiMismatch: 'error' | 'warning' | 'info';
    typeMismatch: 'error' | 'warning' | 'info';
    methodSignature: 'error' | 'warning' | 'info';
    propsMissing: 'error' | 'warning' | 'info';
  };
}

/**
 * 验证规则接口
 */
export interface ValidationRule {
  name: string;
  description: string;
  validate: (theme: ThemeInfo, allThemes: ThemeInfo[]) => ValidationResult[];
}

/**
 * 主题信息接口
 */
export interface ThemeInfo {
  id: string;
  name: string;
  version: string;
  definition: ThemeDefinition;
  components: ComponentInfo[];
  hooks: HookInfo[];
  utils: UtilInfo[];
  types: TypeInfo[];
}

/**
 * 组件信息接口
 */
export interface ComponentInfo {
  name: string;
  props: Record<string, any>;
  methods: MethodSignature[];
  events: EventSignature[];
  slots: string[];
  defaultProps: Record<string, any>;
}

/**
 * Hook信息接口
 */
export interface HookInfo {
  name: string;
  parameters: Parameter[];
  returnType: any;
  dependencies: string[];
}

/**
 * 工具函数信息接口
 */
export interface UtilInfo {
  name: string;
  signature: MethodSignature;
  category: string;
}

/**
 * 类型信息接口
 */
export interface TypeInfo {
  name: string;
  definition: any;
  category: 'interface' | 'type' | 'enum' | 'class';
  extends?: string[];
}

/**
 * 方法签名接口
 */
export interface MethodSignature {
  name: string;
  parameters: Parameter[];
  returnType: any;
  isAsync: boolean;
  isOptional: boolean;
}

/**
 * 事件签名接口
 */
export interface EventSignature {
  name: string;
  parameters: Parameter[];
  bubbles: boolean;
  cancelable: boolean;
}

/**
 * 参数信息接口
 */
export interface Parameter {
  name: string;
  type: any;
  optional: boolean;
  defaultValue?: any;
  description?: string;
}

/**
 * 验证结果接口
 */
export interface ValidationResult {
  level: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  details?: any;
  suggestion?: string;
  affectedThemes: string[];
}

/**
 * API一致性验证器
 */
export class ApiConsistencyValidator {
  private config: ApiConsistencyConfig;
  private themes: Map<string, ThemeInfo> = new Map();
  private validationRules: ValidationRule[] = [];

  constructor(config: Partial<ApiConsistencyConfig> = {}) {
    this.config = {
      strictMode: false,
      ignoreChecks: [],
      customRules: [],
      errorLevels: {
        apiMismatch: 'error',
        typeMismatch: 'error', 
        methodSignature: 'warning',
        propsMissing: 'warning',
      },
      ...config,
    };

    this.initializeBuiltinRules();
    this.config.customRules.forEach(rule => this.addValidationRule(rule));
  }

  /**
   * 初始化内置验证规则
   */
  private initializeBuiltinRules(): void {
    this.validationRules = [
      {
        name: 'button-props-consistency',
        description: '验证按钮组件属性一致性',
        validate: this.validateButtonPropsConsistency.bind(this),
      },
      {
        name: 'hook-signature-consistency', 
        description: '验证Hook签名一致性',
        validate: this.validateHookSignatureConsistency.bind(this),
      },
      {
        name: 'theme-definition-consistency',
        description: '验证主题定义结构一致性',
        validate: this.validateThemeDefinitionConsistency.bind(this),
      },
      {
        name: 'style-api-consistency',
        description: '验证样式API一致性',
        validate: this.validateStyleApiConsistency.bind(this),
      },
      {
        name: 'event-handling-consistency',
        description: '验证事件处理一致性',
        validate: this.validateEventHandlingConsistency.bind(this),
      },
    ];
  }

  /**
   * 注册主题信息
   */
  public registerTheme(themeInfo: ThemeInfo): void {
    this.themes.set(themeInfo.id, themeInfo);
  }

  /**
   * 添加验证规则
   */
  public addValidationRule(rule: ValidationRule): void {
    this.validationRules.push(rule);
  }

  /**
   * 执行完整的API一致性验证
   */
  public async validateConsistency(): Promise<{
    results: ValidationResult[];
    summary: {
      totalChecks: number;
      errors: number;
      warnings: number;
      infos: number;
      passRate: number;
    };
    recommendations: string[];
  }> {
    console.log('🔍 开始执行跨主题API一致性验证...');
    
    const allResults: ValidationResult[] = [];
    const themes = Array.from(this.themes.values());

    // 执行每个验证规则
    for (const rule of this.validationRules) {
      if (this.config.ignoreChecks.includes(rule.name)) {
        continue;
      }

      console.log(`📋 执行验证规则: ${rule.name}`);
      
      for (const theme of themes) {
        try {
          const results = rule.validate(theme, themes);
          allResults.push(...results);
        } catch (error) {
          allResults.push({
            level: 'error',
            category: 'validation-error',
            message: `验证规则 ${rule.name} 执行失败: ${error}`,
            affectedThemes: [theme.id],
          });
        }
      }
    }

    // 生成统计信息
    const summary = this.generateSummary(allResults);
    const recommendations = this.generateRecommendations(allResults);

    console.log('✅ API一致性验证完成');
    console.log('📊 验证结果:', summary);

    return {
      results: allResults,
      summary,
      recommendations,
    };
  }

  /**
   * 验证按钮组件属性一致性
   */
  private validateButtonPropsConsistency(
    theme: ThemeInfo, 
    allThemes: ThemeInfo[]
  ): ValidationResult[] {
    const results: ValidationResult[] = [];
    const buttonComponent = theme.components.find(c => c.name.includes('Button'));
    
    if (!buttonComponent) {
      results.push({
        level: 'warning',
        category: 'missing-component',
        message: `主题 ${theme.name} 缺少按钮组件`,
        affectedThemes: [theme.id],
      });
      return results;
    }

    // 检查必需的按钮属性
    const requiredProps = [
      'variant', 'size', 'fill', 'shape', 'disabled', 'loading'
    ];

    for (const propName of requiredProps) {
      if (!(propName in buttonComponent.props)) {
        results.push({
          level: this.config.errorLevels.propsMissing,
          category: 'missing-prop',
          message: `主题 ${theme.name} 的按钮组件缺少必需属性: ${propName}`,
          affectedThemes: [theme.id],
          suggestion: `添加 ${propName} 属性到按钮组件接口`,
        });
      }
    }

    // 检查变体值一致性
    const variantValues = ['primary', 'secondary', 'danger', 'success'];
    if (buttonComponent.props.variant) {
      const themeVariants = this.extractEnumValues(buttonComponent.props.variant);
      for (const variant of variantValues) {
        if (!themeVariants.includes(variant)) {
          results.push({
            level: 'warning',
            category: 'variant-inconsistency',
            message: `主题 ${theme.name} 缺少变体: ${variant}`,
            affectedThemes: [theme.id],
          });
        }
      }
    }

    return results;
  }

  /**
   * 验证Hook签名一致性
   */
  private validateHookSignatureConsistency(
    theme: ThemeInfo,
    allThemes: ThemeInfo[]
  ): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    // 检查通用Hook的存在性
    const commonHooks = ['useTheme', 'useButton', 'useSystemPreferences'];
    
    for (const hookName of commonHooks) {
      const hook = theme.hooks.find(h => h.name === hookName);
      
      if (!hook) {
        results.push({
          level: 'info',
          category: 'missing-hook',
          message: `主题 ${theme.name} 可能缺少通用Hook: ${hookName}`,
          affectedThemes: [theme.id],
        });
        continue;
      }

      // 与其他主题的相同Hook比较签名
      for (const otherTheme of allThemes) {
        if (otherTheme.id === theme.id) continue;
        
        const otherHook = otherTheme.hooks.find(h => h.name === hookName);
        if (otherHook) {
          const signatureMismatch = this.compareHookSignatures(hook, otherHook);
          if (signatureMismatch.length > 0) {
            results.push({
              level: this.config.errorLevels.methodSignature,
              category: 'hook-signature-mismatch',
              message: `Hook ${hookName} 在主题 ${theme.name} 和 ${otherTheme.name} 之间签名不一致`,
              details: signatureMismatch,
              affectedThemes: [theme.id, otherTheme.id],
            });
          }
        }
      }
    }

    return results;
  }

  /**
   * 验证主题定义结构一致性
   */
  private validateThemeDefinitionConsistency(
    theme: ThemeInfo,
    allThemes: ThemeInfo[]
  ): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    // 检查必需的主题属性
    const requiredThemeProps = [
      'name', 'colors', 'typography', 'spacing', 'animation'
    ];

    for (const prop of requiredThemeProps) {
      if (!(prop in theme.definition)) {
        results.push({
          level: this.config.errorLevels.apiMismatch,
          category: 'missing-theme-prop',
          message: `主题 ${theme.name} 定义缺少必需属性: ${prop}`,
          affectedThemes: [theme.id],
        });
      }
    }

    // 检查颜色系统结构一致性
    if (theme.definition.colors) {
      const colorStructure = this.analyzeColorStructure(theme.definition.colors);
      
      for (const otherTheme of allThemes) {
        if (otherTheme.id === theme.id || !otherTheme.definition.colors) continue;
        
        const otherColorStructure = this.analyzeColorStructure(otherTheme.definition.colors);
        const structureDiff = this.compareStructures(colorStructure, otherColorStructure);
        
        if (structureDiff.length > 0) {
          results.push({
            level: 'warning',
            category: 'color-structure-inconsistency',
            message: `主题 ${theme.name} 与 ${otherTheme.name} 的颜色结构不一致`,
            details: structureDiff,
            affectedThemes: [theme.id, otherTheme.id],
          });
        }
      }
    }

    return results;
  }

  /**
   * 验证样式API一致性
   */
  private validateStyleApiConsistency(
    theme: ThemeInfo,
    allThemes: ThemeInfo[]
  ): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    // 检查样式计算函数的一致性
    const styleUtils = theme.utils.filter(u => u.category === 'style');
    
    const requiredStyleUtils = [
      'computeButtonStyles',
      'getThemeStyles',
      'generateCSSVariables'
    ];

    for (const utilName of requiredStyleUtils) {
      const util = styleUtils.find(u => u.name.includes(utilName.split(/(?=[A-Z])/).join('').toLowerCase()));
      
      if (!util) {
        results.push({
          level: 'warning',
          category: 'missing-style-util',
          message: `主题 ${theme.name} 缺少样式工具函数: ${utilName}`,
          affectedThemes: [theme.id],
        });
      }
    }

    return results;
  }

  /**
   * 验证事件处理一致性
   */
  private validateEventHandlingConsistency(
    theme: ThemeInfo,
    allThemes: ThemeInfo[]
  ): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    // 检查按钮组件的事件处理
    const buttonComponent = theme.components.find(c => c.name.includes('Button'));
    
    if (buttonComponent) {
      const requiredEvents = [
        'onClick', 'onFocus', 'onBlur', 'onKeyDown'
      ];

      for (const eventName of requiredEvents) {
        const event = buttonComponent.events.find(e => e.name === eventName);
        
        if (!event) {
          results.push({
            level: 'warning',
            category: 'missing-event',
            message: `主题 ${theme.name} 的按钮组件缺少事件: ${eventName}`,
            affectedThemes: [theme.id],
          });
        }
      }
    }

    return results;
  }

  /**
   * 比较Hook签名
   */
  private compareHookSignatures(hook1: HookInfo, hook2: HookInfo): string[] {
    const differences: string[] = [];
    
    if (hook1.parameters.length !== hook2.parameters.length) {
      differences.push('参数数量不一致');
    }

    // 比较参数类型
    for (let i = 0; i < Math.min(hook1.parameters.length, hook2.parameters.length); i++) {
      const param1 = hook1.parameters[i];
      const param2 = hook2.parameters[i];
      
      if (param1.name !== param2.name) {
        differences.push(`参数${i}名称不一致: ${param1.name} vs ${param2.name}`);
      }
      
      if (param1.optional !== param2.optional) {
        differences.push(`参数${param1.name}可选性不一致`);
      }
    }

    return differences;
  }

  /**
   * 分析颜色结构
   */
  private analyzeColorStructure(colors: any): Record<string, string> {
    const structure: Record<string, string> = {};
    
    const analyzeObject = (obj: any, path: string = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'object' && value !== null) {
          analyzeObject(value, currentPath);
        } else {
          structure[currentPath] = typeof value;
        }
      }
    };

    analyzeObject(colors);
    return structure;
  }

  /**
   * 比较结构差异
   */
  private compareStructures(struct1: Record<string, string>, struct2: Record<string, string>): string[] {
    const differences: string[] = [];
    
    const allKeys = new Set([...Object.keys(struct1), ...Object.keys(struct2)]);
    
    for (const key of allKeys) {
      if (!(key in struct1)) {
        differences.push(`缺少属性: ${key}`);
      } else if (!(key in struct2)) {
        differences.push(`多余属性: ${key}`);
      } else if (struct1[key] !== struct2[key]) {
        differences.push(`类型不一致 ${key}: ${struct1[key]} vs ${struct2[key]}`);
      }
    }

    return differences;
  }

  /**
   * 提取枚举值
   */
  private extractEnumValues(type: any): string[] {
    // 简化实现，实际中应该通过TypeScript编译器API获取
    if (typeof type === 'string') {
      return type.split('|').map(s => s.trim().replace(/['"]/g, ''));
    }
    return [];
  }

  /**
   * 生成验证结果统计
   */
  private generateSummary(results: ValidationResult[]): {
    totalChecks: number;
    errors: number;
    warnings: number;
    infos: number;
    passRate: number;
  } {
    const errors = results.filter(r => r.level === 'error').length;
    const warnings = results.filter(r => r.level === 'warning').length;
    const infos = results.filter(r => r.level === 'info').length;
    const totalChecks = results.length;
    const passRate = totalChecks === 0 ? 100 : ((totalChecks - errors) / totalChecks) * 100;

    return {
      totalChecks,
      errors,
      warnings,
      infos,
      passRate: Math.round(passRate * 100) / 100,
    };
  }

  /**
   * 生成改进建议
   */
  private generateRecommendations(results: ValidationResult[]): string[] {
    const recommendations: string[] = [];
    const errorCategories = new Set(results.filter(r => r.level === 'error').map(r => r.category));
    
    if (errorCategories.has('missing-prop')) {
      recommendations.push('建议：统一所有主题的按钮组件属性接口，确保必需属性的完整性');
    }
    
    if (errorCategories.has('hook-signature-mismatch')) {
      recommendations.push('建议：创建通用的Hook接口定义，确保所有主题实现相同的签名');
    }
    
    if (errorCategories.has('missing-theme-prop')) {
      recommendations.push('建议：定义标准的主题结构模板，确保所有主题包含必需的配置属性');
    }
    
    const warningCount = results.filter(r => r.level === 'warning').length;
    if (warningCount > 0) {
      recommendations.push(`建议：处理 ${warningCount} 个警告项，以提升API一致性和开发体验`);
    }

    return recommendations;
  }

  /**
   * 生成详细报告
   */
  public generateDetailedReport(results: ValidationResult[]): string {
    let report = '# 跨主题API一致性验证报告\n\n';
    
    report += `## 验证概要\n`;
    report += `- 验证时间: ${new Date().toISOString()}\n`;
    report += `- 主题数量: ${this.themes.size}\n`;
    report += `- 验证规则: ${this.validationRules.length}\n\n`;
    
    const groupedResults = this.groupResultsByCategory(results);
    
    for (const [category, categoryResults] of Object.entries(groupedResults)) {
      report += `## ${category}\n\n`;
      
      for (const result of categoryResults) {
        const icon = result.level === 'error' ? '❌' : result.level === 'warning' ? '⚠️' : 'ℹ️';
        report += `${icon} **${result.level.toUpperCase()}**: ${result.message}\n`;
        
        if (result.suggestion) {
          report += `   💡 建议: ${result.suggestion}\n`;
        }
        
        report += `   🎯 影响主题: ${result.affectedThemes.join(', ')}\n\n`;
      }
    }
    
    return report;
  }

  /**
   * 按分类分组结果
   */
  private groupResultsByCategory(results: ValidationResult[]): Record<string, ValidationResult[]> {
    const grouped: Record<string, ValidationResult[]> = {};
    
    for (const result of results) {
      if (!grouped[result.category]) {
        grouped[result.category] = [];
      }
      grouped[result.category].push(result);
    }
    
    return grouped;
  }
}

/**
 * 创建主题信息提取器
 */
export class ThemeInfoExtractor {
  /**
   * 从主题模块中提取信息
   */
  public static async extractThemeInfo(
    themeId: string,
    themeName: string,
    themeModule: any
  ): Promise<ThemeInfo> {
    console.log(`📊 提取主题信息: ${themeName}`);
    
    const components = await this.extractComponentInfo(themeModule);
    const hooks = await this.extractHookInfo(themeModule);
    const utils = await this.extractUtilInfo(themeModule);
    const types = await this.extractTypeInfo(themeModule);
    
    return {
      id: themeId,
      name: themeName,
      version: themeModule.version || '1.0.0',
      definition: themeModule.default || themeModule.themeDefinition,
      components,
      hooks,
      utils,
      types,
    };
  }

  /**
   * 提取组件信息
   */
  private static async extractComponentInfo(themeModule: any): Promise<ComponentInfo[]> {
    const components: ComponentInfo[] = [];
    
    // 查找Button组件
    if (themeModule.TechButton || themeModule.MinimalButton) {
      const buttonComponent = themeModule.TechButton || themeModule.MinimalButton;
      
      components.push({
        name: buttonComponent.displayName || 'Button',
        props: this.extractPropsFromComponent(buttonComponent),
        methods: this.extractMethodsFromComponent(buttonComponent),
        events: this.extractEventsFromComponent(buttonComponent),
        slots: [],
        defaultProps: buttonComponent.defaultProps || {},
      });
    }
    
    return components;
  }

  /**
   * 提取Hook信息
   */
  private static async extractHookInfo(themeModule: any): Promise<HookInfo[]> {
    const hooks: HookInfo[] = [];
    
    // 查找主题相关的Hook
    const hookNames = Object.keys(themeModule).filter(key => key.startsWith('use'));
    
    for (const hookName of hookNames) {
      const hook = themeModule[hookName];
      if (typeof hook === 'function') {
        hooks.push({
          name: hookName,
          parameters: this.extractHookParameters(hook),
          returnType: 'any', // 简化实现
          dependencies: [],
        });
      }
    }
    
    return hooks;
  }

  /**
   * 提取工具函数信息
   */
  private static async extractUtilInfo(themeModule: any): Promise<UtilInfo[]> {
    const utils: UtilInfo[] = [];
    
    // 查找工具函数
    if (themeModule.ButtonUtils || themeModule.MinimalButtonUtils) {
      const utilObj = themeModule.ButtonUtils || themeModule.MinimalButtonUtils;
      
      for (const [name, func] of Object.entries(utilObj)) {
        if (typeof func === 'function') {
          utils.push({
            name,
            signature: {
              name,
              parameters: [],
              returnType: 'any',
              isAsync: false,
              isOptional: false,
            },
            category: 'utility',
          });
        }
      }
    }
    
    return utils;
  }

  /**
   * 提取类型信息
   */
  private static async extractTypeInfo(themeModule: any): Promise<TypeInfo[]> {
    const types: TypeInfo[] = [];
    
    // 这里需要使用TypeScript编译器API来提取类型信息
    // 简化实现中返回空数组
    
    return types;
  }

  /**
   * 从组件中提取属性信息
   */
  private static extractPropsFromComponent(component: any): Record<string, any> {
    // 简化实现：从propTypes或defaultProps推断
    const props: Record<string, any> = {};
    
    if (component.propTypes) {
      for (const [key, propType] of Object.entries(component.propTypes)) {
        props[key] = propType;
      }
    }
    
    return props;
  }

  /**
   * 从组件中提取方法信息
   */
  private static extractMethodsFromComponent(component: any): MethodSignature[] {
    // 简化实现
    return [];
  }

  /**
   * 从组件中提取事件信息
   */
  private static extractEventsFromComponent(component: any): EventSignature[] {
    const events: EventSignature[] = [];
    
    // 常见的按钮事件
    const commonEvents = ['onClick', 'onFocus', 'onBlur', 'onKeyDown', 'onMouseEnter', 'onMouseLeave'];
    
    for (const eventName of commonEvents) {
      events.push({
        name: eventName,
        parameters: [
          {
            name: 'event',
            type: 'Event',
            optional: false,
          }
        ],
        bubbles: true,
        cancelable: true,
      });
    }
    
    return events;
  }

  /**
   * 提取Hook参数信息
   */
  private static extractHookParameters(hook: Function): Parameter[] {
    // 简化实现：通过函数的length属性获取参数数量
    const paramCount = hook.length;
    const parameters: Parameter[] = [];
    
    for (let i = 0; i < paramCount; i++) {
      parameters.push({
        name: `param${i}`,
        type: 'any',
        optional: false,
      });
    }
    
    return parameters;
  }
}

/**
 * 默认的API一致性验证配置
 */
export const DEFAULT_API_CONSISTENCY_CONFIG: ApiConsistencyConfig = {
  strictMode: true,
  ignoreChecks: [],
  customRules: [],
  errorLevels: {
    apiMismatch: 'error',
    typeMismatch: 'error',
    methodSignature: 'warning', 
    propsMissing: 'warning',
  },
};

/**
 * 执行完整的跨主题API一致性验证
 */
export async function validateApiConsistency(
  config: Partial<ApiConsistencyConfig> = {}
): Promise<void> {
  console.log('🚀 启动跨主题API一致性验证流程...');
  
  const validator = new ApiConsistencyValidator({
    ...DEFAULT_API_CONSISTENCY_CONFIG,
    ...config,
  });

  try {
    // 动态导入所有主题
    const techTheme = await import('../tech');
    const minimalTheme = await import('../minimal');

    // 提取主题信息
    const techThemeInfo = await ThemeInfoExtractor.extractThemeInfo(
      'tech',
      '科技风主题',
      techTheme
    );
    
    const minimalThemeInfo = await ThemeInfoExtractor.extractThemeInfo(
      'minimal',
      '极简主题',
      minimalTheme
    );

    // 注册主题信息
    validator.registerTheme(techThemeInfo);
    validator.registerTheme(minimalThemeInfo);

    // 执行验证
    const result = await validator.validateConsistency();
    
    // 生成报告
    console.log('📋 验证结果:', result.summary);
    console.log('💡 建议:', result.recommendations);
    
    if (result.results.length > 0) {
      const report = validator.generateDetailedReport(result.results);
      console.log('📝 详细报告:');
      console.log(report);
    }

    // 如果有错误，抛出异常
    if (result.summary.errors > 0) {
      throw new Error(`API一致性验证失败：发现 ${result.summary.errors} 个错误`);
    }
    
    console.log('✅ API一致性验证通过！');
    
  } catch (error) {
    console.error('❌ API一致性验证失败:', error);
    throw error;
  }
}