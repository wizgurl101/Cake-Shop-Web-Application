import React from 'react';
import { Alert } from 'react-bootstrap';

// TODO remove ts-ignore and refactor

// @ts-ignore
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
