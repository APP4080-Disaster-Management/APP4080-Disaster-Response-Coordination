// src/components/IncidentReportForm.js
import React, { useState } from 'react';
import axios from 'axios';

const IncidentReportForm = () => {
  const [incidentDetails, setIncidentDetails] = useState({
    title: '',
    description: '',
    location: '',
  });

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
        <input type="text" name="title" value={incidentDetails.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={incidentDetails.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Location</label>
        <input type="text" name="location" value={incidentDetails.location} onChange={handleChange} required />
      </div>
      <button type="submit">Report Incident</button>
    </form>
  );
};

export default IncidentReportForm;
