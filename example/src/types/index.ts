/**
 * 示例项目的类型定义
 * 包含所有示例组件和工具函数的类型声明
 */

import type { ComponentType, CSSProperties } from 'react';

/**
 * 示例演示分组的类型定义
 */
export interface ExampleGroup {
  /** 分组标题 */
  title: string;
  /** 分组描述 */
  description: string;
  /** 分组唯一标识 */
  id: string;
  /** 分组图标 */
  icon?: string;
}

/**
 * 示例演示项的类型定义
 */
export interface ExampleItem {
  /** 示例标题 */
  title: string;
  /** 示例描述 */
  description: string;
  /** 示例组件 */
  component: ComponentType;
  /** 示例代码字符串 */
  code: string;
  /** 所属分组ID */
  groupId: string;
  /** 示例唯一标识 */
  id: string;
  /** 是否为交互式示例 */
  interactive?: boolean;
}

/**
 * 主题模式类型
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 应用程序状态类型
 */
export interface AppState {
  /** 当前主题模式 */
  theme: ThemeMode;
  /** 当前选中的示例ID */
  selectedExampleId: string | null;
  /** 是否显示代码 */
  showCode: boolean;
  /** 语言方向 */
  direction: 'ltr' | 'rtl';
}

/**
 * 代码高亮的语言类型
 */
export type CodeLanguage = 'tsx' | 'typescript' | 'javascript' | 'css' | 'json';

/**
 * 代码示例配置
 */
export interface CodeExampleConfig {
  /** 语言类型 */
  language: CodeLanguage;
  /** 代码内容 */
  code: string;
  /** 是否显示行号 */
  showLineNumbers?: boolean;
  /** 高亮的行号 */
  highlightLines?: number[];
  /** 标题 */
  title?: string;
}

/**
 * 图标组件的props类型
 */
export interface IconProps {
  /** 图标尺寸 */
  size?: number;
  /** 图标颜色 */
  color?: string;
  /** 额外的类名 */
  className?: string;
  /** 图标样式 */
  style?: CSSProperties;
}

/**
 * 演示面板的配置类型
 */
export interface DemoPanelConfig {
  /** 面板标题 */
  title: string;
  /** 面板描述 */
  description?: string;
  /** 是否可折叠 */
  collapsible?: boolean;
  /** 默认是否折叠 */
  defaultCollapsed?: boolean;
  /** 面板类型 */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}