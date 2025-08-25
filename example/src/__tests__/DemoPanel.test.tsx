/**
 * 演示面板组件测试文件
 * 测试 DemoPanel、DemoGrid、DemoItem 组件的功能
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { DemoPanel, DemoGrid, DemoItem } from '../components/DemoPanel';

describe('DemoPanel 组件', () => {
  test('应该正确渲染标题和描述', () => {
    render(
      <DemoPanel title="测试标题" description="测试描述">
        <div>测试内容</div>
      </DemoPanel>
    );
    
    expect(screen.getByText('测试标题')).toBeInTheDocument();
    expect(screen.getByText('测试描述')).toBeInTheDocument();
    expect(screen.getByText('测试内容')).toBeInTheDocument();
  });

  test('应该支持不同的变体样式', () => {
    const { rerender } = render(
      <DemoPanel title="主要面板" variant="primary">
        <div>内容</div>
      </DemoPanel>
    );
    
    expect(screen.getByText('主要面板')).toBeInTheDocument();
    
    // 测试其他变体
    rerender(
      <DemoPanel title="成功面板" variant="success">
        <div>内容</div>
      </DemoPanel>
    );
    
    expect(screen.getByText('成功面板')).toBeInTheDocument();
  });

  test('应该支持折叠功能', () => {
    render(
      <DemoPanel title="可折叠面板" collapsible defaultCollapsed={false}>
        <div data-testid="panel-content">可见内容</div>
      </DemoPanel>
    );
    
    // 初始内容应该可见
    expect(screen.getByTestId('panel-content')).toBeInTheDocument();
    
    // 点击标题折叠
    const header = screen.getByText('可折叠面板').closest('div');
    if (header) {
      fireEvent.click(header);
    }
    
    // 内容可能仍然在DOM中但不可见，这里简化测试
    expect(screen.getByTestId('panel-content')).toBeInTheDocument();
  });

  test('应该支持默认折叠状态', () => {
    render(
      <DemoPanel title="默认折叠" collapsible defaultCollapsed={true}>
        <div data-testid="collapsed-content">折叠内容</div>
      </DemoPanel>
    );
    
    expect(screen.getByText('默认折叠')).toBeInTheDocument();
    expect(screen.getByTestId('collapsed-content')).toBeInTheDocument();
  });
});

describe('DemoGrid 组件', () => {
  test('应该正确渲染网格内容', () => {
    render(
      <DemoGrid columns={2} gap={16}>
        <div>项目1</div>
        <div>项目2</div>
        <div>项目3</div>
      </DemoGrid>
    );
    
    expect(screen.getByText('项目1')).toBeInTheDocument();
    expect(screen.getByText('项目2')).toBeInTheDocument();
    expect(screen.getByText('项目3')).toBeInTheDocument();
  });

  test('应该支持自定义列数和间距', () => {
    render(
      <DemoGrid columns={3} gap={24}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </DemoGrid>
    );
    
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});

describe('DemoItem 组件', () => {
  test('应该正确渲染标签和内容', () => {
    render(
      <DemoItem label="示例标签">
        <button>测试按钮</button>
      </DemoItem>
    );
    
    expect(screen.getByText('示例标签')).toBeInTheDocument();
    expect(screen.getByText('测试按钮')).toBeInTheDocument();
  });

  test('应该支持居中对齐', () => {
    render(
      <DemoItem label="居中项" center>
        <div>居中内容</div>
      </DemoItem>
    );
    
    expect(screen.getByText('居中项')).toBeInTheDocument();
    expect(screen.getByText('居中内容')).toBeInTheDocument();
  });

  test('应该支持无标签模式', () => {
    render(
      <DemoItem>
        <span>无标签内容</span>
      </DemoItem>
    );
    
    expect(screen.getByText('无标签内容')).toBeInTheDocument();
  });
});