import React, { useState } from 'react';
import axios from 'axios';

function IncidentReportForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/incidents/report', { title, description, location }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Incident reported successfully!');
      setTitle('');
      setDescription('');
      setLocation('');
    } catch (err) {
      alert('Error reporting incident');
    }
  };

  return (
    <div>
      <h2>Report an Incident</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default IncidentReportForm;
