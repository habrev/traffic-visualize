const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const { simulateTraffic } = require('./simulator');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3001;

// Broadcast function
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Start simulation and broadcast every 5 seconds
setInterval(() => {
  const trafficData = simulateTraffic();
  broadcast(trafficData);
}, 5000);

// WebSocket connection handler
wss.on('connection', ws => {
  console.log('Client connected');
  // Send initial data on connection
  ws.send(JSON.stringify(simulateTraffic()));

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});