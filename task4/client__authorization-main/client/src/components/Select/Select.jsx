import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { memo } from 'react';

const MyList = memo(({ options = [], ...rest }) => (
  <ListGroup {...rest}>
    {options.map(({ id, title }) => (
      <ListGroup.Item key={id}>
        {title}
      </ListGroup.Item>
    ))}
  </ListGroup>
));

export default MyList;
