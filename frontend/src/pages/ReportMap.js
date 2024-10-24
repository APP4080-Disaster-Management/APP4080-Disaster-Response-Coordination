// src/components/ReportMap.js

import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const ReportMap = ({ setLocation, location }) => {
  // Set up map click events
  useMapEvents({
    click: (e) => {
      setLocation(e.latlng); // Set the location on map click
    },
  });

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {location.lat && location.lng && (
        <Marker
          position={location}
          icon={L.icon({
            iconUrl: 'path_to_marker_icon.png', // Update with your marker icon path
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />
      )}
    </MapContainer>
  );
};

export default ReportMap;




