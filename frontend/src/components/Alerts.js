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

const Alerts = () => {
  const [alertDetails, setAlertDetails] = useState({
    alertTitle: '',
    alertMessage: '',
    location: { type: 'Point', coordinates: [defaultCenter.lng, defaultCenter.lat] },
    address: '', // New field to store the address
  });

  const [geocoder, setGeocoder] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Initialize the geocoder
  useEffect(() => {
    if (window.google && window.google.maps) {
      const geocoderInstance = new window.google.maps.Geocoder();
      setGeocoder(geocoderInstance);
    }
  }, []);

  // Get the user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAlertDetails((prevDetails) => ({
            ...prevDetails,
            location: {
              type: 'Point',
              coordinates: [position.coords.longitude, position.coords.latitude],
            },
          }));
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    }
  }, []);

  // Handle map click to update location and fetch address
  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setAlertDetails({
      ...alertDetails,
      location: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    });

    // Reverse geocode the clicked location to get the address
    if (geocoder) {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          setAlertDetails((prevDetails) => ({
            ...prevDetails,
            address: results[0].formatted_address, // Set the address to the state
          }));
        } else {
          console.error('Geocoder failed to retrieve the address');
        }
      });
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setAlertDetails({ ...alertDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/alerts`, alertDetails);
      alert('Alert sent successfully!');
    } catch (error) {
      console.error('Error sending alert:', error);
      alert('Error sending alert');
    }
  };

  // Handle login/logout
  const handleLogin = () => {
    setIsLoggedIn(true);
    // You can add additional login logic here
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // You can add additional logout logic here (e.g., clearing user data)
  };

  return (
    <div className="container">
      <h2>Send an Alert</h2>

      {/* Show the Login/Logout button based on the isLoggedIn state */}
      {!isLoggedIn ? (
        <button onClick={handleLogin} className="btn btn-success">
          Login
        </button>
      ) : (
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      )}

      {/* Show the alert form only if logged in */}
      {isLoggedIn && (
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
            <input
              type="text"
              className="form-control"
              id="location"
              name="address"
              value={alertDetails.address} // Display the actual address here
              onChange={handleChange}
              readOnly // Make this field read-only to avoid manual editing
            />
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              onError={(error) => console.error('Google Maps API failed to load:', error)}
              onLoad={() => console.log('Google Maps API loaded successfully')}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                  lat: alertDetails.location.coordinates[1],
                  lng: alertDetails.location.coordinates[0],
                }}
                zoom={13}
                onClick={handleMapClick}
              >
                <Marker
                  position={{
                    lat: alertDetails.location.coordinates[1],
                    lng: alertDetails.location.coordinates[0],
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </div>
          <button type="submit" className="btn btn-primary">Send Alert</button>
        </form>
      )}
    </div>
  );
};

export default Alerts;
