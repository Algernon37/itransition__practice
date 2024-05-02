import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import style from "./RegionDropdown.module.scss";

function RegionDropdown({ countries, setRegion }) {
  const [selectedCountry, setSelectedCountry] = useState("Выберите страну");

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setRegion(country);
  };

  return (
    <Dropdown >
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selectedCountry}
      </Dropdown.Toggle>
      
      <Dropdown.Menu >
        {countries.map((country) => (
          <Dropdown.Item key={country} onClick={() => handleSelect(country)}>
            {country}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default RegionDropdown;
