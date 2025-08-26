/**
 * 极简主题 - 组件集合
 * 
 * 导出极简主题的所有组件，方便统一管理和使用
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

// 导出主要的按钮组件
export { MinimalButton, MinimalButtonShowcase } from './MinimalButton';

// 导出按钮相关的工具
// export type { MinimalButtonProps } from './MinimalButton';
export { MinimalButtonUtils, defaultMinimalButtonProps } from './MinimalButton';

/**
 * 极简主题组件注册表
 * 用于动态加载和管理组件
 */
export const minimalComponentRegistry = {
  /**
   * 按钮组件
   */
  Button: {
    component: 'MinimalButton',
    displayName: '极简按钮',
    description: '简洁优雅的按钮组件，专注于内容可读性',
    category: 'input',
    tags: ['button', 'interaction', 'minimal'],
    version: '1.0.0',
  },
  
  /**
   * 按钮展示组件
   */
  ButtonShowcase: {
    component: 'MinimalButtonShowcase',
    displayName: '按钮展示',
    description: '展示极简按钮的各种配置和用法示例',
    category: 'showcase',
    tags: ['showcase', 'example', 'demo'],
    version: '1.0.0',
  },
} as const;

/**
 * 极简主题组件统计信息
 */
export const minimalComponentStats = {
  totalComponents: Object.keys(minimalComponentRegistry).length,
  categories: [...new Set(Object.values(minimalComponentRegistry).map(c => c.category))],
  lastUpdated: new Date().toISOString(),
  themeVersion: '1.0.0',
};

/**
 * 获取极简主题组件信息
 * 
 * @param componentName - 组件名称
 * @returns 组件信息对象
 */
export function getMinimalComponentInfo(componentName: keyof typeof minimalComponentRegistry) {
  return minimalComponentRegistry[componentName];
}

/**
 * 根据分类获取组件列表
 * 
 * @param category - 组件分类
 * @returns 组件列表
 */
export function getComponentsByCategory(category: string) {
  return Object.entries(minimalComponentRegistry)
    .filter(([, info]) => info.category === category)
    .map(([name, info]) => ({ name, ...info }));
}

/**
 * 根据标签搜索组件
 * 
 * @param tag - 搜索标签
 * @returns 匹配的组件列表
 */
export function searchComponentsByTag(tag: string) {
  return Object.entries(minimalComponentRegistry)
    .filter(([, info]) => (info.tags as readonly string[]).includes(tag))
    .map(([name, info]) => ({ name, ...info }));
}