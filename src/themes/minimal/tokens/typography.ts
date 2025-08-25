/**
 * 极简主题 - 字体系统设计令牌
 * 
 * 定义极简主题的完整字体排版体系
 * 采用经典、易读的字体，强调内容的可读性和层次感
 * 追求简洁而功能性的字体排版
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import type { TypographySystem } from '../../../core/types';

/**
 * 极简主题字体系统
 * 
 * 特点：
 * - 使用系统默认字体，确保一致性和可读性
 * - 适中的字重变化，避免过度装饰
 * - 舒适的行高和字间距
 * - 清晰的字体大小层级
 */
export const minimalTypographyTokens: TypographySystem = {
  /**
   * 字体族定义
   * 优先使用系统字体，确保跨平台一致性和加载性能
   */
  fontFamily: {
    /**
     * 无衬线字体族 - 主要用于界面文字
     * 选择最易读的系统字体
     */
    sans: [
      '-apple-system',            // iOS/macOS 系统字体
      'BlinkMacSystemFont',       // macOS Chrome
      'Segoe UI',                 // Windows 系统字体
      'Roboto',                   // Android/Chrome 字体
      'Helvetica Neue',           // 经典 Helvetica
      'Arial',                    // 通用 Arial
      'system-ui',                // 系统UI字体
      'sans-serif',               // 降级选项
    ],

    /**
     * 衬线字体族 - 用于长文本阅读
     * 保留经典衬线字体选择
     */
    serif: [
      'Georgia',                  // 经典网络字体
      'Times New Roman',          // 传统衬线字体
      'Times',                    // Times 简版
      'serif',                    // 系统衬线字体
    ],

    /**
     * 等宽字体族 - 用于代码和数据显示
     * 选择清晰度最好的等宽字体
     */
    mono: [
      'SF Mono',                  // Apple 系统等宽字体
      'Monaco',                   // macOS 等宽字体
      'Menlo',                    // macOS 终端字体
      'Consolas',                 // Windows 等宽字体
      'Courier New',              // 传统等宽字体
      'monospace',                // 降级选项
    ],
  },

  /**
   * 字体大小系统
   * 采用合理的比例缩放，确保清晰的视觉层次
   * 基础尺寸：16px
   * 缩放比例：1.2 (小三度)，更加克制
   */
  fontSize: {
    /**
     * 超小号文字 - 12px
     * 用于标签、版权信息、辅助说明
     */
    xs: '0.75rem',

    /**
     * 小号文字 - 14px
     * 用于次要信息、按钮文字
     */
    sm: '0.875rem',

    /**
     * 基础文字 - 16px
     * 用于正文、主要内容
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
     * 一级标题 - 28px
     */
    '3xl': '1.75rem',

    /**
     * 大标题 - 32px
     */
    '4xl': '2rem',

    /**
     * 超大标题 - 36px
     * 用于hero区域、页面主标题
     */
    '5xl': '2.25rem',
  },

  /**
   * 字体权重系统
   * 使用适中的权重变化，保持简洁
   */
  fontWeight: {
    /**
     * 细体 - 200
     * 用于大标题的轻盈效果
     */
    thin: 200,

    /**
     * 轻体 - 300
     * 用于副标题和装饰文字
     */
    light: 300,

    /**
     * 正常 - 400
     * 默认字重，用于正文
     */
    normal: 400,

    /**
     * 中等 - 500
     * 用于强调文字、重要信息
     */
    medium: 500,

    /**
     * 半粗体 - 600
     * 用于小标题、按钮文字
     */
    semibold: 600,

    /**
     * 粗体 - 700
     * 用于标题、强调文字
     */
    bold: 700,

    /**
     * 超粗体 - 800
     * 用于特别强调，极少使用
     */
    extrabold: 800,
  },

  /**
   * 行高系统
   * 采用舒适的行高，提升阅读体验
   */
  lineHeight: {
    /**
     * 紧密行高 - 1.25
     * 用于大标题
     */
    tight: 1.25,

    /**
     * 略紧行高 - 1.375
     * 用于副标题
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
     * 宽松行高 - 1.75
     * 用于特别需要呼吸空间的文本
     */
    loose: 1.75,
  },

  /**
   * 字母间距系统
   * 使用微妙的字间距调整，保持自然感
   */
  letterSpacing: {
    /**
     * 更紧密 - -0.025em
     * 用于大标题的紧凑效果
     */
    tighter: '-0.025em',

    /**
     * 紧密 - -0.0125em
     * 用于副标题
     */
    tight: '-0.0125em',

    /**
     * 正常 - 0
     * 默认字母间距
     */
    normal: '0',

    /**
     * 宽松 - 0.025em
     * 用于按钮文字、强调内容
     */
    wide: '0.025em',

    /**
     * 更宽松 - 0.05em
     * 用于全大写文字
     */
    wider: '0.05em',

    /**
     * 最宽松 - 0.1em
     * 用于特殊设计需求，极少使用
     */
    widest: '0.1em',
  },
};

/**
 * 极简主题字体预设
 * 常用的字体样式组合，追求简洁实用
 */
export const minimalTypographyPresets = {
  /**
   * 标题样式预设
   */
  headings: {
    /**
     * H1 - 主标题
     * 简洁大方的主标题样式
     */
    h1: {
      fontSize: minimalTypographyTokens.fontSize['5xl'],
      fontWeight: minimalTypographyTokens.fontWeight.light,
      lineHeight: minimalTypographyTokens.lineHeight.tight,
      letterSpacing: minimalTypographyTokens.letterSpacing.tighter,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H2 - 二级标题
     */
    h2: {
      fontSize: minimalTypographyTokens.fontSize['4xl'],
      fontWeight: minimalTypographyTokens.fontWeight.light,
      lineHeight: minimalTypographyTokens.lineHeight.tight,
      letterSpacing: minimalTypographyTokens.letterSpacing.tight,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H3 - 三级标题
     */
    h3: {
      fontSize: minimalTypographyTokens.fontSize['3xl'],
      fontWeight: minimalTypographyTokens.fontWeight.normal,
      lineHeight: minimalTypographyTokens.lineHeight.snug,
      letterSpacing: minimalTypographyTokens.letterSpacing.tight,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H4 - 四级标题
     */
    h4: {
      fontSize: minimalTypographyTokens.fontSize['2xl'],
      fontWeight: minimalTypographyTokens.fontWeight.medium,
      lineHeight: minimalTypographyTokens.lineHeight.snug,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H5 - 五级标题
     */
    h5: {
      fontSize: minimalTypographyTokens.fontSize.xl,
      fontWeight: minimalTypographyTokens.fontWeight.medium,
      lineHeight: minimalTypographyTokens.lineHeight.snug,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * H6 - 六级标题
     */
    h6: {
      fontSize: minimalTypographyTokens.fontSize.lg,
      fontWeight: minimalTypographyTokens.fontWeight.semibold,
      lineHeight: minimalTypographyTokens.lineHeight.normal,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },
  },

  /**
   * 正文样式预设
   */
  body: {
    /**
     * 大正文 - 用于重要内容
     */
    large: {
      fontSize: minimalTypographyTokens.fontSize.lg,
      fontWeight: minimalTypographyTokens.fontWeight.normal,
      lineHeight: minimalTypographyTokens.lineHeight.relaxed,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 标准正文 - 默认正文样式
     */
    base: {
      fontSize: minimalTypographyTokens.fontSize.base,
      fontWeight: minimalTypographyTokens.fontWeight.normal,
      lineHeight: minimalTypographyTokens.lineHeight.normal,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 小正文 - 用于次要信息
     */
    small: {
      fontSize: minimalTypographyTokens.fontSize.sm,
      fontWeight: minimalTypographyTokens.fontWeight.normal,
      lineHeight: minimalTypographyTokens.lineHeight.normal,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 阅读正文 - 用于长文本阅读
     */
    reading: {
      fontSize: minimalTypographyTokens.fontSize.base,
      fontWeight: minimalTypographyTokens.fontWeight.normal,
      lineHeight: minimalTypographyTokens.lineHeight.relaxed,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.serif.join(', '), // 使用衬线字体提升阅读体验
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
      fontSize: minimalTypographyTokens.fontSize.base,
      fontWeight: minimalTypographyTokens.fontWeight.medium,
      lineHeight: minimalTypographyTokens.lineHeight.tight,
      letterSpacing: minimalTypographyTokens.letterSpacing.wide,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 中等按钮文字
     */
    medium: {
      fontSize: minimalTypographyTokens.fontSize.sm,
      fontWeight: minimalTypographyTokens.fontWeight.medium,
      lineHeight: minimalTypographyTokens.lineHeight.tight,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 小按钮文字
     */
    small: {
      fontSize: minimalTypographyTokens.fontSize.xs,
      fontWeight: minimalTypographyTokens.fontWeight.medium,
      lineHeight: minimalTypographyTokens.lineHeight.tight,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
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
      fontSize: minimalTypographyTokens.fontSize.sm,
      fontWeight: minimalTypographyTokens.fontWeight.medium,
      lineHeight: minimalTypographyTokens.lineHeight.normal,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 状态标签 - 极简版本，不使用全大写
     */
    status: {
      fontSize: minimalTypographyTokens.fontSize.xs,
      fontWeight: minimalTypographyTokens.fontWeight.medium,
      lineHeight: minimalTypographyTokens.lineHeight.tight,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    },

    /**
     * 辅助标签
     */
    helper: {
      fontSize: minimalTypographyTokens.fontSize.xs,
      fontWeight: minimalTypographyTokens.fontWeight.normal,
      lineHeight: minimalTypographyTokens.lineHeight.normal,
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
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
      fontWeight: minimalTypographyTokens.fontWeight.normal,
      fontFamily: minimalTypographyTokens.fontFamily.mono.join(', '),
    },

    /**
     * 代码块
     */
    block: {
      fontSize: minimalTypographyTokens.fontSize.sm,
      fontWeight: minimalTypographyTokens.fontWeight.normal,
      lineHeight: minimalTypographyTokens.lineHeight.relaxed,
      fontFamily: minimalTypographyTokens.fontFamily.mono.join(', '),
    },
  },
};

/**
 * 极简主题字体工具函数
 * 提供字体相关的计算和生成功能
 */
export const minimalTypographyUtils = {
  /**
   * 生成响应式字体大小
   * 极简主题使用更保守的缩放比例
   * 
   * @param baseSize - 基础字体大小
   * @param scale - 缩放比例对象
   * @returns CSS字体大小值
   */
  responsiveFontSize(
    baseSize: string,
    scale: { mobile?: number; tablet?: number; desktop?: number } = {}
  ): string {
    const { mobile = 0.95, tablet = 0.98, desktop = 1 } = scale;
    
    return `clamp(
      calc(${baseSize} * ${mobile}),
      calc(${baseSize} * ${tablet}),
      calc(${baseSize} * ${desktop})
    )`;
  },

  /**
   * 计算最优行高
   * 极简主题倾向于使用更舒适的行高
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
      heading: 1.25,  // 标题使用紧密行高
      body: 1.5,      // 正文使用标准行高
      button: 1.25,   // 按钮使用紧密行高
    }[contentType];

    return baseLineHeight;
  },

  /**
   * 生成简洁的文字样式
   * 
   * @param config - 配置对象
   * @returns 文字样式对象
   */
  generateCleanTextStyle(config: {
    size: keyof typeof minimalTypographyTokens.fontSize;
    weight?: keyof typeof minimalTypographyTokens.fontWeight;
    color?: string;
    lineHeight?: keyof typeof minimalTypographyTokens.lineHeight;
  }): React.CSSProperties {
    const {
      size,
      weight = 'normal',
      color = '#1f2937',
      lineHeight = 'normal'
    } = config;

    return {
      fontSize: minimalTypographyTokens.fontSize[size],
      fontWeight: minimalTypographyTokens.fontWeight[weight],
      lineHeight: minimalTypographyTokens.lineHeight[lineHeight],
      color,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
      letterSpacing: minimalTypographyTokens.letterSpacing.normal,
    };
  },

  /**
   * 生成标题样式
   * 
   * @param level - 标题级别 (1-6)
   * @param variant - 变体 ('light' | 'normal' | 'bold')
   * @returns 标题样式对象
   */
  generateHeadingStyle(
    level: 1 | 2 | 3 | 4 | 5 | 6,
    variant: 'light' | 'normal' | 'bold' = 'normal'
  ): React.CSSProperties {
    const sizeMap = {
      1: '5xl',
      2: '4xl',
      3: '3xl',
      4: '2xl',
      5: 'xl',
      6: 'lg',
    } as const;

    const weightMap = {
      light: 'light',
      normal: level <= 2 ? 'light' : 'normal',
      bold: 'semibold',
    } as const;

    return {
      fontSize: minimalTypographyTokens.fontSize[sizeMap[level]],
      fontWeight: minimalTypographyTokens.fontWeight[weightMap[variant]],
      lineHeight: minimalTypographyTokens.lineHeight.tight,
      letterSpacing: level <= 2 
        ? minimalTypographyTokens.letterSpacing.tighter 
        : minimalTypographyTokens.letterSpacing.normal,
      fontFamily: minimalTypographyTokens.fontFamily.sans.join(', '),
    };
  },

  /**
   * 创建文本层级系统
   * 
   * @returns 文本层级样式对象
   */
  createTextHierarchy(): Record<string, React.CSSProperties> {
    return {
      hero: this.generateHeadingStyle(1, 'light'),
      title: this.generateHeadingStyle(2, 'light'),
      heading: this.generateHeadingStyle(3, 'normal'),
      subheading: this.generateHeadingStyle(4, 'normal'),
      body: minimalTypographyPresets.body.base,
      caption: minimalTypographyPresets.body.small,
      helper: minimalTypographyPresets.label.helper,
    };
  },
};