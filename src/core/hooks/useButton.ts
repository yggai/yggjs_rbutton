/**
 * useButton Hook
 * 
 * 提供按钮组件的核心逻辑和状态管理
 * 包括事件处理、防抖、键盘导航、可访问性等功能
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { 
  UseButtonConfig, 
  UseButtonReturn, 
  ButtonClickHandler, 
  ButtonKeyboardHandler 
} from '../types';
import { 
  generateButtonAriaProps, 
  debounce, 
  ScreenReaderAnnouncer 
} from '../utils';
import { BUTTON_CONSTANTS, ACCESSIBILITY_CONSTANTS } from '../../shared/constants';

/**
 * useButton Hook实现
 * 
 * 管理按钮的所有交互状态和行为
 * 提供完整的可访问性支持和性能优化
 * 
 * @param config - 按钮配置
 * @returns 按钮属性、状态和控制函数
 */
export function useButton(config: UseButtonConfig & {
  disabled?: boolean;
  loading?: boolean;
  onClick?: ButtonClickHandler;
  onKeyDown?: ButtonKeyboardHandler;
} = {}): UseButtonReturn {
  const {
    debounceDelay = BUTTON_CONSTANTS.DEBOUNCE.DEFAULT_DELAY,
    preventDoubleClick = true,
    enableKeyboardNavigation = true,
    enableFocusManagement = true,
    enableA11yEnhancements = true,
    disabled = false,
    loading = false,
    onClick,
    onKeyDown,
  } = config;

  // 内部状态管理
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // 引用管理
  const lastClickTimeRef = useRef<number>(0);
  const pendingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 计算派生状态
  const isDisabled = disabled || loading;
  const isLoading = loading;

  // 防抖点击处理器
  const debouncedClick = useMemo(
    () => debounce((event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick && !isDisabled) {
        onClick(event);
      }
    }, debounceDelay),
    [onClick, isDisabled, debounceDelay]
  );

  // 清理函数
  const cleanup = useCallback(() => {
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
    setIsPending(false);
    setIsPressed(false);
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // 点击事件处理
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // 如果禁用或加载中，忽略点击
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    // 防重复点击检查
    if (preventDoubleClick) {
      const now = Date.now();
      const timeSinceLastClick = now - lastClickTimeRef.current;
      
      if (timeSinceLastClick < debounceDelay) {
        event.preventDefault();
        return;
      }
      
      lastClickTimeRef.current = now;
    }

    // 设置pending状态
    if (preventDoubleClick) {
      setIsPending(true);
      pendingTimeoutRef.current = setTimeout(() => {
        setIsPending(false);
      }, debounceDelay);
    }

    // 执行防抖点击处理
    debouncedClick(event);

    // 可访问性公告
    if (enableA11yEnhancements) {
      const buttonText = (event.currentTarget.textContent || '').trim();
      if (buttonText) {
        ScreenReaderAnnouncer.announcePolite(`按钮"${buttonText}"已点击`);
      }
    }
  }, [
    isDisabled, 
    preventDoubleClick, 
    debounceDelay, 
    debouncedClick, 
    enableA11yEnhancements
  ]);

  // 键盘事件处理
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    // 如果禁用或加载中，忽略键盘事件
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    const { key } = event;

    // 执行自定义键盘处理器
    if (onKeyDown) {
      onKeyDown(event);
    }

    // 键盘导航支持
    if (enableKeyboardNavigation) {
      switch (key) {
        case ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.ENTER:
        case ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.SPACE:
          event.preventDefault();
          
          // 模拟点击事件
          const clickEvent = {
            ...event,
            type: 'click',
            currentTarget: event.currentTarget,
            target: event.target,
          } as unknown as React.MouseEvent<HTMLButtonElement>;
          
          handleClick(clickEvent);
          
          // 可访问性反馈
          if (enableA11yEnhancements) {
            const buttonText = (event.currentTarget.textContent || '').trim();
            if (buttonText) {
              ScreenReaderAnnouncer.announcePolite(
                `按钮"${buttonText}"已通过${key === ' ' ? '空格键' : '回车键'}激活`
              );
            }
          }
          break;
          
        case ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.ESCAPE:
          // ESC键取消操作
          event.currentTarget.blur();
          cleanup();
          break;
      }
    }
  }, [
    isDisabled, 
    onKeyDown, 
    enableKeyboardNavigation, 
    handleClick, 
    enableA11yEnhancements, 
    cleanup
  ]);

  // 焦点事件处理
  const handleFocus = useCallback(() => {
    if (!isDisabled) {
      setIsFocused(true);
      
      // 可访问性公告
      if (enableA11yEnhancements && enableFocusManagement) {
        // 焦点进入时的公告会由屏幕阅读器自动处理
        // 这里只做状态更新
      }
    }
  }, [isDisabled, enableA11yEnhancements, enableFocusManagement]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsPressed(false);
    
    // 清理pending状态
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
      setIsPending(false);
    }
  }, []);

  // 鼠标事件处理（用于hover和press状态）
  const handleMouseEnter = useCallback(() => {
    if (!isDisabled) {
      setIsHovered(true);
    }
  }, [isDisabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
    
    // 清理长按计时器
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    if (!isDisabled) {
      setIsPressed(true);
      
      // 长按检测
      longPressTimeoutRef.current = setTimeout(() => {
        // 长按逻辑可以在这里实现
        // 目前只是清理状态
        setIsPressed(false);
      }, 500); // 500ms长按检测
    }
  }, [isDisabled]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
    
    // 清理长按计时器
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  }, []);

  // 触摸事件处理（移动端支持）
  const handleTouchStart = useCallback(() => {
    if (!isDisabled) {
      setIsPressed(true);
    }
  }, [isDisabled]);

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false);
  }, []);

  // 生成ARIA属性
  const ariaProps = useMemo(() => {
    if (!enableA11yEnhancements) {
      return {};
    }

    return generateButtonAriaProps({
      disabled,
      loading,
      // 这里可以根据需要添加更多属性
    });
  }, [enableA11yEnhancements, disabled, loading]);

  // 组合按钮属性
  const buttonProps = useMemo(() => ({
    type: 'button' as const,
    disabled: isDisabled,
    tabIndex: isDisabled ? -1 : 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    ...ariaProps,
  }), [
    isDisabled,
    handleClick,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
    ariaProps,
  ]);

  // 状态对象
  const state = useMemo(() => ({
    isDisabled,
    isLoading,
    isFocused,
    isHovered,
    isPressed,
    isPending,
  }), [isDisabled, isLoading, isFocused, isHovered, isPressed, isPending]);

  // 控制函数
  const actions = useMemo(() => ({
    setFocused: setIsFocused,
    setHovered: setIsHovered,
    setPressed: setIsPressed,
    handleClick,
    handleKeyDown,
  }), [handleClick, handleKeyDown]);

  return {
    buttonProps,
    state,
    actions,
  };
}

/**
 * useButtonGroup Hook
 * 
 * 用于管理按钮组的状态和行为
 * 提供键盘导航、焦点管理等功能
 * 
 * @param config - 按钮组配置
 * @returns 按钮组的状态和控制函数
 */
export function useButtonGroup(config: {
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
  autoFocus?: boolean;
} = {}) {
  const {
    orientation = 'horizontal',
    loop = true,
    autoFocus = false,
  } = config;

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [focusedIndex, setFocusedIndex] = useState<number>(autoFocus ? 0 : -1);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 注册按钮引用
  const registerButton = useCallback((index: number) => {
    return (ref: HTMLButtonElement | null) => {
      buttonRefs.current[index] = ref;
    };
  }, []);

  // 焦点导航
  const navigateToIndex = useCallback((index: number) => {
    const button = buttonRefs.current[index];
    if (button && !button.disabled) {
      button.focus();
      setFocusedIndex(index);
    }
  }, []);

  // 键盘导航处理
  const handleGroupKeyDown = useCallback((event: React.KeyboardEvent, currentIndex: number) => {
    const { key } = event;
    const buttons = buttonRefs.current.filter(Boolean);
    const enabledButtons = buttons.filter(btn => !btn?.disabled);
    const currentEnabledIndex = enabledButtons.findIndex(btn => btn === buttonRefs.current[currentIndex]);
    
    let nextIndex = -1;

    switch (key) {
      case orientation === 'horizontal' ? ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.ARROW_RIGHT : ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.ARROW_DOWN:
        event.preventDefault();
        if (currentEnabledIndex >= 0) {
          nextIndex = currentEnabledIndex + 1;
          if (nextIndex >= enabledButtons.length) {
            nextIndex = loop ? 0 : currentEnabledIndex;
          }
          const targetButton = enabledButtons[nextIndex];
          const targetIndex = buttonRefs.current.findIndex(btn => btn === targetButton);
          navigateToIndex(targetIndex);
        }
        break;
        
      case orientation === 'horizontal' ? ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.ARROW_LEFT : ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.ARROW_UP:
        event.preventDefault();
        if (currentEnabledIndex >= 0) {
          nextIndex = currentEnabledIndex - 1;
          if (nextIndex < 0) {
            nextIndex = loop ? enabledButtons.length - 1 : 0;
          }
          const targetButton = enabledButtons[nextIndex];
          const targetIndex = buttonRefs.current.findIndex(btn => btn === targetButton);
          navigateToIndex(targetIndex);
        }
        break;
        
      case ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.ENTER:
      case ACCESSIBILITY_CONSTANTS.KEYBOARD.KEYS.SPACE:
        // 这些键由个别按钮处理，不在组级别处理
        break;
    }
  }, [orientation, loop, navigateToIndex]);

  // 设置活动按钮
  const setActiveButton = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return {
    activeIndex,
    focusedIndex,
    registerButton,
    navigateToIndex,
    handleGroupKeyDown,
    setActiveButton,
    buttonRefs,
  };
}