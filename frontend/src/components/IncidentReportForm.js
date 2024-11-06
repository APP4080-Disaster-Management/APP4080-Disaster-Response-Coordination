import React, { useState } from 'react';
import axios from 'axios';

const IncidentReportForm = () => {
  const [incidentDetails, setIncidentDetails] = useState({
    title: '',
    description: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // List of locations in Nairobi
  const locations = [
    { value: '', label: 'Select a location' },
    { value: 'central_business_district', label: 'Central Business District' },
    { value: 'westlands', label: 'Westlands' },
    { value: 'nairobi_river', label: 'Nairobi River' },
    { value: 'uhuru_park', label: 'Uhuru Park' },
    { value: 'karura_forest', label: 'Karura Forest' },
    { value: 'langata', label: 'Langata' },
    { value: 'embakasi', label: 'Embakasi' },
    { value: 'kibera', label: 'Kibera' },
    { value: 'mombasa_road', label: 'Mombasa Road' },
    { value: 'parklands', label: 'Parklands' },
    { value: 'karen', label: 'Karen' },
    { value: 'lavington', label: 'Lavington' },
    { value: 'donholm', label: 'Donholm' },
    { value: 'ruai', label: 'Ruai' },
    { value: 'kiambu_road', label: 'Kiambu Road' },
    { value: 'gikambura', label: 'Gikambura' },
    // Add more locations as needed
  ];

  const handleChange = (e) => {
    setIncidentDetails({
      ...incidentDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      // Send the incident data with the correct headers syntax
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/incidents/report`,
        incidentDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      setSuccessMessage('Incident reported successfully!');
      setIncidentDetails({ title: '', description: '', location: '' });
    } catch (error) {
      console.error('Error reporting incident:', error);
      setError('Failed to report the incident. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={incidentDetails.title}
          onChange={handleChange}
          required
          minLength="3"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={incidentDetails.description}
          onChange={handleChange}
          required
          minLength="10"
        />
      </div>
      <div>
        <label>Location</label>
        <select
          name="location"
          value={incidentDetails.location}
          onChange={handleChange}
          required
        >
          {locations.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Reporting...' : 'Report Incident'}
      </button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default IncidentReportForm;
