/**
 * 极简主题 - 主入口文件
 * 
 * 提供极简主题的完整导出和集成接口
 * 与科技风主题形成对比的简洁纯净设计体系
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

// 导入主题定义
import minimalThemeDefinition from './tokens';

// 导出主题定义作为默认导出
export default minimalThemeDefinition;

// 导出主题定义的具名导出
export { minimalThemeDefinition };

// 导出所有组件
export * from './components';

// 导出样式系统
export * from './styles';

// 导出类型定义
export * from './types';

// 导出Hooks系统
export * from './hooks';

// 重新导出所有设计令牌，方便按需导入
export {
  // 颜色系统
  minimalColorTokens,
  minimalColorTokensLight,
  minimalColorTokensDark,
  minimalColorUtils,
  
  // 字体系统
  minimalTypographyTokens,
  minimalTypographyPresets,
  minimalTypographyUtils,
  
  // 间距系统
  minimalSpacingTokens,
  minimalSpacingPresets,
  minimalSpacingUtils,
  
  // 动画和效果系统
  minimalAnimationTokens,
  minimalShadowTokens,
  minimalShadowTokensDark,
  minimalBorderRadiusTokens,
  minimalEffectsPresets,
  minimalAnimationUtils,
} from './tokens';

/**
 * 极简主题的快速配置对象
 * 提供开箱即用的主题配置
 */
export const minimalThemeConfig = {
  /**
   * 主题标识信息
   */
  id: 'minimal',
  name: '极简主题',
  category: 'minimal',
  
  /**
   * 主题应用配置
   */
  apply: {
    // 默认使用浅色模式
    colorMode: 'light' as const,
    
    // 启用响应式设计
    responsive: true,
    
    // 启用微妙动画效果
    animations: true,
    
    // 尊重用户动画偏好
    respectMotionPreference: true,
    
    // 启用高对比度支持
    highContrast: true,
  },
  
  /**
   * 主题切换配置
   */
  transition: {
    // 主题切换动画持续时间
    duration: '300ms',
    
    // 主题切换缓动函数
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    
    // 需要过渡的属性
    properties: [
      'background-color',
      'border-color', 
      'color',
      'box-shadow'
    ],
  },
  
  /**
   * 主题特有的CSS类名前缀
   */
  cssPrefix: 'minimal',
  
  /**
   * 主题级别的全局样式
   */
  globalStyles: {
    // 设置全局字体
    fontFamily: minimalThemeDefinition.typography.fontFamily.sans.join(', '),
    
    // 设置全局文字颜色
    color: minimalThemeDefinition.colors.default.semantic.text.primary,
    
    // 设置全局背景色
    backgroundColor: minimalThemeDefinition.colors.default.semantic.background,
    
    // 优化字体渲染
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    
    // 设置滚动条样式（WebKit）
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: minimalThemeDefinition.colors.default.neutral[200],
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: minimalThemeDefinition.colors.default.neutral[400],
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: minimalThemeDefinition.colors.default.neutral[500],
    },
  },
};

/**
 * 创建极简主题提供者的工厂函数
 * 
 * @param customConfig - 自定义配置
 * @returns 主题提供者配置
 */
export function createMinimalThemeProvider(customConfig?: Partial<typeof minimalThemeConfig>) {
  return {
    ...minimalThemeConfig,
    ...customConfig,
    theme: minimalThemeDefinition,
  };
}

/**
 * 极简主题的元数据信息
 * 用于主题管理和选择界面
 */
export const minimalThemeMetadata = {
  // 主题标识
  id: 'minimal',
  
  // 显示名称
  displayName: '极简主题',
  
  // 主题描述
  description: '追求纯净简洁的设计美学，以灰度色彩和微妙效果营造优雅平静的使用体验',
  
  // 主题预览色彩
  previewColors: {
    primary: minimalThemeDefinition.colors.default.primary[500],
    secondary: minimalThemeDefinition.colors.default.secondary[500],
    background: minimalThemeDefinition.colors.default.semantic.background,
    surface: minimalThemeDefinition.colors.default.semantic.surface,
    text: minimalThemeDefinition.colors.default.semantic.text.primary,
  },
  
  // 主题特性标签
  tags: ['简约', '灰度', '优雅', '阅读友好', '经典'],
  
  // 适用场景
  useCases: [
    '内容阅读类应用',
    '文档和写作工具', 
    '办公应用界面',
    '极简设计偏好用户',
    '长时间使用的工具',
  ],
  
  // 与科技风主题的差异说明
  differences: {
    colors: '使用灰度为主的色彩体系，避免强烈色彩冲击',
    animations: '采用温和微妙的过渡效果，避免视觉干扰',
    typography: '优先使用系统字体，强调可读性和一致性',
    spacing: '提供充分的呼吸空间，提升内容的舒适感',
    shadows: '使用极其微妙的阴影，保持界面的轻盈感',
  },
  
  // 主题版本信息
  version: '1.0.0',
  
  // 创建时间
  createdAt: new Date().toISOString(),
  
  // 作者信息
  author: 'YggJS Team',
};