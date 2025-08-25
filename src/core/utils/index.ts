/**
 * 核心工具函数统一导出
 * 
 * 提供组件库核心工具函数的统一入口
 * 包括可访问性、样式缓存、性能监控等工具
 * 
 * @version 1.0.0
 * @author YggJS Team
 */

// 可访问性工具导出
export {
  hasAccessibleName,
  generateUniqueId,
  checkColorContrast,
  calculateContrastRatio,
  getLuminance,
  parseColorToRGB,
  isKeyboardAccessible,
  generateButtonAriaProps,
  prefersReducedMotion,
  prefersHighContrast,
  prefersDarkColorScheme,
  FocusManager,
  ScreenReaderAnnouncer,
  AccessibilityChecker,
} from './accessibility';

// 样式缓存工具导出
export {
  StyleCacheImpl,
  StyleCacheUtils,
  defaultStyleCache,
  configureStyleCache,
  destroyStyleCache,
} from './style-cache';

// 主题样式生成器
export {
  ThemeAwareStyleGenerator,
  StyleGeneratorFactory,
  styleGeneratorFactory,
  generateThemeStyles,
  generateButtonThemeStyles,
  type StyleGeneratorOptions,
  type StyleGenerationContext,
  type StyleComputeFunction,
} from './theme-style-generator';

// 性能监控工具导出
export {
  PerformanceMonitor,
  getPerformanceMonitor,
  configurePerformanceMonitor,
  withPerformanceMonitoring,
  usePerformanceMonitoring,
} from './performance';

/**
 * 通用工具函数集合
 */

/**
 * 防抖函数
 * 
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @param immediate - 是否立即执行
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
    
    if (callNow) {
      func(...args);
    }
  };
}

/**
 * 节流函数
 * 
 * @param func - 要节流的函数
 * @param limit - 限制时间间隔（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * 深度合并对象
 * 
 * @param target - 目标对象
 * @param sources - 源对象数组
 * @returns 合并后的对象
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Array<Partial<T>>
): T {
  if (!sources.length) return target;
  
  const source = sources.shift();
  if (!source) return target;

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * 检查值是否为对象
 * 
 * @param item - 要检查的值
 * @returns 是否为对象
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * 深度克隆对象
 * 
 * @param obj - 要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

/**
 * 检查两个值是否深度相等
 * 
 * @param a - 第一个值
 * @param b - 第二个值
 * @returns 是否相等
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
    return a === b;
  }

  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }

  if (a.prototype !== b.prototype) return false;

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {
    return false;
  }

  return keys.every(k => deepEqual(a[k], b[k]));
}

/**
 * 生成随机字符串
 * 
 * @param length - 字符串长度
 * @param chars - 可选字符集
 * @returns 随机字符串
 */
export function generateRandomString(
  length: number = 8,
  chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  const charactersLength = chars.length;
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

/**
 * 格式化文件大小
 * 
 * @param bytes - 字节数
 * @param decimals - 小数位数
 * @returns 格式化的文件大小字符串
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 数组去重
 * 
 * @param array - 要去重的数组
 * @param key - 对象数组的去重键（可选）
 * @returns 去重后的数组
 */
export function uniqueArray<T>(array: T[], key?: keyof T): T[] {
  if (key) {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }
  
  return Array.from(new Set(array));
}

/**
 * 数组分块
 * 
 * @param array - 要分块的数组
 * @param size - 每块大小
 * @returns 分块后的二维数组
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  
  return chunks;
}

/**
 * 延迟执行函数
 * 
 * @param ms - 延迟毫秒数
 * @returns Promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 重试函数
 * 
 * @param fn - 要重试的函数
 * @param retries - 重试次数
 * @param delayMs - 重试间隔
 * @returns Promise
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (i === retries) {
        throw lastError;
      }
      
      await delay(delayMs);
    }
  }
  
  throw lastError!;
}

/**
 * 条件执行函数
 * 
 * @param condition - 执行条件
 * @param fn - 要执行的函数
 * @param elseFn - 条件不满足时执行的函数（可选）
 * @returns 执行结果
 */
export function conditional<T, U = undefined>(
  condition: boolean,
  fn: () => T,
  elseFn?: () => U
): T | U | undefined {
  if (condition) {
    return fn();
  } else if (elseFn) {
    return elseFn();
  }
  return undefined;
}

/**
 * 管道函数
 * 将多个函数串联执行
 * 
 * @param value - 初始值
 * @param fns - 函数数组
 * @returns 最终结果
 */
export function pipe<T>(value: T, ...fns: Array<(arg: T) => T>): T {
  return fns.reduce((acc, fn) => fn(acc), value);
}

/**
 * 组合函数
 * 从右到左组合多个函数
 * 
 * @param fns - 函数数组
 * @returns 组合后的函数
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (value: T) => fns.reduceRight((acc, fn) => fn(acc), value);
}

/**
 * 柯里化函数
 * 
 * @param fn - 要柯里化的函数
 * @returns 柯里化后的函数
 */
export function curry<T extends (...args: any[]) => any>(fn: T) {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2: any[]) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

/**
 * 记忆化函数
 * 
 * @param fn - 要记忆化的函数
 * @param getKey - 获取缓存键的函数（可选）
 * @returns 记忆化后的函数
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  const memoized = function (...args: Parameters<T>): ReturnType<T> {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  } as T;
  
  // 添加缓存管理方法
  (memoized as any).clearCache = () => cache.clear();
  (memoized as any).deleteCache = (key: string) => cache.delete(key);
  (memoized as any).getCacheSize = () => cache.size;
  
  return memoized;
}

/**
 * 对象路径获取值
 * 
 * @param obj - 源对象
 * @param path - 属性路径
 * @param defaultValue - 默认值
 * @returns 属性值
 */
export function get<T = any>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result == null) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
}

/**
 * 对象路径设置值
 * 
 * @param obj - 目标对象
 * @param path - 属性路径
 * @param value - 要设置的值
 * @returns 修改后的对象
 */
export function set(obj: any, path: string, value: any): any {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  
  let current = obj;
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[lastKey] = value;
  return obj;
}

/**
 * 检查是否为空值
 * 
 * @param value - 要检查的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return false;
  if (typeof value === 'string') return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Date) return false;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  
  return false;
}

/**
 * 类名合并工具
 * 支持条件类名和数组类名
 * 
 * @param classes - 类名参数
 * @returns 合并后的类名字符串
 */
export function classNames(...classes: Array<string | undefined | null | false | Record<string, boolean>>): string {
  const result: string[] = [];
  
  for (const cls of classes) {
    if (!cls) continue;
    
    if (typeof cls === 'string') {
      result.push(cls);
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) {
          result.push(key);
        }
      }
    }
  }
  
  return result.join(' ');
}

/**
 * CSS变量工具
 * 生成CSS自定义属性
 */
export const cssVar = {
  /**
   * 生成CSS变量名
   * 
   * @param name - 变量名
   * @param prefix - 前缀
   * @returns CSS变量名
   */
  name(name: string, prefix: string = 'ygg'): string {
    return `--${prefix}-${name}`;
  },
  
  /**
   * 生成CSS变量值引用
   * 
   * @param name - 变量名
   * @param fallback - 回退值
   * @returns CSS变量引用
   */
  value(name: string, fallback?: string): string {
    return fallback ? `var(${name}, ${fallback})` : `var(${name})`;
  },
  
  /**
   * 创建CSS变量对象
   * 
   * @param vars - 变量定义对象
   * @param prefix - 前缀
   * @returns CSS变量样式对象
   */
  create(vars: Record<string, string | number>, prefix: string = 'ygg'): Record<string, string | number> {
    const result: Record<string, string | number> = {};
    
    for (const [key, value] of Object.entries(vars)) {
      result[this.name(key, prefix)] = value;
    }
    
    return result;
  },
};