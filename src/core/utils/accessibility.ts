/**
 * 可访问性工具函数
 * 
 * 提供无障碍功能的工具函数集合
 * 帮助组件符合WCAG标准和最佳实践
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import { ACCESSIBILITY_CONSTANTS, THEME_CONSTANTS } from '../../shared/constants';

/**
 * 检查元素是否具有可访问的名称
 * 
 * @param element - 要检查的DOM元素
 * @returns 是否具有可访问的名称
 */
export function hasAccessibleName(element: HTMLElement): boolean {
  // 检查aria-label
  if (element.getAttribute('aria-label')) {
    return true;
  }
  
  // 检查aria-labelledby
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    return labelElement ? labelElement.textContent?.trim().length > 0 : false;
  }
  
  // 检查内容文本
  return element.textContent?.trim().length > 0;
}

/**
 * 生成唯一的ID，用于关联标签和控件
 * 
 * @param prefix - ID前缀
 * @returns 唯一ID字符串
 */
export function generateUniqueId(prefix: string = 'ygg'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 检查颜色对比度是否满足WCAG标准
 * 
 * @param foreground - 前景色（文字颜色）
 * @param background - 背景色
 * @param level - WCAG级别 ('AA' | 'AAA')
 * @param fontSize - 字体大小（用于判断大文本）
 * @returns 是否满足对比度要求
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  fontSize: number = 16
): boolean {
  const contrast = calculateContrastRatio(foreground, background);
  const isLargeText = fontSize >= 18 || fontSize >= 14; // 假设14px以上为粗体大文本
  
  const threshold = level === 'AA'
    ? (isLargeText ? ACCESSIBILITY_CONSTANTS.CONTRAST.AA_LARGE : ACCESSIBILITY_CONSTANTS.CONTRAST.AA_NORMAL)
    : (isLargeText ? ACCESSIBILITY_CONSTANTS.CONTRAST.AAA_LARGE : ACCESSIBILITY_CONSTANTS.CONTRAST.AAA_NORMAL);
  
  return contrast >= threshold;
}

/**
 * 计算两个颜色之间的对比度
 * 
 * @param color1 - 第一个颜色
 * @param color2 - 第二个颜色
 * @returns 对比度值
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 获取颜色的相对亮度
 * 
 * @param color - 颜色值（支持hex、rgb、rgba、hsl等格式）
 * @returns 相对亮度值（0-1）
 */
export function getLuminance(color: string): number {
  const rgb = parseColorToRGB(color);
  if (!rgb) return 0;
  
  const [r, g, b] = rgb.map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * 解析颜色字符串为RGB数组
 * 
 * @param color - 颜色字符串
 * @returns RGB数组 [r, g, b] 或 null
 */
export function parseColorToRGB(color: string): [number, number, number] | null {
  // 创建临时元素来解析颜色
  const div = document.createElement('div');
  div.style.color = color;
  document.body.appendChild(div);
  
  const computedColor = window.getComputedStyle(div).color;
  document.body.removeChild(div);
  
  // 解析rgb()格式
  const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10)
    ];
  }
  
  // 解析rgba()格式
  const rgbaMatch = computedColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
  if (rgbaMatch) {
    return [
      parseInt(rgbaMatch[1], 10),
      parseInt(rgbaMatch[2], 10),
      parseInt(rgbaMatch[3], 10)
    ];
  }
  
  return null;
}

/**
 * 检查元素是否可通过键盘导航访问
 * 
 * @param element - 要检查的DOM元素
 * @returns 是否可键盘访问
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  // 检查tabIndex
  const tabIndex = element.tabIndex;
  if (tabIndex < 0) return false;
  
  // 检查是否为可交互元素
  const interactiveElements = ['button', 'input', 'select', 'textarea', 'a'];
  const tagName = element.tagName.toLowerCase();
  
  if (interactiveElements.includes(tagName)) {
    return !element.hasAttribute('disabled');
  }
  
  // 检查role属性
  const role = element.getAttribute('role');
  const interactiveRoles = ['button', 'link', 'tab', 'menuitem', 'option'];
  
  return role ? interactiveRoles.includes(role) : false;
}

/**
 * 为按钮生成适当的ARIA属性
 * 
 * @param props - 按钮属性
 * @returns ARIA属性对象
 */
export function generateButtonAriaProps(props: {
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
  expanded?: boolean;
  label?: string;
  describedBy?: string;
  iconOnly?: boolean;
  children?: React.ReactNode;
}): Record<string, string | boolean> {
  const ariaProps: Record<string, string | boolean> = {};
  
  // 设置基本role
  ariaProps.role = 'button';
  
  // 设置disabled状态
  if (props.disabled) {
    ariaProps['aria-disabled'] = true;
  }
  
  // 设置loading状态
  if (props.loading) {
    ariaProps['aria-busy'] = true;
  }
  
  // 设置pressed状态（用于切换按钮）
  if (typeof props.pressed === 'boolean') {
    ariaProps['aria-pressed'] = props.pressed;
  }
  
  // 设置expanded状态（用于下拉按钮）
  if (typeof props.expanded === 'boolean') {
    ariaProps['aria-expanded'] = props.expanded;
  }
  
  // 设置标签
  if (props.label) {
    ariaProps['aria-label'] = props.label;
  } else if (props.iconOnly && !props.children) {
    // 纯图标按钮必须有标签
    ariaProps['aria-label'] = '按钮';
  }
  
  // 设置描述
  if (props.describedBy) {
    ariaProps['aria-describedby'] = props.describedBy;
  }
  
  return ariaProps;
}

/**
 * 检查用户是否启用了减少动画偏好
 * 
 * @returns 是否应该减少动画
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia(THEME_CONSTANTS.MEDIA_QUERIES.PREFERS_REDUCED_MOTION).matches;
}

/**
 * 检查用户是否启用了高对比度偏好
 * 
 * @returns 是否使用高对比度
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * 检查用户是否偏好深色主题
 * 
 * @returns 是否偏好深色主题
 */
export function prefersDarkColorScheme(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * 管理焦点的工具类
 * 提供焦点管理的高级功能
 */
export class FocusManager {
  private static focusHistory: HTMLElement[] = [];
  private static trapStack: HTMLElement[] = [];
  
  /**
   * 保存当前焦点到历史记录
   */
  static saveFocus(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      this.focusHistory.push(activeElement);
    }
  }
  
  /**
   * 恢复上一个焦点
   */
  static restoreFocus(): void {
    const lastFocused = this.focusHistory.pop();
    if (lastFocused && document.contains(lastFocused)) {
      lastFocused.focus();
    }
  }
  
  /**
   * 在容器内设置焦点陷阱
   * 
   * @param container - 容器元素
   */
  static trapFocus(container: HTMLElement): void {
    this.trapStack.push(container);
    this.setupFocusTrap(container);
  }
  
  /**
   * 移除焦点陷阱
   */
  static releaseFocus(): void {
    const container = this.trapStack.pop();
    if (container) {
      this.removeFocusTrap(container);
    }
  }
  
  /**
   * 设置焦点陷阱的具体实现
   */
  private static setupFocusTrap(container: HTMLElement): void {
    const focusableElements = this.getFocusableElements(container);
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    // 存储事件监听器以便后续移除
    (container as HTMLElement & { __focusTrapHandler?: (e: KeyboardEvent) => void }).__focusTrapHandler = handleKeyDown;
    
    // 初始焦点
    firstElement.focus();
  }
  
  /**
   * 移除焦点陷阱的具体实现
   */
  private static removeFocusTrap(container: HTMLElement): void {
    const handler = (container as HTMLElement & { __focusTrapHandler?: (e: KeyboardEvent) => void }).__focusTrapHandler;
    if (handler) {
      container.removeEventListener('keydown', handler);
      delete (container as HTMLElement & { __focusTrapHandler?: (e: KeyboardEvent) => void }).__focusTrapHandler;
    }
  }
  
  /**
   * 获取容器内所有可聚焦的元素
   */
  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');
    
    const elements = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    
    return elements.filter(element => {
      return element.offsetParent !== null && // 元素可见
             !element.hasAttribute('disabled') && // 未禁用
             element.tabIndex >= 0; // 可通过Tab访问
    });
  }
  
  /**
   * 清理所有焦点历史和陷阱
   */
  static cleanup(): void {
    this.focusHistory = [];
    
    // 清理所有焦点陷阱
    while (this.trapStack.length > 0) {
      this.releaseFocus();
    }
  }
}

/**
 * 屏幕阅读器公告工具
 * 用于向屏幕阅读器用户提供重要信息
 */
export class ScreenReaderAnnouncer {
  private static liveRegion: HTMLElement | null = null;
  private static politeRegion: HTMLElement | null = null;
  
  /**
   * 初始化屏幕阅读器公告区域
   */
  static initialize(): void {
    if (typeof document === 'undefined') return;
    
    // 创建assertive区域（立即公告）
    if (!this.liveRegion) {
      this.liveRegion = document.createElement('div');
      this.liveRegion.setAttribute('aria-live', 'assertive');
      this.liveRegion.setAttribute('aria-atomic', 'true');
      this.liveRegion.style.cssText = `
        position: absolute !important;
        left: -10000px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
      `;
      document.body.appendChild(this.liveRegion);
    }
    
    // 创建polite区域（队列公告）
    if (!this.politeRegion) {
      this.politeRegion = document.createElement('div');
      this.politeRegion.setAttribute('aria-live', 'polite');
      this.politeRegion.setAttribute('aria-atomic', 'true');
      this.politeRegion.style.cssText = `
        position: absolute !important;
        left: -10000px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
      `;
      document.body.appendChild(this.politeRegion);
    }
  }
  
  /**
   * 立即公告消息（会打断当前阅读）
   * 
   * @param message - 要公告的消息
   */
  static announceImportant(message: string): void {
    this.announce(message, 'assertive');
  }
  
  /**
   * 礼貌地公告消息（等待当前阅读完成）
   * 
   * @param message - 要公告的消息
   */
  static announcePolite(message: string): void {
    this.announce(message, 'polite');
  }
  
  /**
   * 公告消息的内部实现
   */
  private static announce(message: string, priority: 'assertive' | 'polite'): void {
    this.initialize();
    
    const region = priority === 'assertive' ? this.liveRegion : this.politeRegion;
    if (!region) return;
    
    // 清除之前的内容
    region.textContent = '';
    
    // 异步设置新内容，确保屏幕阅读器能检测到变化
    setTimeout(() => {
      region.textContent = message;
      
      // 短时间后清除内容，避免重复公告
      setTimeout(() => {
        region.textContent = '';
      }, 1000);
    }, 100);
  }
  
  /**
   * 清理公告区域
   */
  static cleanup(): void {
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
      this.liveRegion = null;
    }
    
    if (this.politeRegion && this.politeRegion.parentNode) {
      this.politeRegion.parentNode.removeChild(this.politeRegion);
      this.politeRegion = null;
    }
  }
}

/**
 * 无障碍检查器
 * 用于检查组件是否符合无障碍标准
 */
export class AccessibilityChecker {
  /**
   * 检查按钮的无障碍性
   * 
   * @param element - 按钮元素
   * @returns 检查结果
   */
  static checkButton(element: HTMLButtonElement): {
    passed: boolean;
    warnings: string[];
    errors: string[];
  } {
    const warnings: string[] = [];
    const errors: string[] = [];
    
    // 检查是否有可访问的名称
    if (!hasAccessibleName(element)) {
      errors.push('按钮缺少可访问的名称（aria-label、aria-labelledby或文本内容）');
    }
    
    // 检查最小触摸目标尺寸
    const rect = element.getBoundingClientRect();
    if (rect.width < ACCESSIBILITY_CONSTANTS.MIN_SIZES.TOUCH_TARGET ||
        rect.height < ACCESSIBILITY_CONSTANTS.MIN_SIZES.TOUCH_TARGET) {
      warnings.push('按钮尺寸小于推荐的最小触摸目标（44x44px）');
    }
    
    // 检查是否可通过键盘访问
    if (!isKeyboardAccessible(element)) {
      errors.push('按钮无法通过键盘访问');
    }
    
    // 检查对比度（需要计算背景色和前景色）
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    
    if (color && backgroundColor && 
        !checkColorContrast(color, backgroundColor, 'AA')) {
      warnings.push('按钮的颜色对比度可能不符合WCAG AA标准');
    }
    
    return {
      passed: errors.length === 0,
      warnings,
      errors,
    };
  }
  
  /**
   * 运行完整的无障碍审计
   * 
   * @param container - 要审计的容器
   * @returns 审计结果
   */
  static auditContainer(container: HTMLElement): {
    passed: boolean;
    totalElements: number;
    checkedElements: number;
    issues: Array<{
      element: HTMLElement;
      type: 'error' | 'warning';
      message: string;
    }>;
  } {
    const issues: Array<{
      element: HTMLElement;
      type: 'error' | 'warning';
      message: string;
    }> = [];
    
    let checkedElements = 0;
    
    // 检查所有按钮
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      checkedElements++;
      const result = this.checkButton(button);
      
      result.errors.forEach(error => {
        issues.push({ element: button, type: 'error', message: error });
      });
      
      result.warnings.forEach(warning => {
        issues.push({ element: button, type: 'warning', message: warning });
      });
    });
    
    const totalElements = container.querySelectorAll('*').length;
    const errorCount = issues.filter(issue => issue.type === 'error').length;
    
    return {
      passed: errorCount === 0,
      totalElements,
      checkedElements,
      issues,
    };
  }
}