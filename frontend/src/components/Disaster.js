// src/components/Disaster.js
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 51.505,
  lng: -0.09,
};

const disasterTypes = [
  'Earthquake',
  'Flood',
  'Hurricane',
  'Tornado',
  'Wildfire',
  'Volcanic Eruption',
  'Landslide',
  'Drought',
];

const Disaster = () => {
  const [disasterDetails, setDisasterDetails] = useState({
    disasterType: '',
    location: { type: 'Point', coordinates: [defaultCenter.lng, defaultCenter.lat] },
    description: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisasterDetails({ ...disasterDetails, [name]: value });
  };

  // Handle map click to update location
  const handleMapClick = (e) => {
    setDisasterDetails({
      ...disasterDetails,
      location: {
        type: 'Point',
        coordinates: [e.latLng.lng(), e.latLng.lat()],
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/disasters', disasterDetails);
      alert('Disaster report submitted successfully!');
    } catch (error) {
      console.error('Error submitting disaster report:', error);
      alert('Error submitting disaster report');
    }
  };

  return (
    <div className="container">
      <h2>Report a Disaster</h2>
      <form onSubmit={handleSubmit}>
        {/* Disaster Type Dropdown */}
        <div className="mb-3">
          <label htmlFor="disasterType" className="form-label">Disaster Type</label>
          <select
            className="form-control"
            id="disasterType"
            name="disasterType"
            value={disasterDetails.disasterType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a disaster type</option>
            {disasterTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={disasterDetails.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Map */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat: disasterDetails.location.coordinates[1],
                lng: disasterDetails.location.coordinates[0],
              }}
              zoom={10}
              onClick={handleMapClick}
            >
              <Marker
                position={{
                  lat: disasterDetails.location.coordinates[1],
                  lng: disasterDetails.location.coordinates[0],
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit Report</button>
      </form>
    </div>
  );
};

export default Disaster;
