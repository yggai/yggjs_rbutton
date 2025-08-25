/**
 * 错误边界组件
 * 捕获和处理子组件的JavaScript错误，防止整个应用崩溃
 */
import { Component, ErrorInfo, ReactNode } from 'react';

/**
 * 错误边界组件的Props类型
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * 错误边界组件的State类型
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * 错误边界组件
 * 用于捕获子组件中的JavaScript错误并显示后备UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * 当子组件抛出错误时调用
   * @param error 错误对象
   * @param errorInfo 错误信息
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新state使下一次渲染能够显示降级UI
    return { hasError: true, error };
  }

  /**
   * 当子组件抛出错误后调用
   * @param error 错误对象
   * @param errorInfo 错误信息
   */
  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 你同样可以将错误日志上报给服务器
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  /**
   * 重置错误状态
   */
  resetError = (): void => {
    this.setState({ hasError: false });
  };

  override render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // 你可以自定义降级UI
      if (fallback) {
        return fallback;
      }

      return (
        <div
          style={{
            padding: '20px',
            margin: '10px 0',
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            backgroundColor: '#fff5f5',
            color: '#c53030',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#c53030' }}>
            ⚠️ 组件渲染错误
          </h3>
          <p style={{ margin: '0 0 10px 0', lineHeight: '1.4' }}>
            抱歉，此组件在渲染过程中发生了错误。这可能是由于组件库版本兼容性问题导致的。
          </p>
          {error && (
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                错误详情
              </summary>
              <pre
                style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#fed7d7',
                  border: '1px solid #feb2b2',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {error.toString()}
              </pre>
            </details>
          )}
          <button
            onClick={this.resetError}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#c53030',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#9c2626';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#c53030';
            }}
          >
            重新尝试
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;