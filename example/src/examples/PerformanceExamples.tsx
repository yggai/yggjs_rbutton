/**
 * 性能优化示例组件
 * 
 * 展示YggJS多主题按钮系统的性能优化技术和最佳实践
 * 包括内存优化、渲染优化、样式缓存等高级性能特性
 * 
 * @version 1.0.0
 * @author YggJS Team
 */
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { css } from '@emotion/react';

// 导入按钮组件
import { TechButton } from 'yggjs_rbutton';
import { MinimalButton } from 'yggjs_rbutton/minimal';

/**
 * 组件属性接口
 */
interface PerformanceExamplesProps {
  theme: {
    mode: 'light' | 'dark';
    colors: Record<string, string>;
    typography: Record<string, any>;
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
    shadows: Record<string, string>;
    animations: Record<string, any>;
    breakpoints: Record<string, string>;
  };
}

/**
 * 性能指标接口
 */
interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  rerenderCount: number;
  lastRenderTimestamp: number;
}

/**
 * 演示容器组件
 */
interface DemoSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  theme: PerformanceExamplesProps['theme'];
  highlight?: boolean;
}

const DemoSection: React.FC<DemoSectionProps> = React.memo(({ 
  title, 
  description, 
  children, 
  theme,
  highlight = false 
}) => {
  const sectionStyles = useMemo(() => css`
    margin-bottom: ${theme.spacing['2xl']};
    padding: ${theme.spacing['2xl']};
    background-color: ${theme.colors.surface};
    border: 1px solid ${highlight ? theme.colors.primary : theme.colors.border};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${highlight ? theme.shadows.lg : theme.shadows.sm};
    transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
    
    ${highlight && css`
      background: linear-gradient(
        135deg, 
        ${theme.colors.primary}08 0%, 
        ${theme.colors.surface} 100%
      );
    `}
    
    .section-header {
      margin-bottom: ${theme.spacing.xl};
      
      .section-title {
        margin: 0 0 ${theme.spacing.sm} 0;
        font-size: ${theme.typography.fontSize.xl};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${highlight ? theme.colors.primary : theme.colors.text};
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};
        
        .performance-badge {
          display: inline-flex;
          align-items: center;
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          background-color: ${theme.colors.primary}15;
          color: ${theme.colors.primary};
          border-radius: ${theme.borderRadius.full};
          font-size: ${theme.typography.fontSize.xs};
          font-weight: ${theme.typography.fontWeight.medium};
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
      }
      
      .section-description {
        margin: 0;
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.textSecondary};
        line-height: ${theme.typography.lineHeight.relaxed};
      }
    }
    
    .section-content {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.lg};
    }
  `, [theme, highlight]);

  return (
    <section css={sectionStyles}>
      <div className="section-header">
        <h2 className="section-title">
          {title}
          {highlight && <span className="performance-badge">高性能</span>}
        </h2>
        <p className="section-description">{description}</p>
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
});

DemoSection.displayName = 'DemoSection';

/**
 * 渲染性能测试组件
 */
const RenderPerformanceTest: React.FC<{ theme: PerformanceExamplesProps['theme'] }> = React.memo(({ theme }) => {
  const [buttonCount, setButtonCount] = useState(50);
  const [isRendering, setIsRendering] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    rerenderCount: 0,
    lastRenderTimestamp: 0,
  });
  
  const renderCountRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  // 性能测试逻辑
  const performanceTest = useCallback(async (count: number) => {
    setIsRendering(true);
    startTimeRef.current = performance.now();
    renderCountRef.current = 0;

    // 模拟大量按钮渲染
    setButtonCount(count);

    // 等待渲染完成
    await new Promise(resolve => {
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const renderTime = endTime - startTimeRef.current;
        
        // 获取内存使用情况（如果可用）
        const memoryUsage = (performance as any).memory 
          ? (performance as any).memory.usedJSHeapSize / 1024 / 1024
          : 0;

        setMetrics({
          renderTime: Math.round(renderTime * 100) / 100,
          memoryUsage: Math.round(memoryUsage * 100) / 100,
          rerenderCount: renderCountRef.current,
          lastRenderTimestamp: Date.now(),
        });

        setIsRendering(false);
        resolve(void 0);
      });
    });
  }, []);

  // 监控重新渲染次数
  useEffect(() => {
    renderCountRef.current++;
  });

  const testStyles = useMemo(() => css`
    .test-controls {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.lg};
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      margin-bottom: ${theme.spacing.xl};
      
      .controls-row {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.md};
        flex-wrap: wrap;
        
        .control-label {
          font-size: ${theme.typography.fontSize.sm};
          font-weight: ${theme.typography.fontWeight.medium};
          color: ${theme.colors.text};
          min-width: 120px;
        }
        
        .count-input {
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.md};
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          font-size: ${theme.typography.fontSize.sm};
          width: 100px;
          
          &:focus {
            outline: none;
            border-color: ${theme.colors.primary};
            box-shadow: 0 0 0 2px ${theme.colors.primary}20;
          }
        }
        
        .test-button {
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          background-color: ${theme.colors.primary};
          color: white;
          border: none;
          border-radius: ${theme.borderRadius.md};
          cursor: pointer;
          font-weight: ${theme.typography.fontWeight.medium};
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          position: relative;
          min-width: 120px;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary}dd;
            transform: translateY(-1px);
          }
          
          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          ${isRendering && css`
            &::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 16px;
              height: 16px;
              border: 2px solid transparent;
              border-top: 2px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
          `}
        }
        
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      }
    }
    
    .metrics-display {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: ${theme.spacing.md};
      margin-bottom: ${theme.spacing.xl};
      
      .metric-card {
        padding: ${theme.spacing.lg};
        background-color: ${theme.colors.background};
        border-radius: ${theme.borderRadius.md};
        border: 1px solid ${theme.colors.border};
        text-align: center;
        
        .metric-value {
          font-size: ${theme.typography.fontSize.xl};
          font-weight: ${theme.typography.fontWeight.bold};
          color: ${theme.colors.primary};
          margin-bottom: ${theme.spacing.xs};
        }
        
        .metric-label {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          margin: 0;
        }
        
        .metric-unit {
          font-size: ${theme.typography.fontSize.xs};
          color: ${theme.colors.textSecondary};
        }
      }
    }
    
    .button-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: ${theme.spacing.sm};
      max-height: 400px;
      overflow-y: auto;
      padding: ${theme.spacing.md};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .button-item {
        min-height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `, [theme, isRendering]);

  const presetCounts = [10, 50, 100, 200, 500];

  return (
    <DemoSection
      title="渲染性能测试"
      description="测试大量按钮组件的渲染性能，展示优化后的高效渲染能力"
      theme={theme}
      highlight={true}
    >
      <div css={testStyles}>
        <div className="test-controls">
          <div className="controls-row">
            <label className="control-label">按钮数量：</label>
            <input
              type="number"
              value={buttonCount}
              onChange={(e) => setButtonCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
              className="count-input"
              min="1"
              max="1000"
            />
            <button
              className="test-button"
              onClick={() => performanceTest(buttonCount)}
              disabled={isRendering}
            >
              {isRendering ? '渲染中...' : '开始测试'}
            </button>
          </div>
          
          <div className="controls-row">
            <span className="control-label">快速测试：</span>
            {presetCounts.map(count => (
              <button
                key={count}
                className="test-button"
                onClick={() => performanceTest(count)}
                disabled={isRendering}
                style={{ minWidth: 'auto', padding: `${theme.spacing.xs} ${theme.spacing.md}` }}
              >
                {count}个
              </button>
            ))}
          </div>
        </div>

        {metrics.lastRenderTimestamp > 0 && (
          <div className="metrics-display">
            <div className="metric-card">
              <div className="metric-value">
                {metrics.renderTime}
                <span className="metric-unit">ms</span>
              </div>
              <p className="metric-label">渲染时间</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">
                {metrics.memoryUsage || 'N/A'}
                {metrics.memoryUsage > 0 && <span className="metric-unit">MB</span>}
              </div>
              <p className="metric-label">内存使用</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">{buttonCount}</div>
              <p className="metric-label">组件数量</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">
                {Math.round((buttonCount / (metrics.renderTime / 1000)) * 100) / 100}
                <span className="metric-unit">/s</span>
              </div>
              <p className="metric-label">渲染速率</p>
            </div>
          </div>
        )}

        <div className="button-grid">
          {Array.from({ length: buttonCount }, (_, i) => (
            <div key={`button-${i}`} className="button-item">
              <TechButton 
                size="small" 
                variant={['primary', 'secondary', 'success'][i % 3] as any}
              >
                {i + 1}
              </TechButton>
            </div>
          ))}
        </div>
      </div>
    </DemoSection>
  );
});

RenderPerformanceTest.displayName = 'RenderPerformanceTest';

/**
 * 内存优化演示组件
 */
const MemoryOptimizationDemo: React.FC<{ theme: PerformanceExamplesProps['theme'] }> = React.memo(({ theme }) => {
  const [optimizationEnabled, setOptimizationEnabled] = useState(true);
  const [componentCount, setComponentCount] = useState(0);
  const [memorySnapshots, setMemorySnapshots] = useState<Array<{ timestamp: number; usage: number; label: string }>>([]);

  // 内存快照功能
  const takeMemorySnapshot = useCallback((label: string) => {
    const memory = (performance as any).memory;
    if (memory) {
      const usage = memory.usedJSHeapSize / 1024 / 1024;
      setMemorySnapshots(prev => [...prev.slice(-9), {
        timestamp: Date.now(),
        usage: Math.round(usage * 100) / 100,
        label
      }]);
    }
  }, []);

  // 批量创建组件
  const createComponents = useCallback((count: number) => {
    setComponentCount(count);
    takeMemorySnapshot(`创建${count}个组件`);
  }, [takeMemorySnapshot]);

  // 清理组件
  const clearComponents = useCallback(() => {
    setComponentCount(0);
    // 强制垃圾回收（仅在开发环境有效）
    if (typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
    setTimeout(() => {
      takeMemorySnapshot('清理组件后');
    }, 100);
  }, [takeMemorySnapshot]);

  const optimizationStyles = useMemo(() => css`
    .optimization-controls {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.lg};
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      margin-bottom: ${theme.spacing.xl};
      
      .toggle-section {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.md};
        
        .toggle-switch {
          position: relative;
          width: 48px;
          height: 24px;
          background-color: ${optimizationEnabled ? theme.colors.primary : theme.colors.border};
          border-radius: ${theme.borderRadius.full};
          cursor: pointer;
          transition: background-color ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
          
          &::after {
            content: '';
            position: absolute;
            top: 2px;
            left: ${optimizationEnabled ? '26px' : '2px'};
            width: 20px;
            height: 20px;
            background-color: white;
            border-radius: 50%;
            transition: left ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
            box-shadow: ${theme.shadows.sm};
          }
        }
        
        .toggle-label {
          font-size: ${theme.typography.fontSize.md};
          font-weight: ${theme.typography.fontWeight.medium};
          color: ${theme.colors.text};
        }
        
        .toggle-description {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          margin-left: auto;
          max-width: 300px;
        }
      }
      
      .actions-row {
        display: flex;
        gap: ${theme.spacing.md};
        flex-wrap: wrap;
        
        .action-button {
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.md};
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          cursor: pointer;
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          
          &:hover {
            border-color: ${theme.colors.primary};
            background-color: ${theme.colors.primary}10;
          }
          
          &.primary {
            background-color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
            color: white;
            
            &:hover {
              background-color: ${theme.colors.primary}dd;
            }
          }
          
          &.danger {
            background-color: ${theme.colors.danger};
            border-color: ${theme.colors.danger};
            color: white;
            
            &:hover {
              background-color: ${theme.colors.danger}dd;
            }
          }
        }
      }
    }
    
    .memory-chart {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      margin-bottom: ${theme.spacing.xl};
      
      .chart-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.lg} 0;
      }
      
      .chart-container {
        height: 200px;
        display: flex;
        align-items: end;
        gap: 4px;
        padding: ${theme.spacing.md} 0;
        border-bottom: 1px solid ${theme.colors.border};
        
        .chart-bar {
          flex: 1;
          background: linear-gradient(
            to top,
            ${theme.colors.primary}80,
            ${theme.colors.primary}40
          );
          border-radius: ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0 0;
          min-height: 4px;
          position: relative;
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          
          &:hover {
            background: linear-gradient(
              to top,
              ${theme.colors.primary},
              ${theme.colors.primary}80
            );
            
            .tooltip {
              opacity: 1;
              transform: translateY(-8px);
            }
          }
          
          .tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            padding: ${theme.spacing.xs} ${theme.spacing.sm};
            background-color: ${theme.colors.text};
            color: ${theme.colors.background};
            border-radius: ${theme.borderRadius.sm};
            font-size: ${theme.typography.fontSize.xs};
            white-space: nowrap;
            opacity: 0;
            transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
            z-index: 10;
            
            &::after {
              content: '';
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              border: 4px solid transparent;
              border-top-color: ${theme.colors.text};
            }
          }
        }
      }
      
      .chart-labels {
        display: flex;
        gap: 4px;
        margin-top: ${theme.spacing.sm};
        
        .chart-label {
          flex: 1;
          font-size: ${theme.typography.fontSize.xs};
          color: ${theme.colors.textSecondary};
          text-align: center;
          transform: rotate(-45deg);
          transform-origin: center;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    
    .components-container {
      max-height: 300px;
      overflow-y: auto;
      padding: ${theme.spacing.md};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .components-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: ${theme.spacing.sm};
      }
    }
  `, [theme, optimizationEnabled]);

  const maxMemoryUsage = Math.max(...memorySnapshots.map(s => s.usage), 1);

  return (
    <DemoSection
      title="内存优化演示"
      description="展示组件的内存使用情况和优化策略，包括样式缓存、组件重用等技术"
      theme={theme}
    >
      <div css={optimizationStyles}>
        <div className="optimization-controls">
          <div className="toggle-section">
            <div 
              className="toggle-switch"
              onClick={() => setOptimizationEnabled(!optimizationEnabled)}
            />
            <label className="toggle-label">启用内存优化</label>
            <span className="toggle-description">
              {optimizationEnabled 
                ? '使用样式缓存、组件复用等优化技术' 
                : '禁用优化以对比性能差异'}
            </span>
          </div>
          
          <div className="actions-row">
            <button 
              className="action-button"
              onClick={() => createComponents(50)}
            >
              创建50个组件
            </button>
            <button 
              className="action-button"
              onClick={() => createComponents(100)}
            >
              创建100个组件
            </button>
            <button 
              className="action-button"
              onClick={() => createComponents(200)}
            >
              创建200个组件
            </button>
            <button 
              className="action-button danger"
              onClick={clearComponents}
            >
              清理所有组件
            </button>
            <button 
              className="action-button primary"
              onClick={() => takeMemorySnapshot('手动快照')}
            >
              记录内存快照
            </button>
          </div>
        </div>

        {memorySnapshots.length > 0 && (
          <div className="memory-chart">
            <h3 className="chart-title">内存使用趋势 (MB)</h3>
            <div className="chart-container">
              {memorySnapshots.map((snapshot, index) => (
                <div
                  key={`${snapshot.timestamp}-${index}`}
                  className="chart-bar"
                  style={{
                    height: `${(snapshot.usage / maxMemoryUsage) * 180}px`
                  }}
                >
                  <div className="tooltip">
                    {snapshot.label}: {snapshot.usage}MB
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-labels">
              {memorySnapshots.map((snapshot, index) => (
                <div key={`label-${index}`} className="chart-label">
                  {snapshot.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {componentCount > 0 && (
          <div className="components-container">
            <div className="components-grid">
              {Array.from({ length: componentCount }, (_, i) => (
                <div key={`opt-component-${i}`}>
                  {optimizationEnabled ? (
                    <TechButton size="small" variant="primary">
                      {i + 1}
                    </TechButton>
                  ) : (
                    <MinimalButton size="small" variant="secondary">
                      {i + 1}
                    </MinimalButton>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DemoSection>
  );
});

MemoryOptimizationDemo.displayName = 'MemoryOptimizationDemo';

/**
 * 样式缓存演示组件
 */
const StyleCacheDemo: React.FC<{ theme: PerformanceExamplesProps['theme'] }> = React.memo(({ theme }) => {
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [styleComputations, setStyleComputations] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);
  const [cacheMisses, setCacheMisses] = useState(0);

  // 模拟样式计算统计
  const simulateStyleComputation = useCallback(() => {
    if (cacheEnabled) {
      // 模拟缓存命中
      if (Math.random() > 0.3) {
        setCacheHits(prev => prev + 1);
      } else {
        setCacheMisses(prev => prev + 1);
      }
    } else {
      // 无缓存时每次都是计算
      setCacheMisses(prev => prev + 1);
    }
    setStyleComputations(prev => prev + 1);
  }, [cacheEnabled]);

  const resetStats = useCallback(() => {
    setStyleComputations(0);
    setCacheHits(0);
    setCacheMisses(0);
  }, []);

  const cacheStyles = useMemo(() => css`
    .cache-controls {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing.lg};
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      margin-bottom: ${theme.spacing.xl};
      
      .cache-toggle {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.md};
        
        .toggle-switch {
          position: relative;
          width: 48px;
          height: 24px;
          background-color: ${cacheEnabled ? theme.colors.success : theme.colors.border};
          border-radius: ${theme.borderRadius.full};
          cursor: pointer;
          transition: background-color ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
          
          &::after {
            content: '';
            position: absolute;
            top: 2px;
            left: ${cacheEnabled ? '26px' : '2px'};
            width: 20px;
            height: 20px;
            background-color: white;
            border-radius: 50%;
            transition: left ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
            box-shadow: ${theme.shadows.sm};
          }
        }
        
        .toggle-label {
          font-size: ${theme.typography.fontSize.md};
          font-weight: ${theme.typography.fontWeight.medium};
          color: ${theme.colors.text};
        }
      }
      
      .action-buttons {
        display: flex;
        gap: ${theme.spacing.md};
        
        .action-button {
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.md};
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          cursor: pointer;
          transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          
          &:hover {
            border-color: ${theme.colors.primary};
            background-color: ${theme.colors.primary}10;
          }
          
          &.primary {
            background-color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
            color: white;
            
            &:hover {
              background-color: ${theme.colors.primary}dd;
            }
          }
        }
      }
    }
    
    .cache-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: ${theme.spacing.md};
      margin-bottom: ${theme.spacing.xl};
      
      .stat-card {
        padding: ${theme.spacing.lg};
        background-color: ${theme.colors.surface};
        border-radius: ${theme.borderRadius.md};
        border: 1px solid ${theme.colors.border};
        text-align: center;
        
        .stat-value {
          font-size: ${theme.typography.fontSize.xl};
          font-weight: ${theme.typography.fontWeight.bold};
          margin-bottom: ${theme.spacing.xs};
        }
        
        .stat-label {
          font-size: ${theme.typography.fontSize.sm};
          color: ${theme.colors.textSecondary};
          margin: 0;
        }
        
        &.total .stat-value {
          color: ${theme.colors.text};
        }
        
        &.hits .stat-value {
          color: ${theme.colors.success};
        }
        
        &.misses .stat-value {
          color: ${theme.colors.warning};
        }
        
        &.efficiency .stat-value {
          color: ${theme.colors.primary};
        }
      }
    }
    
    .cache-demo {
      padding: ${theme.spacing.xl};
      background-color: ${theme.colors.background};
      border-radius: ${theme.borderRadius.lg};
      border: 1px solid ${theme.colors.border};
      
      .demo-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text};
        margin: 0 0 ${theme.spacing.lg} 0;
      }
      
      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: ${theme.spacing.md};
        
        .demo-button {
          cursor: pointer;
          transition: transform ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
          
          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }
  `, [theme, cacheEnabled]);

  const cacheEfficiency = styleComputations > 0 
    ? Math.round((cacheHits / styleComputations) * 100) 
    : 0;

  return (
    <DemoSection
      title="样式缓存演示"
      description="展示CSS-in-JS样式缓存机制如何提升性能，减少重复的样式计算"
      theme={theme}
    >
      <div css={cacheStyles}>
        <div className="cache-controls">
          <div className="cache-toggle">
            <div 
              className="toggle-switch"
              onClick={() => setCacheEnabled(!cacheEnabled)}
            />
            <label className="toggle-label">
              启用样式缓存 {cacheEnabled ? '(已开启)' : '(已关闭)'}
            </label>
          </div>
          
          <div className="action-buttons">
            <button 
              className="action-button primary"
              onClick={simulateStyleComputation}
            >
              模拟样式计算
            </button>
            <button 
              className="action-button"
              onClick={() => {
                for (let i = 0; i < 10; i++) {
                  simulateStyleComputation();
                }
              }}
            >
              批量计算（10次）
            </button>
            <button 
              className="action-button"
              onClick={resetStats}
            >
              重置统计
            </button>
          </div>
        </div>

        <div className="cache-stats">
          <div className="stat-card total">
            <div className="stat-value">{styleComputations}</div>
            <p className="stat-label">总计算次数</p>
          </div>
          <div className="stat-card hits">
            <div className="stat-value">{cacheHits}</div>
            <p className="stat-label">缓存命中</p>
          </div>
          <div className="stat-card misses">
            <div className="stat-value">{cacheMisses}</div>
            <p className="stat-label">缓存未命中</p>
          </div>
          <div className="stat-card efficiency">
            <div className="stat-value">{cacheEfficiency}%</div>
            <p className="stat-label">缓存效率</p>
          </div>
        </div>

        <div className="cache-demo">
          <h4 className="demo-title">点击按钮触发样式计算</h4>
          <div className="demo-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="demo-button" onClick={simulateStyleComputation}>
                <TechButton 
                  size="medium" 
                  variant={['primary', 'secondary', 'success', 'warning'][i % 4] as any}
                >
                  按钮 {i + 1}
                </TechButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoSection>
  );
});

StyleCacheDemo.displayName = 'StyleCacheDemo';

/**
 * 性能优化示例主组件
 */
const PerformanceExamples: React.FC<PerformanceExamplesProps> = ({ theme }) => {
  return (
    <div>
      <RenderPerformanceTest theme={theme} />
      <MemoryOptimizationDemo theme={theme} />
      <StyleCacheDemo theme={theme} />
    </div>
  );
};

export default React.memo(PerformanceExamples);