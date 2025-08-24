import { useCallback, useRef } from 'react';
import { UseDebounceClickReturn } from './types';

/**
 * 防重复点击Hook
 * 使用防抖机制防止用户快速重复点击导致的意外操作
 * 
 * @param originalHandler 原始的点击处理函数
 * @param delay 防抖延迟时间（毫秒）
 * @param enabled 是否启用防抖保护
 * @returns 包装后的点击处理函数和pending状态
 */
export const useDebounceClick = (
  originalHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  delay: number = 300,
  enabled: boolean = false
): UseDebounceClickReturn => {
  // 使用 useRef 存储定时器ID，避免重新渲染时丢失
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 使用 useRef 存储 pending 状态，避免组件重新渲染
  const isPendingRef = useRef<boolean>(false);

  /**
   * 包装后的点击处理函数
   * 在防抖期间会阻止新的点击事件
   */
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // 如果没有启用防抖保护，直接调用原始处理函数
    if (!enabled || !originalHandler) {
      originalHandler?.(event);
      return;
    }

    // 如果正在防抖期间，阻止新的点击
    if (isPendingRef.current) {
      event.preventDefault();
      return;
    }

    // 设置防抖状态
    isPendingRef.current = true;

    // 添加 pending 数据属性到按钮元素
    const buttonElement = event.currentTarget;
    buttonElement.setAttribute('data-pending', 'true');

    // 调用原始处理函数
    originalHandler(event);

    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 设置新的定时器
    timeoutRef.current = setTimeout(() => {
      isPendingRef.current = false;
      buttonElement.removeAttribute('data-pending');
      timeoutRef.current = null;
    }, delay);
  }, [originalHandler, delay, enabled]);

  // 返回处理函数
  return {
    isPending: isPendingRef.current,
    handleClick,
  };
};

/**
 * 键盘事件处理Hook
 * 处理按钮的键盘导航功能（Enter键和Space键）
 * 
 * @param onClick 点击处理函数
 * @param disabled 是否禁用
 * @returns 键盘事件处理函数
 */
export const useKeyboardHandler = (
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled: boolean = false
) => {
  /**
   * 键盘按下事件处理函数
   * 支持 Enter 键和 Space 键触发点击
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    // 如果按钮被禁用，不处理键盘事件
    if (disabled || !onClick) {
      return;
    }

    // 处理 Enter 键和 Space 键
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // 防止 Space 键滚动页面
      
      // 创建模拟的鼠标点击事件
      const syntheticMouseEvent = {
        ...event,
        currentTarget: event.currentTarget,
        target: event.target,
      } as unknown as React.MouseEvent<HTMLButtonElement>;
      
      onClick(syntheticMouseEvent);
    }
  }, [onClick, disabled]);

  return { handleKeyDown };
};

/**
 * 焦点状态管理Hook
 * 管理按钮的焦点状态和相关的可访问性属性
 */
export const useFocusHandler = () => {
  /**
   * 焦点获得时的处理函数
   */
  const handleFocus = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    const buttonElement = event.currentTarget;
    buttonElement.setAttribute('data-focused', 'true');
    buttonElement.setAttribute('aria-focused', 'true');
  }, []);

  /**
   * 焦点失去时的处理函数
   */
  const handleBlur = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    const buttonElement = event.currentTarget;
    buttonElement.removeAttribute('data-focused');
    buttonElement.removeAttribute('aria-focused');
  }, []);

  return { handleFocus, handleBlur };
};

/**
 * 工具函数：获取自适应的图标尺寸
 */
export const getAdaptiveIconSize = (
  buttonSize: string,
  explicitIconSize?: string
): string => {
  if (explicitIconSize) {
    return explicitIconSize;
  }

  // 根据按钮尺寸自动匹配图标尺寸
  switch (buttonSize) {
    case 'small':
      return 'small';
    case 'large':
      return 'large';
    case 'medium':
    default:
      return 'medium';
  }
};

/**
 * 工具函数：检查是否为移动设备
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * 工具函数：检查是否支持触摸
 */
export const supportsTouchEvents = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};