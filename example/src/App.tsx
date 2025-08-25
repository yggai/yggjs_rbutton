/**
 * 主应用程序组件
 * TechButton 组件演示应用的入口点
 */
import React, { useState, useCallback } from 'react';
import type { ThemeMode } from '@/types';
import { SunIcon, MoonIcon } from '@/components/Icons';

// 导入所有示例组件
import {
  BasicUsageDemo,
  SizesDemo,
  VariantsDemo,
  StatesDemo,
  FullWidthDemo
} from '@/examples/BasicExamples';

import {
  LeftIconDemo,
  RightIconDemo,
  DualIconDemo,
  IconOnlyDemo,
  IconSizesDemo,
  LoadingIconDemo
} from '@/examples/IconExamples';

import {
  FillModesDemo,
  ShapeVariantsDemo,
  ShapeSizeCombinationsDemo,
  FillGlowCombinationsDemo
} from '@/examples/StyleExamples';

import {
  ResponsiveDemo,
  RTLSupportDemo,
  ThemeDemo,
  DebounceDemo,
  I18nDemo
} from '@/examples/AdvancedExamples';

import {
  RouterIntegrationDemo,
  AccessibilityDemo,
  EnterpriseDemo,
  KeyboardNavigationDemo
} from '@/examples/InteractiveExamples';

/**
 * 应用程序主题上下文
 */
interface AppTheme {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
  },
};

const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    primary: '#60a5fa',
    secondary: '#9ca3af',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
  },
};

/**
 * 导航栏组件
 */
interface NavbarProps {
  theme: AppTheme;
  onThemeChange: (mode: ThemeMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onThemeChange }) => {
  const navbarStyles: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: `1px solid ${theme.colors.border}`,
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backdropFilter: 'blur(8px)',
    backgroundColor: theme.mode === 'dark' ? 'rgba(31, 41, 55, 0.9)' : 'rgba(248, 250, 252, 0.9)',
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    color: theme.colors.text,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const descriptionStyles: React.CSSProperties = {
    margin: '4px 0 0 0',
    fontSize: '14px',
    color: theme.colors.textSecondary,
  };

  const controlsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const toggleTheme = (): void => {
    onThemeChange(theme.mode === 'light' ? 'dark' : 'light');
  };

  return (
    <nav style={navbarStyles}>
      <div>
        <h1 style={titleStyles}>TechButton 组件演示</h1>
        <p style={descriptionStyles}>企业级科技风按钮组件完整功能展示</p>
      </div>
      <div style={controlsStyles}>
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = theme.colors.surface;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = theme.colors.background;
          }}
        >
          {theme.mode === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        </button>
      </div>
    </nav>
  );
};

/**
 * 侧边导航组件
 */
interface SidebarProps {
  theme: AppTheme;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ theme, activeSection, onSectionChange }) => {
  const sections = [
    { id: 'basic', title: '基础功能', icon: '🔧' },
    { id: 'icons', title: '图标支持', icon: '🎨' },
    { id: 'styles', title: '样式系统', icon: '🎭' },
    { id: 'advanced', title: '高级功能', icon: '⚡' },
    { id: 'interactive', title: '交互功能', icon: '🚀' },
  ];

  const sidebarStyles: React.CSSProperties = {
    width: '240px',
    height: 'calc(100vh - 89px)',
    backgroundColor: theme.colors.surface,
    borderRight: `1px solid ${theme.colors.border}`,
    padding: '24px 0',
    overflowY: 'auto',
    position: 'sticky',
    top: '89px',
  };

  const sectionItemStyles = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    color: isActive ? theme.colors.primary : theme.colors.text,
    backgroundColor: isActive ? (theme.mode === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)') : 'transparent',
    borderRight: isActive ? `3px solid ${theme.colors.primary}` : '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '500',
  });

  return (
    <aside style={sidebarStyles}>
      {sections.map((section) => (
        <div
          key={section.id}
          style={sectionItemStyles(activeSection === section.id)}
          onClick={() => onSectionChange(section.id)}
          onMouseEnter={(e) => {
            if (activeSection !== section.id) {
              (e.target as HTMLElement).style.backgroundColor = 
                theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== section.id) {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          <span style={{ fontSize: '16px' }}>{section.icon}</span>
          <span>{section.title}</span>
        </div>
      ))}
    </aside>
  );
};

/**
 * 主内容区域组件
 */
interface MainContentProps {
  theme: AppTheme;
  activeSection: string;
}

const MainContent: React.FC<MainContentProps> = ({ theme, activeSection }) => {
  const contentStyles: React.CSSProperties = {
    flex: 1,
    padding: '32px',
    backgroundColor: theme.colors.background,
    minHeight: 'calc(100vh - 89px)',
  };

  const sectionStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  };

  const renderSection = (): React.ReactNode => {
    switch (activeSection) {
      case 'basic':
        return (
          <div style={sectionStyles}>
            <BasicUsageDemo />
            <SizesDemo />
            <VariantsDemo />
            <StatesDemo />
            <FullWidthDemo />
          </div>
        );
      case 'icons':
        return (
          <div style={sectionStyles}>
            <LeftIconDemo />
            <RightIconDemo />
            <DualIconDemo />
            <IconOnlyDemo />
            <IconSizesDemo />
            <LoadingIconDemo />
          </div>
        );
      case 'styles':
        return (
          <div style={sectionStyles}>
            <FillModesDemo />
            <ShapeVariantsDemo />
            <ShapeSizeCombinationsDemo />
            <FillGlowCombinationsDemo />
          </div>
        );
      case 'advanced':
        return (
          <div style={sectionStyles}>
            <ResponsiveDemo />
            <RTLSupportDemo />
            <ThemeDemo />
            <DebounceDemo />
            <I18nDemo />
          </div>
        );
      case 'interactive':
        return (
          <div style={sectionStyles}>
            <RouterIntegrationDemo />
            <AccessibilityDemo />
            <EnterpriseDemo />
            <KeyboardNavigationDemo />
          </div>
        );
      default:
        return <div>选择一个章节开始探索 TechButton 组件的功能</div>;
    }
  };

  return (
    <main style={contentStyles}>
      {renderSection()}
    </main>
  );
};

/**
 * 主应用程序组件
 */
const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [activeSection, setActiveSection] = useState('basic');

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  const handleThemeChange = useCallback((mode: ThemeMode): void => {
    setThemeMode(mode);
  }, []);

  const handleSectionChange = useCallback((section: string): void => {
    setActiveSection(section);
  }, []);

  const appStyles: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: currentTheme.colors.background,
    color: currentTheme.colors.text,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const layoutStyles: React.CSSProperties = {
    display: 'flex',
  };

  return (
    <div style={appStyles}>
      <Navbar 
        theme={currentTheme} 
        onThemeChange={handleThemeChange} 
      />
      <div style={layoutStyles}>
        <Sidebar 
          theme={currentTheme} 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
        <MainContent 
          theme={currentTheme} 
          activeSection={activeSection} 
        />
      </div>
    </div>
  );
};

export default App;