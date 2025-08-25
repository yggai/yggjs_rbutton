/**
 * 多主题按钮系统演示应用
 * 
 * 这是一个完整的演示应用，展示了YggJS多主题按钮系统的所有功能：
 * - 科技风主题和极简主题的完整对比
 * - CSS-in-JS样式系统的高性能实现
 * - TypeScript类型安全和开发体验
 * - 响应式设计和可访问性支持
 * 
 * @version 1.0.0
 * @author YggJS Team
 */
import React, { useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { css } from '@emotion/react';
import type { ThemeMode } from '@/types';
import { SunIcon, MoonIcon } from '@/components/Icons';

// 懒加载示例组件以提升性能
const BasicExamples = lazy(() => import('@/examples/BasicExamples'));
const ThemeComparison = lazy(() => import('@/examples/ThemeComparison'));
const PerformanceExamples = lazy(() => import('@/examples/PerformanceExamples'));
const AccessibilityExamples = lazy(() => import('@/examples/AccessibilityExamples'));
const IntegrationExamples = lazy(() => import('@/examples/IntegrationExamples'));

/**
 * 应用程序主题接口定义
 */
interface AppTheme {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    surfaceVariant: string;
    text: string;
    textSecondary: string;
    border: string;
    borderHover: string;
    shadow: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      linear: string;
      easeOut: string;
      easeIn: string;
      easeInOut: string;
    };
  };
}

/**
 * 浅色主题配置
 * 提供现代化的浅色界面主题
 */
const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    surface: '#f8fafc',
    surfaceVariant: '#f1f5f9',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    borderHover: '#d1d5db',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

/**
 * 深色主题配置
 * 提供护眼的深色界面主题
 */
const darkTheme: AppTheme = {
  ...lightTheme,
  mode: 'dark',
  colors: {
    primary: '#60a5fa',
    secondary: '#9ca3af',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceVariant: '#334155',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    border: '#334155',
    borderHover: '#475569',
    shadow: 'rgba(0, 0, 0, 0.3)',
    accent: '#a78bfa',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
  },
};

/**
 * 导航栏组件属性接口
 */
interface NavbarProps {
  theme: AppTheme;
  onThemeChange: (mode: ThemeMode) => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

/**
 * 响应式导航栏组件
 * 使用CSS-in-JS实现高性能样式计算和主题切换
 */
const Navbar: React.FC<NavbarProps> = React.memo(({ theme, onThemeChange, currentSection, onSectionChange }) => {
  // 使用useMemo缓存样式计算，避免不必要的重新计算
  const navbarStyles = useMemo(() => css`
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid ${theme.colors.border};
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(12px);
    background-color: ${theme.mode === 'dark' 
      ? 'rgba(15, 23, 42, 0.85)' 
      : 'rgba(248, 250, 252, 0.85)'
    };
    transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeOut};
    
    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.md};
    }
  `, [theme]);

  const titleStyles = useMemo(() => css`
    margin: 0;
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text};
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: ${theme.typography.fontFamily};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize.lg};
    }
  `, [theme]);

  const descriptionStyles = useMemo(() => css`
    margin: ${theme.spacing.xs} 0 0 0;
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.textSecondary};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: ${theme.typography.lineHeight.normal};
    
    @media (max-width: ${theme.breakpoints.md}) {
      display: none;
    }
  `, [theme]);

  const controlsStyles = useMemo(() => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    
    @media (max-width: ${theme.breakpoints.md}) {
      width: 100%;
      justify-content: space-between;
    }
  `, [theme]);

  const themeToggleStyles = useMemo(() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.border};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    cursor: pointer;
    transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
    box-shadow: ${theme.shadows.sm};

    &:hover {
      background-color: ${theme.colors.surface};
      border-color: ${theme.colors.borderHover};
      box-shadow: ${theme.shadows.md};
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
      box-shadow: ${theme.shadows.sm};
    }

    &:focus {
      outline: none;
      ring: 2px solid ${theme.colors.primary};
      ring-offset: 2px;
    }
  `, [theme]);

  // 快速导航菜单项
  const quickNavItems = [
    { id: 'basic', label: '基础', icon: '🔧' },
    { id: 'themes', label: '主题', icon: '🎨' },
    { id: 'performance', label: '性能', icon: '⚡' },
    { id: 'accessibility', label: '访问性', icon: '♿' },
    { id: 'integration', label: '集成', icon: '🔗' },
  ];

  const quickNavStyles = useMemo(() => css`
    display: flex;
    gap: ${theme.spacing.sm};
    
    @media (max-width: ${theme.breakpoints.lg}) {
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      
      &::-webkit-scrollbar {
        display: none;
      }
    }
    
    @media (max-width: ${theme.breakpoints.md}) {
      gap: ${theme.spacing.xs};
    }
  `, [theme]);

  const navItemStyles = useCallback((isActive: boolean) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${isActive ? theme.colors.primary : theme.colors.textSecondary};
    background-color: ${isActive ? `${theme.colors.primary}15` : 'transparent'};
    cursor: pointer;
    transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
    white-space: nowrap;
    
    &:hover {
      background-color: ${isActive ? `${theme.colors.primary}20` : theme.colors.surfaceVariant};
      color: ${isActive ? theme.colors.primary : theme.colors.text};
    }
    
    .icon {
      font-size: ${theme.typography.fontSize.md};
      
      @media (max-width: ${theme.breakpoints.md}) {
        font-size: ${theme.typography.fontSize.sm};
      }
    }
    
    .label {
      @media (max-width: ${theme.breakpoints.sm}) {
        display: none;
      }
    }
  `, [theme]);

  // 主题切换处理函数
  const handleThemeToggle = useCallback(() => {
    onThemeChange(theme.mode === 'light' ? 'dark' : 'light');
  }, [theme.mode, onThemeChange]);

  return (
    <nav css={navbarStyles}>
      <div>
        <h1 css={titleStyles}>YggJS 多主题按钮系统</h1>
        <p css={descriptionStyles}>现代化的多主题按钮组件完整功能展示</p>
      </div>
      
      <div css={controlsStyles}>
        {/* 快速导航 */}
        <div css={quickNavStyles}>
          {quickNavItems.map((item) => (
            <button
              key={item.id}
              css={navItemStyles(currentSection === item.id)}
              onClick={() => onSectionChange(item.id)}
              aria-label={`切换到${item.label}示例`}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* 主题切换按钮 */}
        <button
          css={themeToggleStyles}
          onClick={handleThemeToggle}
          aria-label={`切换到${theme.mode === 'light' ? '深色' : '浅色'}主题`}
          title={`切换到${theme.mode === 'light' ? '深色' : '浅色'}主题`}
        >
          {theme.mode === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        </button>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

/**
 * 加载指示器组件
 * 提供统一的加载状态展示
 */
const LoadingSpinner: React.FC<{ theme: AppTheme }> = React.memo(({ theme }) => {
  const spinnerStyles = useMemo(() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid ${theme.colors.border};
      border-top: 3px solid ${theme.colors.primary};
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, [theme]);

  return (
    <div css={spinnerStyles}>
      <div className="spinner" />
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

/**
 * 错误边界组件
 * 处理示例组件加载失败的情况
 */
interface ErrorFallbackProps {
  theme: AppTheme;
  error: Error;
  retry: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = React.memo(({ theme, error, retry }) => {
  const errorStyles = useMemo(() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: ${theme.spacing['2xl']};
    border: 1px solid ${theme.colors.danger};
    border-radius: ${theme.borderRadius.lg};
    background-color: ${theme.mode === 'dark' ? '#fef2f214' : '#fef2f2'};
    color: ${theme.colors.text};
    
    .error-icon {
      font-size: 48px;
      margin-bottom: ${theme.spacing.lg};
    }
    
    .error-title {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.semibold};
      margin-bottom: ${theme.spacing.md};
      color: ${theme.colors.danger};
    }
    
    .error-message {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.textSecondary};
      margin-bottom: ${theme.spacing.lg};
      text-align: center;
      max-width: 400px;
    }
    
    .retry-button {
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      background-color: ${theme.colors.danger};
      color: white;
      border: none;
      border-radius: ${theme.borderRadius.md};
      cursor: pointer;
      font-weight: ${theme.typography.fontWeight.medium};
      transition: all ${theme.animations.duration.fast} ${theme.animations.easing.easeOut};
      
      &:hover {
        background-color: ${theme.colors.danger}dd;
        transform: translateY(-1px);
      }
    }
  `, [theme]);

  return (
    <div css={errorStyles}>
      <div className="error-icon">😵</div>
      <h3 className="error-title">组件加载失败</h3>
      <p className="error-message">
        抱歉，示例组件加载时遇到了问题。请检查网络连接或稍后重试。
        <br />
        <small>错误信息：{error.message}</small>
      </p>
      <button className="retry-button" onClick={retry}>
        重新加载
      </button>
    </div>
  );
});

ErrorFallback.displayName = 'ErrorFallback';

/**
 * 主内容区域组件
 * 使用懒加载和错误边界提供高性能的内容展示
 */
interface MainContentProps {
  theme: AppTheme;
  activeSection: string;
}

const MainContent: React.FC<MainContentProps> = React.memo(({ theme, activeSection }) => {
  const contentStyles = useMemo(() => css`
    flex: 1;
    padding: ${theme.spacing['2xl']};
    background-color: ${theme.colors.background};
    min-height: calc(100vh - 120px);
    
    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.lg};
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
      padding: ${theme.spacing.md};
    }
  `, [theme]);

  const sectionStyles = useMemo(() => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing['2xl']};
    max-width: 1200px;
    margin: 0 auto;
    
    @media (max-width: ${theme.breakpoints.md}) {
      gap: ${theme.spacing.xl};
    }
  `, [theme]);

  // 渲染对应的示例组件
  const renderSection = useCallback((): React.ReactNode => {
    const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <Suspense fallback={<LoadingSpinner theme={theme} />}>
        {children}
      </Suspense>
    );

    switch (activeSection) {
      case 'basic':
        return (
          <SuspenseWrapper>
            <BasicExamples theme={theme} />
          </SuspenseWrapper>
        );
      case 'themes':
        return (
          <SuspenseWrapper>
            <ThemeComparison theme={theme} />
          </SuspenseWrapper>
        );
      case 'performance':
        return (
          <SuspenseWrapper>
            <PerformanceExamples theme={theme} />
          </SuspenseWrapper>
        );
      case 'accessibility':
        return (
          <SuspenseWrapper>
            <AccessibilityExamples theme={theme} />
          </SuspenseWrapper>
        );
      case 'integration':
        return (
          <SuspenseWrapper>
            <IntegrationExamples theme={theme} />
          </SuspenseWrapper>
        );
      default:
        return (
          <div css={css`
            text-align: center;
            padding: ${theme.spacing['2xl']};
            color: ${theme.colors.textSecondary};
            font-size: ${theme.typography.fontSize.lg};
          `}>
            请选择一个功能模块开始探索 YggJS 多主题按钮系统
          </div>
        );
    }
  }, [activeSection, theme]);

  return (
    <main css={contentStyles}>
      <div css={sectionStyles}>
        {renderSection()}
      </div>
    </main>
  );
});

MainContent.displayName = 'MainContent';

/**
 * 主应用程序组件
 * 应用的根组件，管理全局状态和主题
 */
const App: React.FC = () => {
  // 状态管理
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // 从localStorage读取用户偏好，如果没有则根据系统偏好设置
    const savedTheme = localStorage.getItem('yggjs-theme-mode') as ThemeMode;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // 检测系统主题偏好
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light';
  });

  const [activeSection, setActiveSection] = useState<string>('basic');

  // 计算当前主题
  const currentTheme = useMemo(() => 
    themeMode === 'dark' ? darkTheme : lightTheme, 
    [themeMode]
  );

  // 主题切换处理
  const handleThemeChange = useCallback((mode: ThemeMode): void => {
    setThemeMode(mode);
    localStorage.setItem('yggjs-theme-mode', mode);
    
    // 为了更好的用户体验，添加过渡动画
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  }, []);

  // 章节切换处理
  const handleSectionChange = useCallback((section: string): void => {
    setActiveSection(section);
    
    // 滚动到顶部，提供更好的导航体验
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 监听系统主题变化
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // 只有当用户没有手动设置过主题时才跟随系统变化
      const savedTheme = localStorage.getItem('yggjs-theme-mode');
      if (!savedTheme) {
        handleThemeChange(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [handleThemeChange]);

  // 应用级别样式
  const appStyles = useMemo(() => css`
    min-height: 100vh;
    background-color: ${currentTheme.colors.background};
    color: ${currentTheme.colors.text};
    font-family: ${currentTheme.typography.fontFamily};
    transition: background-color ${currentTheme.animations.duration.normal} ${currentTheme.animations.easing.easeOut},
                color ${currentTheme.animations.duration.normal} ${currentTheme.animations.easing.easeOut};
    
    /* 全局样式重置 */
    * {
      box-sizing: border-box;
    }
    
    /* 滚动条样式 */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: ${currentTheme.colors.surface};
    }
    
    ::-webkit-scrollbar-thumb {
      background: ${currentTheme.colors.border};
      border-radius: ${currentTheme.borderRadius.sm};
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: ${currentTheme.colors.borderHover};
    }
    
    /* 无障碍访问优化 */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `, [currentTheme]);

  return (
    <div css={appStyles}>
      <Navbar 
        theme={currentTheme} 
        onThemeChange={handleThemeChange}
        currentSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <MainContent 
        theme={currentTheme} 
        activeSection={activeSection} 
      />
    </div>
  );
};

export default App;