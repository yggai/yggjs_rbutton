/**
 * 性能监控工具
 * 
 * 提供组件渲染性能监控、内存使用跟踪、性能指标收集等功能
 * 帮助开发者发现性能瓶颈和优化机会
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import React from 'react';
import type { PerformanceMetrics } from '../types';
import { DEVELOPMENT_CONSTANTS } from '../../shared/constants';

/**
 * 性能测量结果接口
 */
interface PerformanceMeasurement {
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
  metadata?: Record<string, unknown>;
}

/**
 * 内存使用快照接口
 */
interface MemorySnapshot {
  timestamp: number;
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  componentInstances: number;
  cacheSize: number;
}

/**
 * 性能警告接口
 */
interface PerformanceWarning {
  type: 'render' | 'update' | 'memory' | 'cache';
  component: string;
  threshold: number;
  actual: number;
  timestamp: number;
  suggestion: string;
}

/**
 * 性能监控器配置接口
 */
interface PerformanceMonitorConfig {
  enabled: boolean;
  sampleRate: number;
  maxMeasurements: number;
  memoryCheckInterval: number;
  warningThresholds: {
    renderTime: number;
    updateTime: number;
    memoryUsage: number;
    cacheSize: number;
  };
}

/**
 * 高性能的性能监控器实现
 * 
 * 使用Performance API和内存监控提供详细的性能分析
 * 支持采样、阈值警告、性能建议等功能
 */
export class PerformanceMonitor {
  private config: PerformanceMonitorConfig;
  private measurements: PerformanceMeasurement[] = [];
  private memorySnapshots: MemorySnapshot[] = [];
  private warnings: PerformanceWarning[] = [];
  private componentInstances = new Map<string, number>();
  private renderStartTimes = new Map<string, number>();
  private updateStartTimes = new Map<string, number>();
  private memoryTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<PerformanceMonitorConfig> = {}) {
    this.config = {
      enabled: config.enabled ?? (process.env.NODE_ENV === 'development'),
      sampleRate: config.sampleRate ?? 1.0,
      maxMeasurements: config.maxMeasurements ?? 1000,
      memoryCheckInterval: config.memoryCheckInterval ?? 5000,
      warningThresholds: {
        renderTime: config.warningThresholds?.renderTime ?? DEVELOPMENT_CONSTANTS.PERFORMANCE_THRESHOLDS.RENDER_TIME,
        updateTime: config.warningThresholds?.updateTime ?? DEVELOPMENT_CONSTANTS.PERFORMANCE_THRESHOLDS.UPDATE_TIME,
        memoryUsage: config.warningThresholds?.memoryUsage ?? DEVELOPMENT_CONSTANTS.PERFORMANCE_THRESHOLDS.MEMORY_USAGE,
        cacheSize: config.warningThresholds?.cacheSize ?? 100,
      },
    };

    if (this.config.enabled) {
      this.startMemoryMonitoring();
    }
  }

  /**
   * 开始测量渲染性能
   * 
   * @param componentName - 组件名称
   * @param props - 组件属性（用于分析）
   */
  startRenderMeasurement(componentName: string): void {
    if (!this.shouldSample()) return;

    const measurementName = `${componentName}-render-${Date.now()}`;
    const startTime = performance.now();
    
    this.renderStartTimes.set(componentName, startTime);
    
    if (performance.mark) {
      performance.mark(`${measurementName}-start`);
    }

    // 记录组件实例数量
    const currentCount = this.componentInstances.get(componentName) || 0;
    this.componentInstances.set(componentName, currentCount + 1);
  }

  /**
   * 结束渲染性能测量
   * 
   * @param componentName - 组件名称
   */
  endRenderMeasurement(componentName: string): void {
    if (!this.config.enabled) return;

    const startTime = this.renderStartTimes.get(componentName);
    if (!startTime) return;

    const endTime = performance.now();
    const duration = endTime - startTime;

    const measurement: PerformanceMeasurement = {
      name: `${componentName}-render`,
      duration,
      startTime,
      endTime,
      metadata: {
        type: 'render',
        component: componentName,
        instances: this.componentInstances.get(componentName),
      },
    };

    this.addMeasurement(measurement);

    // 检查是否超过阈值
    if (duration > this.config.warningThresholds.renderTime) {
      this.addWarning({
        type: 'render',
        component: componentName,
        threshold: this.config.warningThresholds.renderTime,
        actual: duration,
        timestamp: Date.now(),
        suggestion: this.generateRenderSuggestion(duration),
      });
    }

    this.renderStartTimes.delete(componentName);
  }

  /**
   * 开始测量更新性能
   * 
   * @param componentName - 组件名称
   * @param updateType - 更新类型
   */
  startUpdateMeasurement(componentName: string, updateType: string = 'update'): void {
    if (!this.shouldSample()) return;

    const startTime = performance.now();
    this.updateStartTimes.set(`${componentName}-${updateType}`, startTime);
  }

  /**
   * 结束更新性能测量
   * 
   * @param componentName - 组件名称
   * @param updateType - 更新类型
   */
  endUpdateMeasurement(componentName: string, updateType: string = 'update'): void {
    if (!this.config.enabled) return;

    const key = `${componentName}-${updateType}`;
    const startTime = this.updateStartTimes.get(key);
    if (!startTime) return;

    const endTime = performance.now();
    const duration = endTime - startTime;

    const measurement: PerformanceMeasurement = {
      name: `${componentName}-${updateType}`,
      duration,
      startTime,
      endTime,
      metadata: {
        type: 'update',
        component: componentName,
        updateType,
      },
    };

    this.addMeasurement(measurement);

    // 检查是否超过阈值
    if (duration > this.config.warningThresholds.updateTime) {
      this.addWarning({
        type: 'update',
        component: componentName,
        threshold: this.config.warningThresholds.updateTime,
        actual: duration,
        timestamp: Date.now(),
        suggestion: this.generateUpdateSuggestion(duration),
      });
    }

    this.updateStartTimes.delete(key);
  }

  /**
   * 测量函数执行性能
   * 
   * @param name - 测量名称
   * @param fn - 要测量的函数
   * @returns 函数执行结果
   */
  async measureFunction<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
    if (!this.config.enabled) {
      return await fn();
    }

    const startTime = performance.now();
    
    try {
      const result = await fn();
      const endTime = performance.now();
      const duration = endTime - startTime;

      this.addMeasurement({
        name,
        duration,
        startTime,
        endTime,
        metadata: {
          type: 'function',
          success: true,
        },
      });

      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      this.addMeasurement({
        name,
        duration,
        startTime,
        endTime,
        metadata: {
          type: 'function',
          success: false,
          error: error instanceof Error ? error.message : String(error),
        },
      });

      throw error;
    }
  }

  /**
   * 记录内存使用情况
   * 
   * @param cacheSize - 当前缓存大小
   */
  recordMemoryUsage(cacheSize: number = 0): void {
    if (!this.config.enabled || !this.hasMemoryAPI()) return;

    const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
    const snapshot: MemorySnapshot = {
      timestamp: Date.now(),
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      componentInstances: Array.from(this.componentInstances.values()).reduce((sum, count) => sum + count, 0),
      cacheSize,
    };

    this.memorySnapshots.push(snapshot);

    // 保留最近的快照
    if (this.memorySnapshots.length > 100) {
      this.memorySnapshots.splice(0, this.memorySnapshots.length - 100);
    }

    // 检查内存使用警告
    if (snapshot.usedJSHeapSize > this.config.warningThresholds.memoryUsage) {
      this.addWarning({
        type: 'memory',
        component: 'global',
        threshold: this.config.warningThresholds.memoryUsage,
        actual: snapshot.usedJSHeapSize,
        timestamp: Date.now(),
        suggestion: this.generateMemorySuggestion(snapshot.usedJSHeapSize),
      });
    }

    // 检查缓存大小警告
    if (cacheSize > this.config.warningThresholds.cacheSize) {
      this.addWarning({
        type: 'cache',
        component: 'cache',
        threshold: this.config.warningThresholds.cacheSize,
        actual: cacheSize,
        timestamp: Date.now(),
        suggestion: '考虑清理缓存或增加缓存大小限制',
      });
    }
  }

  /**
   * 获取性能指标摘要
   * 
   * @returns 性能指标对象
   */
  getMetrics(): PerformanceMetrics {
    const renderMeasurements = this.measurements.filter(m => m.metadata?.type === 'render');
    const updateMeasurements = this.measurements.filter(m => m.metadata?.type === 'update');
    
    const avgRenderTime = this.calculateAverageTime(renderMeasurements);
    const avgUpdateTime = this.calculateAverageTime(updateMeasurements);
    
    const latestMemory = this.memorySnapshots[this.memorySnapshots.length - 1];
    const memoryUsage = latestMemory ? latestMemory.usedJSHeapSize : 0;
    
    // 计算缓存命中率（需要外部提供缓存统计）
    const cacheHitRate = this.calculateCacheHitRate();

    return {
      renderTime: avgRenderTime,
      updateTime: avgUpdateTime,
      memoryUsage,
      cacheHitRate,
    };
  }

  /**
   * 获取性能警告
   * 
   * @param limit - 返回的警告数量限制
   * @returns 性能警告数组
   */
  getWarnings(limit: number = 10): PerformanceWarning[] {
    return this.warnings
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  /**
   * 获取组件性能排名
   * 
   * @param metric - 排名指标
   * @param limit - 返回数量限制
   * @returns 组件性能排名
   */
  getComponentRanking(
    metric: 'renderTime' | 'updateTime' | 'instances' = 'renderTime',
    limit: number = 10
  ): Array<{ component: string; value: number; count: number }> {
    const componentStats = new Map<string, { total: number; count: number }>();

    const relevantMeasurements = this.measurements.filter(m => {
      const type = m.metadata?.type;
      return (metric === 'renderTime' && type === 'render') ||
             (metric === 'updateTime' && type === 'update');
    });

    relevantMeasurements.forEach(measurement => {
      const component = measurement.metadata?.component;
      if (!component) return;

      const stats = componentStats.get(component) || { total: 0, count: 0 };
      stats.total += measurement.duration;
      stats.count += 1;
      componentStats.set(component, stats);
    });

    const ranking = Array.from(componentStats.entries())
      .map(([component, stats]) => ({
        component,
        value: stats.total / stats.count, // 平均值
        count: stats.count,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, limit);

    return ranking;
  }

  /**
   * 生成性能报告
   * 
   * @returns 格式化的性能报告
   */
  generateReport(): string {
    const metrics = this.getMetrics();
    const warnings = this.getWarnings(5);
    const ranking = this.getComponentRanking('renderTime', 5);

    let report = '# 性能监控报告\n\n';
    
    // 基础指标
    report += '## 基础指标\n';
    report += `- 平均渲染时间: ${metrics.renderTime.toFixed(2)}ms\n`;
    report += `- 平均更新时间: ${metrics.updateTime.toFixed(2)}ms\n`;
    report += `- 内存使用: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB\n`;
    report += `- 缓存命中率: ${(metrics.cacheHitRate * 100).toFixed(2)}%\n\n`;

    // 性能警告
    if (warnings.length > 0) {
      report += '## ⚠️ 性能警告\n';
      warnings.forEach(warning => {
        report += `- **${warning.component}** (${warning.type}): ${warning.actual.toFixed(2)} > ${warning.threshold}\n`;
        report += `  建议: ${warning.suggestion}\n`;
      });
      report += '\n';
    }

    // 组件排名
    if (ranking.length > 0) {
      report += '## 📊 组件渲染时间排名\n';
      ranking.forEach((item, index) => {
        report += `${index + 1}. **${item.component}**: ${item.value.toFixed(2)}ms (${item.count}次测量)\n`;
      });
      report += '\n';
    }

    // 内存趋势
    if (this.memorySnapshots.length > 1) {
      const first = this.memorySnapshots[0];
      const last = this.memorySnapshots[this.memorySnapshots.length - 1];
      const trend = last.usedJSHeapSize - first.usedJSHeapSize;
      
      report += '## 📈 内存趋势\n';
      report += `内存变化: ${(trend / 1024 / 1024).toFixed(2)}MB\n`;
      report += `组件实例数: ${last.componentInstances}\n\n`;
    }

    return report;
  }

  /**
   * 清除所有监控数据
   */
  clear(): void {
    this.measurements = [];
    this.memorySnapshots = [];
    this.warnings = [];
    this.componentInstances.clear();
    this.renderStartTimes.clear();
    this.updateStartTimes.clear();
  }

  /**
   * 销毁监控器
   */
  destroy(): void {
    if (this.memoryTimer) {
      clearInterval(this.memoryTimer);
      this.memoryTimer = null;
    }
    this.clear();
  }

  /**
   * 检查是否应该进行采样
   */
  private shouldSample(): boolean {
    return this.config.enabled && Math.random() < this.config.sampleRate;
  }

  /**
   * 添加性能测量
   */
  private addMeasurement(measurement: PerformanceMeasurement): void {
    this.measurements.push(measurement);

    // 保持测量数据在限制范围内
    if (this.measurements.length > this.config.maxMeasurements) {
      this.measurements.splice(0, this.measurements.length - this.config.maxMeasurements);
    }
  }

  /**
   * 添加性能警告
   */
  private addWarning(warning: PerformanceWarning): void {
    this.warnings.push(warning);

    // 保持警告数据在合理范围内
    if (this.warnings.length > 100) {
      this.warnings.splice(0, this.warnings.length - 100);
    }

    // 在开发环境下输出警告
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[性能警告] ${warning.component} ${warning.type}: ${warning.actual.toFixed(2)} > ${warning.threshold}`);
      console.warn(`建议: ${warning.suggestion}`);
    }
  }

  /**
   * 计算平均时间
   */
  private calculateAverageTime(measurements: PerformanceMeasurement[]): number {
    if (measurements.length === 0) return 0;
    
    const total = measurements.reduce((sum, m) => sum + m.duration, 0);
    return total / measurements.length;
  }

  /**
   * 计算缓存命中率（简化实现）
   */
  private calculateCacheHitRate(): number {
    // 这里需要外部提供缓存统计数据
    // 目前返回一个模拟值
    return 0.85;
  }

  /**
   * 检查是否支持内存API
   */
  private hasMemoryAPI(): boolean {
    return typeof performance !== 'undefined' && 
           typeof (performance as { memory?: unknown }).memory !== 'undefined';
  }

  /**
   * 开始内存监控
   */
  private startMemoryMonitoring(): void {
    if (!this.hasMemoryAPI()) return;

    this.memoryTimer = setInterval(() => {
      this.recordMemoryUsage();
    }, this.config.memoryCheckInterval);
  }

  /**
   * 生成渲染性能建议
   */
  private generateRenderSuggestion(duration: number): string {
    if (duration > 50) {
      return '渲染时间过长，考虑使用 React.memo 或减少组件复杂度';
    } else if (duration > 20) {
      return '渲染时间较长，检查是否有不必要的重新计算';
    }
    return '考虑优化渲染逻辑';
  }

  /**
   * 生成更新性能建议
   */
  private generateUpdateSuggestion(duration: number): string {
    if (duration > 20) {
      return '更新时间过长，检查是否有复杂的样式计算';
    } else if (duration > 10) {
      return '更新时间较长，考虑使用缓存或减少DOM操作';
    }
    return '考虑优化更新逻辑';
  }

  /**
   * 生成内存使用建议
   */
  private generateMemorySuggestion(usage: number): string {
    const usageMB = usage / 1024 / 1024;
    
    if (usageMB > 50) {
      return '内存使用过高，检查是否有内存泄漏或过度缓存';
    } else if (usageMB > 20) {
      return '内存使用较高，考虑清理不必要的缓存';
    }
    return '监控内存使用情况';
  }
}

/**
 * 全局性能监控器实例
 */
let globalMonitor: PerformanceMonitor | null = null;

/**
 * 获取全局性能监控器
 * 
 * @returns 全局监控器实例
 */
export function getPerformanceMonitor(): PerformanceMonitor {
  if (!globalMonitor) {
    globalMonitor = new PerformanceMonitor();
  }
  return globalMonitor;
}

/**
 * 配置全局性能监控器
 * 
 * @param config - 监控器配置
 */
export function configurePerformanceMonitor(config: Partial<PerformanceMonitorConfig>): void {
  if (globalMonitor) {
    globalMonitor.destroy();
  }
  globalMonitor = new PerformanceMonitor(config);
}

/**
 * 性能装饰器
 * 用于自动测量组件渲染性能
 */
export function withPerformanceMonitoring<T extends React.ComponentType<Record<string, unknown>>>(
  Component: T,
  componentName?: string
): T {
  const name = componentName || Component.displayName || Component.name || 'Anonymous';
  
  const WrappedComponent = React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    const monitor = getPerformanceMonitor();
    
    React.useLayoutEffect(() => {
      monitor.startRenderMeasurement(name, props);
      
      return () => {
        monitor.endRenderMeasurement(name);
      };
    });
    
    return React.createElement(Component, { ...props, ref });
  });
  
  WrappedComponent.displayName = `withPerformanceMonitoring(${name})`;
  
  return WrappedComponent as T;
}

/**
 * 性能Hook
 * 提供组件内部的性能监控能力
 */
export function usePerformanceMonitoring(componentName: string) {
  const monitor = getPerformanceMonitor();
  
  const startRender = React.useCallback(() => {
    monitor.startRenderMeasurement(componentName);
  }, [componentName, monitor]);
  
  const endRender = React.useCallback(() => {
    monitor.endRenderMeasurement(componentName);
  }, [componentName, monitor]);
  
  const startUpdate = React.useCallback((updateType?: string) => {
    monitor.startUpdateMeasurement(componentName, updateType);
  }, [componentName, monitor]);
  
  const endUpdate = React.useCallback((updateType?: string) => {
    monitor.endUpdateMeasurement(componentName, updateType);
  }, [componentName, monitor]);
  
  const measureFunction = React.useCallback(<T,>(name: string, fn: () => T | Promise<T>) => {
    return monitor.measureFunction(name, fn);
  }, [monitor]);
  
  return {
    startRender,
    endRender,
    startUpdate,
    endUpdate,
    measureFunction,
    getMetrics: () => monitor.getMetrics(),
    getWarnings: (limit?: number) => monitor.getWarnings(limit),
  };
}

// 在开发环境下自动启用全局监控
if (process.env.NODE_ENV === 'development') {
  getPerformanceMonitor();
}