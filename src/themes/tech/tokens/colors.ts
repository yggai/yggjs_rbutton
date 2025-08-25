/**
 * 科技风主题 - 颜色系统设计令牌
 * 
 * 定义科技风主题的完整色彩体系
 * 采用语义化命名和分层结构，支持深色/浅色模式
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import type { ColorSystem } from '../../../core/types';

/**
 * 科技风主题颜色系统
 * 
 * 特点：
 * - 以蓝色为主基调，体现科技感
 * - 渐变和发光效果的支持
 * - 高对比度和可访问性考量
 * - 深色模式友好
 */
export const techColorTokens: ColorSystem = {
  /**
   * 主色系 - 科技蓝
   * 用于主要交互元素、品牌色彩
   */
  primary: {
    50: '#e6f3ff',   // 最浅蓝，用于背景和hover状态
    100: '#b3d9ff',  // 浅蓝，用于禁用状态文字
    200: '#80bfff',  // 较浅蓝，用于边框和分割线
    300: '#4da6ff',  // 中浅蓝，用于次要元素
    400: '#1a8cff',  // 中蓝，用于悬停状态
    500: '#0066cc',  // 标准蓝，主要品牌色
    600: '#0052a3',  // 较深蓝，用于按下状态
    700: '#003d7a',  // 深蓝，用于文字和边框
    800: '#002951',  // 很深蓝，用于标题和强调
    900: '#001428',  // 最深蓝，用于深色背景
  },

  /**
   * 次要色系 - 青色
   * 用于辅助元素、信息提示
   */
  secondary: {
    50: '#e6ffff',   // 最浅青
    100: '#b3ffff',  // 浅青
    200: '#80ffff',  // 较浅青
    300: '#4dffff',  // 中浅青
    400: '#1affff',  // 中青
    500: '#00e6e6',  // 标准青
    600: '#00b3b3',  // 较深青
    700: '#008080',  // 深青
    800: '#004d4d',  // 很深青
    900: '#001a1a',  // 最深青
  },

  /**
   * 危险色系 - 科技红
   * 用于错误状态、警告元素
   */
  danger: {
    50: '#ffe6e6',   // 最浅红
    100: '#ffb3b3',  // 浅红
    200: '#ff8080',  // 较浅红
    300: '#ff4d4d',  // 中浅红
    400: '#ff1a1a',  // 中红
    500: '#e60000',  // 标准红
    600: '#b30000',  // 较深红
    700: '#800000',  // 深红
    800: '#4d0000',  // 很深红
    900: '#1a0000',  // 最深红
  },

  /**
   * 成功色系 - 科技绿
   * 用于成功状态、确认操作
   */
  success: {
    50: '#e6ffe6',   // 最浅绿
    100: '#b3ffb3',  // 浅绿
    200: '#80ff80',  // 较浅绿
    300: '#4dff4d',  // 中浅绿
    400: '#1aff1a',  // 中绿
    500: '#00e600',  // 标准绿
    600: '#00b300',  // 较深绿
    700: '#008000',  // 深绿
    800: '#004d00',  // 很深绿
    900: '#001a00',  // 最深绿
  },

  /**
   * 中性色系 - 科技灰
   * 用于文本、背景、边框等基础元素
   */
  neutral: {
    50: '#f8fafc',   // 最浅灰，背景色
    100: '#f1f5f9',  // 浅灰，卡片背景
    200: '#e2e8f0',  // 较浅灰，边框
    300: '#cbd5e1',  // 中浅灰，禁用文字
    400: '#94a3b8',  // 中灰，次要文字
    500: '#64748b',  // 标准灰，正文
    600: '#475569',  // 较深灰，副标题
    700: '#334155',  // 深灰，标题
    800: '#1e293b',  // 很深灰，强调文字
    900: '#0f172a',  // 最深灰，深色背景
  },

  /**
   * 语义化颜色
   * 根据使用场景定义的语义化色彩
   */
  semantic: {
    /**
     * 背景颜色系统
     */
    background: '#0a0e16',      // 深色科技背景
    surface: '#1a1f2e',        // 表面背景，比background亮一级
    
    /**
     * 边框颜色系统
     */
    border: '#2a3441',         // 默认边框色
    
    /**
     * 文字颜色系统
     */
    text: {
      primary: '#e2e8f0',      // 主要文字，高对比度
      secondary: '#94a3b8',    // 次要文字，中对比度
      disabled: '#475569',     // 禁用文字，低对比度
    },
    
    /**
     * 阴影颜色
     */
    shadow: 'rgba(0, 102, 204, 0.3)',  // 蓝色阴影，科技感
    
    /**
     * 遮罩颜色
     */
    overlay: 'rgba(10, 14, 22, 0.8)',  // 半透明遮罩
  },
};

/**
 * 科技风主题颜色变体
 * 支持浅色模式的颜色系统
 */
export const techColorTokensLight: ColorSystem = {
  ...techColorTokens,
  
  /**
   * 浅色模式下的语义化颜色覆盖
   */
  semantic: {
    background: '#ffffff',      // 白色背景
    surface: '#f8fafc',        // 浅灰表面
    border: '#e2e8f0',         // 浅色边框
    text: {
      primary: '#1e293b',      // 深色主要文字
      secondary: '#475569',    // 深色次要文字
      disabled: '#94a3b8',     // 禁用文字保持中等对比度
    },
    shadow: 'rgba(0, 102, 204, 0.15)', // 浅色模式下更淡的阴影
    overlay: 'rgba(0, 0, 0, 0.5)',     // 深色遮罩在浅色背景上
  },
};

/**
 * 科技风主题渐变色定义
 * 用于特殊效果和装饰元素
 */
export const techGradients = {
  /**
   * 主要渐变 - 科技蓝渐变
   */
  primary: {
    light: 'linear-gradient(135deg, #4da6ff 0%, #0066cc 100%)',
    medium: 'linear-gradient(135deg, #1a8cff 0%, #0052a3 100%)',
    dark: 'linear-gradient(135deg, #0066cc 0%, #003d7a 100%)',
  },
  
  /**
   * 次要渐变 - 青蓝渐变
   */
  secondary: {
    light: 'linear-gradient(135deg, #4dffff 0%, #00e6e6 100%)',
    medium: 'linear-gradient(135deg, #1affff 0%, #00b3b3 100%)',
    dark: 'linear-gradient(135deg, #00e6e6 0%, #008080 100%)',
  },
  
  /**
   * 发光渐变 - 用于glow效果
   */
  glow: {
    primary: 'radial-gradient(circle, rgba(0, 102, 204, 0.3) 0%, transparent 70%)',
    secondary: 'radial-gradient(circle, rgba(0, 230, 230, 0.3) 0%, transparent 70%)',
    danger: 'radial-gradient(circle, rgba(230, 0, 0, 0.3) 0%, transparent 70%)',
    success: 'radial-gradient(circle, rgba(0, 230, 0, 0.3) 0%, transparent 70%)',
  },
  
  /**
   * 背景渐变
   */
  background: {
    primary: 'linear-gradient(180deg, #0a0e16 0%, #1a1f2e 100%)',
    surface: 'linear-gradient(135deg, #1a1f2e 0%, #2a3441 100%)',
  },
};

/**
 * 科技风主题颜色工具函数
 * 提供颜色操作和计算功能
 */
export const techColorUtils = {
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
   * 生成发光效果的box-shadow
   * 
   * @param color - 发光颜色
   * @param intensity - 强度 (0-1)
   * @returns box-shadow CSS值
   */
  generateGlow(color: string, intensity: number = 0.5): string {
    const alpha = intensity * 0.6;
    const glowColor = this.withAlpha(color, alpha);
    
    return [
      `0 0 5px ${glowColor}`,
      `0 0 10px ${glowColor}`,
      `0 0 15px ${glowColor}`,
      `0 0 20px ${this.withAlpha(color, alpha * 0.7)}`,
    ].join(', ');
  },

  /**
   * 生成科技感边框
   * 
   * @param color - 边框颜色
   * @param variant - 变体类型
   * @returns border CSS值
   */
  generateTechBorder(color: string, variant: 'solid' | 'gradient' | 'animated' = 'solid'): string {
    switch (variant) {
      case 'gradient':
        return `2px solid transparent`;
      case 'animated':
        return `1px solid ${color}`;
      default:
        return `1px solid ${color}`;
    }
  },

  /**
   * 根据背景色自动选择文字颜色
   * 
   * @param backgroundColor - 背景颜色
   * @returns 适合的文字颜色
   */
  getContrastText(backgroundColor: string): string {
    // 简化的对比度计算，实际项目中应使用更精确的算法
    if (backgroundColor.includes('#')) {
      const hex = backgroundColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      return luminance > 0.5 ? techColorTokens.neutral[900] : techColorTokens.neutral[50];
    }
    
    // 默认返回浅色文字（适用于深色背景）
    return techColorTokens.neutral[50];
  },
};