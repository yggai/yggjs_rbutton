/**
 * Jest 测试环境配置文件
 * 配置 React Testing Library 和 Jest DOM 扩展
 */
/// <reference types="jest" />

import '@testing-library/jest-dom';

// 模拟 ResizeObserver
(globalThis as Record<string, unknown>).ResizeObserver = class ResizeObserver {
  observe(): void {
    // 空实现
  }
  unobserve(): void {
    // 空实现
  }
  disconnect(): void {
    // 空实现
  }
};

// 模拟 matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // 兼容性
    removeListener: jest.fn(), // 兼容性
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 模拟 getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: (): Partial<CSSStyleDeclaration> => ({
    getPropertyValue: (): string => '',
  }),
});