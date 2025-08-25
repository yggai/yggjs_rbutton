/**
 * 填充模式和形状变体演示组件
 * 展示 TechButton 的不同填充模式和形状选项
 */
import React from 'react';
import { TechButton } from 'yggjs_rbutton';
import { DemoPanel, DemoGrid, DemoItem } from '@/components/DemoPanel';
import { CodeDisplay } from '@/components/CodeDisplay';
import { SearchIcon, DeleteIcon, SettingsIcon } from '@/components/Icons';

/**
 * 填充模式演示
 */
export const FillModesDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';

function FillModesExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {/* 实心填充（默认） */}
      <TechButton fill="solid" variant="primary">
        实心按钮
      </TechButton>
      
      {/* 边框模式 */}
      <TechButton fill="outline" variant="primary">
        边框按钮
      </TechButton>
      
      {/* 幽灵模式 */}
      <TechButton fill="ghost" variant="primary">
        幽灵按钮
      </TechButton>
      
      {/* 链接模式 */}
      <TechButton fill="link" variant="primary">
        链接按钮
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="填充模式"
      description="四种不同的填充模式，提供丰富的视觉层次"
      variant="primary"
    >
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          Primary 主要按钮
        </h4>
        <DemoGrid columns={4}>
          <DemoItem label="实心 (solid)" center>
            <TechButton fill="solid" variant="primary">
              实心按钮
            </TechButton>
          </DemoItem>
          <DemoItem label="边框 (outline)" center>
            <TechButton fill="outline" variant="primary">
              边框按钮
            </TechButton>
          </DemoItem>
          <DemoItem label="幽灵 (ghost)" center>
            <TechButton fill="ghost" variant="primary">
              幽灵按钮
            </TechButton>
          </DemoItem>
          <DemoItem label="链接 (link)" center>
            <TechButton fill="link" variant="primary">
              链接按钮
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          Danger 危险按钮
        </h4>
        <DemoGrid columns={4}>
          <DemoItem label="实心 (solid)" center>
            <TechButton fill="solid" variant="danger">
              删除
            </TechButton>
          </DemoItem>
          <DemoItem label="边框 (outline)" center>
            <TechButton fill="outline" variant="danger">
              删除
            </TechButton>
          </DemoItem>
          <DemoItem label="幽灵 (ghost)" center>
            <TechButton fill="ghost" variant="danger">
              删除
            </TechButton>
          </DemoItem>
          <DemoItem label="链接 (link)" center>
            <TechButton fill="link" variant="danger">
              删除
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          Success 成功按钮
        </h4>
        <DemoGrid columns={4}>
          <DemoItem label="实心 (solid)" center>
            <TechButton fill="solid" variant="success">
              确认
            </TechButton>
          </DemoItem>
          <DemoItem label="边框 (outline)" center>
            <TechButton fill="outline" variant="success">
              确认
            </TechButton>
          </DemoItem>
          <DemoItem label="幽灵 (ghost)" center>
            <TechButton fill="ghost" variant="success">
              确认
            </TechButton>
          </DemoItem>
          <DemoItem label="链接 (link)" center>
            <TechButton fill="link" variant="success">
              确认
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>
      
      <CodeDisplay
        title="填充模式示例"
        code={codeExample}
        language="tsx"
      />
    </DemoPanel>
  );
};

/**
 * 形状变体演示
 */
export const ShapeVariantsDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { SearchIcon, SettingsIcon } from '@/components/Icons';

function ShapeVariantsExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {/* 默认圆角 */}
      <TechButton shape="default">
        默认形状
      </TechButton>
      
      {/* 大圆角 */}
      <TechButton shape="rounded" variant="primary">
        圆角按钮
      </TechButton>
      
      {/* 完全圆形（通常用于图标按钮） */}
      <TechButton 
        shape="circular" 
        iconLeft={<SettingsIcon />} 
        iconOnly
        variant="secondary"
      >
        设置
      </TechButton>
      
      {/* 方形（无圆角） */}
      <TechButton shape="square" variant="success">
        方形按钮
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="形状变体"
      description="四种不同的按钮形状，适应不同的设计需求"
      variant="default"
    >
      <DemoGrid columns={4}>
        <DemoItem label="默认 (default)" center>
          <TechButton shape="default">
            默认形状
          </TechButton>
        </DemoItem>
        <DemoItem label="圆角 (rounded)" center>
          <TechButton shape="rounded" variant="primary">
            圆角按钮
          </TechButton>
        </DemoItem>
        <DemoItem label="圆形 (circular)" center>
          <TechButton 
            shape="circular" 
            iconLeft={<SettingsIcon />} 
            iconOnly
            variant="secondary"
          >
            设置
          </TechButton>
        </DemoItem>
        <DemoItem label="方形 (square)" center>
          <TechButton shape="square" variant="success">
            方形按钮
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="形状变体示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 形状与尺寸组合演示
 */
export const ShapeSizeCombinationsDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { DeleteIcon, SearchIcon, SettingsIcon } from '@/components/Icons';

function ShapeSizeCombinationsExample() {
  return (
    <div>
      {/* 圆形按钮的不同尺寸 */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
        <TechButton 
          shape="circular" 
          size="small"
          iconLeft={<DeleteIcon />} 
          iconOnly
          variant="danger"
        >
          删除
        </TechButton>
        <TechButton 
          shape="circular" 
          size="medium"
          iconLeft={<SearchIcon />} 
          iconOnly
          variant="primary"
        >
          搜索
        </TechButton>
        <TechButton 
          shape="circular" 
          size="large"
          iconLeft={<SettingsIcon />} 
          iconOnly
          variant="secondary"
        >
          设置
        </TechButton>
      </div>
      
      {/* 圆角按钮的不同尺寸 */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <TechButton shape="rounded" size="small">
          小圆角
        </TechButton>
        <TechButton shape="rounded" size="medium" variant="primary">
          中圆角
        </TechButton>
        <TechButton shape="rounded" size="large" variant="success">
          大圆角
        </TechButton>
      </div>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="形状与尺寸组合"
      description="不同形状与尺寸的组合效果"
      variant="default"
    >
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          圆形图标按钮的不同尺寸
        </h4>
        <DemoGrid columns={3}>
          <DemoItem label="小尺寸" center>
            <TechButton 
              shape="circular" 
              size="small"
              iconLeft={<DeleteIcon />} 
              iconOnly
              variant="danger"
            >
              删除
            </TechButton>
          </DemoItem>
          <DemoItem label="中等尺寸" center>
            <TechButton 
              shape="circular" 
              size="medium"
              iconLeft={<SearchIcon />} 
              iconOnly
              variant="primary"
            >
              搜索
            </TechButton>
          </DemoItem>
          <DemoItem label="大尺寸" center>
            <TechButton 
              shape="circular" 
              size="large"
              iconLeft={<SettingsIcon />} 
              iconOnly
              variant="secondary"
            >
              设置
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          圆角按钮的不同尺寸
        </h4>
        <DemoGrid columns={3}>
          <DemoItem label="小圆角" center>
            <TechButton shape="rounded" size="small">
              小圆角
            </TechButton>
          </DemoItem>
          <DemoItem label="中圆角" center>
            <TechButton shape="rounded" size="medium" variant="primary">
              中圆角
            </TechButton>
          </DemoItem>
          <DemoItem label="大圆角" center>
            <TechButton shape="rounded" size="large" variant="success">
              大圆角
            </TechButton>
          </DemoItem>
        </DemoGrid>
      </div>
      
      <CodeDisplay
        title="形状与尺寸组合示例"
        code={codeExample}
        language="tsx"
      />
    </DemoPanel>
  );
};

/**
 * 填充模式与发光效果演示
 */
export const FillGlowCombinationsDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';

function FillGlowCombinationsExample() {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '24px', 
      flexWrap: 'wrap',
      padding: '24px',
      backgroundColor: '#1a1a1a' // 深色背景更好地展示发光效果
    }}>
      <TechButton fill="solid" variant="primary" glowing>
        实心发光
      </TechButton>
      <TechButton fill="outline" variant="primary" glowing>
        边框发光
      </TechButton>
      <TechButton fill="ghost" variant="success" glowing>
        幽灵发光
      </TechButton>
      <TechButton fill="solid" variant="danger" glowing>
        危险发光
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="填充模式与发光效果"
      description="不同填充模式搭配发光效果的视觉表现"
      variant="warning"
    >
      <div style={{ 
        display: 'flex', 
        gap: '24px', 
        flexWrap: 'wrap',
        padding: '24px',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        justifyContent: 'center'
      }}>
        <TechButton fill="solid" variant="primary" glowing>
          实心发光
        </TechButton>
        <TechButton fill="outline" variant="primary" glowing>
          边框发光
        </TechButton>
        <TechButton fill="ghost" variant="success" glowing>
          幽灵发光
        </TechButton>
        <TechButton fill="solid" variant="danger" glowing>
          危险发光
        </TechButton>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="填充模式与发光效果示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};