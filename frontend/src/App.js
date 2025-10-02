import React from 'react';
import './App.css';
import TrafficMap from './components/TrafficMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Traffic Visualization</h1>
      </header>
      <TrafficMap />
    </div>
  );
}

export default App;