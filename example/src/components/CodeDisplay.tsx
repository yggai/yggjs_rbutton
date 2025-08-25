/**
 * 代码展示组件
 * 用于展示示例代码，支持语法高亮、复制等功能
 */
import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './Icons';
import { copyToClipboard, formatCode } from '@/utils';
import type { CodeExampleConfig } from '@/types';

interface CodeDisplayProps extends CodeExampleConfig {
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/**
 * 代码展示组件
 * 提供代码语法高亮、复制功能和行号显示
 */
export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  language = 'tsx',
  showLineNumbers = true,
  highlightLines = [],
  title,
  style,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  // 处理复制代码
  const handleCopy = useCallback(async (): Promise<void> => {
    const success = await copyToClipboard(formatCode(code));
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  // 格式化代码并按行分割
  const formattedCode = formatCode(code);
  const lines = formattedCode.split('\n');

  // 组件样式
  const containerStyles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    overflow: 'hidden',
    fontFamily: '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    border: '1px solid #333',
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#2a2a2a',
    borderBottom: '1px solid #333',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '500',
  };

  const codeContainerStyles: React.CSSProperties = {
    padding: '16px 0',
    overflow: 'auto',
    maxHeight: '400px',
  };

  const lineStyles: React.CSSProperties = {
    display: 'flex',
    minHeight: '21px',
    color: '#e1e1e1',
  };

  const lineNumberStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: '40px',
    padding: '0 16px 0 16px',
    color: '#666',
    backgroundColor: '#252525',
    borderRight: '1px solid #333',
    userSelect: 'none',
    fontSize: '12px',
  };

  const lineContentStyles: React.CSSProperties = {
    flex: 1,
    padding: '0 16px',
    whiteSpace: 'pre',
    overflow: 'visible',
  };

  const copyButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: copied ? '#10b981' : 'transparent',
    color: copied ? '#fff' : '#9ca3af',
    border: '1px solid',
    borderColor: copied ? '#10b981' : '#4b5563',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  // 获取语言标签显示
  const getLanguageLabel = (lang: string): string => {
    const labels: Record<string, string> = {
      tsx: 'TypeScript React',
      typescript: 'TypeScript',
      javascript: 'JavaScript',
      css: 'CSS',
      json: 'JSON',
    };
    return labels[lang] || lang.toUpperCase();
  };

  // 简单的语法高亮（基础版本）
  const highlightSyntax = (line: string, lineIndex: number): React.ReactNode => {
    // 这里实现一个简化的语法高亮
    // 在实际项目中，建议使用专业的语法高亮库如 Prism.js 或 highlight.js
    
    // 匹配不同的语法元素
    const patterns = [
      { regex: /(\/\/.*$)/g, className: 'comment', color: '#6a9955' },
      { regex: /(\/\*[\s\S]*?\*\/)/g, className: 'comment', color: '#6a9955' },
      { regex: /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/g, className: 'string', color: '#ce9178' },
      { regex: /\b(import|export|from|as|default|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements)\b/g, className: 'keyword', color: '#569cd6' },
      { regex: /\b(React|useState|useCallback|useMemo|useEffect)\b/g, className: 'react', color: '#4fc1ff' },
      { regex: /\b(\d+)\b/g, className: 'number', color: '#b5cea8' },
    ];

    let result: (string | React.ReactElement)[] = [line];

    patterns.forEach(({ regex, color }, patternIndex) => {
      const newResult: (string | React.ReactElement)[] = [];
      
      result.forEach((part, partIndex) => {
        if (typeof part === 'string') {
          const parts = part.split(regex);
          parts.forEach((subPart, subIndex) => {
            if (subIndex % 2 === 1) {
              // 这是匹配的部分
              newResult.push(
                <span key={`line-${lineIndex}-pattern-${patternIndex}-part-${partIndex}-sub-${subIndex}`} style={{ color }}>
                  {subPart}
                </span>
              );
            } else if (subPart) {
              newResult.push(subPart);
            }
          });
        } else {
          newResult.push(part);
        }
      });
      
      result = newResult;
    });

    return result;
  };

  return (
    <div style={containerStyles} className={className}>
      {title && (
        <div style={headerStyles}>
          <span>{title} - {getLanguageLabel(language)}</span>
          <button
            onClick={handleCopy}
            style={copyButtonStyles}
            onMouseEnter={(e) => {
              if (!copied) {
                (e.target as HTMLElement).style.backgroundColor = '#374151';
                (e.target as HTMLElement).style.borderColor = '#6b7280';
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.borderColor = '#4b5563';
              }
            }}
          >
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            {copied ? '已复制' : '复制代码'}
          </button>
        </div>
      )}
      
      <div style={codeContainerStyles}>
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isHighlighted = highlightLines.includes(lineNumber);
          
          const currentLineStyles: React.CSSProperties = {
            ...lineStyles,
            backgroundColor: isHighlighted ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          };

          return (
            <div key={index} style={currentLineStyles}>
              {showLineNumbers && (
                <div style={lineNumberStyles}>
                  {lineNumber}
                </div>
              )}
              <div style={lineContentStyles}>
                {highlightSyntax(line, index)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CodeDisplay;