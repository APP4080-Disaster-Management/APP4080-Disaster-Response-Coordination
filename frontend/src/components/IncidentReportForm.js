import React, { useState } from 'react';
import axios from 'axios';

const IncidentReportForm = () => {
  const [incidentDetails, setIncidentDetails] = useState({
    title: '',
    description: '',
    location: '',
  });

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
    try {
      const response = await axios.post('/api/incidents/report', incidentDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using localStorage to store the token
        },
      });
      alert('Incident reported successfully!');
    } catch (error) {
      console.error(error);
      alert('Error reporting incident');
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
        />
      </div>
      <div>
        <label>Description</label>
        <textarea 
          name="description" 
          value={incidentDetails.description} 
          onChange={handleChange} 
          required 
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
      <button type="submit">Report Incident</button>
    </form>
  );
};

export default IncidentReportForm;
