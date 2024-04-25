import React from 'react';
import Button from 'react-bootstrap/Button';
import { memo } from 'react';

const MyButton = memo(({ children, ...rest }) => (
  <Button {...rest} variant="primary">
    {children}
  </Button>
));

export default MyButton;
