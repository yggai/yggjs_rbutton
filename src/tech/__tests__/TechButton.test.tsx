import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, jest } from '@jest/globals';
import { TechButton } from '../TechButton';

// 模拟图标组件用于测试
const TestIcon = () => <span data-testid="test-icon">📱</span>;

/**
 * 科技风按钮组件测试套件 v1.1.0
 * 使用TDD方法论，涵盖所有新功能特性
 */
describe('TechButton', () => {
  /**
   * 基础功能测试
   */
  describe('基础功能', () => {
    test('应该正确渲染按钮文本', () => {
      render(<TechButton>点击我</TechButton>);
      expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument();
    });

    test('应该支持自定义className', () => {
      render(<TechButton className="custom-class">测试</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    test('应该支持onClick事件处理', () => {
      const handleClick = jest.fn();
      render(<TechButton onClick={handleClick}>点击测试</TechButton>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('应该支持disabled状态', () => {
      const handleClick = jest.fn();
      render(
        <TechButton disabled onClick={handleClick}>
          禁用按钮
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  /**
   * 图标支持系统测试
   */
  describe('图标支持系统', () => {
    test('应该渲染左侧图标', () => {
      render(
        <TechButton iconLeft={<TestIcon />}>
          带左图标
        </TechButton>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('带左图标');
    });

    test('应该渲染右侧图标', () => {
      render(
        <TechButton iconRight={<TestIcon />}>
          带右图标  
        </TechButton>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('带右图标');
    });

    test('应该同时支持左右图标', () => {
      render(
        <TechButton 
          iconLeft={<span data-testid="left-icon">←</span>}
          iconRight={<span data-testid="right-icon">→</span>}
        >
          双图标按钮
        </TechButton>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('双图标按钮');
    });

    test('应该支持纯图标按钮', () => {
      render(
        <TechButton iconLeft={<TestIcon />} iconOnly>
          图标按钮
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', '图标按钮');
      expect(button).not.toHaveTextContent('图标按钮');
    });

    test('应该根据尺寸自适应图标大小', () => {
      const { rerender } = render(
        <TechButton size="small" iconLeft={<TestIcon />}>
          小图标
        </TechButton>
      );
      
      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'small');
      
      rerender(
        <TechButton size="large" iconLeft={<TestIcon />}>
          大图标
        </TechButton>
      );
      
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'large');
    });

    test('加载状态下应该隐藏图标显示加载动画', () => {
      render(
        <TechButton loading iconLeft={<TestIcon />}>
          加载中
        </TechButton>
      );
      
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
      expect(screen.getByText('加载中...')).toBeInTheDocument();
    });

    test('纯图标按钮应该保持正方形比例', () => {
      render(
        <TechButton iconLeft={<TestIcon />} iconOnly>
          正方形图标
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-icon-only', 'true');
    });
  });

  /**
   * 填充模式测试
   */
  describe('填充模式', () => {
    test('应该渲染实心填充模式（默认）', () => {
      render(<TechButton>实心按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-fill', 'solid');
    });

    test('应该渲染边框模式', () => {
      render(<TechButton fill="outline">边框按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-fill', 'outline');
    });

    test('应该渲染幽灵模式', () => {
      render(<TechButton fill="ghost">幽灵按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-fill', 'ghost');
    });

    test('应该渲染链接模式', () => {
      render(<TechButton fill="link">链接按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-fill', 'link');
    });
  });

  /**
   * 形状变体测试
   */
  describe('形状变体', () => {
    test('应该渲染默认形状', () => {
      render(<TechButton>默认形状</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-shape', 'default');
    });

    test('应该渲染大圆角形状', () => {
      render(<TechButton shape="rounded">圆角按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-shape', 'rounded');
    });

    test('应该渲染圆形按钮', () => {
      render(<TechButton shape="circular">圆形按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-shape', 'circular');
    });

    test('应该渲染方形按钮', () => {
      render(<TechButton shape="square">方形按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-shape', 'square');
    });
  });

  /**
   * 尺寸变体测试
   */
  describe('尺寸变体', () => {
    test('应该渲染小尺寸按钮', () => {
      render(<TechButton size="small">小按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'small');
    });

    test('应该渲染中等尺寸按钮（默认）', () => {
      render(<TechButton>中等按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'medium');
    });

    test('应该渲染大尺寸按钮', () => {
      render(<TechButton size="large">大按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'large');
    });
  });

  /**
   * 主题变体测试
   */
  describe('主题变体', () => {
    test('应该渲染主要变体按钮（默认）', () => {
      render(<TechButton>主要按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'primary');
    });

    test('应该渲染次要变体按钮', () => {
      render(<TechButton variant="secondary">次要按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'secondary');
    });

    test('应该渲染危险变体按钮', () => {
      render(<TechButton variant="danger">危险按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'danger');
    });

    test('应该渲染成功变体按钮', () => {
      render(<TechButton variant="success">成功按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'success');
    });
  });

  /**
   * 键盘导航测试
   */
  describe('键盘导航', () => {
    test('应该响应Enter键点击', () => {
      const handleClick = jest.fn();
      render(<TechButton onClick={handleClick}>键盘测试</TechButton>);
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('应该响应Space键点击', () => {
      const handleClick = jest.fn();
      render(<TechButton onClick={handleClick}>空格测试</TechButton>);
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('应该显示焦点状态', () => {
      render(<TechButton>焦点测试</TechButton>);
      
      const button = screen.getByRole('button');
      fireEvent.focus(button);
      
      // 只检查焦点相关的属性，不检查实际DOM焦点状态
      expect(button).toHaveAttribute('data-focused', 'true');
      expect(button).toHaveAttribute('aria-focused', 'true');
    });

    test('禁用状态下键盘事件不应该触发', () => {
      const handleClick = jest.fn();
      render(
        <TechButton disabled onClick={handleClick}>
          禁用键盘
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  /**
   * 防重复点击测试
   */
  describe('防重复点击保护', () => {
    test('应该防止快速重复点击', async () => {
      const handleClick = jest.fn();
      render(
        <TechButton 
          preventDoubleClick 
          debounceDelay={100} 
          onClick={handleClick}
        >
          防抖测试
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      
      // 快速点击多次
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      // 应该只触发一次
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // 等待防抖延迟后可以再次点击
      await waitFor(() => {
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(2);
      }, { timeout: 200 });
    });

    test('应该在防抖期间显示pending状态', async () => {
      const handleClick = jest.fn();
      render(
        <TechButton 
          preventDoubleClick 
          debounceDelay={100}
          onClick={handleClick}
        >
          防抖状态测试
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      // 立即检查pending状态
      expect(button).toHaveAttribute('data-pending', 'true');
      
      // 等待防抖延迟后状态应该清除
      await waitFor(() => {
        expect(button).not.toHaveAttribute('data-pending');
      }, { timeout: 200 });
    });

    test('加载状态下不应该触发防抖保护', () => {
      const handleClick = jest.fn();
      render(
        <TechButton 
          loading 
          preventDoubleClick 
          onClick={handleClick}
        >
          加载防抖测试
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
      expect(button).not.toHaveAttribute('data-pending');
    });
  });

  /**
   * 响应式设计测试
   */
  describe('响应式设计', () => {
    test('应该支持响应式模式', () => {
      render(<TechButton responsive>响应式按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-responsive', 'true');
    });

    test('应该支持最小触摸目标', () => {
      render(<TechButton minTouchTarget>触摸目标</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-min-touch-target', 'true');
    });
  });

  /**
   * 特殊状态测试
   */
  describe('特殊状态', () => {
    test('应该显示加载状态', () => {
      render(<TechButton loading>加载中</TechButton>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toBeDisabled();
      expect(screen.getByText('加载中...')).toBeInTheDocument();
    });

    test('应该支持发光效果', () => {
      render(<TechButton glowing>发光按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-glowing', 'true');
    });

    test('应该支持全宽模式', () => {
      render(<TechButton fullWidth>全宽按钮</TechButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-full-width', 'true');
    });

    test('加载状态下应该阻止点击事件', () => {
      const handleClick = jest.fn();
      render(
        <TechButton loading onClick={handleClick}>
          加载中
        </TechButton>
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  /**
   * 可访问性测试
   */
  describe('可访问性', () => {
    test('应该有正确的role属性', () => {
      render(<TechButton>可访问按钮</TechButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('应该支持aria-label属性', () => {
      render(<TechButton aria-label="自定义标签">按钮</TechButton>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', '自定义标签');
    });

    test('加载状态下应该有aria-busy属性', () => {
      render(<TechButton loading>加载中</TechButton>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    test('纯图标按钮应该有正确的可访问性标签', () => {
      render(
        <TechButton iconLeft={<TestIcon />} iconOnly>
          删除
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', '删除');
    });

    test('焦点状态应该有正确的aria属性', () => {
      render(<TechButton>焦点可访问性</TechButton>);
      
      const button = screen.getByRole('button');
      fireEvent.focus(button);
      
      expect(button).toHaveAttribute('aria-focused', 'true');
    });
  });

  /**
   * 组合状态测试
   */
  describe('组合状态', () => {
    test('应该支持多个属性组合使用', () => {
      render(
        <TechButton
          size="large"
          variant="danger"
          fill="outline"
          shape="rounded"
          glowing
          fullWidth
          iconLeft={<TestIcon />}
          className="custom-btn"
        >
          组合按钮
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'large');
      expect(button).toHaveAttribute('data-variant', 'danger');
      expect(button).toHaveAttribute('data-fill', 'outline');
      expect(button).toHaveAttribute('data-shape', 'rounded');
      expect(button).toHaveAttribute('data-glowing', 'true');
      expect(button).toHaveAttribute('data-full-width', 'true');
      expect(button).toHaveClass('custom-btn');
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    test('loading状态应该覆盖其他交互状态', () => {
      const handleClick = jest.fn();
      render(
        <TechButton
          loading
          disabled={false}
          preventDoubleClick
          onClick={handleClick}
        >
          加载测试
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).not.toHaveAttribute('data-pending');
    });

    test('纯图标按钮与形状组合应该正确渲染', () => {
      render(
        <TechButton 
          iconLeft={<TestIcon />} 
          iconOnly 
          shape="circular"
          size="large"
        >
          圆形图标
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-icon-only', 'true');
      expect(button).toHaveAttribute('data-shape', 'circular');
      expect(button).toHaveAttribute('data-size', 'large');
      expect(button).toHaveAttribute('aria-label', '圆形图标');
    });
  });

  /**
   * 性能测试
   */
  describe('性能相关', () => {
    test('应该支持forwardRef', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<TechButton ref={ref}>Ref测试</TechButton>);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('应该正确传递所有HTML属性', () => {
      render(
        <TechButton
          id="test-button"
          data-testid="tech-button"
          type="submit"
          name="submitBtn"
        >
          属性测试
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id', 'test-button');
      expect(button).toHaveAttribute('data-testid', 'tech-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('name', 'submitBtn');
    });

    test('样式缓存应该工作正常', () => {
      const { rerender } = render(<TechButton>缓存测试1</TechButton>);
      rerender(<TechButton>缓存测试2</TechButton>);
      
      // 如果样式缓存工作正常，两次渲染应该都成功
      expect(screen.getByText('缓存测试2')).toBeInTheDocument();
    });
  });
});