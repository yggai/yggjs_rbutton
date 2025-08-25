/**
 * 简单的SVG图标组件集合
 * 为演示项目提供所需的图标，采用CSS-in-JS样式系统
 */
import React from 'react';
import type { IconProps } from '@/types';

/**
 * 基础图标组件，其他图标基于此扩展
 */
const BaseIcon: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  color = 'currentColor',
  className,
  style,
  children,
  ...rest
}) => {
  const iconStyles: React.CSSProperties = {
    width: size,
    height: size,
    fill: color,
    flexShrink: 0,
    display: 'inline-block',
    ...style,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={iconStyles}
      {...rest}
    >
      {children}
    </svg>
  );
};

/**
 * 搜索图标
 */
export const SearchIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 下载图标
 */
export const DownloadIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 上传图标
 */
export const UploadIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 删除图标
 */
export const DeleteIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 编辑图标
 */
export const EditIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 保存图标
 */
export const SaveIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="17,21 17,13 7,13 7,21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="7,3 7,8 15,8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 设置图标
 */
export const SettingsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </BaseIcon>
);

/**
 * 复制图标
 */
export const CopyIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect
      x="9"
      y="9"
      width="13"
      height="13"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </BaseIcon>
);

/**
 * 成功/检查图标
 */
export const CheckIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline
      points="20,6 9,17 4,12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 关闭图标
 */
export const CloseIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line
      x1="18"
      y1="6"
      x2="6"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </BaseIcon>
);

/**
 * 箭头图标
 */
export const ArrowIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polyline
      points="12,5 19,12 12,19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 加载/旋转图标
 */
export const LoadingIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M21 12a9 9 0 11-6.219-8.56"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </BaseIcon>
);

/**
 * 心形图标
 */
export const HeartIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);

/**
 * 主题切换图标（太阳）
 */
export const SunIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
  </BaseIcon>
);

/**
 * 主题切换图标（月亮）
 */
export const MoonIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);