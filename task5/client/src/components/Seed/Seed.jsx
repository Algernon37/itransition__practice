import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import style from "./Seed.module.scss";

function Seed({ setSeed }) {
  const [seed, setLocalSeed] = useState('');

  const handleRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 10000).toString();
    setLocalSeed(newSeed);
    setSeed(newSeed);  
  };

  const handleChange = (e) => {
    setLocalSeed(e.target.value);
    setSeed(e.target.value);  
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label className={style.form__label}>Seed</Form.Label>
        <Form.Control
          className={style.form__control}
          type="text"
          value={seed}
          onChange={handleChange}
        />
        <Button className={style.form__button} onClick={handleRandomSeed}>Random</Button>
      </Form.Group>
    </Form>
  );
}


export default Seed;
