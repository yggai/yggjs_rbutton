/**
 * 科技风主题 - 字体系统设计令牌
 * 
 * 定义科技风主题的完整字体排版体系
 * 采用现代无衬线字体，强调清晰度和未来感
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import type { TypographySystem } from '../../../core/types';

/**
 * 科技风主题字体系统
 * 
 * 特点：
 * - 使用现代无衬线字体族
 * - 支持可变字重
 * - 优化的字间距和行高
 * - 响应式字体大小
 */
export const techTypographyTokens: TypographySystem = {
  /**
   * 字体族定义
   * 优先使用系统字体，确保性能和一致性
   */
  fontFamily: {
    /**
     * 无衬线字体族 - 主要用于界面文字
     * 科技感强的现代字体
     */
    sans: [
      'Inter',                    // 现代几何无衬线字体
      'SF Pro Display',           // Apple 系统字体
      'Segoe UI',                 // Windows 系统字体
      'Roboto',                   // Google 字体
      '-apple-system',            // iOS Safari
      'BlinkMacSystemFont',       // macOS Chrome
      'system-ui',                // 系统UI字体
      'sans-serif',               // 降级选项
    ],

    /**
     * 衬线字体族 - 用于强调和装饰
     * 保留传统，但很少使用
     */
    serif: [
      'Georgia',
      'Cambria',
      'Times New Roman',
      'serif',
    ],

    /**
     * 等宽字体族 - 用于代码和数据显示
     * 科技感突出，适合显示技术信息
     */
    mono: [
      'SF Mono',                  // Apple 等宽字体
      'Monaco',                   // macOS 等宽字体
      'Inconsolata',              // 开源等宽字体
      'Roboto Mono',              // Google 等宽字体
      'Source Code Pro',          // Adobe 等宽字体
      'Menlo',                    // macOS 终端字体
      'Consolas',                 // Windows 等宽字体
      'monospace',                // 降级选项
    ],
  },

  /**
   * 字体大小系统
   * 采用比例缩放，支持响应式设计
   * 基础尺寸：16px
   * 缩放比例：1.25 (大四度)
   */
  fontSize: {
    /**
     * 超小号文字 - 12px
     * 用于标签、版权信息等
     */
    xs: '0.75rem',

    /**
     * 小号文字 - 14px
     * 用于辅助信息、次要文字
     */
    sm: '0.875rem',

    /**
     * 基础文字 - 16px
     * 用于正文、按钮文字等
     */
    base: '1rem',

    /**
     * 大号文字 - 18px
     * 用于副标题、重要信息
     */
    lg: '1.125rem',

    /**
     * 超大号文字 - 20px
     * 用于小标题
     */
    xl: '1.25rem',

    /**
     * 二级标题 - 24px
     */
    '2xl': '1.5rem',

    /**
     * 一级标题 - 30px
     */
    '3xl': '1.875rem',

    /**
     * 大标题 - 36px
     */
    '4xl': '2.25rem',

    /**
     * 超大标题 - 48px
     * 用于hero区域、重要标题
     */
    '5xl': '3rem',
  },

  /**
   * 字体权重系统
   * 使用数字值，支持可变字体
   */
  fontWeight: {
    /**
     * 细体 - 100
     * 很少使用，仅用于特殊装饰
     */
    thin: 100,

    /**
     * 轻体 - 300
     * 用于大标题的轻盈效果
     */
    light: 300,

    /**
     * 正常 - 400
     * 默认字重，用于正文
     */
    normal: 400,

    /**
     * 中等 - 500
     * 用于强调文字、次要标题
     */
    medium: 500,

    /**
     * 半粗体 - 600
     * 用于小标题、按钮文字
     */
    semibold: 600,

    /**
     * 粗体 - 700
     * 用于重要标题、强调文字
     */
    bold: 700,

    /**
     * 超粗体 - 800
     * 用于品牌标题、hero文字
     */
    extrabold: 800,
  },

  /**
   * 行高系统
   * 采用相对值，确保不同字号的协调性
   */
  lineHeight: {
    /**
     * 紧凑行高 - 1.25
     * 用于大标题、hero文字
     */
    tight: 1.25,

    /**
     * 紧密行高 - 1.375
     * 用于副标题、卡片标题
     */
    snug: 1.375,

    /**
     * 正常行高 - 1.5
     * 默认行高，用于正文
     */
    normal: 1.5,

    /**
     * 放松行高 - 1.625
     * 用于长文本阅读
     */
    relaxed: 1.625,

    /**
     * 宽松行高 - 2
     * 用于特殊布局需求
     */
    loose: 2,
  },

  /**
   * 字母间距系统
   * 使用em单位，相对于字体大小
   */
  letterSpacing: {
    /**
     * 更紧密 - -0.05em
     * 用于大标题的紧凑效果
     */
    tighter: '-0.05em',

    /**
     * 紧密 - -0.025em
     * 用于副标题
     */
    tight: '-0.025em',

    /**
     * 正常 - 0
     * 默认字母间距
     */
    normal: '0',

    /**
     * 宽松 - 0.025em
     * 用于按钮文字、小标题
     */
    wide: '0.025em',

    /**
     * 更宽松 - 0.05em
     * 用于全大写文字
     */
    wider: '0.05em',

    /**
     * 最宽松 - 0.1em
     * 用于特殊效果
     */
    widest: '0.1em',
  },
};

/**
 * 科技风主题字体预设
 * 常用的字体样式组合
 */
export const techTypographyPresets = {
  /**
   * 标题样式预设
   */
  headings: {
    /**
     * H1 - 主标题
     */
    h1: {
      fontSize: techTypographyTokens.fontSize['5xl'],
      fontWeight: techTypographyTokens.fontWeight.bold,
      lineHeight: techTypographyTokens.lineHeight.tight,
      letterSpacing: techTypographyTokens.letterSpacing.tighter,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H2 - 二级标题
     */
    h2: {
      fontSize: techTypographyTokens.fontSize['4xl'],
      fontWeight: techTypographyTokens.fontWeight.bold,
      lineHeight: techTypographyTokens.lineHeight.tight,
      letterSpacing: techTypographyTokens.letterSpacing.tight,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H3 - 三级标题
     */
    h3: {
      fontSize: techTypographyTokens.fontSize['3xl'],
      fontWeight: techTypographyTokens.fontWeight.semibold,
      lineHeight: techTypographyTokens.lineHeight.snug,
      letterSpacing: techTypographyTokens.letterSpacing.tight,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H4 - 四级标题
     */
    h4: {
      fontSize: techTypographyTokens.fontSize['2xl'],
      fontWeight: techTypographyTokens.fontWeight.semibold,
      lineHeight: techTypographyTokens.lineHeight.snug,
      letterSpacing: techTypographyTokens.letterSpacing.normal,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H5 - 五级标题
     */
    h5: {
      fontSize: techTypographyTokens.fontSize.xl,
      fontWeight: techTypographyTokens.fontWeight.medium,
      lineHeight: techTypographyTokens.lineHeight.snug,
      letterSpacing: techTypographyTokens.letterSpacing.normal,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H6 - 六级标题
     */
    h6: {
      fontSize: techTypographyTokens.fontSize.lg,
      fontWeight: techTypographyTokens.fontWeight.medium,
      lineHeight: techTypographyTokens.lineHeight.normal,
      letterSpacing: techTypographyTokens.letterSpacing.normal,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },
  },

  /**
   * 正文样式预设
   */
  body: {
    /**
     * 大正文
     */
    large: {
      fontSize: techTypographyTokens.fontSize.lg,
      fontWeight: techTypographyTokens.fontWeight.normal,
      lineHeight: techTypographyTokens.lineHeight.relaxed,
      letterSpacing: techTypographyTokens.letterSpacing.normal,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 标准正文
     */
    base: {
      fontSize: techTypographyTokens.fontSize.base,
      fontWeight: techTypographyTokens.fontWeight.normal,
      lineHeight: techTypographyTokens.lineHeight.normal,
      letterSpacing: techTypographyTokens.letterSpacing.normal,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 小正文
     */
    small: {
      fontSize: techTypographyTokens.fontSize.sm,
      fontWeight: techTypographyTokens.fontWeight.normal,
      lineHeight: techTypographyTokens.lineHeight.normal,
      letterSpacing: techTypographyTokens.letterSpacing.normal,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },
  },

  /**
   * 按钮文字样式预设
   */
  button: {
    /**
     * 大按钮文字
     */
    large: {
      fontSize: techTypographyTokens.fontSize.base,
      fontWeight: techTypographyTokens.fontWeight.semibold,
      lineHeight: techTypographyTokens.lineHeight.tight,
      letterSpacing: techTypographyTokens.letterSpacing.wide,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 中等按钮文字
     */
    medium: {
      fontSize: techTypographyTokens.fontSize.sm,
      fontWeight: techTypographyTokens.fontWeight.medium,
      lineHeight: techTypographyTokens.lineHeight.tight,
      letterSpacing: techTypographyTokens.letterSpacing.wide,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 小按钮文字
     */
    small: {
      fontSize: techTypographyTokens.fontSize.xs,
      fontWeight: techTypographyTokens.fontWeight.medium,
      lineHeight: techTypographyTokens.lineHeight.tight,
      letterSpacing: techTypographyTokens.letterSpacing.wider,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },
  },

  /**
   * 标签样式预设
   */
  label: {
    /**
     * 表单标签
     */
    form: {
      fontSize: techTypographyTokens.fontSize.sm,
      fontWeight: techTypographyTokens.fontWeight.medium,
      lineHeight: techTypographyTokens.lineHeight.normal,
      letterSpacing: techTypographyTokens.letterSpacing.normal,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 状态标签
     */
    status: {
      fontSize: techTypographyTokens.fontSize.xs,
      fontWeight: techTypographyTokens.fontWeight.semibold,
      lineHeight: techTypographyTokens.lineHeight.tight,
      letterSpacing: techTypographyTokens.letterSpacing.wider,
      fontFamily: techTypographyTokens.fontFamily.sans.join(', '),
      textTransform: 'uppercase' as const,
    },
  },

  /**
   * 代码样式预设
   */
  code: {
    /**
     * 行内代码
     */
    inline: {
      fontSize: '0.9em', // 相对于父元素稍小
      fontWeight: techTypographyTokens.fontWeight.normal,
      fontFamily: techTypographyTokens.fontFamily.mono.join(', '),
    },

    /**
     * 代码块
     */
    block: {
      fontSize: techTypographyTokens.fontSize.sm,
      fontWeight: techTypographyTokens.fontWeight.normal,
      lineHeight: techTypographyTokens.lineHeight.relaxed,
      fontFamily: techTypographyTokens.fontFamily.mono.join(', '),
    },
  },
};

/**
 * 科技风主题字体工具函数
 * 提供字体相关的计算和生成功能
 */
export const techTypographyUtils = {
  /**
   * 生成响应式字体大小
   * 
   * @param baseSize - 基础字体大小
   * @param scale - 缩放比例对象
   * @returns CSS字体大小值
   */
  responsiveFontSize(
    baseSize: string,
    scale: { mobile?: number; tablet?: number; desktop?: number } = {}
  ): string {
    const { mobile = 0.9, tablet = 0.95, desktop = 1 } = scale;
    
    return `clamp(
      calc(${baseSize} * ${mobile}),
      calc(${baseSize} * ${tablet}),
      calc(${baseSize} * ${desktop})
    )`;
  },

  /**
   * 计算最优行高
   * 
   * @param fontSize - 字体大小（px值）
   * @param contentType - 内容类型
   * @returns 行高值
   */
  calculateOptimalLineHeight(
    fontSize: number,
    contentType: 'heading' | 'body' | 'button' = 'body'
  ): number {
    const baseLineHeight = {
      heading: 1.2,
      body: 1.5,
      button: 1.1,
    }[contentType];

    // 字体越大，行高相对值可以越小
    const adjustment = Math.max(0, (20 - fontSize) / 50);
    return baseLineHeight + adjustment;
  },

  /**
   * 生成字体加载CSS
   * 
   * @param fontFamilies - 字体族列表
   * @returns CSS @font-face规则
   */
  generateFontFace(fontFamilies: string[]): string {
    const fontFaceRules = fontFamilies
      .filter(font => !['serif', 'sans-serif', 'monospace', 'system-ui'].includes(font))
      .map(font => {
        return `
          @font-face {
            font-family: '${font}';
            font-display: swap;
            /* 字体文件路径需要根据实际情况配置 */
          }
        `;
      })
      .join('\n');

    return fontFaceRules;
  },

  /**
   * 获取字体回退链
   * 
   * @param primaryFont - 主字体
   * @param type - 字体类型
   * @returns 完整的font-family值
   */
  getFontStack(
    primaryFont: string,
    type: 'sans' | 'serif' | 'mono' = 'sans'
  ): string {
    const fallbacks = techTypographyTokens.fontFamily[type];
    return [primaryFont, ...fallbacks].join(', ');
  },

  /**
   * 生成文字阴影效果
   * 
   * @param color - 阴影颜色
   * @param intensity - 强度
   * @returns text-shadow CSS值
   */
  generateTextShadow(color: string, intensity: number = 0.3): string {
    const alpha = intensity;
    return `0 0 10px ${color.replace(/rgb\(/, 'rgba(').replace(/\)$/, `, ${alpha})`)}`;
  },
};