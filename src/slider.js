import React, { useState } from 'react';
import './slider.css';

function Slider() {
  const [speed, setSpeed] = useState(0);
  const [batteryLife, setBatteryLife] = useState(100); 

  const handleSpeedChange = (event) => {
    const newSpeed = event.target.value;
    setSpeed(newSpeed);

    const newBatteryLife = 100 - newSpeed / 2; 
    setBatteryLife(newBatteryLife);

    const socket = new WebSocket('wss://localhost:8080');
    console.log("Connection established!"); 
    socket.onopen = () => {
    
      socket.send(JSON.stringify({ speed: newSpeed, batteryLife: newBatteryLife }));
    };
  };

  return (
    <div className="slider-container">
      <h2>ACCELERATION</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={speed}
        onChange={handleSpeedChange}
        className="slider"
      />
      <p>Current Speed: {speed}</p>
      <p>Battery Life: {batteryLife}%</p>
    </div>
  );
}

export default Slider;
