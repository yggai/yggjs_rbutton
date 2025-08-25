import React, { forwardRef, useMemo, useState, cloneElement, isValidElement } from 'react';
import { TechButtonProps } from './types';
import {
  getTechButtonStyles,
  getVariantHoverStyles,
  getVariantActiveStyles,
  getGlowStyles,
  getCombinedStyles,
  getIconSizeForButton,
  getShapeAdjustedStyles,
  getRTLStyles,
  getRTLIconStyles,
} from './styles';
import {
  useDebounceClick,
  useKeyboardHandler,
  useFocusHandler,
  isMobileDevice,
  supportsTouchEvents,
} from './hooks';

/**
 * 科技风按钮组件 v1.1.0
 * 
 * 这是一个企业级的科技风格按钮组件，采用CSS-in-JS技术实现样式管理。
 * v1.1.0 新增功能：
 * - 完整的图标支持系统（左图标、右图标、纯图标按钮）
 * - 多种填充模式（solid、outline、ghost、link）
 * - 多种形状变体（default、rounded、circular、square）
 * - 键盘导航支持（Enter、Space键）
 * - 防重复点击保护机制
 * - 响应式设计和移动端优化
 * - RTL语言支持（从右到左文本布局）
 * - 多主题支持（亮色、暗色、自动切换）
 * - 增强的可访问性支持
 * 
 * 组件特性：
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
 * // 带图标的按钮
 * <TechButton iconLeft={<SearchIcon />} size="large">
 *   搜索
 * </TechButton>
 * 
 * // 纯图标按钮
 * <TechButton iconLeft={<DeleteIcon />} iconOnly shape="circular">
 *   删除
 * </TechButton>
 * 
 * // 边框模式的危险按钮
 * <TechButton variant="danger" fill="outline" glowing>
 *   危险操作
 * </TechButton>
 * 
 * // RTL语言支持
 * <TechButton dir="rtl" iconLeft={<ArrowIcon />}>
 *   العربية
 * </TechButton>
 * 
 * // 暗色主题
 * <TechButton theme="dark" variant="primary">
 *   暗色模式
 * </TechButton>
 * 
 * // 防重复点击的提交按钮
 * <TechButton preventDoubleClick debounceDelay={500}>
 *   提交表单
 * </TechButton>
 * ```
 */
export const TechButton = forwardRef<HTMLButtonElement, TechButtonProps>(
  (
    {
      children,
      size = 'medium',
      variant = 'primary',
      fill = 'solid',
      shape = 'default',
      iconLeft,
      iconRight,
      iconOnly = false,
      iconSize,
      loading = false,
      glowing = false,
      fullWidth = false,
      preventDoubleClick = false,
      debounceDelay = 300,
      responsive = false,
      minTouchTarget = false,
      dir = 'ltr',
      theme = 'light',
      disabled = false,
      className = '',
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    // ==================== 状态管理 ====================
    
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    // ==================== Hooks ====================
    
    // 获取样式对象（使用缓存优化性能）
    const styles = useMemo(() => getTechButtonStyles(theme), [theme]);

    // 防重复点击Hook
    const { handleClick: debouncedClick } = useDebounceClick(
      onClick,
      debounceDelay,
      preventDoubleClick
    );

    // 键盘导航Hook
    const { handleKeyDown: keyboardHandler } = useKeyboardHandler(
      debouncedClick,
      disabled || loading
    );

    // 焦点管理Hook
    const { handleFocus: focusHandler, handleBlur: blurHandler } = useFocusHandler();

    // ==================== 计算属性 ====================
    
    // 计算最终是否禁用（加载状态下也应该禁用）
    const isDisabled = disabled || loading;

    // 计算实际的图标尺寸
    const actualIconSize = iconSize || getIconSizeForButton(size);

    // 检测移动设备和触摸支持
    const isMobile = isMobileDevice();
    const hasTouch = supportsTouchEvents();

    // ==================== 样式计算 ====================
    
    // 合并样式 - 使用 useMemo 优化性能，避免不必要的重新计算
    const buttonStyles = useMemo(() => {
      let computedStyles: React.CSSProperties = getCombinedStyles(
        styles.base,
        styles.sizes[size],
        styles.variants[variant],
        styles.fills[fill],
        styles.shapes[shape]
      );

      // 应用状态样式
      if (isDisabled) {
        computedStyles = getCombinedStyles(computedStyles, styles.states.disabled);
      } else if (loading) {
        computedStyles = getCombinedStyles(computedStyles, styles.states.loading);
      } else if (isActive) {
        computedStyles = getCombinedStyles(
          computedStyles,
          styles.states.active,
          getVariantActiveStyles(variant, fill)
        );
      } else if (isHovered) {
        computedStyles = getCombinedStyles(
          computedStyles,
          styles.states.hover,
          getVariantHoverStyles(variant, fill)
        );
      }

      // 应用特效样式
      if (glowing && !isDisabled) {
        const glowStyles = getGlowStyles(variant);
        computedStyles = getCombinedStyles(computedStyles, glowStyles);
      }

      if (fullWidth) {
        computedStyles = getCombinedStyles(computedStyles, styles.effects.fullWidth);
      }

      if (responsive) {
        computedStyles = getCombinedStyles(computedStyles, styles.effects.responsive);
      }

      if (minTouchTarget && (isMobile || hasTouch)) {
        computedStyles = getCombinedStyles(computedStyles, styles.effects.minTouchTarget);
      }

      // 形状和图标相关的样式调整
      const shapeAdjustedStyles = getShapeAdjustedStyles(shape, size, iconOnly);
      if (Object.keys(shapeAdjustedStyles).length > 0) {
        computedStyles = getCombinedStyles(computedStyles, shapeAdjustedStyles);
      }

      // RTL语言支持
      const rtlStyles = getRTLStyles(dir);
      if (Object.keys(rtlStyles).length > 0) {
        computedStyles = getCombinedStyles(computedStyles, rtlStyles);
      }

      return computedStyles;
    }, [
      styles,
      size,
      variant,
      fill,
      shape,
      isDisabled,
      loading,
      isActive,
      isHovered,
      glowing,
      fullWidth,
      responsive,
      minTouchTarget,
      iconOnly,
      isMobile,
      hasTouch,
      dir,
    ]);

    // ==================== 图标处理 ====================
    
    /**
     * 渲染图标元素
     * 为图标添加适当的样式和尺寸
     */
    const renderIcon = (icon: React.ReactNode, position: 'left' | 'right' | 'only') => {
      if (!icon) return null;

      const iconStyles = getCombinedStyles(
        styles.icons.base,
        styles.icons.sizes[actualIconSize],
        styles.icons[position],
        getRTLIconStyles(position, dir)
      );

      // 如果图标是React元素，克隆并添加样式
      if (isValidElement(icon)) {
        const iconElement = icon as React.ReactElement<React.SVGAttributes<SVGElement> | React.HTMLAttributes<HTMLElement>>;
        return cloneElement(iconElement, {
          ...iconElement.props,
          style: getCombinedStyles(iconElement.props.style || {}, iconStyles),
          'aria-hidden': 'true', // 图标对屏幕阅读器隐藏
        });
      }

      // 如果图标不是React元素，包装在span中
      return (
        <span style={iconStyles} aria-hidden="true">
          {icon}
        </span>
      );
    };

    // ==================== 事件处理 ====================
    
    /**
     * 处理点击事件
     */
    const handleClickEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
      // 如果按钮被禁用或正在加载，阻止点击事件
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      // 调用防抖处理后的点击函数
      debouncedClick(event);
    };

    /**
     * 处理键盘事件
     */
    const handleKeyDownEvent = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      // 调用自定义键盘处理函数
      onKeyDown?.(event);
      
      // 如果事件未被阻止，调用内置键盘处理
      if (!event.defaultPrevented) {
        keyboardHandler(event);
      }
    };

    /**
     * 处理焦点事件
     */
    const handleFocusEvent = (event: React.FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
      focusHandler(event);
    };

    const handleBlurEvent = (event: React.FocusEvent<HTMLButtonElement>) => {
      onBlur?.(event);
      blurHandler(event);
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

    // ==================== 内容渲染 ====================
    
    /**
     * 渲染按钮内容
     */
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

      // 纯图标按钮模式
      if (iconOnly) {
        const mainIcon = iconLeft || iconRight;
        return renderIcon(mainIcon, 'only');
      }

      // 正常模式：文本 + 图标
      return (
        <>
          {iconLeft && renderIcon(iconLeft, 'left')}
          <span>{children}</span>
          {iconRight && renderIcon(iconRight, 'right')}
        </>
      );
    };

    // ==================== 可访问性属性 ====================
    
    const accessibilityProps = {
      // 基础可访问性
      'aria-busy': loading,
      'aria-disabled': isDisabled,
      
      // 纯图标按钮的可访问性标签
      ...(iconOnly && typeof children === 'string' && {
        'aria-label': children,
      }),
      
      // 加载状态的额外信息
      ...(loading && {
        'aria-describedby': 'loading-description',
      }),
    };

    // ==================== 数据属性 ====================
    
    const dataAttributes = {
      'data-size': size,
      'data-variant': variant,
      'data-fill': fill,
      'data-shape': shape,
      'data-loading': loading,
      'data-glowing': glowing,
      'data-full-width': fullWidth,
      'data-icon-only': iconOnly,
      'data-responsive': responsive,
      'data-min-touch-target': minTouchTarget,
      'data-dir': dir,
      'data-theme': theme,
    };

    // ==================== 组件渲染 ====================
    
    return (
      <>
        {/* 注入CSS动画 */}
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
          onClick={handleClickEvent}
          onKeyDown={handleKeyDownEvent}
          onFocus={handleFocusEvent}
          onBlur={handleBlurEvent}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          {...accessibilityProps}
          {...dataAttributes}
          {...rest}
        >
          {renderContent()}
          
          {/* 隐藏的加载状态描述，用于屏幕阅读器 */}
          {loading && (
            <span
              id="loading-description"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0',
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: '0',
              }}
            >
              正在加载，请稍候
            </span>
          )}
        </button>
      </>
    );
  }
);

// 设置组件显示名称，便于调试
TechButton.displayName = 'TechButton';