/**
 * 错误边界工具组件
 * 将工具函数和高阶组件分离出来，避免Fast Refresh警告
 */
import React, { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

/**
 * 高阶组件：为组件包裹错误边界
 * @param Component 要包裹的组件
 * @param fallback 错误时显示的后备UI
 * @returns 包裹了错误边界的组件
 */
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
): React.ComponentType<P> => {
  const WrappedComponent: React.FC<P> = (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

/**
 * 简化的错误后备组件
 */
export const SimpleErrorFallback: React.FC<{ message?: string }> = ({ 
  message = "组件加载失败，请检查组件库是否正确安装" 
}) => (
  <div
    style={{
      padding: '16px',
      margin: '8px 0',
      border: '1px dashed #fbbf24',
      borderRadius: '6px',
      backgroundColor: '#fffbeb',
      color: '#92400e',
      fontSize: '14px',
      textAlign: 'center',
    }}
  >
    <span style={{ marginRight: '8px' }}>⚠️</span>
    {message}
  </div>
);