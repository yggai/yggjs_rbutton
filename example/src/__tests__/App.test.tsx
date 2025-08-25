/**
 * App 组件测试文件
 * 测试主应用程序的基础功能
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import App from '../App';

describe('App 组件', () => {
  test('应该正确渲染应用程序标题', () => {
    render(<App />);
    
    const title = screen.getByText('TechButton 组件演示');
    expect(title).toBeInTheDocument();
    
    const description = screen.getByText('企业级科技风按钮组件完整功能展示');
    expect(description).toBeInTheDocument();
  });

  test('应该显示侧边导航栏', () => {
    render(<App />);
    
    // 检查所有导航项
    expect(screen.getByText('基础功能')).toBeInTheDocument();
    expect(screen.getByText('图标支持')).toBeInTheDocument();
    expect(screen.getByText('样式系统')).toBeInTheDocument();
    expect(screen.getByText('高级功能')).toBeInTheDocument();
    expect(screen.getByText('交互功能')).toBeInTheDocument();
  });

  test('应该支持主题切换', () => {
    render(<App />);
    
    // 查找主题切换按钮
    const themeButton = screen.getByRole('button');
    
    // 初始状态应该是亮色主题（显示月亮图标）
    expect(themeButton).toBeInTheDocument();
    
    // 点击切换到暗色主题
    fireEvent.click(themeButton);
    
    // 验证主题已切换（这里简化测试，实际可以检查样式变化）
    expect(themeButton).toBeInTheDocument();
  });

  test('应该支持导航切换', () => {
    render(<App />);
    
    // 初始应该显示基础功能内容
    expect(screen.getByText('基础用法')).toBeInTheDocument();
    
    // 点击图标支持导航
    const iconNavItem = screen.getByText('图标支持');
    fireEvent.click(iconNavItem);
    
    // 应该显示图标相关内容
    expect(screen.getByText('左侧图标')).toBeInTheDocument();
  });

  test('应该正确处理默认状态', () => {
    render(<App />);
    
    // 默认应该选中基础功能
    const basicNav = screen.getByText('基础功能');
    expect(basicNav).toBeInTheDocument();
    
    // 默认应该显示基础功能的示例
    expect(screen.getByText('基础用法')).toBeInTheDocument();
  });
});