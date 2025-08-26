/**
 * 主题系统统一入口
 * 
 * 提供所有主题的注册和访问功能
 * 支持动态主题加载和管理
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

// 核心主题系统
export * from '../core/theme';

// 科技风主题
export {
  techThemeDefinition,
  techThemePresets,
  techThemeUtils,
  registerTechTheme,
  generateTechButtonStyles,
  generateTechResponsiveStyles,
  injectTechThemeVariables,
  initializeTechTheme,
} from './tech';

// 主题注册函数
import { initializeTechTheme } from './tech';

/**
 * 所有可用主题列表
 */
export const availableThemes = {
  tech: 'tech',
} as const;

/**
 * 主题注册器映射
 */
const themeInitializers = {
  tech: initializeTechTheme,
} as const;

/**
 * 批量注册所有主题
 * 
 * @param options - 注册选项
 */
export const registerAllThemes = (options: {
  defaultTheme?: keyof typeof availableThemes;
  enabledThemes?: (keyof typeof availableThemes)[];
  variant?: 'dark' | 'light';
  injectVariables?: boolean;
} = {}): void => {
  const {
    defaultTheme = 'tech',
    enabledThemes = ['tech'],
    variant = 'dark',
    injectVariables = true,
  } = options;
  
  console.info('🎨 开始注册主题系统...');
  
  try {
    enabledThemes.forEach((themeKey) => {
      const isDefault = themeKey === defaultTheme;
      const initializer = themeInitializers[themeKey];
      
      if (initializer) {
        initializer({
          setAsDefault: isDefault,
          variant: isDefault ? variant : 'dark',
          injectVariables: isDefault ? injectVariables : false,
        });
      } else {
        console.warn(`⚠️ 未找到主题初始化器: ${themeKey}`);
      }
    });
    
    console.info(`✅ 主题系统注册完成，共注册 ${enabledThemes.length} 个主题，默认主题: ${defaultTheme}`);
  } catch (error) {
    console.error('❌ 主题系统注册失败:', error);
    throw error;
  }
};

/**
 * 异步加载主题
 * 
 * @param themeId - 主题ID
 * @returns Promise
 */
export const loadThemeAsync = async (themeId: keyof typeof availableThemes): Promise<void> => {
  const initializer = themeInitializers[themeId];
  
  if (!initializer) {
    throw new Error(`未知的主题ID: ${themeId}`);
  }
  
  return new Promise((resolve, reject) => {
    try {
      initializer({
        setAsDefault: false,
        injectVariables: false,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 主题系统快速启动函数
 * 
 * 用于应用启动时快速初始化主题系统
 * 
 * @param config - 启动配置
 */
export const bootstrapThemeSystem = (config?: {
  defaultTheme?: keyof typeof availableThemes;
  variant?: 'dark' | 'light';
  detectSystemTheme?: boolean;
}): void => {
  const {
    defaultTheme = 'tech',
    variant = 'dark',
    detectSystemTheme = true,
  } = config || {};
  
  // 检测系统主题偏好
  let finalVariant = variant;
  if (detectSystemTheme && typeof window !== 'undefined') {
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        finalVariant = 'dark';
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        finalVariant = 'light';
      }
    } catch {
      // 忽略不支持的浏览器
    }
  }
  
  // 注册所有主题
  registerAllThemes({
    defaultTheme,
    variant: finalVariant,
    injectVariables: true,
  });
  
  console.info(`🚀 主题系统启动完成，当前主题: ${defaultTheme}-${finalVariant}`);
};