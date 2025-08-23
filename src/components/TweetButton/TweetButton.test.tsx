import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import { TweetButton } from "./";

test("使用默认 props 渲染", () => {
  render(<TweetButton />);
  // screen.getByRole 通过可访问性角色查找元素
  const linkElement = screen.getByRole("link", { name: "Tweet" });
  // expect 用于断言一个值是否符合预期
  expect(linkElement).not.toBeNull();
  expect(linkElement.getAttribute("href")).toBe(
    "https://twitter.com/intent/tweet"
  );
});

test("使用自定义 children 和 href 渲染", () => {
  const testUrl = "https://example.com";
  const testText = "Click me";
  render(<TweetButton href={testUrl}>{testText}</TweetButton>);

  const linkElement = screen.getByRole("link", { name: testText });
  expect(linkElement).not.toBeNull();
  expect(linkElement.getAttribute("href")).toBe(testUrl);
});
