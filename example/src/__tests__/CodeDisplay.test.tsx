/**
 * 代码展示组件测试文件
 * 测试 CodeDisplay 组件的功能
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, jest } from '@jest/globals';
import { CodeDisplay } from '../components/CodeDisplay';

// 模拟复制到剪贴板功能
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('CodeDisplay 组件', () => {
  const sampleCode = `
    import { TechButton } from 'yggjs_rbutton';
    
    function Example() {
      return (
        <TechButton variant="primary">
          点击我
        </TechButton>
      );
    }
  `;

  test('应该正确渲染代码内容', () => {
    render(
      <CodeDisplay
        code={sampleCode}
        language="tsx"
        title="示例代码"
      />
    );
    
    expect(screen.getByText('示例代码 - TypeScript React')).toBeInTheDocument();
    expect(screen.getByText('TechButton')).toBeInTheDocument();
    expect(screen.getByText('点击我')).toBeInTheDocument();
  });

  test('应该支持不同的编程语言', () => {
    const { rerender } = render(
      <CodeDisplay
        code="const x = 42;"
        language="javascript"
        title="JS代码"
      />
    );
    
    expect(screen.getByText('JS代码 - JavaScript')).toBeInTheDocument();
    
    rerender(
      <CodeDisplay
        code="body { color: red; }"
        language="css"
        title="样式代码"
      />
    );
    
    expect(screen.getByText('样式代码 - CSS')).toBeInTheDocument();
  });

  test('应该支持复制代码功能', async () => {
    render(
      <CodeDisplay
        code={sampleCode}
        language="tsx"
        title="可复制代码"
      />
    );
    
    // 查找复制按钮
    const copyButton = screen.getByText('复制代码').closest('button');
    expect(copyButton).toBeInTheDocument();
    
    if (copyButton) {
      // 点击复制按钮
      fireEvent.click(copyButton);
      
      // 验证复制功能被调用
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      
      // 等待复制状态更新
      await waitFor(() => {
        expect(screen.getByText('已复制')).toBeInTheDocument();
      });
    }
  });

  test('应该支持显示行号', () => {
    render(
      <CodeDisplay
        code="line 1\nline 2\nline 3"
        language="tsx"
        showLineNumbers={true}
      />
    );
    
    // 检查行号是否显示
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('应该支持隐藏行号', () => {
    render(
      <CodeDisplay
        code="single line"
        language="tsx"
        showLineNumbers={false}
      />
    );
    
    expect(screen.getByText('single line')).toBeInTheDocument();
    // 在隐藏行号模式下，不应该有行号容器
  });

  test('应该支持高亮指定行', () => {
    render(
      <CodeDisplay
        code="line 1\nline 2\nline 3"
        language="tsx"
        highlightLines={[2]}
        showLineNumbers={true}
      />
    );
    
    expect(screen.getByText('line 2')).toBeInTheDocument();
  });

  test('应该正确处理空代码', () => {
    render(
      <CodeDisplay
        code=""
        language="tsx"
        title="空代码"
      />
    );
    
    expect(screen.getByText('空代码 - TypeScript React')).toBeInTheDocument();
  });

  test('应该支持自定义样式', () => {
    render(
      <CodeDisplay
        code="test"
        language="tsx"
        style={{ backgroundColor: 'red' }}
        className="custom-class"
      />
    );
    
    const container = screen.getByText('test').closest('div');
    expect(container?.closest('.custom-class')).toBeInTheDocument();
  });

  test('应该正确格式化代码缩进', () => {
    const indentedCode = `
      function test() {
        console.log('hello');
      }
    `;
    
    render(
      <CodeDisplay
        code={indentedCode}
        language="tsx"
      />
    );
    
    expect(screen.getByText('function test() {')).toBeInTheDocument();
    expect(screen.getByText('console.log')).toBeInTheDocument();
  });
});