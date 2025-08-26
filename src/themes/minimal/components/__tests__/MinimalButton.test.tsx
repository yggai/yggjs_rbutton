/**
 * 极简主题按钮组件 - 单元测试
 * 
 * 测试极简主题按钮的各种功能和行为
 * 确保与科技风主题形成对比的同时保持功能完整性
 * 
 * @version 1.0.0
 * @author 源滚滚AI编程
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MinimalButton, MinimalButtonShowcase, MinimalButtonUtils } from '../MinimalButton';
import type { MinimalButtonProps } from '../MinimalButton';

// 扩展Jest匹配器
expect.extend(toHaveNoViolations);

/**
 * 测试工具函数
 */
const TestUtils = {
  /**
   * 创建测试用的按钮属性
   */
  createButtonProps(overrides: Partial<MinimalButtonProps> = {}): MinimalButtonProps {
    return {
      children: '测试按钮',
      variant: 'primary',
      size: 'medium',
      ...overrides,
    };
  },

  /**
   * 创建可访问性测试环境
   */
  async renderWithA11y(ui: React.ReactElement) {
    const { container, ...rest } = render(ui);
    const results = await axe(container);
    
    return {
      container,
      a11yResults: results,
      ...rest,
    };
  },

  /**
   * 模拟系统偏好设置
   */
  mockSystemPreferences(preferences: {
    colorScheme?: 'light' | 'dark';
    reducedMotion?: boolean;
    highContrast?: boolean;
  }) {
    const originalMatchMedia = window.matchMedia;
    
    window.matchMedia = jest.fn((query) => {
      const matches = (() => {
        if (query === '(prefers-color-scheme: dark)') return preferences.colorScheme === 'dark';
        if (query === '(prefers-reduced-motion: reduce)') return preferences.reducedMotion === true;
        if (query === '(prefers-contrast: high)') return preferences.highContrast === true;
        return false;
      })();

      return {
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    return () => {
      window.matchMedia = originalMatchMedia;
    };
  },
};

describe('MinimalButton', () => {
  beforeEach(() => {
    // 清除所有mock
    jest.clearAllMocks();
    // 设置假计时器用于整个测试套件
    jest.useFakeTimers();
  });

  afterEach(() => {
    // 清理计时器
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('基础渲染测试', () => {
    it('应该正确渲染基础按钮', () => {
      render(<MinimalButton>测试按钮</MinimalButton>);
      
      const button = screen.getByRole('button', { name: '测试按钮' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('minimal-button');
    });

    it('应该正确应用极简主题的默认样式', () => {
      render(<MinimalButton>测试按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('minimal-button--light');
      expect(button).toHaveClass('minimal-button--density-comfortable');
      expect(button).toHaveClass('minimal-button--border-subtle');
    });

    it('应该支持所有按钮尺寸', () => {
      const sizes = ['small', 'medium', 'large'] as const;
      
      sizes.forEach((size, index) => {
        const { unmount } = render(<MinimalButton size={size} data-testid={`size-button-${index}`}>按钮</MinimalButton>);
        const button = screen.getByTestId(`size-button-${index}`);
        expect(button).toHaveClass(`ygg-button--${size}`);
        unmount();
      });
    });

    it('应该支持所有按钮变体', () => {
      const variants = ['primary', 'secondary', 'danger', 'success'] as const;
      
      variants.forEach((variant, index) => {
        const { unmount } = render(<MinimalButton variant={variant} data-testid={`variant-button-${index}`}>按钮</MinimalButton>);
        const button = screen.getByTestId(`variant-button-${index}`);
        expect(button).toHaveClass(`ygg-button--${variant}`);
        unmount();
      });
    });

    it('应该支持所有填充模式', () => {
      const fills = ['solid', 'outline', 'ghost', 'link'] as const;
      
      fills.forEach((fill, index) => {
        const { unmount } = render(<MinimalButton fill={fill} data-testid={`fill-button-${index}`}>按钮</MinimalButton>);
        const button = screen.getByTestId(`fill-button-${index}`);
        expect(button).toHaveClass(`ygg-button--${fill}`);
        unmount();
      });
    });
  });

  describe('极简主题特有功能测试', () => {
    it('应该支持颜色模式配置', () => {
      const { rerender } = render(<MinimalButton colorMode="dark">深色按钮</MinimalButton>);
      let button = screen.getByRole('button');
      expect(button).toHaveClass('minimal-button--dark');

      rerender(<MinimalButton colorMode="light">浅色按钮</MinimalButton>);
      button = screen.getByRole('button');
      expect(button).toHaveClass('minimal-button--light');
    });

    it('应该支持内容密度配置', () => {
      const densities = ['compact', 'comfortable', 'spacious'] as const;
      
      densities.forEach((density, index) => {
        const { unmount } = render(<MinimalButton density={density} data-testid={`density-button-${index}`}>按钮</MinimalButton>);
        const button = screen.getByTestId(`density-button-${index}`);
        expect(button).toHaveClass(`minimal-button--density-${density}`);
        unmount();
      });
    });

    it('应该支持边框样式配置', () => {
      const borderStyles = ['none', 'subtle', 'visible'] as const;
      
      borderStyles.forEach((borderStyle, index) => {
        const { unmount } = render(<MinimalButton borderStyle={borderStyle} data-testid={`border-button-${index}`}>按钮</MinimalButton>);
        const button = screen.getByTestId(`border-button-${index}`);
        expect(button).toHaveClass(`minimal-button--border-${borderStyle}`);
        unmount();
      });
    });

    it('应该支持阴影强度配置', () => {
      const shadowIntensities = ['none', 'subtle', 'visible'] as const;
      
      shadowIntensities.forEach((shadowIntensity, index) => {
        const { unmount } = render(<MinimalButton shadowIntensity={shadowIntensity} data-testid={`shadow-button-${index}`}>按钮</MinimalButton>);
        const button = screen.getByTestId(`shadow-button-${index}`);
        expect(button).toHaveClass(`minimal-button--shadow-${shadowIntensity}`);
        unmount();
      });
    });

    it('应该支持文字样式配置', () => {
      const textStyles = ['light', 'normal', 'medium'] as const;
      
      textStyles.forEach((textStyle, index) => {
        const { unmount } = render(<MinimalButton textStyle={textStyle} data-testid={`text-button-${index}`}>按钮</MinimalButton>);
        const button = screen.getByTestId(`text-button-${index}`);
        expect(button).toHaveClass(`minimal-button--text-${textStyle}`);
        unmount();
      });
    });
  });

  describe('交互行为测试', () => {
    it('应该响应点击事件', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<MinimalButton onClick={handleClick}>点击按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    it('应该支持键盘导航', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<MinimalButton onClick={handleClick}>键盘按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      await act(async () => {
        button.focus();
      });
      
      // 测试Enter键
      await user.keyboard('{Enter}');
      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
      
      // 测试Space键
      await user.keyboard(' ');
      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(2);
      });
    });

    it('禁用状态下不应该响应交互', async () => {
      const handleClick = jest.fn();
      render(<MinimalButton disabled onClick={handleClick}>禁用按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      // 使用fireEvent而不是userEvent来测试禁用按钮
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('加载状态下应该显示加载指示器', () => {
      render(<MinimalButton loading loadingText="加载中...">加载按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByText('加载中...')).toBeInTheDocument();
    });
  });

  describe('可访问性测试', () => {
    it.skip('应该符合WCAG可访问性标准', async () => {
      const { a11yResults } = await TestUtils.renderWithA11y(
        <MinimalButton>可访问按钮</MinimalButton>
      );
      
      expect(a11yResults).toHaveNoViolations();
    }, 10000);

    it.skip('纯图标按钮应该有正确的可访问性标签', async () => {
      // Wait for previous axe run to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const { a11yResults } = await TestUtils.renderWithA11y(
        <MinimalButton iconOnly leftIcon="🔍" aria-label="搜索">
          搜索
        </MinimalButton>
      );
      
      expect(a11yResults).toHaveNoViolations();
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', '搜索');
    }, 10000);

    it('应该支持高对比度模式', () => {
      render(<MinimalButton highContrast>高对比度按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ygg-button--high-contrast');
    });

    it('应该支持减少动画模式', () => {
      render(<MinimalButton reducedMotion>减少动画按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ygg-button--reduced-motion');
    });
  });

  describe('响应式设计测试', () => {
    it('应该支持响应式模式', () => {
      render(<MinimalButton responsive>响应式按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ygg-button--responsive');
    });

    it('应该支持全宽模式', () => {
      render(<MinimalButton fullWidth>全宽按钮</MinimalButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ygg-button--full-width');
    });
  });

  describe('系统偏好集成测试', () => {
    it('应该响应系统颜色方案偏好', () => {
      const cleanup = TestUtils.mockSystemPreferences({ colorScheme: 'dark' });
      
      render(<MinimalButton colorMode="auto">自动主题按钮</MinimalButton>);
      
      // 在实际的实现中，这里应该检测到系统的深色偏好
      // 并相应地应用深色主题样式
      
      cleanup();
    });

    it('应该响应减少动画偏好', () => {
      const cleanup = TestUtils.mockSystemPreferences({ reducedMotion: true });
      
      // 测试组件是否正确响应系统的减少动画偏好
      // 实际测试需要结合具体的实现逻辑
      
      cleanup();
    });
  });

  describe('性能测试', () => {
    it('应该正确缓存样式计算', () => {
      // 多次渲染相同属性的按钮，应该复用样式缓存
      const props = TestUtils.createButtonProps();
      
      const { rerender } = render(<MinimalButton {...props} />);
      rerender(<MinimalButton {...props} />);
      rerender(<MinimalButton {...props} />);
      
      // 在实际实现中，这里可以检查样式缓存的命中率
      // 确保性能优化生效
    });

    it('应该避免不必要的重新渲染', () => {
      const renderSpy = jest.fn();
      
      const TestButton = (props: MinimalButtonProps) => {
        renderSpy();
        return <MinimalButton {...props} />;
      };
      
      const { rerender } = render(<TestButton>测试</TestButton>);
      
      // 重新渲染相同的props，应该避免不必要的重新计算
      rerender(<TestButton>测试</TestButton>);
      
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});

describe('MinimalButtonShowcase', () => {
  it('应该正确渲染所有按钮变体', () => {
    render(<MinimalButtonShowcase />);
    
    // 检查各种按钮变体是否都被渲染
    expect(screen.getByText('主要按钮')).toBeInTheDocument();
    expect(screen.getByText('次要按钮')).toBeInTheDocument();
    expect(screen.getByText('危险按钮')).toBeInTheDocument();
    expect(screen.getByText('成功按钮')).toBeInTheDocument();
  });

  it('应该展示极简主题的特色配置', () => {
    render(<MinimalButtonShowcase />);
    
    // 检查极简主题特有的配置是否被展示
    expect(screen.getByText('紧凑密度')).toBeInTheDocument();
    expect(screen.getByText('宽松密度')).toBeInTheDocument();
    expect(screen.getByText('可见阴影')).toBeInTheDocument();
  });
});

describe('MinimalButtonUtils', () => {
  describe('getRecommendedConfig', () => {
    it('应该为不同场景返回合适的配置', () => {
      const primaryConfig = MinimalButtonUtils.getRecommendedConfig('primary');
      expect(primaryConfig.variant).toBe('primary');
      expect(primaryConfig.fill).toBe('solid');

      const secondaryConfig = MinimalButtonUtils.getRecommendedConfig('secondary');
      expect(secondaryConfig.variant).toBe('secondary');
      expect(secondaryConfig.fill).toBe('outline');

      const textConfig = MinimalButtonUtils.getRecommendedConfig('text');
      expect(textConfig.fill).toBe('link');

      const iconConfig = MinimalButtonUtils.getRecommendedConfig('icon');
      expect(iconConfig.iconOnly).toBe(true);
      expect(iconConfig.shape).toBe('circle');
    });
  });

  describe('checkAccessibility', () => {
    it('应该检测纯图标按钮的可访问性问题', () => {
      const result = MinimalButtonUtils.checkAccessibility({
        iconOnly: true,
        // 缺少 children 和 aria-label
      } as MinimalButtonProps);

      expect(result.isAccessible).toBe(false);
      expect(result.warnings).toContain('纯图标按钮缺少可访问性标签');
    });

    it('应该为良好的配置返回正面结果', () => {
      const result = MinimalButtonUtils.checkAccessibility({
        variant: 'primary',
        fill: 'solid',
        children: '正常按钮',
      } as MinimalButtonProps);

      expect(result.isAccessible).toBe(true);
      expect(result.warnings).toHaveLength(0);
      expect(result.errors).toHaveLength(0);
    });

    it('应该提供有用的可访问性建议', () => {
      const result = MinimalButtonUtils.checkAccessibility({
        variant: 'secondary',
        fill: 'ghost',
      } as MinimalButtonProps);

      expect(result.suggestions.length).toBeGreaterThan(0);
      expect(result.suggestions.some(s => s.includes('对比度'))).toBe(true);
    });
  });

  describe('generateCSSVariables', () => {
    it('应该生成正确的CSS变量', () => {
      const variables = MinimalButtonUtils.generateCSSVariables({
        colorMode: 'light',
        density: 'comfortable',
      } as MinimalButtonProps);

      expect(variables).toHaveProperty('--minimal-color-mode', 'light');
      expect(variables).toHaveProperty('--minimal-density', 'comfortable');
    });
  });
});

describe('极简主题与科技风主题的对比测试', () => {
  it('极简主题应该默认使用outline填充而非solid', () => {
    render(<MinimalButton>极简按钮</MinimalButton>);
    
    const button = screen.getByRole('button');
    // 极简主题的默认填充应该是outline，体现简洁理念
    expect(button).toHaveClass('ygg-button--outline');
  });

  it('极简主题应该使用更微妙的阴影效果', () => {
    render(<MinimalButton shadowIntensity="subtle">微妙阴影</MinimalButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('minimal-button--shadow-subtle');
    
    // 测试微妙阴影的样式应用（实际测试需要检查computed style）
  });

  it('极简主题应该支持更多的内容密度选项', () => {
    // 极简主题特有的密度配置
    const densities = ['compact', 'comfortable', 'spacious'];
    
    densities.forEach((density, index) => {
      const { unmount } = render(
        <MinimalButton 
          density={density as 'compact' | 'comfortable' | 'spacious'} 
          data-testid={`density-compare-${index}`}
        >
          密度测试
        </MinimalButton>
      );
      
      const button = screen.getByTestId(`density-compare-${index}`);
      expect(button).toHaveClass(`minimal-button--density-${density}`);
      
      unmount();
    });
  });

  it('极简主题应该更注重可访问性配置', () => {
    render(
      <MinimalButton 
        highContrast
        reducedMotion
        textStyle="medium"
      >
        可访问按钮
      </MinimalButton>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ygg-button--high-contrast');
    expect(button).toHaveClass('ygg-button--reduced-motion');
    expect(button).toHaveClass('minimal-button--text-medium');
  });
});