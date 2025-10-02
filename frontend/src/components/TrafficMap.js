import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

const TrafficMap = () => {
  const mapRef = useRef();
  const heatLayerRef = useRef();
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPoints(data.points);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    if (mapRef.current && !heatLayerRef.current) {
      heatLayerRef.current = L.heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
      }).addTo(mapRef.current);
    } else if (heatLayerRef.current) {
      heatLayerRef.current.setLatLngs(points);
    }
  }, [points]);

  return (
    <MapContainer
      center={[9.0, 38.75]} // Addis Ababa
      zoom={12}
      style={{ height: '600px', width: '100%' }}
      whenCreated={map => { mapRef.current = map; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default TrafficMap;