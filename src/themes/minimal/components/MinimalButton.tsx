/**
 * 极简主题 - 按钮组件
 * 
 * 基于BaseButton核心逻辑的极简风格按钮实现
 * 与科技风主题形成鲜明对比：简洁、优雅、克制
 * 专注于内容可读性和使用舒适度
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import React, { forwardRef } from 'react';
import type { BaseButtonProps } from '../../../core/types';
import { createThemedButton } from '../../../core/components/BaseButton';
import {
  computeMinimalButtonStyles,
  renderMinimalLoadingIndicator,
  renderMinimalButtonContent,
} from '../styles';
import { useMinimalTheme } from '../hooks';

/**
 * 极简主题按钮属性接口
 * 扩展基础按钮属性，添加极简主题特有的配置
 */
export interface MinimalButtonProps extends BaseButtonProps {
  /**
   * 主题模式
   * 极简主题支持浅色和深色模式
   * @default 'light'
   */
  colorMode?: 'light' | 'dark' | 'auto';
  
  /**
   * 内容密度
   * 控制按钮内部间距的密度级别
   * @default 'comfortable'
   */
  density?: 'compact' | 'comfortable' | 'spacious';
  
  /**
   * 边框样式
   * 极简主题支持不同的边框风格
   * @default 'subtle'
   */
  borderStyle?: 'none' | 'subtle' | 'visible';
  
  /**
   * 阴影强度
   * 控制按钮阴影的显示强度
   * @default 'subtle'
   */
  shadowIntensity?: 'none' | 'subtle' | 'visible';
  
  /**
   * 文字样式
   * 极简主题的文字风格选项
   * @default 'normal'
   */
  textStyle?: 'normal' | 'light' | 'medium';
}

/**
 * 使用工厂函数创建极简主题按钮组件
 * 复用BaseButton的核心逻辑，注入极简主题特有的样式计算
 */
const MinimalButtonBase = createThemedButton({
  themeId: 'minimal',
  displayName: 'MinimalButton',
  computeStyles: computeMinimalButtonStyles,
  renderLoadingIndicator: renderMinimalLoadingIndicator,
  renderContent: renderMinimalButtonContent,
});

/**
 * 极简主题按钮组件
 * 
 * 这是一个企业级的极简风格按钮组件，专注于内容和可用性。
 * 
 * 设计特点：
 * - 简洁优雅的视觉设计，以灰度色彩为主
 * - 微妙的阴影和过渡效果，不干扰内容阅读
 * - 优秀的可访问性支持，适合长时间使用
 * - 完整的键盘导航和屏幕阅读器支持
 * - 响应式设计，适配各种设备和屏幕尺寸
 * - 支持深色和浅色模式无缝切换
 * - 尊重用户的动画偏好设置
 * 
 * 与科技风主题的对比：
 * - 颜色：使用灰度为主的色彩体系，避免强烈色彩冲击
 * - 动效：采用温和微妙的过渡效果，避免视觉干扰  
 * - 间距：提供更充分的呼吸空间，提升内容舒适感
 * - 字体：优先使用系统字体，强调可读性和一致性
 * - 阴影：使用极其微妙的阴影，保持界面轻盈感
 * 
 * 适用场景：
 * - 内容阅读类应用
 * - 文档和写作工具
 * - 办公应用界面
 * - 极简设计偏好用户
 * - 长时间使用的工具应用
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <MinimalButton onClick={() => console.log('clicked')}>
 *   点击我
 * </MinimalButton>
 * 
 * // 主要动作按钮（默认为outline风格）
 * <MinimalButton variant="primary" fill="solid">
 *   提交表单
 * </MinimalButton>
 * 
 * // 轮廓风格的次要按钮（极简主题推荐）
 * <MinimalButton variant="secondary" fill="outline">
 *   取消操作
 * </MinimalButton>
 * 
 * // 带图标的按钮
 * <MinimalButton
 *   variant="primary"
 *   leftIcon={<SaveIcon />}
 *   size="lg"
 * >
 *   保存文档
 * </MinimalButton>
 * 
 * // 纯图标按钮
 * <MinimalButton
 *   leftIcon={<EditIcon />}
 *   iconOnly
 *   shape="circle"
 *   aria-label="编辑"
 * />
 * 
 * // 危险操作按钮（极简风格）
 * <MinimalButton
 *   variant="danger"
 *   fill="outline"
 *   borderStyle="visible"
 * >
 *   删除项目
 * </MinimalButton>
 * 
 * // 链接样式按钮
 * <MinimalButton
 *   fill="link"
 *   textStyle="light"
 * >
 *   了解更多
 * </MinimalButton>
 * 
 * // 深色模式按钮
 * <MinimalButton
 *   variant="primary"
 *   colorMode="dark"
 *   density="spacious"
 * >
 *   深色主题
 * </MinimalButton>
 * 
 * // 高对比度无障碍按钮
 * <MinimalButton
 *   variant="primary"
 *   highContrast
 *   shadowIntensity="visible"
 * >
 *   无障碍友好
 * </MinimalButton>
 * 
 * // 紧凑密度的小按钮
 * <MinimalButton
 *   size="sm"
 *   density="compact"
 *   borderStyle="subtle"
 * >
 *   紧凑按钮
 * </MinimalButton>
 * ```
 */
export const MinimalButton = forwardRef<HTMLButtonElement, MinimalButtonProps>(
  (props, ref) => {
    const {
      colorMode: propColorMode,
      density = 'comfortable', 
      borderStyle = 'subtle',
      shadowIntensity = 'subtle',
      textStyle = 'normal',
      className = '',
      style = {},
      variant = 'primary',
      fill = 'outline', // 极简主题默认使用outline填充
      size = 'md',
      shape = 'default',
      onClick,
      onKeyDown,
      ...restProps
    } = props;

    // 尝试从主题上下文获取colorMode，如果没有则使用props或默认值
    let contextColorMode = 'light';
    try {
      const themeContext = useMinimalTheme();
      contextColorMode = themeContext?.state?.context?.colorMode || 'light';
    } catch {
      // 如果不在主题提供者内部，忽略错误并使用默认值
    }
    
    const colorMode = propColorMode || contextColorMode;

    // 生成极简主题特有的CSS类名
    const minimalClassName = [
      'minimal-button',
      `minimal-button--${colorMode}`,
      `minimal-button--density-${density}`,
      `minimal-button--border-${borderStyle}`,
      `minimal-button--shadow-${shadowIntensity}`,
      `minimal-button--text-${textStyle}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 生成极简主题特有的CSS变量
    const minimalStyle: React.CSSProperties & Record<`--${string}`, string | number> = {
      // 极简主题的CSS变量
      '--minimal-density-multiplier': density === 'compact' ? '0.8' : 
                                     density === 'spacious' ? '1.2' : '1',
      '--minimal-border-opacity': borderStyle === 'none' ? '0' :
                                 borderStyle === 'visible' ? '1' : '0.3',
      '--minimal-shadow-opacity': shadowIntensity === 'none' ? '0' :
                                 shadowIntensity === 'visible' ? '1' : '0.3',
      '--minimal-text-weight': textStyle === 'light' ? '300' :
                              textStyle === 'medium' ? '500' : '400',
      
      // 响应用户的颜色方案偏好
      ...(colorMode === 'auto' && {
        colorScheme: 'light dark',
      }),
      
      // 合并用户传入的样式
      ...style,
    };

    return (
      <MinimalButtonBase
        ref={ref}
        {...restProps}
        variant={variant}
        fill={fill}
        size={size}
        shape={shape}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={minimalClassName}
        style={minimalStyle}
      />
    );
  }
);

MinimalButton.displayName = 'MinimalButton';

/**
 * 极简主题按钮的默认属性
 * 体现极简设计的偏好和最佳实践
 */
export const defaultMinimalButtonProps: Partial<MinimalButtonProps> = {
  variant: 'primary',
  fill: 'outline', // 极简主题偏好轮廓样式
  size: 'md',
  shape: 'default',
  colorMode: 'light',
  density: 'comfortable',
  borderStyle: 'subtle',
  shadowIntensity: 'subtle', 
  textStyle: 'normal',
  disabled: false,
  loading: false,
  iconOnly: false,
  fullWidth: false,
  glow: false, // 极简主题默认不使用发光效果
  responsive: false,
  highContrast: false,
  reducedMotion: false,
};

/**
 * 极简主题按钮工具函数
 * 提供按钮相关的辅助功能和最佳实践
 */
export const MinimalButtonUtils = {
  /**
   * 获取推荐的按钮配置
   * 基于使用场景返回最佳的属性组合
   * 
   * @param scenario - 使用场景
   * @returns 推荐的按钮配置
   */
  getRecommendedConfig(scenario: 'primary' | 'secondary' | 'danger' | 'text' | 'icon'): Partial<MinimalButtonProps> {
    const configs = {
      // 主要动作按钮
      primary: {
        variant: 'primary' as const,
        fill: 'solid' as const,
        textStyle: 'medium' as const,
        shadowIntensity: 'visible' as const,
      },
      
      // 次要动作按钮  
      secondary: {
        variant: 'secondary' as const,
        fill: 'outline' as const,
        borderStyle: 'visible' as const,
      },
      
      // 危险操作按钮
      danger: {
        variant: 'danger' as const,
        fill: 'outline' as const,
        borderStyle: 'visible' as const,
        textStyle: 'medium' as const,
      },
      
      // 文字链接按钮
      text: {
        fill: 'link' as const,
        textStyle: 'light' as const,
        borderStyle: 'none' as const,
        shadowIntensity: 'none' as const,
      },
      
      // 图标按钮
      icon: {
        iconOnly: true,
        shape: 'circle' as const,
        borderStyle: 'subtle' as const,
        density: 'compact' as const,
      },
    };

    return configs[scenario];
  },

  /**
   * 生成适合极简主题的颜色方案
   * 
   * @param baseColor - 基础颜色
   * @returns 颜色方案对象
   */
  generateColorScheme(baseColor: string): {
    light: string;
    dark: string;
    contrast: string;
  } {
    // 极简主题的颜色生成逻辑
    // 这里简化实现，实际应用中可以使用更复杂的颜色计算
    return {
      light: baseColor,
      dark: baseColor,
      contrast: baseColor,
    };
  },

  /**
   * 检查按钮配置的可访问性
   * 
   * @param props - 按钮属性
   * @returns 可访问性检查结果
   */
  checkAccessibility(props: MinimalButtonProps): {
    isAccessible: boolean;
    warnings: string[];
    errors: string[];
    suggestions: string[];
  } {
    const warnings: string[] = [];
    const errors: string[] = [];
    const suggestions: string[] = [];

    // 检查纯图标按钮的标签
    if (props.iconOnly && !props.children && !props['aria-label']) {
      warnings.push('纯图标按钮缺少可访问性标签');
      suggestions.push('添加 aria-label 属性描述按钮功能');
    }

    // 检查颜色对比度
    if (props.variant === 'secondary' && props.fill === 'ghost') {
      suggestions.push('考虑使用对比度更高的填充模式以提升可访问性');
    }

    // 检查响应式设计
    if (props.size === 'sm' && !props.responsive) {
      suggestions.push('小尺寸按钮建议启用响应式设计以提升触摸体验');
    }

    return {
      isAccessible: warnings.length === 0 && errors.length === 0,
      warnings,
      errors,
      suggestions,
    };
  },

  /**
   * 生成极简主题的CSS变量定义
   * 
   * @param props - 按钮属性
   * @returns CSS变量对象
   */
  generateCSSVariables(props: MinimalButtonProps): Record<string, string> {
    return {
      '--minimal-color-mode': props.colorMode || 'light',
      '--minimal-density': props.density || 'comfortable',
      '--minimal-border-style': props.borderStyle || 'subtle',
      '--minimal-shadow-intensity': props.shadowIntensity || 'subtle',
      '--minimal-text-style': props.textStyle || 'normal',
    };
  },
};

/**
 * 极简主题按钮的使用示例组件
 * 展示各种配置和最佳实践
 */
export const MinimalButtonShowcase: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <h2>极简主题按钮展示</h2>
      
      {/* 基础变体 */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <MinimalButton variant="primary">主要按钮</MinimalButton>
        <MinimalButton variant="secondary">次要按钮</MinimalButton>
        <MinimalButton variant="danger">危险按钮</MinimalButton>
        <MinimalButton variant="success">成功按钮</MinimalButton>
      </div>
      
      {/* 填充模式 */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <MinimalButton fill="solid">实心填充</MinimalButton>
        <MinimalButton fill="outline">轮廓模式</MinimalButton>
        <MinimalButton fill="ghost">幽灵模式</MinimalButton>
        <MinimalButton fill="link">链接模式</MinimalButton>
      </div>
      
      {/* 尺寸变体 */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <MinimalButton size="sm">小按钮</MinimalButton>
        <MinimalButton size="md">中等按钮</MinimalButton>
        <MinimalButton size="lg">大按钮</MinimalButton>
      </div>
      
      {/* 特殊状态 */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <MinimalButton loading>加载中</MinimalButton>
        <MinimalButton disabled>禁用状态</MinimalButton>
        <MinimalButton iconOnly aria-label="设置">⚙️</MinimalButton>
      </div>
      
      {/* 极简主题特有配置 */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <MinimalButton density="compact">紧凑密度</MinimalButton>
        <MinimalButton density="spacious">宽松密度</MinimalButton>
        <MinimalButton shadowIntensity="visible">可见阴影</MinimalButton>
      </div>
    </div>
  );
};