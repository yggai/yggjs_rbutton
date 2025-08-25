/**
 * 科技风主题 - 间距系统设计令牌
 * 
 * 定义科技风主题的完整空间体系
 * 基于8px网格系统，确保一致性和协调性
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import type { SpacingSystem } from '../../../core/types';

/**
 * 科技风主题间距系统
 * 
 * 特点：
 * - 基于8px基础单位
 * - 支持密集和宽松布局
 * - 提供精确的微调间距
 * - 适配响应式设计
 * 
 * 基础单位：4px
 * 标准单位：8px (2 * 基础单位)
 * 缩放比例：线性增长，确保可预测性
 */
export const techSpacingTokens: SpacingSystem = {
  /**
   * 0 间距 - 0px
   * 用于紧贴布局、重置默认间距
   */
  0: '0',

  /**
   * 0.5 单位 - 2px
   * 用于最小间距、微调
   */
  0.5: '0.125rem',

  /**
   * 1 单位 - 4px
   * 基础间距单位，用于细微调整
   */
  1: '0.25rem',

  /**
   * 1.5 单位 - 6px
   * 用于文字与图标之间的间距
   */
  1.5: '0.375rem',

  /**
   * 2 单位 - 8px
   * 标准最小间距，用于相关元素
   */
  2: '0.5rem',

  /**
   * 2.5 单位 - 10px
   * 用于按钮内边距的微调
   */
  2.5: '0.625rem',

  /**
   * 3 单位 - 12px
   * 用于按钮内边距、小组件间距
   */
  3: '0.75rem',

  /**
   * 3.5 单位 - 14px
   * 用于中等按钮的垂直内边距
   */
  3.5: '0.875rem',

  /**
   * 4 单位 - 16px
   * 标准间距，用于段落、列表项等
   */
  4: '1rem',

  /**
   * 5 单位 - 20px
   * 用于卡片内边距、表单字段间距
   */
  5: '1.25rem',

  /**
   * 6 单位 - 24px
   * 用于组件间的标准间距
   */
  6: '1.5rem',

  /**
   * 7 单位 - 28px
   * 用于较大的组件间距
   */
  7: '1.75rem',

  /**
   * 8 单位 - 32px
   * 用于区块间距、大按钮内边距
   */
  8: '2rem',

  /**
   * 9 单位 - 36px
   * 用于大型组件间距
   */
  9: '2.25rem',

  /**
   * 10 单位 - 40px
   * 用于容器内边距
   */
  10: '2.5rem',

  /**
   * 11 单位 - 44px
   * 用于最小触摸目标高度
   */
  11: '2.75rem',

  /**
   * 12 单位 - 48px
   * 用于大型容器内边距、区块分割
   */
  12: '3rem',

  /**
   * 14 单位 - 56px
   * 用于导航栏高度、大型按钮
   */
  14: '3.5rem',

  /**
   * 16 单位 - 64px
   * 用于页面主要间距
   */
  16: '4rem',

  /**
   * 20 单位 - 80px
   * 用于页面区块间距
   */
  20: '5rem',

  /**
   * 24 单位 - 96px
   * 用于页面主要分割
   */
  24: '6rem',

  /**
   * 28 单位 - 112px
   * 用于大型页面区块
   */
  28: '7rem',

  /**
   * 32 单位 - 128px
   * 用于页面级别的大间距
   */
  32: '8rem',

  /**
   * 36 单位 - 144px
   * 用于超大间距
   */
  36: '9rem',

  /**
   * 40 单位 - 160px
   * 用于页面顶部/底部间距
   */
  40: '10rem',

  /**
   * 44 单位 - 176px
   * 用于特殊布局需求
   */
  44: '11rem',

  /**
   * 48 单位 - 192px
   * 用于超大页面间距
   */
  48: '12rem',

  /**
   * 52 单位 - 208px
   * 用于hero区域间距
   */
  52: '13rem',

  /**
   * 56 单位 - 224px
   * 用于大型hero区域
   */
  56: '14rem',

  /**
   * 60 单位 - 240px
   * 用于特大间距
   */
  60: '15rem',

  /**
   * 64 单位 - 256px
   * 用于最大标准间距
   */
  64: '16rem',

  /**
   * 72 单位 - 288px
   * 用于超大布局间距
   */
  72: '18rem',

  /**
   * 80 单位 - 320px
   * 用于页面级大间距
   */
  80: '20rem',

  /**
   * 96 单位 - 384px
   * 用于最大间距需求
   */
  96: '24rem',
};

/**
 * 科技风主题间距预设
 * 常用间距组合和语义化命名
 */
export const techSpacingPresets = {
  /**
   * 按钮间距预设
   */
  button: {
    /**
     * 按钮内边距
     */
    padding: {
      small: {
        x: techSpacingTokens[3],      // 水平：12px
        y: techSpacingTokens[2],      // 垂直：8px
      },
      medium: {
        x: techSpacingTokens[4],      // 水平：16px
        y: techSpacingTokens[3],      // 垂直：12px
      },
      large: {
        x: techSpacingTokens[6],      // 水平：24px
        y: techSpacingTokens[4],      // 垂直：16px
      },
    },

    /**
     * 按钮间距
     */
    gap: {
      tight: techSpacingTokens[2],    // 8px - 紧密排列
      normal: techSpacingTokens[3],   // 12px - 标准间距
      loose: techSpacingTokens[4],    // 16px - 宽松排列
    },

    /**
     * 图标与文字间距
     */
    iconGap: {
      small: techSpacingTokens[1.5],  // 6px
      medium: techSpacingTokens[2],   // 8px
      large: techSpacingTokens[3],    // 12px
    },
  },

  /**
   * 卡片间距预设
   */
  card: {
    /**
     * 卡片内边距
     */
    padding: {
      compact: techSpacingTokens[4],  // 16px
      comfortable: techSpacingTokens[6], // 24px
      spacious: techSpacingTokens[8],    // 32px
    },

    /**
     * 卡片间距
     */
    gap: {
      tight: techSpacingTokens[4],    // 16px
      normal: techSpacingTokens[6],   // 24px
      loose: techSpacingTokens[8],    // 32px
    },
  },

  /**
   * 表单间距预设
   */
  form: {
    /**
     * 字段间距
     */
    fieldGap: {
      compact: techSpacingTokens[3],  // 12px
      comfortable: techSpacingTokens[4], // 16px
      spacious: techSpacingTokens[6],    // 24px
    },

    /**
     * 标签与输入框间距
     */
    labelGap: techSpacingTokens[2],   // 8px

    /**
     * 表单容器内边距
     */
    containerPadding: techSpacingTokens[6], // 24px
  },

  /**
   * 页面布局间距预设
   */
  layout: {
    /**
     * 页面边距
     */
    pageMargin: {
      mobile: techSpacingTokens[4],   // 16px
      tablet: techSpacingTokens[6],   // 24px
      desktop: techSpacingTokens[8],  // 32px
    },

    /**
     * 区块间距
     */
    sectionGap: {
      small: techSpacingTokens[12],   // 48px
      medium: techSpacingTokens[16],  // 64px
      large: techSpacingTokens[24],   // 96px
    },

    /**
     * 网格间距
     */
    gridGap: {
      tight: techSpacingTokens[4],    // 16px
      normal: techSpacingTokens[6],   // 24px
      loose: techSpacingTokens[8],    // 32px
    },
  },

  /**
   * 导航间距预设
   */
  navigation: {
    /**
     * 导航项间距
     */
    itemGap: techSpacingTokens[6],    // 24px

    /**
     * 导航栏内边距
     */
    barPadding: {
      x: techSpacingTokens[6],        // 水平：24px
      y: techSpacingTokens[4],        // 垂直：16px
    },

    /**
     * 子菜单偏移
     */
    submenuOffset: techSpacingTokens[2], // 8px
  },

  /**
   * 内容间距预设
   */
  content: {
    /**
     * 段落间距
     */
    paragraphGap: techSpacingTokens[4], // 16px

    /**
     * 标题间距
     */
    headingGap: {
      before: techSpacingTokens[8],   // 标题前：32px
      after: techSpacingTokens[4],    // 标题后：16px
    },

    /**
     * 列表项间距
     */
    listItemGap: techSpacingTokens[2], // 8px
  },
};

/**
 * 科技风主题间距工具函数
 * 提供间距计算和生成功能
 */
export const techSpacingUtils = {
  /**
   * 获取间距值
   * 
   * @param key - 间距键名
   * @returns 间距值
   */
  getSpacing(key: keyof SpacingSystem): string {
    return techSpacingTokens[key];
  },

  /**
   * 计算间距
   * 
   * @param base - 基础间距键
   * @param multiplier - 乘数
   * @returns 计算后的间距值
   */
  calculateSpacing(base: keyof SpacingSystem, multiplier: number): string {
    const baseValue = parseFloat(techSpacingTokens[base]);
    const unit = techSpacingTokens[base].replace(/[\d.]/g, '');
    return `${baseValue * multiplier}${unit}`;
  },

  /**
   * 生成响应式间距
   * 
   * @param mobile - 移动端间距
   * @param tablet - 平板间距
   * @param desktop - 桌面间距
   * @returns CSS间距值
   */
  responsiveSpacing(
    mobile: keyof SpacingSystem,
    tablet?: keyof SpacingSystem,
    desktop?: keyof SpacingSystem
  ): string {
    const mobileValue = techSpacingTokens[mobile];
    const tabletValue = tablet ? techSpacingTokens[tablet] : mobileValue;
    const desktopValue = desktop ? techSpacingTokens[desktop] : tabletValue;

    return `clamp(${mobileValue}, ${tabletValue}, ${desktopValue})`;
  },

  /**
   * 生成网格间距
   * 
   * @param horizontal - 水平间距
   * @param vertical - 垂直间距（可选）
   * @returns CSS gap值
   */
  gridGap(
    horizontal: keyof SpacingSystem,
    vertical?: keyof SpacingSystem
  ): string {
    const horizontalValue = techSpacingTokens[horizontal];
    const verticalValue = vertical ? techSpacingTokens[vertical] : horizontalValue;
    
    return `${verticalValue} ${horizontalValue}`;
  },

  /**
   * 生成边距简写
   * 
   * @param values - 边距值（支持1-4个参数）
   * @returns CSS margin/padding值
   */
  spacing(...values: (keyof SpacingSystem)[]): string {
    const spacingValues = values.map(key => techSpacingTokens[key]);
    
    switch (spacingValues.length) {
      case 1:
        return spacingValues[0];
      case 2:
        return `${spacingValues[0]} ${spacingValues[1]}`;
      case 3:
        return `${spacingValues[0]} ${spacingValues[1]} ${spacingValues[2]}`;
      case 4:
        return `${spacingValues[0]} ${spacingValues[1]} ${spacingValues[2]} ${spacingValues[3]}`;
      default:
        return spacingValues[0];
    }
  },

  /**
   * 生成负间距
   * 
   * @param key - 间距键名
   * @returns 负间距值
   */
  negativeSpacing(key: keyof SpacingSystem): string {
    const value = techSpacingTokens[key];
    return value === '0' ? '0' : `-${value}`;
  },

  /**
   * 检查是否为有效间距键
   * 
   * @param key - 要检查的键
   * @returns 是否有效
   */
  isValidSpacingKey(key: string): key is keyof SpacingSystem {
    return key in techSpacingTokens;
  },

  /**
   * 获取最接近的间距值
   * 
   * @param targetPx - 目标像素值
   * @returns 最接近的间距键和值
   */
  getClosestSpacing(targetPx: number): {
    key: keyof SpacingSystem;
    value: string;
    difference: number;
  } {
    let closestKey: keyof SpacingSystem = 0;
    let minDifference = Infinity;

    Object.entries(techSpacingTokens).forEach(([key, value]) => {
      // 将rem转换为px（假设1rem = 16px）
      const pxValue = parseFloat(value) * 16;
      const difference = Math.abs(pxValue - targetPx);
      
      if (difference < minDifference) {
        minDifference = difference;
        closestKey = key as keyof SpacingSystem;
      }
    });

    return {
      key: closestKey,
      value: techSpacingTokens[closestKey],
      difference: minDifference,
    };
  },
};