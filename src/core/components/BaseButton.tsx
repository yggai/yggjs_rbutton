/**
 * 基础按钮组件
 * 
 * 提供所有主题按钮的核心功能和逻辑抽象
 * 实现按钮的基本行为、事件处理、可访问性等功能
 * 作为具体主题按钮的基类使用
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import React, { forwardRef, useLayoutEffect } from 'react';
import type { BaseButtonProps, UseButtonReturn, StyleCacheValue } from '../types';
import { useButton } from '../hooks/useButton';
import { usePerformanceMonitoring } from '../utils';
import { BUTTON_CONSTANTS } from '../../shared/constants';

/**
 * 基础按钮组件属性接口
 * 扩展基础属性，添加主题相关的渲染函数
 */
export interface BaseButtonComponentProps extends BaseButtonProps {
  /**
   * 样式计算函数
   * 由具体主题实现，用于生成按钮样式
   */
  computeStyles: (props: BaseButtonProps, state: UseButtonReturn['state']) => StyleCacheValue;
  
  /**
   * 加载指示器渲染函数
   * 由具体主题实现，用于渲染加载动画
   */
  renderLoadingIndicator?: (props: BaseButtonProps) => React.ReactNode;
  
  /**
   * 自定义内容渲染函数
   * 允许主题完全自定义按钮内容布局
   */
  renderContent?: (props: BaseButtonProps, children: React.ReactNode) => React.ReactNode;
  
  /**
   * 主题标识符
   * 用于性能监控和调试
   */
  themeId?: string;
}

/**
 * 基础按钮组件实现
 * 
 * 使用forwardRef支持ref转发
 * 集成性能监控、可访问性、事件处理等核心功能
 */
export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonComponentProps>(
  (props, ref) => {
    const {
      children,
      size = BUTTON_CONSTANTS.DEFAULTS.SIZE,
      variant = BUTTON_CONSTANTS.DEFAULTS.VARIANT,
      fill = BUTTON_CONSTANTS.DEFAULTS.FILL,
      shape = BUTTON_CONSTANTS.DEFAULTS.SHAPE,
      disabled = BUTTON_CONSTANTS.DEFAULTS.DISABLED,
      loading = BUTTON_CONSTANTS.DEFAULTS.LOADING,
      loadingText,
      leftIcon,
      rightIcon,
      iconOnly = BUTTON_CONSTANTS.DEFAULTS.ICON_ONLY,
      fullWidth = BUTTON_CONSTANTS.DEFAULTS.FULL_WIDTH,
      glow = BUTTON_CONSTANTS.DEFAULTS.GLOW,
      responsive = BUTTON_CONSTANTS.DEFAULTS.RESPONSIVE,
      className,
      style,
      onClick,
      onKeyDown,
      highContrast = BUTTON_CONSTANTS.DEFAULTS.HIGH_CONTRAST,
      reducedMotion = BUTTON_CONSTANTS.DEFAULTS.REDUCED_MOTION,
      computeStyles,
      renderLoadingIndicator,
      renderContent,
      themeId = 'unknown',
      ...restProps
    } = props;

    // 使用按钮Hook获取状态和处理函数
    const {
      buttonProps,
      state,
      // actions, // 保留用于未来扩展
    } = useButton({
      disabled,
      loading,
      onClick,
      onKeyDown,
      preventDoubleClick: true,
      enableKeyboardNavigation: true,
      enableFocusManagement: true,
      enableA11yEnhancements: true,
    });

    // 使用性能监控Hook
    const { startRender, endRender } = usePerformanceMonitoring(`BaseButton-${themeId}`);

    // 性能监控：渲染开始
    useLayoutEffect(() => {
      startRender();
      return () => endRender();
    });

    // 计算按钮样式
    const buttonStyles = React.useMemo(() => {
      const baseProps: BaseButtonProps = {
        size,
        variant,
        fill,
        shape,
        disabled,
        loading,
        iconOnly,
        fullWidth,
        glow,
        responsive,
        highContrast,
        reducedMotion,
      };

      return computeStyles(baseProps, state);
    }, [
      size,
      variant,
      fill,
      shape,
      disabled,
      loading,
      iconOnly,
      fullWidth,
      glow,
      responsive,
      highContrast,
      reducedMotion,
      state,
      computeStyles,
    ]);

    // 渲染加载指示器
    const renderLoadingContent = (): React.ReactNode => {
      if (renderLoadingIndicator) {
        return renderLoadingIndicator(props);
      }

      // 默认加载指示器
      return (
        <span
          style={{
            display: 'inline-block',
            width: '1em',
            height: '1em',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: reducedMotion ? 'none' : 'spin 1s linear infinite',
          }}
          aria-hidden="true"
        />
      );
    };

    // 渲染按钮内容
    const renderButtonContent = (): React.ReactNode => {
      // 如果正在加载且有加载文本，显示加载内容
      if (loading) {
        const loadingContent = (
          <>
            {renderLoadingContent()}
            {loadingText && (
              <span style={{ marginLeft: '0.5em' }}>
                {loadingText}
              </span>
            )}
          </>
        );

        if (renderContent) {
          return renderContent(props, loadingContent);
        }

        return loadingContent;
      }

      // 正常状态下的内容
      const normalContent = (
        <>
          {leftIcon && (
            <span
              className="button-icon button-icon-left"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginRight: children ? '0.5em' : 0,
              }}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}
          
          {children && (
            <span className="button-content">
              {children}
            </span>
          )}
          
          {rightIcon && (
            <span
              className="button-icon button-icon-right"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: children ? '0.5em' : 0,
              }}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </>
      );

      if (renderContent) {
        return renderContent(props, normalContent);
      }

      return normalContent;
    };

    // 合并样式
    const finalStyle: React.CSSProperties = {
      ...buttonStyles,
      ...style,
    };

    // 合并类名
    const finalClassName = [
      'ygg-button',
      `ygg-button--${variant}`,
      `ygg-button--${size}`,
      `ygg-button--${fill}`,
      `ygg-button--${shape}`,
      loading && 'ygg-button--loading',
      disabled && 'ygg-button--disabled',
      iconOnly && 'ygg-button--icon-only',
      fullWidth && 'ygg-button--full-width',
      glow && 'ygg-button--glow',
      responsive && 'ygg-button--responsive',
      highContrast && 'ygg-button--high-contrast',
      reducedMotion && 'ygg-button--reduced-motion',
      state.isFocused && 'ygg-button--focused',
      state.isHovered && 'ygg-button--hovered',
      state.isPressed && 'ygg-button--pressed',
      state.isPending && 'ygg-button--pending',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <>
        {/* CSS动画定义 */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        
        {/* 按钮元素 */}
        <button
          ref={ref}
          className={finalClassName}
          style={finalStyle}
          data-theme={themeId}
          data-testid="base-button"
          {...restProps}
          {...buttonProps}
        >
          {renderButtonContent()}
        </button>
      </>
    );
  }
);

BaseButton.displayName = 'BaseButton';

/**
 * 基础按钮组件的默认属性
 * 提供所有可选属性的默认值
 */
export const defaultBaseButtonProps: Partial<BaseButtonProps> = {
  size: BUTTON_CONSTANTS.DEFAULTS.SIZE,
  variant: BUTTON_CONSTANTS.DEFAULTS.VARIANT,
  fill: BUTTON_CONSTANTS.DEFAULTS.FILL,
  shape: BUTTON_CONSTANTS.DEFAULTS.SHAPE,
  disabled: BUTTON_CONSTANTS.DEFAULTS.DISABLED,
  loading: BUTTON_CONSTANTS.DEFAULTS.LOADING,
  iconOnly: BUTTON_CONSTANTS.DEFAULTS.ICON_ONLY,
  fullWidth: BUTTON_CONSTANTS.DEFAULTS.FULL_WIDTH,
  glow: BUTTON_CONSTANTS.DEFAULTS.GLOW,
  responsive: BUTTON_CONSTANTS.DEFAULTS.RESPONSIVE,
  highContrast: BUTTON_CONSTANTS.DEFAULTS.HIGH_CONTRAST,
  reducedMotion: BUTTON_CONSTANTS.DEFAULTS.REDUCED_MOTION,
};

/**
 * 创建主题按钮工厂函数
 * 
 * 用于快速创建基于BaseButton的主题特定按钮组件
 * 
 * @param themeConfig - 主题配置
 * @returns 主题按钮组件
 */
export function createThemedButton(themeConfig: {
  themeId: string;
  computeStyles: BaseButtonComponentProps['computeStyles'];
  renderLoadingIndicator?: BaseButtonComponentProps['renderLoadingIndicator'];
  renderContent?: BaseButtonComponentProps['renderContent'];
  displayName?: string;
}) {
  const ThemedButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
    (props, ref) => {
      return (
        <BaseButton
          ref={ref}
          {...props}
          themeId={themeConfig.themeId}
          computeStyles={themeConfig.computeStyles}
          renderLoadingIndicator={themeConfig.renderLoadingIndicator}
          renderContent={themeConfig.renderContent}
        />
      );
    }
  );

  ThemedButton.displayName = themeConfig.displayName || `ThemedButton(${themeConfig.themeId})`;

  return ThemedButton;
}

/**
 * 按钮工具函数
 * 提供按钮相关的辅助功能
 */
export const ButtonUtils = {
  /**
   * 检查按钮是否为交互状态
   * 
   * @param props - 按钮属性
   * @returns 是否为交互状态
   */
  isInteractive(props: Pick<BaseButtonProps, 'disabled' | 'loading'>): boolean {
    return !props.disabled && !props.loading;
  },

  /**
   * 获取按钮的可访问性角色
   * 
   * @param props - 按钮属性
   * @returns ARIA角色
   */
  getAriaRole(props: BaseButtonProps): string {
    // 根据按钮类型返回适当的角色
    if (props.fill === 'link') {
      return 'link';
    }
    return 'button';
  },

  /**
   * 生成按钮的调试信息
   * 
   * @param props - 按钮属性
   * @param state - 按钮状态
   * @returns 调试信息对象
   */
  getDebugInfo(
    props: BaseButtonProps,
    state: UseButtonReturn['state']
  ): Record<string, unknown> {
    return {
      props: {
        size: props.size,
        variant: props.variant,
        fill: props.fill,
        shape: props.shape,
        disabled: props.disabled,
        loading: props.loading,
        iconOnly: props.iconOnly,
        fullWidth: props.fullWidth,
        glow: props.glow,
        responsive: props.responsive,
        highContrast: props.highContrast,
        reducedMotion: props.reducedMotion,
      },
      state: {
        isDisabled: state.isDisabled,
        isLoading: state.isLoading,
        isFocused: state.isFocused,
        isHovered: state.isHovered,
        isPressed: state.isPressed,
        isPending: state.isPending,
      },
      computed: {
        isInteractive: this.isInteractive(props),
        ariaRole: this.getAriaRole(props),
      },
    };
  },

  /**
   * 验证按钮属性
   * 
   * @param props - 按钮属性
   * @returns 验证结果
   */
  validateProps(props: BaseButtonProps): {
    isValid: boolean;
    warnings: string[];
    errors: string[];
  } {
    const warnings: string[] = [];
    const errors: string[] = [];

    // 检查纯图标按钮是否有可访问性标签
    if (props.iconOnly && !props.children && !props['aria-label']) {
      errors.push('纯图标按钮必须提供 aria-label 属性');
    }

    // 检查加载状态下的文本
    if (props.loading && props.loadingText && props.iconOnly) {
      warnings.push('纯图标按钮在加载状态下不应显示文本');
    }

    // 检查冲突的属性组合
    if (props.fullWidth && props.shape === 'circle') {
      warnings.push('圆形按钮不应设置为全宽');
    }

    return {
      isValid: errors.length === 0,
      warnings,
      errors,
    };
  },
};