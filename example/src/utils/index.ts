/**
 * 示例项目的工具函数集合
 * 提供通用的工具方法，支持代码格式化、主题切换等功能
 */

/**
 * 格式化代码字符串，移除多余的缩进
 * @param code 原始代码字符串
 * @returns 格式化后的代码字符串
 */
export const formatCode = (code: string): string => {
  const lines = code.split('\n');
  
  // 移除开头和结尾的空行
  let startIndex = 0;
  let endIndex = lines.length;
  
  // 找到第一个非空行
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim()) {
      startIndex = i;
      break;
    }
  }
  
  // 找到最后一个非空行
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim()) {
      endIndex = i + 1;
      break;
    }
  }
  
  const trimmedLines = lines.slice(startIndex, endIndex);
  
  // 如果没有非空行，返回空字符串
  if (trimmedLines.length === 0 || trimmedLines.every(line => !line.trim())) {
    return '';
  }
  
  // 计算最小缩进
  const minIndent = Math.min(
    ...trimmedLines
      .filter(line => line.trim())
      .map(line => line.match(/^\s*/)?.[0].length || 0)
  );
  
  // 移除最小缩进
  return trimmedLines
    .map(line => line.slice(minIndent))
    .join('\n');
};

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise，表示复制操作是否成功
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案：使用传统的 execCommand
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';
      document.body.prepend(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        return true;
      } finally {
        textArea.remove();
      }
    }
  } catch {
    return false;
  }
};

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * 节流函数
 * @param func 要节流的函数
 * @param delay 节流间隔（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let isThrottled = false;
  
  return (...args: Parameters<T>) => {
    if (isThrottled) return;
    
    func(...args);
    isThrottled = true;
    setTimeout(() => { isThrottled = false; }, delay);
  };
};

/**
 * 生成随机ID
 * @param prefix ID前缀
 * @returns 随机ID字符串
 */
export const generateId = (prefix = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 检测设备类型
 * @returns 设备类型信息
 */
export const detectDevice = (): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
} => {
  const userAgent = navigator.userAgent.toLowerCase();
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  
  return {
    isMobile: isMobile && !isTablet,
    isTablet,
    isDesktop,
    hasTouch,
  };
};

/**
 * 获取对比色（黑色或白色）
 * @param hexColor 十六进制颜色值
 * @returns 对比色（#000000 或 #ffffff）
 */
export const getContrastColor = (hexColor: string): string => {
  // 移除 # 符号
  const hex = hexColor.replace('#', '');
  
  // 将十六进制转换为 RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // 计算亮度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // 返回对比色
  return brightness > 128 ? '#000000' : '#ffffff';
};

/**
 * 深度克隆对象
 * @param obj 要克隆的对象
 * @returns 克隆后的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    Object.keys(obj).forEach(key => {
      clonedObj[key as keyof T] = deepClone(obj[key as keyof T]);
    });
    return clonedObj;
  }
  
  return obj;
};

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};