import React, { useState, useEffect } from 'react';
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
    address: '', // New state for storing the address
  });

  const [userLocation, setUserLocation] = useState(null);

  // Get the user's current location using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setDisasterDetails((prev) => ({
            ...prev,
            location: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
          }));
          reverseGeocode(latitude, longitude); // Get address on initial load
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Could not fetch your current location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  // Reverse geocoding to get address from latitude and longitude
  const reverseGeocode = async (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);

    try {
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === 'OK' && results[0]) {
            resolve(results[0].formatted_address); // Use formatted address
          } else {
            reject('Geocode was not successful for the following reason: ' + status);
          }
        });
      });
      setDisasterDetails((prev) => ({
        ...prev,
        address: results, // Update the address state
      }));
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      setDisasterDetails((prev) => ({
        ...prev,
        address: 'Address not found', // Default text if geocoding fails
      }));
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisasterDetails({ ...disasterDetails, [name]: value });
  };

  // Handle map click to update location
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setDisasterDetails({
      ...disasterDetails,
      location: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    });
    reverseGeocode(lat, lng); // Get address when map is clicked
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/disasters`, disasterDetails);
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

        {/* Location Display */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location (Lat, Lng)</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={`Lat: ${disasterDetails.location.coordinates[1]}, Lng: ${disasterDetails.location.coordinates[0]}`}
            readOnly
          />
        </div>

        {/* Address Display */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={disasterDetails.address || 'Address not found'} // Default if no address
            readOnly
          />
        </div>

        {/* Map */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Select Location</label>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={userLocation || { lat: disasterDetails.location.coordinates[1], lng: disasterDetails.location.coordinates[0] }}
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
