/**
 * 演示面板组件
 * 用于展示按钮组件的各种用法示例，提供统一的展示容器
 */
import React, { useState, useCallback } from 'react';
import type { DemoPanelConfig } from '@/types';
import { CloseIcon } from './Icons';
import { ErrorBoundary } from './ErrorBoundary';
import { SimpleErrorFallback } from './ErrorBoundaryUtils';

interface DemoPanelProps extends DemoPanelConfig {
  /** 面板内容 */
  children: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/**
 * 演示面板组件
 * 提供统一的示例展示容器，支持折叠、不同变体等功能
 */
export const DemoPanel: React.FC<DemoPanelProps> = ({
  title,
  description,
  collapsible = false,
  defaultCollapsed = false,
  variant = 'default',
  children,
  style,
  className,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  // 处理折叠切换
  const handleToggle = useCallback((): void => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  }, [collapsible, collapsed]);

  // 获取变体颜色
  const getVariantColors = (variantType: string): { border: string; background: string; headerBg: string; headerText: string; accent: string } => {
    const colors = {
      default: {
        border: '#e5e7eb',
        background: '#ffffff',
        headerBg: '#f9fafb',
        headerText: '#374151',
        accent: '#6b7280',
      },
      primary: {
        border: '#3b82f6',
        background: '#ffffff',
        headerBg: '#eff6ff',
        headerText: '#1d4ed8',
        accent: '#3b82f6',
      },
      success: {
        border: '#10b981',
        background: '#ffffff',
        headerBg: '#ecfdf5',
        headerText: '#059669',
        accent: '#10b981',
      },
      warning: {
        border: '#f59e0b',
        background: '#ffffff',
        headerBg: '#fffbeb',
        headerText: '#d97706',
        accent: '#f59e0b',
      },
      danger: {
        border: '#ef4444',
        background: '#ffffff',
        headerBg: '#fef2f2',
        headerText: '#dc2626',
        accent: '#ef4444',
      },
    };
    return colors[variantType as keyof typeof colors] || colors.default;
  };

  const colors = getVariantColors(variant);

  // 组件样式
  const panelStyles: React.CSSProperties = {
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    backgroundColor: colors.background,
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: colors.headerBg,
    borderBottom: collapsed ? 'none' : `1px solid ${colors.border}`,
    cursor: collapsible ? 'pointer' : 'default',
    userSelect: 'none',
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: colors.headerText,
  };

  const descriptionStyles: React.CSSProperties = {
    margin: '4px 0 0 0',
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
  };

  const toggleButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: colors.accent,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    transform: collapsed ? 'rotate(0deg)' : 'rotate(45deg)',
  };

  const contentStyles: React.CSSProperties = {
    padding: collapsed ? '0' : '24px',
    maxHeight: collapsed ? '0' : 'none',
    overflow: collapsed ? 'hidden' : 'visible',
    transition: 'all 0.3s ease',
    opacity: collapsed ? 0 : 1,
  };

  const titleContainerStyles: React.CSSProperties = {
    flex: 1,
    minWidth: 0, // 允许标题区域缩小
  };

  return (
    <div style={panelStyles} className={className}>
      <div 
        style={headerStyles} 
        onClick={handleToggle}
        onMouseEnter={(e) => {
          if (collapsible) {
            (e.currentTarget as HTMLElement).style.backgroundColor = 
              variant === 'default' ? '#f3f4f6' : colors.headerBg;
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = colors.headerBg;
        }}
      >
        <div style={titleContainerStyles}>
          <h3 style={titleStyles}>{title}</h3>
          {description && (
            <p style={descriptionStyles}>{description}</p>
          )}
        </div>
        
        {collapsible && (
          <button
            style={toggleButtonStyles}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>
      
      <div style={contentStyles}>
        {children}
      </div>
    </div>
  );
};

/**
 * 演示网格组件
 * 用于在演示面板中以网格形式展示多个按钮示例
 */
interface DemoGridProps {
  /** 网格列数 */
  columns?: number;
  /** 网格间距 */
  gap?: number;
  /** 子元素 */
  children: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export const DemoGrid: React.FC<DemoGridProps> = ({
  columns = 3,
  gap = 16,
  children,
  style,
  className,
}) => {
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    alignItems: 'start',
    ...style,
  };

  return (
    <div style={gridStyles} className={className}>
      {children}
    </div>
  );
};

/**
 * 演示项组件
 * 单个示例项的容器，提供统一的样式和标签
 */
interface DemoItemProps {
  /** 示例标题 */
  label?: string;
  /** 是否居中对齐 */
  center?: boolean;
  /** 子元素 */
  children: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export const DemoItem: React.FC<DemoItemProps> = ({
  label,
  center = false,
  children,
  style,
  className,
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: center ? 'center' : 'flex-start',
    gap: '8px',
    ...style,
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px',
  };

  return (
    <div style={containerStyles} className={className}>
      {label && <span style={labelStyles}>{label}</span>}
      <ErrorBoundary fallback={<SimpleErrorFallback message="按钮组件渲染失败" />}>
        {children}
      </ErrorBoundary>
    </div>
  );
};

export default DemoPanel;