import React from "react";
import "./index.css"

// 导出了一个React的组件，名字叫做 TweetButton
// 这里使用的是具名导出而非匿名导出
export function TweetButton() {
  // 点击按钮，会打开这个网址
  const tweetURL = "https://baidu.com";

  // JSX语法
  // 是要渲染的具体内容
  return (
    <div className="tweet-btn-container">
      <a 
        className="tweet-button"
        href={tweetURL} 
        target="_blank" 
        rel="noopener noreferrer">
        按钮
      </a>
    </div>
  );
}
