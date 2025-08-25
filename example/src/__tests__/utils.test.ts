/**
 * 工具函数测试文件
 * 测试 utils 模块中的各种工具函数
 */
import { describe, test, expect, jest } from '@jest/globals';
import {
  formatCode,
  copyToClipboard,
  debounce,
  throttle,
  generateId,
  detectDevice,
  getContrastColor,
  deepClone,
  formatFileSize
} from '../utils';

describe('工具函数测试', () => {
  describe('formatCode', () => {
    test('应该正确移除多余的缩进', () => {
      const input = `
        function test() {
          console.log('hello');
        }
      `;
      
      const expected = `function test() {
  console.log('hello');
}`;
      
      expect(formatCode(input)).toBe(expected);
    });

    test('应该处理空字符串', () => {
      expect(formatCode('')).toBe('');
    });

    test('应该处理只有空行的字符串', () => {
      expect(formatCode('\n\n\n')).toBe('');
    });

    test('应该保留代码结构', () => {
      const input = `const a = 1;\nconst b = 2;`;
      expect(formatCode(input)).toBe(input);
    });
  });

  describe('copyToClipboard', () => {
    test('应该使用现代剪贴板API', async () => {
      // 模拟现代浏览器环境
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockResolvedValue(undefined),
        },
      });
      
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const result = await copyToClipboard('test text');
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    });

    test('应该处理复制失败的情况', async () => {
      // 模拟复制失败
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockRejectedValue(new Error('Failed')),
        },
      });

      const result = await copyToClipboard('test text');
      expect(result).toBe(false);
    });
  });

  describe('debounce', () => {
    test('应该延迟执行函数', (done) => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      debouncedFn('test');
      debouncedFn('test2');
      debouncedFn('test3');
      
      // 立即检查，函数不应该被调用
      expect(mockFn).not.toHaveBeenCalled();
      
      // 等待延迟时间后检查
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith('test3');
        done();
      }, 150);
    });
  });

  describe('throttle', () => {
    test('应该限制函数执行频率', (done) => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);
      
      throttledFn('call1');
      throttledFn('call2');
      throttledFn('call3');
      
      // 第一次调用应该立即执行
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call1');
      
      // 等待节流时间结束
      setTimeout(() => {
        throttledFn('call4');
        expect(mockFn).toHaveBeenCalledTimes(2);
        expect(mockFn).toHaveBeenLastCalledWith('call4');
        done();
      }, 150);
    });
  });

  describe('generateId', () => {
    test('应该生成带前缀的随机ID', () => {
      const id = generateId('test');
      expect(id).toMatch(/^test-[a-z0-9]+$/);
    });

    test('应该生成默认前缀的ID', () => {
      const id = generateId();
      expect(id).toMatch(/^id-[a-z0-9]+$/);
    });

    test('应该生成不同的ID', () => {
      const id1 = generateId('test');
      const id2 = generateId('test');
      expect(id1).not.toBe(id2);
    });
  });

  describe('detectDevice', () => {
    test('应该检测设备类型', () => {
      // 模拟桌面环境
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        configurable: true,
      });

      const device = detectDevice();
      expect(device.isDesktop).toBe(true);
      expect(device.isMobile).toBe(false);
      expect(device.isTablet).toBe(false);
    });
  });

  describe('getContrastColor', () => {
    test('应该为浅色返回黑色', () => {
      expect(getContrastColor('#ffffff')).toBe('#000000');
      expect(getContrastColor('#f0f0f0')).toBe('#000000');
    });

    test('应该为深色返回白色', () => {
      expect(getContrastColor('#000000')).toBe('#ffffff');
      expect(getContrastColor('#333333')).toBe('#ffffff');
    });

    test('应该处理无#号的颜色值', () => {
      expect(getContrastColor('ffffff')).toBe('#000000');
    });
  });

  describe('deepClone', () => {
    test('应该深度克隆对象', () => {
      const original = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4, 5]
        }
      };

      const cloned = deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
      expect(cloned.b.d).not.toBe(original.b.d);
    });

    test('应该处理数组', () => {
      const original = [1, 2, { a: 3 }];
      const cloned = deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[2]).not.toBe(original[2]);
    });

    test('应该处理日期对象', () => {
      const date = new Date('2023-01-01');
      const cloned = deepClone(date);
      
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    test('应该处理基本类型', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });
  });

  describe('formatFileSize', () => {
    test('应该格式化字节大小', () => {
      expect(formatFileSize(0)).toBe('0 B');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });

    test('应该处理小数', () => {
      expect(formatFileSize(1500)).toBe('1.46 KB');
    });

    test('应该处理大文件', () => {
      const size = formatFileSize(1099511627776); // 1TB
      expect(size).toBe('1 TB');
    });
  });
});