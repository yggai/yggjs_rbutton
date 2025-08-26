/**
 * 样式缓存系统
 * 
 * 提供高性能的样式缓存和管理功能
 * 支持TTL、LRU淘汰、内存限制等高级特性
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import type { StyleCache, StyleCacheKey, StyleCacheValue, CacheItem } from '../types';
import { CACHE_CONSTANTS } from '../../shared/constants';

/**
 * 缓存配置接口
 */
interface CacheConfig {
  maxSize: number;
  ttl: number;
  enablePersistence: boolean;
  storageKey: string;
  cleanupInterval: number;
}

/**
 * 缓存统计信息
 */
export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  clears: number;
  size: number;
  hitRate: number;
  memoryUsage: number;
}

/**
 * 高性能样式缓存实现
 * 
 * 使用Map数据结构提供O(1)的读写性能
 * 支持TTL过期、LRU淘汰策略、内存使用监控
 */
export class StyleCacheImpl implements StyleCache {
  private cache = new Map<StyleCacheKey, CacheItem<StyleCacheValue>>();
  private accessOrder = new Map<StyleCacheKey, number>();
  private config: CacheConfig;
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    clears: 0,
    size: 0,
    hitRate: 0,
    memoryUsage: 0,
  };
  private cleanupTimer: NodeJS.Timeout | null = null;
  private accessCounter = 0;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: config.maxSize ?? CACHE_CONSTANTS.DEFAULTS.MAX_SIZE,
      ttl: config.ttl ?? CACHE_CONSTANTS.DEFAULTS.TTL,
      enablePersistence: config.enablePersistence ?? CACHE_CONSTANTS.DEFAULTS.ENABLE_PERSISTENCE,
      storageKey: config.storageKey ?? 'ygg-style-cache',
      cleanupInterval: config.cleanupInterval ?? CACHE_CONSTANTS.CLEANUP.INTERVAL,
    };

    this.startCleanupTimer();
    this.loadFromPersistence();
  }

  /**
   * 获取缓存的样式
   * 
   * @param key - 缓存键
   * @returns 样式对象或undefined
   */
  get(key: StyleCacheKey): StyleCacheValue | undefined {
    const item = this.cache.get(key);
    
    if (!item) {
      this.stats.misses++;
      this.updateStats();
      return undefined;
    }
    
    // 检查是否过期
    if (this.isExpired(item)) {
      this.cache.delete(key);
      this.accessOrder.delete(key);
      this.stats.misses++;
      this.updateStats();
      return undefined;
    }
    
    // 更新访问顺序（LRU）
    this.accessOrder.set(key, ++this.accessCounter);
    
    this.stats.hits++;
    this.updateStats();
    
    return item.value;
  }

  /**
   * 设置样式缓存
   * 
   * @param key - 缓存键
   * @param value - 样式对象
   */
  set(key: StyleCacheKey, value: StyleCacheValue): void {
    // 检查是否需要淘汰旧数据
    if (this.cache.size >= this.config.maxSize && !this.cache.has(key)) {
      this.evictLeastRecentlyUsed();
    }
    
    const item: CacheItem<StyleCacheValue> = {
      value,
      timestamp: Date.now(),
      ttl: this.config.ttl,
    };
    
    this.cache.set(key, item);
    this.accessOrder.set(key, ++this.accessCounter);
    
    this.stats.sets++;
    this.updateStats();
    
    // 异步持久化
    if (this.config.enablePersistence) {
      this.saveToPersistence();
    }
  }

  /**
   * 检查是否存在缓存
   * 
   * @param key - 缓存键
   * @returns 是否存在
   */
  has(key: StyleCacheKey): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }
    
    // 检查是否过期
    if (this.isExpired(item)) {
      this.cache.delete(key);
      this.accessOrder.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * 清除特定缓存
   * 
   * @param key - 缓存键
   * @returns 是否成功删除
   */
  delete(key: StyleCacheKey): boolean {
    const result = this.cache.delete(key);
    this.accessOrder.delete(key);
    
    if (result) {
      this.stats.deletes++;
      this.updateStats();
      
      if (this.config.enablePersistence) {
        this.saveToPersistence();
      }
    }
    
    return result;
  }

  /**
   * 清除所有缓存
   */
  clear(): void {
    this.cache.clear();
    this.accessOrder.clear();
    this.accessCounter = 0;
    
    this.stats.clears++;
    this.updateStats();
    
    if (this.config.enablePersistence) {
      this.clearPersistence();
    }
  }

  /**
   * 获取缓存大小
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * 获取缓存统计信息
   * 
   * @returns 统计信息对象
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * 重置统计信息
   */
  resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      clears: 0,
      size: this.cache.size,
      hitRate: 0,
      memoryUsage: this.estimateMemoryUsage(),
    };
  }

  /**
   * 清理过期的缓存项
   * 
   * @returns 清理的项目数量
   */
  cleanup(): number {
    const now = Date.now();
    const keysToDelete: StyleCacheKey[] = [];
    
    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item, now)) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => {
      this.cache.delete(key);
      this.accessOrder.delete(key);
    });
    
    if (keysToDelete.length > 0) {
      this.updateStats();
      
      if (this.config.enablePersistence) {
        this.saveToPersistence();
      }
    }
    
    return keysToDelete.length;
  }

  /**
   * 获取所有缓存键
   * 
   * @returns 缓存键数组
   */
  keys(): StyleCacheKey[] {
    return Array.from(this.cache.keys());
  }

  /**
   * 获取所有缓存值
   * 
   * @returns 缓存值数组
   */
  values(): StyleCacheValue[] {
    return Array.from(this.cache.values()).map(item => item.value);
  }

  /**
   * 获取所有缓存项
   * 
   * @returns 缓存项数组
   */
  entries(): Array<[StyleCacheKey, StyleCacheValue]> {
    return Array.from(this.cache.entries()).map(([key, item]) => [key, item.value]);
  }

  /**
   * 销毁缓存实例
   * 清理定时器和事件监听器
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    
    this.clear();
  }

  /**
   * 检查缓存项是否过期
   */
  private isExpired(item: CacheItem<StyleCacheValue>, now: number = Date.now()): boolean {
    if (!item.ttl) return false;
    return now - item.timestamp > item.ttl;
  }

  /**
   * 淘汰最少使用的缓存项（LRU）
   */
  private evictLeastRecentlyUsed(): void {
    let lruKey: StyleCacheKey | null = null;
    let lruAccessTime = Number.MAX_SAFE_INTEGER;
    
    for (const [key, accessTime] of this.accessOrder.entries()) {
      if (accessTime < lruAccessTime) {
        lruAccessTime = accessTime;
        lruKey = key;
      }
    }
    
    if (lruKey) {
      this.cache.delete(lruKey);
      this.accessOrder.delete(lruKey);
    }
  }

  /**
   * 更新统计信息
   */
  private updateStats(): void {
    this.stats.size = this.cache.size;
    this.stats.hitRate = this.stats.hits / (this.stats.hits + this.stats.misses) || 0;
    this.stats.memoryUsage = this.estimateMemoryUsage();
  }

  /**
   * 估算内存使用量
   */
  private estimateMemoryUsage(): number {
    let totalSize = 0;
    
    for (const [key, item] of this.cache.entries()) {
      // 粗略估算：键长度 + 值的JSON大小
      totalSize += key.length * 2; // 字符串是UTF-16，每字符2字节
      totalSize += JSON.stringify(item.value).length * 2;
      totalSize += 64; // 对象开销
    }
    
    return totalSize;
  }

  /**
   * 启动清理定时器
   */
  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * 从持久化存储加载数据
   */
  private loadFromPersistence(): void {
    if (!this.config.enablePersistence || typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      const serialized = localStorage.getItem(this.config.storageKey);
      if (!serialized) return;
      
      const data = JSON.parse(serialized);
      if (!data || typeof data !== 'object') return;
      
      const now = Date.now();
      
      for (const [key, item] of Object.entries(data)) {
        const cacheItem = item as CacheItem<StyleCacheValue>;
        
        // 检查是否过期
        if (!this.isExpired(cacheItem, now)) {
          this.cache.set(key, cacheItem);
          this.accessOrder.set(key, ++this.accessCounter);
        }
      }
      
      this.updateStats();
    } catch (error) {
      console.warn('Failed to load style cache from persistence:', error);
      this.clearPersistence();
    }
  }

  /**
   * 保存到持久化存储
   */
  private saveToPersistence(): void {
    if (!this.config.enablePersistence || typeof localStorage === 'undefined') {
      return;
    }
    
    // 防抖保存，避免频繁写入
    if ((this as StyleCacheImpl & { saveTimeout?: NodeJS.Timeout }).saveTimeout) {
      clearTimeout((this as StyleCacheImpl & { saveTimeout?: NodeJS.Timeout }).saveTimeout);
    }
    
    (this as StyleCacheImpl & { saveTimeout?: NodeJS.Timeout }).saveTimeout = setTimeout(() => {
      try {
        const data = Object.fromEntries(this.cache.entries());
        localStorage.setItem(this.config.storageKey, JSON.stringify(data));
      } catch (error) {
        console.warn('Failed to save style cache to persistence:', error);
      }
    }, 1000);
  }

  /**
   * 清除持久化存储
   */
  private clearPersistence(): void {
    if (!this.config.enablePersistence || typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      localStorage.removeItem(this.config.storageKey);
    } catch (error) {
      console.warn('Failed to clear style cache persistence:', error);
    }
  }
}

/**
 * 全局样式缓存实例
 * 提供单例模式的缓存访问
 */
class GlobalStyleCache {
  private static instance: StyleCacheImpl | null = null;
  private static config: Partial<CacheConfig> = {};

  /**
   * 获取全局缓存实例
   */
  static getInstance(): StyleCacheImpl {
    if (!this.instance) {
      this.instance = new StyleCacheImpl(this.config);
    }
    return this.instance;
  }

  /**
   * 配置全局缓存
   */
  static configure(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config };
    
    // 如果实例已存在，重新创建
    if (this.instance) {
      this.instance.destroy();
      this.instance = new StyleCacheImpl(this.config);
    }
  }

  /**
   * 销毁全局缓存实例
   */
  static destroy(): void {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }
}

/**
 * 样式缓存工具函数
 */
export const StyleCacheUtils = {
  /**
   * 生成样式缓存键
   * 
   * @param prefix - 前缀
   * @param params - 参数对象
   * @returns 缓存键
   */
  generateCacheKey(prefix: string, params: Record<string, unknown>): StyleCacheKey {
    const sortedKeys = Object.keys(params).sort();
    const paramsString = sortedKeys
      .map(key => `${key}:${JSON.stringify(params[key])}`)
      .join('|');
    
    return `${prefix}-${this.hashString(paramsString)}`;
  },

  /**
   * 简单的字符串哈希函数
   */
  hashString(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString(36);
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    
    return Math.abs(hash).toString(36);
  },

  /**
   * 批量设置缓存
   */
  batchSet(cache: StyleCache, items: Array<[StyleCacheKey, StyleCacheValue]>): void {
    items.forEach(([key, value]) => {
      cache.set(key, value);
    });
  },

  /**
   * 批量获取缓存
   */
  batchGet(cache: StyleCache, keys: StyleCacheKey[]): Map<StyleCacheKey, StyleCacheValue> {
    const results = new Map<StyleCacheKey, StyleCacheValue>();
    
    keys.forEach(key => {
      const value = cache.get(key);
      if (value !== undefined) {
        results.set(key, value);
      }
    });
    
    return results;
  },

  /**
   * 合并样式对象并缓存
   */
  mergeAndCache(
    cache: StyleCache,
    key: StyleCacheKey,
    styles: Array<StyleCacheValue | undefined>
  ): StyleCacheValue {
    const cached = cache.get(key);
    if (cached) return cached;
    
    const merged = styles.reduce((acc, style) => {
      if (style) {
        return { ...acc, ...style };
      }
      return acc;
    }, {} as StyleCacheValue);
    
    cache.set(key, merged);
    return merged;
  },

  /**
   * 创建带缓存的样式计算函数
   */
  createCachedStyleFunction<T extends Record<string, unknown>>(
    cache: StyleCache,
    prefix: string,
    computeStyle: (params: T) => StyleCacheValue
  ) {
    return (params: T): StyleCacheValue => {
      const key = this.generateCacheKey(prefix, params);
      
      let style = cache.get(key);
      if (style === undefined) {
        style = computeStyle(params);
        cache.set(key, style);
      }
      
      return style;
    };
  },

  /**
   * 预热缓存
   * 预先计算并缓存常用的样式组合
   */
  warmupCache(
    cache: StyleCache,
    computeFunction: (params: unknown) => [StyleCacheKey, StyleCacheValue],
    paramSets: unknown[]
  ): void {
    paramSets.forEach(params => {
      const [key, value] = computeFunction(params);
      cache.set(key, value);
    });
  },
};

// 导出默认缓存实例
export const defaultStyleCache = GlobalStyleCache.getInstance();

// 导出配置函数
export const configureStyleCache = GlobalStyleCache.configure.bind(GlobalStyleCache);

// 导出销毁函数
export const destroyStyleCache = GlobalStyleCache.destroy.bind(GlobalStyleCache);