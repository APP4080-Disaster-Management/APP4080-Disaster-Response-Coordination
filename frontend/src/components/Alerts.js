// src/components/Alerts.js
import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const Alerts = () => {
  const [alertDetails, setAlertDetails] = useState({
    alertTitle: '',
    alertMessage: '',
    location: { lat: 51.505, lng: -0.09 }, // Default location
  });

  const handleMapClick = (e) => {
    setAlertDetails({
      ...alertDetails,
      location: { lat: e.latlng.lat, lng: e.latlng.lng },
    });
  };

  const handleChange = (e) => {
    setAlertDetails({ ...alertDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/alerts', alertDetails);
      alert('Alert sent successfully!');
    } catch (error) {
      alert('Error sending alert');
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div className="container">
      <h2>Send an Alert</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="alertTitle" className="form-label">Alert Title</label>
          <input
            type="text"
            className="form-control"
            id="alertTitle"
            name="alertTitle"
            value={alertDetails.alertTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="alertMessage" className="form-label">Alert Message</label>
          <textarea
            className="form-control"
            id="alertMessage"
            name="alertMessage"
            value={alertDetails.alertMessage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Alert Location</label>
          <MapContainer
            center={[alertDetails.location.lat, alertDetails.location.lng]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[alertDetails.location.lat, alertDetails.location.lng]} />
            <MapClickHandler />
          </MapContainer>
        </div>
        <button type="submit" className="btn btn-primary">Send Alert</button>
      </form>
    </div>
  );
};

export default Alerts;
