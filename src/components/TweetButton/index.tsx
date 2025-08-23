import { FC, ReactNode, AnchorHTMLAttributes } from 'react';
import './index.css';

// 使用 TypeScript interface 定义组件的 props
interface TweetButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * 在按钮内部显示的内容
   */
  children?: ReactNode;
}

// Use the FC (Function Component) type and the props interface
export const TweetButton: FC<TweetButtonProps> = ({ 
  children = 'Tweet', 
  href = 'https://twitter.com/intent/tweet',
  ...rest 
}) => {
  return (
    <a
      className="tweet-button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
};
