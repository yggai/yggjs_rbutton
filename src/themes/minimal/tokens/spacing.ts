/**
 * 极简主题 - 间距系统设计令牌
 * 
 * 定义极简主题的完整空间体系
 * 基于4px网格系统，追求简洁、一致的空间节奏
 * 相比科技风主题，使用更克制的间距变化
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import type { SpacingSystem } from '../../../core/types';

/**
 * 极简主题间距系统
 * 
 * 特点：
 * - 基于4px基础单位，与科技风保持一致性
 * - 更注重呼吸空间和内容的舒适性
 * - 相对保守的间距变化，避免视觉突兀
 * - 适配简洁的界面布局需求
 * 
 * 基础单位：4px
 * 标准单位：8px (2 * 基础单位)
 * 缩放原则：渐进增长，保持视觉和谐
 */
export const minimalSpacingTokens: SpacingSystem = {
  /**
   * 0 间距 - 0px
   * 用于紧贴布局、重置默认间距
   */
  0: '0',

  /**
   * 0.5 单位 - 2px
   * 用于最细微的间距调整
   */
  0.5: '0.125rem',

  /**
   * 1 单位 - 4px
   * 基础间距单位，用于精细调整
   */
  1: '0.25rem',

  /**
   * 1.5 单位 - 6px
   * 用于文字与图标之间的紧密间距
   */
  1.5: '0.375rem',

  /**
   * 2 单位 - 8px
   * 标准最小间距，极简主题常用
   */
  2: '0.5rem',

  /**
   * 2.5 单位 - 10px
   * 用于按钮内边距的细微调整
   */
  2.5: '0.625rem',

  /**
   * 3 单位 - 12px
   * 用于小组件间距、按钮内边距
   */
  3: '0.75rem',

  /**
   * 3.5 单位 - 14px
   * 用于中等按钮的垂直内边距
   */
  3.5: '0.875rem',

  /**
   * 4 单位 - 16px
   * 标准间距，极简主题的核心间距
   */
  4: '1rem',

  /**
   * 5 单位 - 20px
   * 用于卡片内边距、相关元素分组
   */
  5: '1.25rem',

  /**
   * 6 单位 - 24px
   * 用于组件间的舒适间距
   */
  6: '1.5rem',

  /**
   * 7 单位 - 28px
   * 用于中等组件间距
   */
  7: '1.75rem',

  /**
   * 8 单位 - 32px
   * 用于区块间距、大按钮内边距
   */
  8: '2rem',

  /**
   * 9 单位 - 36px
   * 用于较大的组件间距
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
   * 用于大型容器内边距、重要区块分割
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
   * 用于页面主要分割，极简主题常用
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
   * 用于特大间距
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
 * 极简主题间距预设
 * 专为极简设计优化的常用间距组合
 */
export const minimalSpacingPresets = {
  /**
   * 按钮间距预设
   */
  button: {
    /**
     * 按钮内边距 - 相比科技风更加舒适
     */
    padding: {
      small: {
        x: minimalSpacingTokens[4],      // 水平：16px (更宽松)
        y: minimalSpacingTokens[2.5],    // 垂直：10px
      },
      medium: {
        x: minimalSpacingTokens[5],      // 水平：20px (更宽松)
        y: minimalSpacingTokens[3],      // 垂直：12px
      },
      large: {
        x: minimalSpacingTokens[6],      // 水平：24px
        y: minimalSpacingTokens[4],      // 垂直：16px
      },
    },

    /**
     * 按钮间距 - 适度的间距
     */
    gap: {
      tight: minimalSpacingTokens[3],    // 12px - 紧密但不拥挤
      normal: minimalSpacingTokens[4],   // 16px - 舒适的标准间距
      loose: minimalSpacingTokens[6],    // 24px - 宽松排列
    },

    /**
     * 图标与文字间距 - 保持视觉平衡
     */
    iconGap: {
      small: minimalSpacingTokens[2],    // 8px
      medium: minimalSpacingTokens[2.5], // 10px
      large: minimalSpacingTokens[3],    // 12px
    },
  },

  /**
   * 卡片间距预设
   */
  card: {
    /**
     * 卡片内边距 - 营造舒适的阅读空间
     */
    padding: {
      compact: minimalSpacingTokens[5],  // 20px
      comfortable: minimalSpacingTokens[8], // 32px (增加舒适感)
      spacious: minimalSpacingTokens[12],   // 48px
    },

    /**
     * 卡片间距 - 保持视觉节奏
     */
    gap: {
      tight: minimalSpacingTokens[4],    // 16px
      normal: minimalSpacingTokens[6],   // 24px
      loose: minimalSpacingTokens[10],   // 40px (增加呼吸空间)
    },
  },

  /**
   * 表单间距预设
   */
  form: {
    /**
     * 字段间距 - 保持清晰的表单结构
     */
    fieldGap: {
      compact: minimalSpacingTokens[4],  // 16px
      comfortable: minimalSpacingTokens[6], // 24px (增加可读性)
      spacious: minimalSpacingTokens[8],    // 32px
    },

    /**
     * 标签与输入框间距
     */
    labelGap: minimalSpacingTokens[2.5],   // 10px (稍微增加)

    /**
     * 表单容器内边距
     */
    containerPadding: minimalSpacingTokens[8], // 32px (增加舒适度)
  },

  /**
   * 页面布局间距预设
   */
  layout: {
    /**
     * 页面边距 - 保持内容的可读性
     */
    pageMargin: {
      mobile: minimalSpacingTokens[4],   // 16px
      tablet: minimalSpacingTokens[6],   // 24px
      desktop: minimalSpacingTokens[12], // 48px (增加边距)
    },

    /**
     * 区块间距 - 清晰的内容分割
     */
    sectionGap: {
      small: minimalSpacingTokens[16],   // 64px (增加呼吸空间)
      medium: minimalSpacingTokens[24],  // 96px
      large: minimalSpacingTokens[32],   // 128px
    },

    /**
     * 网格间距 - 适度的元素间距
     */
    gridGap: {
      tight: minimalSpacingTokens[4],    // 16px
      normal: minimalSpacingTokens[6],   // 24px
      loose: minimalSpacingTokens[10],   // 40px
    },
  },

  /**
   * 导航间距预设
   */
  navigation: {
    /**
     * 导航项间距
     */
    itemGap: minimalSpacingTokens[8],    // 32px (增加分离感)

    /**
     * 导航栏内边距
     */
    barPadding: {
      x: minimalSpacingTokens[8],        // 水平：32px
      y: minimalSpacingTokens[4],        // 垂直：16px
    },

    /**
     * 子菜单偏移
     */
    submenuOffset: minimalSpacingTokens[1], // 4px (微妙偏移)
  },

  /**
   * 内容间距预设
   */
  content: {
    /**
     * 段落间距 - 提升阅读体验
     */
    paragraphGap: minimalSpacingTokens[6], // 24px (增加段落间距)

    /**
     * 标题间距 - 清晰的内容层次
     */
    headingGap: {
      before: minimalSpacingTokens[12],   // 标题前：48px
      after: minimalSpacingTokens[6],     // 标题后：24px
    },

    /**
     * 列表项间距
     */
    listItemGap: minimalSpacingTokens[3], // 12px

    /**
     * 引用块内边距
     */
    blockquotePadding: minimalSpacingTokens[6], // 24px
  },

  /**
   * 极简主题特有预设
   */
  minimal: {
    /**
     * 微妙间距 - 用于需要轻微分离的元素
     */
    subtle: minimalSpacingTokens[1], // 4px

    /**
     * 呼吸间距 - 用于创造呼吸空间
     */
    breathing: minimalSpacingTokens[12], // 48px

    /**
     * 焦点间距 - 用于突出重要内容
     */
    focus: minimalSpacingTokens[16], // 64px

    /**
     * 分离间距 - 用于明确区分不同区块
     */
    separation: minimalSpacingTokens[24], // 96px
  },
};

/**
 * 极简主题间距工具函数
 * 提供间距计算和生成功能，专为极简设计优化
 */
export const minimalSpacingUtils = {
  /**
   * 获取间距值
   * 
   * @param key - 间距键名
   * @returns 间距值
   */
  getSpacing(key: keyof SpacingSystem): string {
    return minimalSpacingTokens[key];
  },

  /**
   * 计算舒适的间距
   * 极简主题倾向于使用更大的间距来创造呼吸感
   * 
   * @param base - 基础间距键
   * @param multiplier - 乘数
   * @returns 计算后的间距值
   */
  calculateComfortableSpacing(base: keyof SpacingSystem, multiplier: number = 1.2): string {
    const baseValue = parseFloat(minimalSpacingTokens[base]);
    const unit = minimalSpacingTokens[base].replace(/[\d.]/g, '');
    return `${baseValue * multiplier}${unit}`;
  },

  /**
   * 生成响应式间距
   * 极简主题在不同屏幕尺寸下保持一致的视觉舒适度
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
    const mobileValue = minimalSpacingTokens[mobile];
    const tabletValue = tablet ? minimalSpacingTokens[tablet] : mobileValue;
    const desktopValue = desktop ? minimalSpacingTokens[desktop] : tabletValue;

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
    const horizontalValue = minimalSpacingTokens[horizontal];
    const verticalValue = vertical ? minimalSpacingTokens[vertical] : horizontalValue;
    
    return `${verticalValue} ${horizontalValue}`;
  },

  /**
   * 生成内容间距
   * 专为文本内容优化的间距系统
   * 
   * @param density - 密度级别
   * @returns 间距值对象
   */
  generateContentSpacing(density: 'compact' | 'comfortable' | 'spacious' = 'comfortable') {
    const densityMap = {
      compact: {
        paragraph: minimalSpacingTokens[4],   // 16px
        heading: minimalSpacingTokens[8],     // 32px
        section: minimalSpacingTokens[16],    // 64px
      },
      comfortable: {
        paragraph: minimalSpacingTokens[6],   // 24px
        heading: minimalSpacingTokens[12],    // 48px
        section: minimalSpacingTokens[24],    // 96px
      },
      spacious: {
        paragraph: minimalSpacingTokens[8],   // 32px
        heading: minimalSpacingTokens[16],    // 64px
        section: minimalSpacingTokens[32],    // 128px
      },
    };

    return densityMap[density];
  },

  /**
   * 生成对称间距
   * 
   * @param values - 间距值（支持1-4个参数）
   * @returns CSS margin/padding值
   */
  symmetricSpacing(...values: (keyof SpacingSystem)[]): string {
    const spacingValues = values.map(key => minimalSpacingTokens[key]);
    
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
   * 创建垂直节奏
   * 为垂直布局创建一致的间距节奏
   * 
   * @param baseSpacing - 基础间距
   * @param scale - 缩放序列
   * @returns 节奏间距数组
   */
  createVerticalRhythm(
    baseSpacing: keyof SpacingSystem,
    scale: number[] = [0.5, 1, 1.5, 2, 3]
  ): string[] {
    const baseValue = parseFloat(minimalSpacingTokens[baseSpacing]);
    const unit = minimalSpacingTokens[baseSpacing].replace(/[\d.]/g, '');
    
    return scale.map(multiplier => `${baseValue * multiplier}${unit}`);
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

    Object.entries(minimalSpacingTokens).forEach(([key, value]) => {
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
      value: minimalSpacingTokens[closestKey],
      difference: minDifference,
    };
  },

  /**
   * 生成极简主题的布局间距模式
   * 
   * @param layoutType - 布局类型
   * @returns 布局间距对象
   */
  generateLayoutPattern(layoutType: 'card' | 'list' | 'grid' | 'hero') {
    const patterns = {
      card: {
        padding: minimalSpacingPresets.card.padding.comfortable,
        gap: minimalSpacingPresets.card.gap.normal,
        margin: minimalSpacingTokens[6],
      },
      list: {
        padding: minimalSpacingTokens[4],
        gap: minimalSpacingTokens[3],
        margin: minimalSpacingTokens[2],
      },
      grid: {
        padding: minimalSpacingPresets.layout.gridGap.normal,
        gap: minimalSpacingPresets.layout.gridGap.normal,
        margin: minimalSpacingTokens[8],
      },
      hero: {
        padding: minimalSpacingTokens[24],
        gap: minimalSpacingTokens[12],
        margin: minimalSpacingTokens[16],
      },
    };

    return patterns[layoutType];
  },
};