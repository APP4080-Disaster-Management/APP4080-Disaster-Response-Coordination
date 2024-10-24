import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

// Default location (can be overridden by Geolocation)
const defaultCenter = {
  lat: 51.505,
  lng: -0.09,
};

const Alerts = () => {
  const [alertDetails, setAlertDetails] = useState({
    alertTitle: '',
    alertMessage: '',
    location: { type: 'Point', coordinates: [defaultCenter.lng, defaultCenter.lat] }, // GeoJSON format
  });

  // Get the user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAlertDetails((prevDetails) => ({
            ...prevDetails,
            location: {
              type: 'Point',
              coordinates: [position.coords.longitude, position.coords.latitude], // [lng, lat]
            },
          }));
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    }
  }, []);

  // Handle map click to update location
  const handleMapClick = (e) => {
    setAlertDetails({
      ...alertDetails,
      location: {
        type: 'Point',
        coordinates: [e.latLng.lng(), e.latLng.lat()], // [lng, lat] format
      },
    });
  };

  // Handle input changes for alert title and message
  const handleChange = (e) => {
    setAlertDetails({ ...alertDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/alerts', alertDetails);
      alert('Alert sent successfully!');
    } catch (error) {
      console.error('Error sending alert:', error);
      alert('Error sending alert');
    }
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
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat: alertDetails.location.coordinates[1], // latitude
                lng: alertDetails.location.coordinates[0], // longitude
              }}
              zoom={13}
              onClick={handleMapClick} // Update location on map click
            >
              <Marker
                position={{
                  lat: alertDetails.location.coordinates[1], // latitude
                  lng: alertDetails.location.coordinates[0], // longitude
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
        <button type="submit" className="btn btn-primary">Send Alert</button>
      </form>
    </div>
  );
};

export default Alerts;
