import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export function TweetButton({ href, children, ...rest }) {
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
}

TweetButton.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

TweetButton.defaultProps = {
  href: 'https://twitter.com/intent/tweet',
  children: 'Tweet',
};
