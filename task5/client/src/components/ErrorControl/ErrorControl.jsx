import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import style from "./ErrorControl.module.scss";

function ErrorControl({setErrors}) {
  const [errorRate, setErrorRate] = useState(0);

  const handleSliderChange = (e) => {
    const newErrorRate = parseFloat(e.target.value);
    setErrorRate(parseFloat(newErrorRate));
    setErrors(newErrorRate);
  };

  const handleInputChange = (e) => {
    const newErrorRate = Math.max(0, Math.min(1000, parseFloat(e.target.value)));
    setErrorRate(newErrorRate);
    setErrors(newErrorRate);  
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Количество ошибок: {errorRate}</Form.Label>
        <Form.Control className={style.form__control}
          type="range"
          min="0"
          max="10"
          step="0.25"
          value={errorRate}
          onChange={handleSliderChange}
        />
        <Form.Control
          type="number"
          min="0"
          max="1000"
          step="0.1"
          value={errorRate}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
}

export default ErrorControl;
