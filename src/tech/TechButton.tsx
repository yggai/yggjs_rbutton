import React, { forwardRef, useMemo, useState } from 'react';
import { TechButtonProps } from './types';
import {
  getTechButtonStyles,
  getVariantHoverStyles,
  getVariantActiveStyles,
  getGlowStyles,
} from './styles';

/**
 * 科技风按钮组件
 * 
 * 这是一个高性能的科技风格按钮组件，采用CSS-in-JS技术实现样式管理。
 * 组件具有以下特性：
 * - 支持多种尺寸（small, medium, large）
 * - 支持多种主题变体（primary, secondary, danger, success）
 * - 支持加载状态和禁用状态
 * - 支持科技风发光效果
 * - 支持全宽布局
 * - 完全的可访问性支持
 * - 高性能的样式缓存机制
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <TechButton onClick={() => console.log('clicked')}>
 *   点击我
 * </TechButton>
 * 
 * // 带发光效果的大尺寸主按钮
 * <TechButton size="large" glowing>
 *   立即开始
 * </TechButton>
 * 
 * // 加载状态的危险按钮
 * <TechButton variant="danger" loading>
 *   删除数据
 * </TechButton>
 * ```
 */
export const TechButton = forwardRef<HTMLButtonElement, TechButtonProps>(
  (
    {
      children,
      size = 'medium',
      variant = 'primary',
      loading = false,
      glowing = false,
      fullWidth = false,
      disabled = false,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    // 状态管理
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    // 获取样式对象（使用缓存优化性能）
    const styles = getTechButtonStyles();

    // 计算最终是否禁用（加载状态下也应该禁用）
    const isDisabled = disabled || loading;

    // 合并样式 - 使用 useMemo 优化性能，避免不必要的重新计算
    const buttonStyles = useMemo(() => {
      let computedStyles: React.CSSProperties = {
        ...styles.base,
        ...styles.sizes[size],
        ...styles.variants[variant],
      };

      // 应用状态样式
      if (isDisabled) {
        computedStyles = { ...computedStyles, ...styles.states.disabled };
      } else if (loading) {
        computedStyles = { ...computedStyles, ...styles.states.loading };
      } else if (isActive) {
        computedStyles = {
          ...computedStyles,
          ...styles.states.active,
          ...getVariantActiveStyles(variant),
        };
      } else if (isHovered) {
        computedStyles = {
          ...computedStyles,
          ...styles.states.hover,
          ...getVariantHoverStyles(variant),
        };
      }

      // 应用特效样式
      if (glowing && !isDisabled) {
        const glowStyles = getGlowStyles(variant);
        computedStyles = {
          ...computedStyles,
          boxShadow: `${computedStyles.boxShadow}, ${glowStyles.boxShadow?.toString().split(', ').pop()}`,
        };
      }

      if (fullWidth) {
        computedStyles = { ...computedStyles, ...styles.effects.fullWidth };
      }

      return computedStyles;
    }, [
      styles,
      size,
      variant,
      isDisabled,
      loading,
      isActive,
      isHovered,
      glowing,
      fullWidth,
    ]);

    // 处理点击事件
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // 如果按钮被禁用或正在加载，阻止点击事件
      if (isDisabled || loading) {
        event.preventDefault();
        return;
      }

      // 调用外部传入的点击处理函数
      onClick?.(event);
    };

    // 鼠标事件处理
    const handleMouseEnter = () => {
      if (!isDisabled) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsActive(false);
    };

    const handleMouseDown = () => {
      if (!isDisabled) {
        setIsActive(true);
      }
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    // 渲染按钮内容
    const renderContent = () => {
      if (loading) {
        return (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '14px',
                height: '14px',
                border: '2px solid currentColor',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'techButtonSpin 1s linear infinite',
              }}
              aria-hidden="true"
            />
            加载中...
          </span>
        );
      }
      return children;
    };

    return (
      <>
        {/* 注入加载动画的CSS */}
        <style>
          {`
            @keyframes techButtonSpin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>

        <button
          ref={ref}
          type="button"
          className={className}
          style={buttonStyles}
          disabled={isDisabled}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          // 可访问性属性
          aria-busy={loading}
          aria-disabled={isDisabled}
          // 数据属性，便于测试和样式定制
          data-size={size}
          data-variant={variant}
          data-loading={loading}
          data-glowing={glowing}
          data-full-width={fullWidth}
          {...rest}
        >
          {renderContent()}
        </button>
      </>
    );
  }
);

// 设置组件显示名称，便于调试
TechButton.displayName = 'TechButton';