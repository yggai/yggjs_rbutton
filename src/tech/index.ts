/**
 * 科技风按钮组件模块
 * 
 * 这个模块导出了一个完整的科技风按钮组件系统，包括：
 * - TechButton: 主要的按钮组件
 * - 类型定义: 组件相关的 TypeScript 类型
 * - 样式系统: CSS-in-JS 样式配置
 * 
 * @module TechButton
 * @author Your Name
 * @version 1.0.0
 */

// 导出主要组件
export { TechButton } from './TechButton';

// 导出类型定义
export type {
  TechButtonProps,
  TechButtonSize,
  TechButtonVariant,
  TechButtonStyles,
  TechTheme,
} from './types';

// 导出样式系统（可选，用于高级定制）
export {
  techTheme,
  getTechButtonStyles,
  createTechButtonStyles,
  getVariantHoverStyles,
  getVariantActiveStyles,
  getGlowStyles,
  clearStylesCache,
} from './styles';