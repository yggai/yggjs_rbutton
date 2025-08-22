import React from "react";
import { render } from "@testing-library/react";
import { test } from "@jest/globals";
import { TweetButton } from "./TweetButton";

// 一个单元测试
// 单元测试的名字：tweet button renders correctly
// 单元测试的具体内容：() => {}  是一个匿名函数
test("tweet button renders correctly", () => {
  // 渲染 TweetButton 这个组件
  // 也就是说这个单元测试的作用是确定这个组件能否正常渲染
  render(<TweetButton />);
});
