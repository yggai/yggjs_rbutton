import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import { TweetButton } from './'; // Updated import path

test('renders with default props', () => {
  render(<TweetButton />);
  // screen.getByRole finds an element by its accessibility role
  const linkElement = screen.getByRole('link', { name: 'Tweet' });
  // expect is used to assert that a value matches an expectation
  expect(linkElement).not.toBeNull();
  expect(linkElement.getAttribute('href')).toBe('https://twitter.com/intent/tweet');
});

test('renders with custom children and href', () => {
  const testUrl = 'https://example.com';
  const testText = 'Click me';
  render(<TweetButton href={testUrl}>{testText}</TweetButton>);

  const linkElement = screen.getByRole('link', { name: testText });
  expect(linkElement).not.toBeNull();
  expect(linkElement.getAttribute('href')).toBe(testUrl);
});
