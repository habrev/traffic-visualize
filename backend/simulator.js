// Simulate traffic data around Addis Ababa
// Each point: [lat, lng, intensity] where intensity is 0-1 (congestion level)
function simulateTraffic() {
  const centerLat = 9.0; // Addis Ababa latitude
  const centerLng = 38.75; // Addis Ababa longitude
  const points = [];

  // Generate 50 random points
  for (let i = 0; i < 50; i++) {
    const lat = centerLat + (Math.random() - 0.5) * 0.1; // Small radius
    const lng = centerLng + (Math.random() - 0.5) * 0.1;
    const intensity = Math.random(); // 0 to 1
    points.push([lat, lng, intensity]);
  }

  return { points };
}

module.exports = { simulateTraffic };