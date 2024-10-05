import React, { useEffect, useState } from 'react';
import axios from 'axios';

function IncidentList() {
  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/incidents', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <div>
      <h2>Incident List</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident._id}>
            <h3>{incident.title}</h3>
            <p>{incident.description}</p>
            <p><strong>Location:</strong> {incident.location}</p>
            <p><strong>Status:</strong> {incident.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncidentList;
