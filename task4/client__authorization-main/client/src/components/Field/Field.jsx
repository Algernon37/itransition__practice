import React from 'react';
import Form from 'react-bootstrap/Form';
import { memo } from 'react';

const MyField = memo(({ register, name, error = false, helperText = "", ...rest }) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Control {...register(name)} {...rest} isInvalid={error} />
      {error && <Form.Control.Feedback type="invalid">{helperText}</Form.Control.Feedback>}
    </Form.Group>
  );
});

export default MyField;
