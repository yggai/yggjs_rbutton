/**
 * 极简主题 - 测试配置和工具
 * 
 * 提供极简主题测试所需的配置、模拟和工具函数
 * 确保测试环境能够准确反映真实使用场景
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

import { configure } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
 * 配置Testing Library
 */
configure({
  testIdAttribute: 'data-testid',
});

/**
 * 全局测试设置
 */
beforeAll(() => {
  // 模拟window.matchMedia（必须在全局设置）
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // 模拟ResizeObserver（某些组件可能需要）
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // 模拟IntersectionObserver（懒加载组件可能需要）
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
  }));

  // 模拟performance API
  if (!global.performance) {
    global.performance = {
      now: jest.fn(() => Date.now()),
      mark: jest.fn(),
      measure: jest.fn(),
      getEntriesByName: jest.fn(() => []),
      getEntriesByType: jest.fn(() => []),
    } as any;
  }
});

/**
 * 每个测试前的清理工作
 */
beforeEach(() => {
  // 清理DOM
  document.body.innerHTML = '';
  
  // 重置matchMedia mock到默认状态
  if (window.matchMedia) {
    (window.matchMedia as jest.Mock).mockClear();
  }
});

/**
 * 每个测试后的清理工作
 */
afterEach(() => {
  // 清理所有timer
  jest.clearAllTimers();
  
  // 恢复所有mock
  jest.restoreAllMocks();
});

/**
 * 测试工具函数
 */
export const TestHelpers = {
  /**
   * 等待下一个tick
   */
  nextTick: () => new Promise(resolve => setTimeout(resolve, 0)),

  /**
   * 等待指定时间
   */
  wait: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * 模拟用户偏好设置
   */
  mockUserPreferences: (preferences: {
    colorScheme?: 'light' | 'dark' | 'no-preference';
    reducedMotion?: boolean;
    highContrast?: boolean;
  }) => {
    const originalMatchMedia = window.matchMedia;
    
    window.matchMedia = jest.fn((query) => {
      let matches = false;
      
      switch (query) {
        case '(prefers-color-scheme: dark)':
          matches = preferences.colorScheme === 'dark';
          break;
        case '(prefers-color-scheme: light)':
          matches = preferences.colorScheme === 'light';
          break;
        case '(prefers-reduced-motion: reduce)':
          matches = preferences.reducedMotion === true;
          break;
        case '(prefers-contrast: high)':
          matches = preferences.highContrast === true;
          break;
      }

      return {
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    return () => {
      window.matchMedia = originalMatchMedia;
    };
  },

  /**
   * 模拟窗口尺寸
   */
  mockWindowSize: (width: number, height: number) => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });

    return () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      });
      
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: originalInnerHeight,
      });
    };
  },

  /**
   * 创建测试用的CSS样式验证器
   */
  createStyleValidator: () => {
    const computedStyles = new Map<Element, CSSStyleDeclaration>();
    
    // 模拟getComputedStyle
    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = jest.fn((element: Element) => {
      if (!computedStyles.has(element)) {
        computedStyles.set(element, {} as CSSStyleDeclaration);
      }
      return computedStyles.get(element)!;
    });

    return {
      setStyle: (element: Element, property: string, value: string) => {
        const styles = computedStyles.get(element) || ({} as any);
        styles[property] = value;
        computedStyles.set(element, styles);
      },
      
      cleanup: () => {
        window.getComputedStyle = originalGetComputedStyle;
        computedStyles.clear();
      },
    };
  },

  /**
   * 验证可访问性属性
   */
  validateA11y: {
    hasAriaLabel: (element: Element) => {
      return element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby');
    },
    
    hasValidRole: (element: Element) => {
      const role = element.getAttribute('role');
      const validRoles = ['button', 'link', 'menuitem', 'tab', 'option'];
      return validRoles.includes(role || element.tagName.toLowerCase());
    },
    
    isKeyboardAccessible: (element: Element) => {
      const tabIndex = element.getAttribute('tabindex');
      return tabIndex !== '-1' && !element.hasAttribute('disabled');
    },
    
    hasVisibleText: (element: Element) => {
      const text = element.textContent?.trim();
      return Boolean(text && text.length > 0);
    },
  },

  /**
   * 性能测试工具
   */
  performance: {
    measureRenderTime: async (renderFn: () => void) => {
      const start = performance.now();
      await renderFn();
      const end = performance.now();
      return end - start;
    },
    
    measureMemoryUsage: () => {
      if ('memory' in performance) {
        return (performance as any).memory;
      }
      return null;
    },
  },
};

/**
 * 极简主题特定的测试常量
 */
export const MINIMAL_TEST_CONSTANTS = {
  /**
   * 默认测试超时时间
   */
  DEFAULT_TIMEOUT: 5000,

  /**
   * 动画测试超时时间
   */
  ANIMATION_TIMEOUT: 1000,

  /**
   * 性能测试阈值
   */
  PERFORMANCE_THRESHOLDS: {
    RENDER_TIME: 100, // 毫秒
    INTERACTION_RESPONSE: 16, // 毫秒（一帧的时间）
    THEME_SWITCH_TIME: 300, // 毫秒
  },

  /**
   * 测试用的极简主题配置
   */
  TEST_THEME_CONFIG: {
    id: 'minimal-test',
    name: '极简主题测试版',
    defaultColorMode: 'light' as const,
    enableAnimations: false, // 测试时禁用动画以提高速度
    respectReducedMotion: true,
  },

  /**
   * 测试用的用户偏好设置
   */
  TEST_USER_PREFERENCES: {
    LIGHT_MODE: {
      colorScheme: 'light' as const,
      reducedMotion: false,
      highContrast: false,
    },
    DARK_MODE: {
      colorScheme: 'dark' as const,
      reducedMotion: false,
      highContrast: false,
    },
    ACCESSIBLE: {
      colorScheme: 'light' as const,
      reducedMotion: true,
      highContrast: true,
    },
  },

  /**
   * 测试用的屏幕尺寸
   */
  SCREEN_SIZES: {
    MOBILE: { width: 375, height: 667 },
    TABLET: { width: 768, height: 1024 },
    DESKTOP: { width: 1440, height: 900 },
    LARGE_DESKTOP: { width: 1920, height: 1080 },
  },
} as const;

/**
 * 极简主题测试断言扩展
 */
export const MinimalTestAssertions = {
  /**
   * 断言元素具有极简主题样式类
   */
  toHaveMinimalThemeClass: (element: Element, className: string) => {
    const fullClassName = `minimal-${className}`;
    return element.classList.contains(fullClassName);
  },

  /**
   * 断言元素符合极简设计原则
   */
  toMatchMinimalDesignPrinciples: (element: Element) => {
    const computedStyle = window.getComputedStyle(element);
    
    // 检查是否使用了灰度色彩
    const backgroundColor = computedStyle.backgroundColor;
    const isGrayScale = backgroundColor.includes('gray') || 
                       backgroundColor.includes('rgb(') && 
                       backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/) &&
                       (() => {
                         const match = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                         if (match) {
                           const [, r, g, b] = match.map(Number);
                           return Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20;
                         }
                         return false;
                       })();
    
    return {
      hasGrayScaleColors: isGrayScale,
      hasSubtleShadows: computedStyle.boxShadow.includes('rgba(0, 0, 0, 0.') || computedStyle.boxShadow === 'none',
      hasSystemFonts: computedStyle.fontFamily.includes('system-ui') || computedStyle.fontFamily.includes('-apple-system'),
    };
  },

  /**
   * 断言动画符合极简主题的微妙原则
   */
  toHaveSubtleAnimations: (element: Element) => {
    const computedStyle = window.getComputedStyle(element);
    const transition = computedStyle.transition;
    
    // 检查动画时长是否温和（>= 200ms）
    const durationMatch = transition.match(/(\d+(?:\.\d+)?)(s|ms)/);
    if (durationMatch) {
      const [, duration, unit] = durationMatch;
      const ms = unit === 's' ? parseFloat(duration) * 1000 : parseFloat(duration);
      return ms >= 200; // 极简主题倾向于使用较长的动画时间
    }
    
    return true; // 没有动画也符合极简原则
  },
};

/**
 * 导出测试工具
 */
export { TestHelpers as default };

/**
 * Jest配置扩展
 */
if (typeof jest !== 'undefined') {
  // 扩展Jest匹配器
  expect.extend({
    toHaveMinimalThemeClass(received, className) {
      const pass = MinimalTestAssertions.toHaveMinimalThemeClass(received, className);
      return {
        message: () => 
          pass
            ? `Expected element not to have minimal theme class "${className}"`
            : `Expected element to have minimal theme class "${className}"`,
        pass,
      };
    },
    
    toMatchMinimalDesignPrinciples(received) {
      const result = MinimalTestAssertions.toMatchMinimalDesignPrinciples(received);
      const pass = result.hasGrayScaleColors && result.hasSubtleShadows && result.hasSystemFonts;
      
      return {
        message: () =>
          pass
            ? 'Expected element not to match minimal design principles'
            : `Expected element to match minimal design principles. Got: ${JSON.stringify(result)}`,
        pass,
      };
    },
    
    toHaveSubtleAnimations(received) {
      const pass = MinimalTestAssertions.toHaveSubtleAnimations(received);
      return {
        message: () =>
          pass
            ? 'Expected element not to have subtle animations'
            : 'Expected element to have subtle animations (>= 200ms duration)',
        pass,
      };
    },
  });
}