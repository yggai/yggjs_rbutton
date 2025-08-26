/**
 * 多主题性能基准测试系统
 * 
 * 对比不同主题的性能表现，包括渲染时间、内存使用、包体积等指标
 * 确保主题切换和组件渲染的高性能表现
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import React, { Profiler, ProfilerOnRenderCallback } from 'react';
import { render, cleanup } from '@testing-library/react';

/**
 * 性能测试配置接口
 */
export interface PerformanceBenchmarkConfig {
  /**
   * 测试轮数
   */
  iterations: number;
  
  /**
   * 预热轮数
   */
  warmupIterations: number;
  
  /**
   * 是否启用内存监控
   */
  enableMemoryMonitoring: boolean;
  
  /**
   * 是否启用CPU监控
   */
  enableCpuProfiling: boolean;
  
  /**
   * 性能阈值配置
   */
  thresholds: {
    renderTime: number; // 毫秒
    memoryUsage: number; // MB
    bundleSize: number; // KB
    firstContentfulPaint: number; // 毫秒
  };
  
  /**
   * 测试场景配置
   */
  scenarios: TestScenario[];
}

/**
 * 测试场景接口
 */
export interface TestScenario {
  name: string;
  description: string;
  componentCount: number;
  interactions: number;
  complexity: 'low' | 'medium' | 'high';
  renderFunction: (theme: Record<string, unknown>) => React.ReactElement;
}

/**
 * 性能测试结果接口
 */
export interface PerformanceResult {
  themeName: string;
  scenario: string;
  metrics: {
    // 渲染性能
    averageRenderTime: number;
    minRenderTime: number;
    maxRenderTime: number;
    renderTimeStdDev: number;
    
    // 内存使用
    peakMemoryUsage: number;
    averageMemoryUsage: number;
    memoryLeakDetected: boolean;
    
    // 交互性能
    firstContentfulPaint: number;
    timeToInteractive: number;
    
    // 包体积
    bundleSize: number;
    gzipSize: number;
    
    // React性能
    reactRenderCount: number;
    reactCommitTime: number;
    reactEffectTime: number;
  };
  
  // 详细的性能分析数据
  profilerData: ProfilerData[];
  
  // 警告和建议
  warnings: string[];
  recommendations: string[];
}

/**
 * React Profiler数据接口
 */
export interface ProfilerData {
  id: string;
  phase: 'mount' | 'update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<{ id: number; name: string; timestamp: number }>;
}

/**
 * 性能比较结果接口
 */
export interface PerformanceComparison {
  scenarios: string[];
  themes: string[];
  comparisons: {
    [scenario: string]: {
      [metric: string]: {
        [theme: string]: number;
      };
    };
  };
  rankings: {
    [metric: string]: Array<{
      theme: string;
      value: number;
      rank: number;
    }>;
  };
  recommendations: string[];
}

/**
 * 性能基准测试器
 */
export class PerformanceBenchmark {
  private config: PerformanceBenchmarkConfig;
  private results: Map<string, PerformanceResult[]> = new Map();
  private performanceObserver?: PerformanceObserver;

  constructor(config: Partial<PerformanceBenchmarkConfig> = {}) {
    this.config = {
      iterations: 10,
      warmupIterations: 3,
      enableMemoryMonitoring: true,
      enableCpuProfiling: false,
      thresholds: {
        renderTime: 16, // 60fps = 16.67ms per frame
        memoryUsage: 50, // 50MB
        bundleSize: 100, // 100KB
        firstContentfulPaint: 1000, // 1s
      },
      scenarios: [],
      ...config,
    };

    this.initializePerformanceObserver();
  }

  /**
   * 初始化性能观察器
   */
  private initializePerformanceObserver(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        // 处理性能条目
        entries.forEach(entry => {
          console.debug(`性能指标 ${entry.name}: ${entry.duration}ms`);
        });
      });
      
      try {
        this.performanceObserver.observe({
          entryTypes: ['measure', 'navigation', 'resource', 'paint']
        });
      } catch (error) {
        console.warn('无法启用PerformanceObserver:', error);
      }
    }
  }

  /**
   * 执行单个主题的性能测试
   */
  public async benchmarkTheme(
    themeName: string,
    themeModule: Record<string, unknown>,
    scenarios?: TestScenario[]
  ): Promise<PerformanceResult[]> {
    console.log(`🚀 开始测试主题性能: ${themeName}`);
    
    const testScenarios = scenarios || this.config.scenarios;
    const themeResults: PerformanceResult[] = [];

    // 预热
    if (this.config.warmupIterations > 0) {
      console.log(`🔥 执行 ${this.config.warmupIterations} 轮预热测试...`);
      await this.runWarmup(themeModule, testScenarios);
    }

    // 执行每个测试场景
    for (const scenario of testScenarios) {
      console.log(`📊 测试场景: ${scenario.name}`);
      
      const scenarioResult = await this.benchmarkScenario(
        themeName,
        themeModule,
        scenario
      );
      
      themeResults.push(scenarioResult);
    }

    this.results.set(themeName, themeResults);
    console.log(`✅ 主题 ${themeName} 性能测试完成`);
    
    return themeResults;
  }

  /**
   * 执行单个场景的性能测试
   */
  private async benchmarkScenario(
    themeName: string,
    themeModule: Record<string, unknown>,
    scenario: TestScenario
  ): Promise<PerformanceResult> {
    const renderTimes: number[] = [];
    const memoryUsages: number[] = [];
    const profilerData: ProfilerData[] = [];
    
    const onRender: React.ProfilerOnRenderCallback = (
      id: string,
      phase: 'mount' | 'update',
      actualDuration: number,
      baseDuration: number,
      startTime: number,
      commitTime: number
    ) => {
      profilerData.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions: new Set(), // 空的 interactions set
      });
    };

    // 执行多轮测试
    for (let i = 0; i < this.config.iterations; i++) {
      const startTime = performance.now();
      const startMemory = this.getMemoryUsage();

      // 渲染组件
      render(
        <Profiler id={`${themeName}-${scenario.name}`} onRender={onRender}>
          {scenario.renderFunction(themeModule)}
        </Profiler>
      );

      const endTime = performance.now();
      const endMemory = this.getMemoryUsage();

      renderTimes.push(endTime - startTime);
      memoryUsages.push(endMemory - startMemory);

      // 清理DOM
      cleanup();
      
      // 给浏览器时间回收内存
      await this.sleep(10);
    }

    // 计算统计数据
    const averageRenderTime = this.average(renderTimes);
    const minRenderTime = Math.min(...renderTimes);
    const maxRenderTime = Math.max(...renderTimes);
    const renderTimeStdDev = this.standardDeviation(renderTimes);
    
    const averageMemoryUsage = this.average(memoryUsages);
    const peakMemoryUsage = Math.max(...memoryUsages);

    // 检测内存泄漏
    const memoryLeakDetected = this.detectMemoryLeak(memoryUsages);

    // 计算包体积（模拟）
    const bundleSize = await this.estimateBundleSize(themeModule);

    // 生成警告和建议
    const warnings = this.generateWarnings(averageRenderTime, peakMemoryUsage, bundleSize);
    const recommendations = this.generateRecommendations(averageRenderTime, peakMemoryUsage);

    return {
      themeName,
      scenario: scenario.name,
      metrics: {
        averageRenderTime,
        minRenderTime,
        maxRenderTime,
        renderTimeStdDev,
        peakMemoryUsage,
        averageMemoryUsage,
        memoryLeakDetected,
        firstContentfulPaint: 0, // 需要通过Navigation Timing API获取
        timeToInteractive: 0,
        bundleSize,
        gzipSize: bundleSize * 0.7, // 估算gzip压缩后的大小
        reactRenderCount: profilerData.length,
        reactCommitTime: this.average(profilerData.map(d => d.actualDuration)),
        reactEffectTime: 0,
      },
      profilerData,
      warnings,
      recommendations,
    };
  }

  /**
   * 预热测试
   */
  private async runWarmup(themeModule: Record<string, unknown>, scenarios: TestScenario[]): Promise<void> {
    for (const scenario of scenarios) {
      for (let i = 0; i < this.config.warmupIterations; i++) {
        render(scenario.renderFunction(themeModule));
        cleanup();
        await this.sleep(5);
      }
    }
  }

  /**
   * 获取内存使用量
   */
  private getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const memory = (performance as { memory?: { usedJSHeapSize: number } }).memory;
      if (memory) {
        return memory.usedJSHeapSize / (1024 * 1024); // 转换为MB
      }
    }
    return 0;
  }

  /**
   * 估算包体积
   */
  private async estimateBundleSize(themeModule: Record<string, unknown>): Promise<number> {
    // 简化实现：通过模块内容估算大小
    const moduleString = JSON.stringify(themeModule);
    return new Blob([moduleString]).size / 1024; // 转换为KB
  }

  /**
   * 检测内存泄漏
   */
  private detectMemoryLeak(memoryUsages: number[]): boolean {
    if (memoryUsages.length < 3) return false;
    
    // 简单的内存泄漏检测：检查内存使用是否持续增长
    const trend = this.calculateTrend(memoryUsages);
    return trend > 0.1; // 如果平均每轮增长超过0.1MB则认为可能存在内存泄漏
  }

  /**
   * 计算趋势
   */
  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    
    let sum = 0;
    for (let i = 1; i < values.length; i++) {
      sum += values[i] - values[i - 1];
    }
    
    return sum / (values.length - 1);
  }

  /**
   * 生成性能警告
   */
  private generateWarnings(
    renderTime: number,
    memoryUsage: number,
    bundleSize: number
  ): string[] {
    const warnings: string[] = [];
    
    if (renderTime > this.config.thresholds.renderTime) {
      warnings.push(`渲染时间超过阈值: ${renderTime.toFixed(2)}ms > ${this.config.thresholds.renderTime}ms`);
    }
    
    if (memoryUsage > this.config.thresholds.memoryUsage) {
      warnings.push(`内存使用超过阈值: ${memoryUsage.toFixed(2)}MB > ${this.config.thresholds.memoryUsage}MB`);
    }
    
    if (bundleSize > this.config.thresholds.bundleSize) {
      warnings.push(`包体积超过阈值: ${bundleSize.toFixed(2)}KB > ${this.config.thresholds.bundleSize}KB`);
    }
    
    return warnings;
  }

  /**
   * 生成性能建议
   */
  private generateRecommendations(renderTime: number, memoryUsage: number): string[] {
    const recommendations: string[] = [];
    
    if (renderTime > 10) {
      recommendations.push('考虑优化组件渲染逻辑，使用React.memo或useMemo减少不必要的重新渲染');
    }
    
    if (memoryUsage > 30) {
      recommendations.push('检查是否存在内存泄漏，确保组件卸载时正确清理事件监听器和定时器');
    }
    
    if (renderTime > 5 && memoryUsage > 20) {
      recommendations.push('考虑使用虚拟化技术减少DOM节点数量');
    }
    
    return recommendations;
  }

  /**
   * 比较多个主题的性能
   */
  public compareThemes(): PerformanceComparison {
    const allResults = Array.from(this.results.values()).flat();
    const scenarios = [...new Set(allResults.map(r => r.scenario))];
    const themes = [...new Set(allResults.map(r => r.themeName))];
    
    const comparisons: PerformanceComparison['comparisons'] = {};
    const rankings: PerformanceComparison['rankings'] = {};
    
    // 性能指标列表
    const metrics = [
      'averageRenderTime',
      'peakMemoryUsage',
      'bundleSize',
      'reactRenderCount'
    ];

    // 生成比较数据
    for (const scenario of scenarios) {
      comparisons[scenario] = {};
      
      for (const metric of metrics) {
        comparisons[scenario][metric] = {};
        
        for (const theme of themes) {
          const result = allResults.find(r => r.scenario === scenario && r.themeName === theme);
          if (result) {
            const metricsValue = result.metrics[metric as keyof typeof result.metrics];
            if (typeof metricsValue === 'number') {
              comparisons[scenario][metric][theme] = metricsValue;
            }
          }
        }
      }
    }

    // 生成排名
    for (const metric of metrics) {
      const values: Array<{ theme: string; value: number }> = [];
      
      for (const theme of themes) {
        const themeResults = allResults.filter(r => r.themeName === theme);
        const numericValues = themeResults
          .map(r => r.metrics[metric as keyof typeof r.metrics])
          .filter((val): val is number => typeof val === 'number');
        const averageValue = this.average(numericValues);
        values.push({ theme, value: averageValue });
      }
      
      // 排序（渲染时间和内存使用越小越好）
      const isLowerBetter = ['averageRenderTime', 'peakMemoryUsage', 'bundleSize'].includes(metric);
      values.sort((a, b) => isLowerBetter ? a.value - b.value : b.value - a.value);
      
      rankings[metric] = values.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
    }

    // 生成综合建议
    const recommendations = this.generateComparisonRecommendations(rankings);

    return {
      scenarios,
      themes,
      comparisons,
      rankings,
      recommendations,
    };
  }

  /**
   * 生成比较建议
   */
  private generateComparisonRecommendations(
    rankings: PerformanceComparison['rankings']
  ): string[] {
    const recommendations: string[] = [];
    
    // 找出各项性能最佳的主题
    const bestRenderTime = rankings.averageRenderTime?.[0]?.theme;
    const bestMemoryUsage = rankings.peakMemoryUsage?.[0]?.theme;
    const bestBundleSize = rankings.bundleSize?.[0]?.theme;
    
    if (bestRenderTime) {
      recommendations.push(`渲染性能最佳: ${bestRenderTime} 主题`);
    }
    
    if (bestMemoryUsage) {
      recommendations.push(`内存使用最优: ${bestMemoryUsage} 主题`);
    }
    
    if (bestBundleSize) {
      recommendations.push(`包体积最小: ${bestBundleSize} 主题`);
    }
    
    // 检查是否有主题在多个指标上表现优秀
    const themes = rankings.averageRenderTime?.map(r => r.theme) || [];
    for (const theme of themes) {
      const renderRank = rankings.averageRenderTime?.find(r => r.theme === theme)?.rank || 999;
      const memoryRank = rankings.peakMemoryUsage?.find(r => r.theme === theme)?.rank || 999;
      const bundleRank = rankings.bundleSize?.find(r => r.theme === theme)?.rank || 999;
      
      const averageRank = (renderRank + memoryRank + bundleRank) / 3;
      
      if (averageRank <= 1.5) {
        recommendations.push(`综合性能最佳: ${theme} 主题在多个指标上表现优秀`);
      }
    }
    
    return recommendations;
  }

  /**
   * 生成性能测试报告
   */
  public generateReport(): string {
    const comparison = this.compareThemes();
    
    let report = '# 多主题性能基准测试报告\n\n';
    report += `## 测试概要\n`;
    report += `- 测试时间: ${new Date().toISOString()}\n`;
    report += `- 主题数量: ${comparison.themes.length}\n`;
    report += `- 测试场景: ${comparison.scenarios.length}\n`;
    report += `- 测试轮数: ${this.config.iterations}\n\n`;
    
    report += '## 性能排名\n\n';
    
    const metrics = Object.keys(comparison.rankings);
    for (const metric of metrics) {
      report += `### ${this.getMetricDisplayName(metric)}\n\n`;
      
      const ranking = comparison.rankings[metric];
      for (const item of ranking) {
        const medal = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : '  ';
        report += `${medal} ${item.rank}. ${item.theme}: ${item.value.toFixed(2)}${this.getMetricUnit(metric)}\n`;
      }
      report += '\n';
    }
    
    report += '## 建议\n\n';
    for (const recommendation of comparison.recommendations) {
      report += `- ${recommendation}\n`;
    }
    
    return report;
  }

  /**
   * 获取指标显示名称
   */
  private getMetricDisplayName(metric: string): string {
    const names: Record<string, string> = {
      averageRenderTime: '平均渲染时间',
      peakMemoryUsage: '峰值内存使用',
      bundleSize: '包体积大小',
      reactRenderCount: 'React渲染次数',
    };
    
    return names[metric] || metric;
  }

  /**
   * 获取指标单位
   */
  private getMetricUnit(metric: string): string {
    const units: Record<string, string> = {
      averageRenderTime: 'ms',
      peakMemoryUsage: 'MB',
      bundleSize: 'KB',
      reactRenderCount: '次',
    };
    
    return units[metric] || '';
  }

  /**
   * 工具方法：计算平均值
   */
  private average(numbers: number[]): number {
    return numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  /**
   * 工具方法：计算标准差
   */
  private standardDeviation(numbers: number[]): number {
    const avg = this.average(numbers);
    const squareDiffs = numbers.map(value => Math.pow(value - avg, 2));
    return Math.sqrt(this.average(squareDiffs));
  }

  /**
   * 工具方法：延迟
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 清理资源
   */
  public cleanup(): void {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
    this.results.clear();
  }
}

/**
 * 默认测试场景配置
 */
export const DEFAULT_TEST_SCENARIOS: TestScenario[] = [
  {
    name: '单个按钮渲染',
    description: '渲染单个按钮组件',
    componentCount: 1,
    interactions: 0,
    complexity: 'low',
    renderFunction: (theme) => {
      const Button = theme.TechButton || theme.MinimalButton || theme.Button;
      return React.createElement(Button as React.ComponentType<{ children: string }>, { children: '测试按钮' });
    },
  },
  {
    name: '多按钮渲染',
    description: '同时渲染50个按钮组件',
    componentCount: 50,
    interactions: 0,
    complexity: 'medium',
    renderFunction: (theme) => {
      const Button = theme.TechButton || theme.MinimalButton || theme.Button;
      return React.createElement(
        'div',
        {},
        ...Array.from({ length: 50 }, (_, i) =>
          React.createElement(Button as React.ComponentType<{ key: number; children: string }>, { key: i, children: `按钮 ${i}` })
        )
      );
    },
  },
  {
    name: '复杂按钮渲染',
    description: '渲染带有各种属性的复杂按钮',
    componentCount: 20,
    interactions: 0,
    complexity: 'high',
    renderFunction: (theme) => {
      const Button = theme.TechButton || theme.MinimalButton || theme.Button;
      const variants = ['primary', 'secondary', 'danger', 'success'];
      const sizes = ['small', 'medium', 'large'];
      const fills = ['solid', 'outline', 'ghost'];
      
      return React.createElement(
        'div',
        {},
        ...Array.from({ length: 20 }, (_, i) =>
          React.createElement(Button as React.ComponentType<{
            key: number;
            variant: string;
            size: string;
            fill: string;
            loading: boolean;
            disabled: boolean;
            children: string;
          }>, {
            key: i,
            variant: variants[i % variants.length],
            size: sizes[i % sizes.length],
            fill: fills[i % fills.length],
            loading: i % 5 === 0,
            disabled: i % 7 === 0,
            children: `复杂按钮 ${i}`,
          })
        )
      );
    },
  },
];

/**
 * 默认性能基准测试配置
 */
export const DEFAULT_BENCHMARK_CONFIG: PerformanceBenchmarkConfig = {
  iterations: 10,
  warmupIterations: 3,
  enableMemoryMonitoring: true,
  enableCpuProfiling: false,
  thresholds: {
    renderTime: 16,
    memoryUsage: 50,
    bundleSize: 100,
    firstContentfulPaint: 1000,
  },
  scenarios: DEFAULT_TEST_SCENARIOS,
};

/**
 * 执行多主题性能基准测试
 */
export async function runMultiThemePerformanceBenchmark(
  config: Partial<PerformanceBenchmarkConfig> = {}
): Promise<PerformanceComparison> {
  console.log('🚀 启动多主题性能基准测试...');
  
  const benchmark = new PerformanceBenchmark({
    ...DEFAULT_BENCHMARK_CONFIG,
    ...config,
  });

  try {
    // 动态导入所有主题
    const techTheme = await import('../../tech');
    const minimalTheme = await import('../../themes/minimal');

    // 测试每个主题
    await benchmark.benchmarkTheme('科技风主题', techTheme);
    await benchmark.benchmarkTheme('极简主题', minimalTheme);

    // 生成比较结果
    const comparison = benchmark.compareThemes();
    
    // 生成报告
    const report = benchmark.generateReport();
    console.log('📊 性能测试报告:');
    console.log(report);

    // 清理资源
    benchmark.cleanup();
    
    console.log('✅ 多主题性能基准测试完成！');
    
    return comparison;
    
  } catch (error) {
    console.error('❌ 性能基准测试失败:', error);
    benchmark.cleanup();
    throw error;
  }
}