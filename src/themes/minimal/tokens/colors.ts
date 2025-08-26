/**
 * 极简主题 - 颜色系统设计令牌
 * 
 * 定义极简主题的完整色彩体系
 * 采用克制的色彩搭配，以灰度为主，少量强调色
 * 追求纯净、简洁、优雅的视觉效果
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import type { ColorSystem } from '../../../core/types';

/**
 * 极简主题颜色系统
 * 
 * 特点：
 * - 以灰度为主基调，体现简约感
 * - 使用温和的强调色，避免视觉冲击
 * - 高对比度确保可读性
 * - 支持深色和浅色模式的无缝切换
 */
export const minimalColorTokens: ColorSystem = {
  /**
   * 主色系 - 深灰蓝
   * 用于主要交互元素、强调内容
   */
  primary: {
    50: '#f8f9fa',   // 最浅灰，用于背景和subtle状态
    100: '#e9ecef',  // 浅灰，用于禁用状态文字
    200: '#dee2e6',  // 较浅灰，用于边框和分割线
    300: '#ced4da',  // 中浅灰，用于次要元素
    400: '#adb5bd',  // 中灰，用于placeholder和辅助文字
    500: '#6c757d',  // 标准灰，主要品牌色
    600: '#495057',  // 较深灰，用于悬停状态
    700: '#343a40',  // 深灰，用于文字和重要元素
    800: '#212529',  // 很深灰，用于标题和强调
    900: '#000000',  // 纯黑，用于最高对比度文字
  },

  /**
   * 次要色系 - 暖灰
   * 用于辅助元素、温和的交互反馈
   */
  secondary: {
    50: '#fafafa',   // 最浅暖灰
    100: '#f5f5f5',  // 浅暖灰
    200: '#eeeeee',  // 较浅暖灰
    300: '#e0e0e0',  // 中浅暖灰
    400: '#bdbdbd',  // 中暖灰
    500: '#9e9e9e',  // 标准暖灰
    600: '#757575',  // 较深暖灰
    700: '#616161',  // 深暖灰
    800: '#424242',  // 很深暖灰
    900: '#212121',  // 最深暖灰
  },

  /**
   * 危险色系 - 克制的红色
   * 用于错误状态、警告元素，保持极简风格
   */
  danger: {
    50: '#fef2f2',   // 最浅红
    100: '#fee2e2',  // 浅红
    200: '#fecaca',  // 较浅红
    300: '#fca5a5',  // 中浅红
    400: '#f87171',  // 中红
    500: '#ef4444',  // 标准红，温和但清晰
    600: '#dc2626',  // 较深红
    700: '#b91c1c',  // 深红
    800: '#991b1b',  // 很深红
    900: '#7f1d1d',  // 最深红
  },

  /**
   * 成功色系 - 自然绿
   * 用于成功状态、确认操作，融入自然感
   */
  success: {
    50: '#f0fdf4',   // 最浅绿
    100: '#dcfce7',  // 浅绿
    200: '#bbf7d0',  // 较浅绿
    300: '#86efac',  // 中浅绿
    400: '#4ade80',  // 中绿
    500: '#22c55e',  // 标准绿，自然清新
    600: '#16a34a',  // 较深绿
    700: '#15803d',  // 深绿
    800: '#166534',  // 很深绿
    900: '#14532d',  // 最深绿
  },

  /**
   * 中性色系 - 纯净灰度
   * 用于文本、背景、边框等基础元素
   * 追求最纯净的灰度体验
   */
  neutral: {
    50: '#ffffff',   // 纯白，主要背景色
    100: '#f9fafb',  // 接近白，卡片背景
    200: '#f3f4f6',  // 浅灰，区域分隔
    300: '#e5e7eb',  // 较浅灰，边框
    400: '#d1d5db',  // 中浅灰，禁用文字
    500: '#9ca3af',  // 标准灰，次要文字
    600: '#6b7280',  // 较深灰，正文
    700: '#4b5563',  // 深灰，副标题
    800: '#374151',  // 很深灰，标题
    900: '#1f2937',  // 最深灰，强调文字
  },

  /**
   * 语义化颜色
   * 根据使用场景定义的语义化色彩
   */
  semantic: {
    /**
     * 背景颜色系统
     */
    background: '#ffffff',      // 纯白背景，极简纯净
    surface: '#f9fafb',        // 表面背景，比background略深
    
    /**
     * 边框颜色系统
     */
    border: '#e5e7eb',         // 默认边框色，温和不突兀
    
    /**
     * 文字颜色系统
     */
    text: {
      primary: '#1f2937',      // 主要文字，深灰而非纯黑
      secondary: '#6b7280',    // 次要文字，温和的灰色
      disabled: '#d1d5db',     // 禁用文字，浅灰色
    },
    
    /**
     * 阴影颜色
     */
    shadow: 'rgba(0, 0, 0, 0.05)',  // 极淡的阴影，几乎不可见
    
    /**
     * 遮罩颜色
     */
    overlay: 'rgba(255, 255, 255, 0.95)',  // 白色遮罩，保持纯净感
  },
};

/**
 * 极简主题颜色变体
 * 支持深色模式的颜色系统
 */
export const minimalColorTokensLight: ColorSystem = {
  ...minimalColorTokens,
  // 浅色模式使用默认配置
};

/**
 * 极简主题深色模式颜色系统
 */
export const minimalColorTokensDark: ColorSystem = {
  ...minimalColorTokens,
  
  /**
   * 深色模式下的主色系调整
   */
  primary: {
    50: '#1f2937',   // 深色模式反转
    100: '#374151',
    200: '#4b5563', 
    300: '#6b7280',
    400: '#9ca3af',
    500: '#d1d5db',  // 深色模式下的标准色
    600: '#e5e7eb',
    700: '#f3f4f6',
    800: '#f9fafb',
    900: '#ffffff',
  },

  /**
   * 深色模式下的中性色调整
   */
  neutral: {
    50: '#0f172a',   // 深蓝黑，作为深色背景
    100: '#1e293b',  // 深蓝灰
    200: '#334155',  // 较深蓝灰
    300: '#475569',  // 中深蓝灰
    400: '#64748b',  // 中等蓝灰
    500: '#94a3b8',  // 标准蓝灰
    600: '#cbd5e1',  // 浅蓝灰
    700: '#e2e8f0',  // 很浅蓝灰
    800: '#f1f5f9',  // 接近白的蓝灰
    900: '#ffffff',  // 纯白
  },
  
  /**
   * 深色模式下的语义化颜色覆盖
   */
  semantic: {
    background: '#0f172a',      // 深色背景
    surface: '#1e293b',        // 深色表面
    border: '#334155',         // 深色边框
    text: {
      primary: '#f1f5f9',      // 浅色主要文字
      secondary: '#94a3b8',    // 浅色次要文字
      disabled: '#475569',     // 深色模式禁用文字
    },
    shadow: 'rgba(0, 0, 0, 0.3)',     // 深色模式阴影
    overlay: 'rgba(15, 23, 42, 0.95)', // 深色遮罩
  },
};

/**
 * 极简主题颜色工具函数
 * 提供颜色操作和计算功能，专为极简主题优化
 */
export const minimalColorUtils = {
  /**
   * 获取颜色的透明度变体
   * 
   * @param color - 基础颜色
   * @param alpha - 透明度 (0-1)
   * @returns RGBA颜色字符串
   */
  withAlpha(color: string, alpha: number): string {
    // 如果已经是rgba格式，替换alpha值
    if (color.startsWith('rgba')) {
      return color.replace(/[\d.]+\)$/g, `${alpha})`);
    }
    
    // 如果是hex格式，转换为rgba
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    // 如果是rgb格式，转换为rgba
    if (color.startsWith('rgb')) {
      return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
    }
    
    return color;
  },

  /**
   * 生成极简风格的微妙阴影
   * 
   * @param color - 阴影颜色
   * @param intensity - 强度 (0-1)，极简主题建议使用0.05-0.1
   * @returns box-shadow CSS值
   */
  generateSubtleShadow(color: string = '#000000', intensity: number = 0.05): string {
    const shadowColor = this.withAlpha(color, intensity);
    
    return [
      `0 1px 3px ${shadowColor}`,
      `0 1px 2px ${this.withAlpha(color, intensity * 0.8)}`,
    ].join(', ');
  },

  /**
   * 生成极简风格的边框
   * 
   * @param color - 边框颜色
   * @param width - 边框宽度，默认1px
   * @returns border CSS值
   */
  generateCleanBorder(color: string, width: number = 1): string {
    return `${width}px solid ${color}`;
  },

  /**
   * 根据背景色自动选择文字颜色（极简版本）
   * 
   * @param backgroundColor - 背景颜色
   * @returns 适合的文字颜色
   */
  getOptimalTextColor(backgroundColor: string): string {
    // 简化的对比度计算
    if (backgroundColor.includes('#')) {
      const hex = backgroundColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      return luminance > 0.5 
        ? minimalColorTokens.neutral[900] 
        : minimalColorTokens.neutral[50];
    }
    
    // 默认返回深色文字（适用于浅色背景）
    return minimalColorTokens.neutral[900];
  },

  /**
   * 创建极简主题的状态颜色
   * 
   * @param baseColor - 基础颜色
   * @returns 状态颜色对象
   */
  createStateColors(baseColor: string) {
    return {
      default: baseColor,
      hover: this.withAlpha(baseColor, 0.8),
      active: this.withAlpha(baseColor, 0.9),
      disabled: this.withAlpha(baseColor, 0.4),
      focus: this.withAlpha(baseColor, 0.2), // 极淡的焦点色
    };
  },

  /**
   * 生成极简主题的色彩层级
   * 用于创建视觉层次，但保持克制
   * 
   * @param baseColor - 基础颜色
   * @returns 层级颜色数组
   */
  generateColorHierarchy(baseColor: string): string[] {
    return [
      this.withAlpha(baseColor, 0.05), // 最淡层级
      this.withAlpha(baseColor, 0.1),  // 淡层级
      this.withAlpha(baseColor, 0.2),  // 中等层级
      baseColor,                       // 标准层级
    ];
  },
};