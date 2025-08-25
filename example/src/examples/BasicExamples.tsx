/**
 * 基础功能演示组件
 * 展示 TechButton 的基本用法和核心功能
 */
import React from 'react';
import { TechButton } from 'yggjs_rbutton';
import { DemoPanel, DemoGrid, DemoItem } from '@/components/DemoPanel';
import { CodeDisplay } from '@/components/CodeDisplay';

/**
 * 基础用法演示
 */
export const BasicUsageDemo: React.FC = () => {
  const handleClick = (): void => {
    console.log('按钮被点击了！');
  };

  const codeExample = `
import { TechButton } from 'yggjs_rbutton';

function App() {
  const handleClick = () => {
    console.log('按钮被点击了！');
  };

  return (
    <div>
      <TechButton onClick={handleClick}>
        点击我
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="基础用法"
      description="最简单的按钮用法，点击按钮查看控制台输出"
      variant="primary"
    >
      <DemoGrid columns={1}>
        <DemoItem label="默认按钮" center>
          <TechButton onClick={handleClick}>
            点击我
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="基础用法示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 尺寸变体演示
 */
export const SizesDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';

function SizesExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <TechButton size="small">
        小尺寸
      </TechButton>
      <TechButton size="medium">
        中等尺寸
      </TechButton>
      <TechButton size="large">
        大尺寸
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="尺寸变体"
      description="提供三种不同的按钮尺寸，适应不同的使用场景"
      variant="default"
    >
      <DemoGrid columns={3}>
        <DemoItem label="小尺寸 (small)" center>
          <TechButton size="small">
            小尺寸
          </TechButton>
        </DemoItem>
        <DemoItem label="中等尺寸 (medium)" center>
          <TechButton size="medium">
            中等尺寸
          </TechButton>
        </DemoItem>
        <DemoItem label="大尺寸 (large)" center>
          <TechButton size="large">
            大尺寸
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="尺寸变体示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 主题变体演示
 */
export const VariantsDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';

function VariantsExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <TechButton variant="primary">
        主要按钮
      </TechButton>
      <TechButton variant="secondary">
        次要按钮
      </TechButton>
      <TechButton variant="success">
        成功按钮
      </TechButton>
      <TechButton variant="danger">
        危险按钮
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="主题变体"
      description="不同的颜色主题，传达不同的语义和重要程度"
      variant="default"
    >
      <DemoGrid columns={4}>
        <DemoItem label="主要 (primary)" center>
          <TechButton variant="primary">
            主要按钮
          </TechButton>
        </DemoItem>
        <DemoItem label="次要 (secondary)" center>
          <TechButton variant="secondary">
            次要按钮
          </TechButton>
        </DemoItem>
        <DemoItem label="成功 (success)" center>
          <TechButton variant="success">
            成功按钮
          </TechButton>
        </DemoItem>
        <DemoItem label="危险 (danger)" center>
          <TechButton variant="danger">
            危险按钮
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="主题变体示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 按钮状态演示
 */
export const StatesDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';

function StatesExample() {
  const handleAsync = async () => {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('异步操作完成');
  };

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <TechButton>
        正常状态
      </TechButton>
      <TechButton disabled>
        禁用状态
      </TechButton>
      <TechButton loading>
        加载状态
      </TechButton>
      <TechButton onClick={handleAsync}>
        异步操作
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="按钮状态"
      description="按钮在不同状态下的表现，包括正常、禁用、加载等"
      variant="default"
    >
      <DemoGrid columns={4}>
        <DemoItem label="正常状态" center>
          <TechButton>
            正常状态
          </TechButton>
        </DemoItem>
        <DemoItem label="禁用状态" center>
          <TechButton disabled>
            禁用状态
          </TechButton>
        </DemoItem>
        <DemoItem label="加载状态" center>
          <TechButton loading>
            加载状态
          </TechButton>
        </DemoItem>
        <DemoItem label="发光效果" center>
          <TechButton glowing>
            发光效果
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="按钮状态示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 全宽按钮演示
 */
export const FullWidthDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';

function FullWidthExample() {
  return (
    <div style={{ maxWidth: '400px' }}>
      <TechButton fullWidth variant="primary">
        全宽按钮
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="全宽按钮"
      description="按钮占满父容器的宽度，适用于表单提交等场景"
      variant="default"
    >
      <div style={{ maxWidth: '400px' }}>
        <TechButton fullWidth variant="primary">
          全宽按钮
        </TechButton>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="全宽按钮示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};