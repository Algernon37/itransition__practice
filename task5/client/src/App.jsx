import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./app.module.scss";
import RegionDropdown from './components/RegionDropdown/RegionDropdown';
import ErrorControl from './components/ErrorControl/ErrorControl';
import Seed from './components/Seed/Seed';
import DataTable from './components/DataTable/DataTable';

function App() {
  const countries = ["USA", "Germany", "Russia"];
  const [region, setRegion] = useState('USA');
  const [seed, setSeed] = useState('12345');
  const [errors, setErrors] = useState(0);
  return (
    <div className={style.wrapper}>
      <h1>Генератор пользовательских данных</h1>
      <RegionDropdown countries={countries} setRegion={setRegion} />
      <ErrorControl setErrors={setErrors} />
      <Seed setSeed={setSeed} />
      <DataTable seed={seed} region={region} errors={errors} />
    </div>
  );
}

export default App;
