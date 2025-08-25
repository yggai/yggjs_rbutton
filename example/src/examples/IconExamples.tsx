/**
 * 图标支持系统演示组件
 * 展示 TechButton 的完整图标功能，包括左图标、右图标、纯图标按钮等
 */
import React from 'react';
import { TechButton } from 'yggjs_rbutton';
import { DemoPanel, DemoGrid, DemoItem } from '@/components/DemoPanel';
import { CodeDisplay } from '@/components/CodeDisplay';
import { 
  SearchIcon, 
  DownloadIcon, 
  UploadIcon, 
  DeleteIcon, 
  EditIcon, 
  SaveIcon,
  SettingsIcon,
  HeartIcon,
  ArrowIcon
} from '@/components/Icons';

/**
 * 左侧图标演示
 */
export const LeftIconDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { SearchIcon, DownloadIcon, EditIcon } from '@/components/Icons';

function LeftIconExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <TechButton iconLeft={<SearchIcon />}>
        搜索
      </TechButton>
      <TechButton iconLeft={<DownloadIcon />} variant="success">
        下载
      </TechButton>
      <TechButton iconLeft={<EditIcon />} variant="secondary">
        编辑
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="左侧图标"
      description="在按钮文本左侧添加图标，增强视觉识别度"
      variant="primary"
    >
      <DemoGrid columns={3}>
        <DemoItem label="搜索按钮" center>
          <TechButton iconLeft={<SearchIcon />}>
            搜索
          </TechButton>
        </DemoItem>
        <DemoItem label="下载按钮" center>
          <TechButton iconLeft={<DownloadIcon />} variant="success">
            下载
          </TechButton>
        </DemoItem>
        <DemoItem label="编辑按钮" center>
          <TechButton iconLeft={<EditIcon />} variant="secondary">
            编辑
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="左侧图标示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 右侧图标演示
 */
export const RightIconDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { ArrowIcon, UploadIcon, SaveIcon } from '@/components/Icons';

function RightIconExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <TechButton iconRight={<ArrowIcon />}>
        继续
      </TechButton>
      <TechButton iconRight={<UploadIcon />} variant="primary">
        上传文件
      </TechButton>
      <TechButton iconRight={<SaveIcon />} variant="success">
        保存
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="右侧图标"
      description="在按钮文本右侧添加图标，通常用于表示动作方向"
      variant="default"
    >
      <DemoGrid columns={3}>
        <DemoItem label="继续按钮" center>
          <TechButton iconRight={<ArrowIcon />}>
            继续
          </TechButton>
        </DemoItem>
        <DemoItem label="上传按钮" center>
          <TechButton iconRight={<UploadIcon />} variant="primary">
            上传文件
          </TechButton>
        </DemoItem>
        <DemoItem label="保存按钮" center>
          <TechButton iconRight={<SaveIcon />} variant="success">
            保存
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="右侧图标示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 双图标演示
 */
export const DualIconDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { SearchIcon, ArrowIcon, EditIcon, SaveIcon } from '@/components/Icons';

function DualIconExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <TechButton 
        iconLeft={<SearchIcon />}
        iconRight={<ArrowIcon />}
      >
        搜索并继续
      </TechButton>
      <TechButton 
        iconLeft={<EditIcon />}
        iconRight={<SaveIcon />}
        variant="primary"
      >
        编辑并保存
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="双图标按钮"
      description="同时使用左右图标，适用于复合操作场景"
      variant="default"
    >
      <DemoGrid columns={2}>
        <DemoItem label="搜索并继续" center>
          <TechButton 
            iconLeft={<SearchIcon />}
            iconRight={<ArrowIcon />}
          >
            搜索并继续
          </TechButton>
        </DemoItem>
        <DemoItem label="编辑并保存" center>
          <TechButton 
            iconLeft={<EditIcon />}
            iconRight={<SaveIcon />}
            variant="primary"
          >
            编辑并保存
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="双图标按钮示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 纯图标按钮演示
 */
export const IconOnlyDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { 
  DeleteIcon, 
  EditIcon, 
  SettingsIcon, 
  HeartIcon 
} from '@/components/Icons';

function IconOnlyExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <TechButton iconLeft={<DeleteIcon />} iconOnly variant="danger">
        删除
      </TechButton>
      <TechButton iconLeft={<EditIcon />} iconOnly variant="secondary">
        编辑
      </TechButton>
      <TechButton iconLeft={<SettingsIcon />} iconOnly>
        设置
      </TechButton>
      <TechButton iconLeft={<HeartIcon />} iconOnly variant="danger" shape="circular">
        收藏
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="纯图标按钮"
      description="只显示图标的按钮，节省空间且具有良好的可访问性"
      variant="default"
    >
      <DemoGrid columns={4}>
        <DemoItem label="删除" center>
          <TechButton iconLeft={<DeleteIcon />} iconOnly variant="danger">
            删除
          </TechButton>
        </DemoItem>
        <DemoItem label="编辑" center>
          <TechButton iconLeft={<EditIcon />} iconOnly variant="secondary">
            编辑
          </TechButton>
        </DemoItem>
        <DemoItem label="设置" center>
          <TechButton iconLeft={<SettingsIcon />} iconOnly>
            设置
          </TechButton>
        </DemoItem>
        <DemoItem label="收藏 (圆形)" center>
          <TechButton iconLeft={<HeartIcon />} iconOnly variant="danger" shape="circular">
            收藏
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="纯图标按钮示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 图标尺寸演示
 */
export const IconSizesDemo: React.FC = () => {
  const codeExample = `
import { TechButton } from 'yggjs_rbutton';
import { SearchIcon } from '@/components/Icons';

function IconSizesExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <TechButton 
        iconLeft={<SearchIcon />} 
        iconSize="sm"
        size="small"
      >
        小图标
      </TechButton>
      <TechButton 
        iconLeft={<SearchIcon />} 
        iconSize="md"
        size="medium"
      >
        中图标
      </TechButton>
      <TechButton 
        iconLeft={<SearchIcon />} 
        iconSize="lg"
        size="large"
      >
        大图标
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="图标尺寸"
      description="图标会根据按钮尺寸自动适配，也可以手动指定尺寸"
      variant="default"
    >
      <DemoGrid columns={3}>
        <DemoItem label="小图标 (sm)" center>
          <TechButton 
            iconLeft={<SearchIcon />} 
            iconSize="sm"
            size="small"
          >
            小图标
          </TechButton>
        </DemoItem>
        <DemoItem label="中图标 (md)" center>
          <TechButton 
            iconLeft={<SearchIcon />} 
            iconSize="md"
            size="medium"
          >
            中图标
          </TechButton>
        </DemoItem>
        <DemoItem label="大图标 (lg)" center>
          <TechButton 
            iconLeft={<SearchIcon />} 
            iconSize="lg"
            size="large"
          >
            大图标
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="图标尺寸示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};

/**
 * 加载状态下的图标处理
 */
export const LoadingIconDemo: React.FC = () => {
  const codeExample = `
import React, { useState } from 'react';
import { TechButton } from 'yggjs_rbutton';
import { DownloadIcon, SaveIcon } from '@/components/Icons';

function LoadingIconExample() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleDownload = async () => {
    setLoading1(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading1(false);
  };

  const handleSave = async () => {
    setLoading2(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading2(false);
  };

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <TechButton 
        iconLeft={<DownloadIcon />}
        loading={loading1}
        onClick={handleDownload}
      >
        {loading1 ? '下载中...' : '下载文件'}
      </TechButton>
      <TechButton 
        iconLeft={<SaveIcon />}
        loading={loading2}
        onClick={handleSave}
        variant="success"
      >
        {loading2 ? '保存中...' : '保存'}
      </TechButton>
    </div>
  );
}`;

  return (
    <DemoPanel
      title="加载状态下的图标"
      description="加载状态下，图标会被替换为加载动画"
      variant="warning"
    >
      <DemoGrid columns={2}>
        <DemoItem label="下载示例" center>
          <TechButton 
            iconLeft={<DownloadIcon />}
            loading
          >
            下载中...
          </TechButton>
        </DemoItem>
        <DemoItem label="保存示例" center>
          <TechButton 
            iconLeft={<SaveIcon />}
            loading
            variant="success"
          >
            保存中...
          </TechButton>
        </DemoItem>
      </DemoGrid>
      
      <div style={{ marginTop: '24px' }}>
        <CodeDisplay
          title="加载状态图标示例"
          code={codeExample}
          language="tsx"
        />
      </div>
    </DemoPanel>
  );
};