import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, jest } from '@jest/globals';
import { TechButton } from '../TechButton';

/**
 * 科技风按钮组件测试套件
 * 使用TDD方法论，先编写测试用例再实现功能
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
          glowing
          fullWidth
          className="custom-btn"
        >
          组合按钮
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'large');
      expect(button).toHaveAttribute('data-variant', 'danger');
      expect(button).toHaveAttribute('data-glowing', 'true');
      expect(button).toHaveAttribute('data-full-width', 'true');
      expect(button).toHaveClass('custom-btn');
    });

    test('loading状态应该覆盖其他交互状态', () => {
      const handleClick = jest.fn();
      render(
        <TechButton
          loading
          disabled={false}
          onClick={handleClick}
        >
          加载测试
        </TechButton>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-loading', 'true');
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
  });
});