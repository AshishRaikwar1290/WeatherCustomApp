import React, { useState } from 'react';
import styles from "../styles/tempConverter.module.scss"

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (e) => {
    const value = e?.target?.value;
    setCelsius(value);
    setFahrenheit(value ? ((value * 9) / 5 + 32).toFixed(2) : '');
  };

  const handleFahrenheitChange = (e) => {
    const value = e?.target?.value;
    setFahrenheit(value);
    setCelsius(value ? (((value - 32) * 5) / 9).toFixed(2) : '');
  };

  return (
    <div className={styles.converter_container}>
      <h3>Temperature Converter</h3>
      <div className={styles.input_container}>
      <div className="converter_inputs">
          <div>
          <label>
          Celsius:
          </label>
          </div>
          <input
            type="number"
            value={celsius}
            onChange={handleCelsiusChange}
            placeholder="Enter"
          />
      </div>
      <div className="converter_inputs">
          <div>
          <label>
           Fahrenheit:
          </label>
          </div>
          <input
            type="number"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            placeholder="Enter"
          />
      </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
