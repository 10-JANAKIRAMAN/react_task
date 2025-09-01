// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const weatherCodeMap = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Fog',
  51: 'Drizzle (light)', 53: 'Drizzle (moderate)', 55: 'Drizzle (dense)',
  61: 'Rain (light)', 63: 'Rain (moderate)', 65: 'Rain (heavy)',
  80: 'Rain showers (light)', 81: 'Rain showers (moderate)', 82: 'Rain showers (violent)',
  95: 'Thunderstorm (mild)', 96: 'Thunderstorm w/ hail', 99: 'Thunderstorm w/ heavy hail'
};
// test
function App() {
  const [code, setCode] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current_weather=true&timezone=Asia/Kolkata')
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error('API error');
        setCode(data.current_weather.weathercode);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleManual = () => {
    const num = parseInt(manualInput, 10);
    if (!isNaN(num) && weatherCodeMap[num] !== undefined) {
      setCode(num);
    } else alert('Invalid weather code.');
  };

  const handleTime = () => {
    const hour = parseInt(manualInput, 10);
    if (!isNaN(hour) && hour >= 0 && hour <= 23) {
      setCode(hour >= 6 && hour <= 18 ? 0 : 3);
    } else alert('Enter hour 0–23.');
  };

  if (loading) return <div className="app-wrapper default"><div className="weather-content"><p>Loading...</p></div></div>;
  if (error) return <div className="app-wrapper default"><div className="weather-content"><p>{error}</p></div></div>;

  const weatherType = code === 0 ? 'sunny'
    : code <= 3 ? 'cloudy'
    : code <= 82 ? 'rainy'
    : code <= 99 ? 'stormy'
    : 'default';

  const description = weatherCodeMap[code] || 'Unknown';

  return (
    <div className={`app-wrapper bg-${weatherType}`}>
      <div className="weather-content">
        <h1>Chennai Weather</h1>
        <div className="weather-info">
          <div className="icon">{weatherType === 'sunny' ? '☀️' : weatherType === 'cloudy' ? '☁️' : weatherType === 'rainy' ? '🌧️' : weatherType === 'stormy' ? '⛈️' : '❓'}</div>
          <div className="details">
            <h2>{description}</h2>
            <p>Code: {code}</p>
          </div>
        </div>
        <div className="controls">
          <input
            type="text"
            placeholder="Enter code or hour"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
          />
          <button onClick={handleManual}>By Code</button>
          <button onClick={handleTime}>By Hour</button>
        </div>
      </div>
    </div>
  );
}

export default App;
