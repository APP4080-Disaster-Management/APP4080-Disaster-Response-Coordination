import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/incidents`);
        setIncidents(response.data.incidents);
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setError('Failed to load incidents.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (isLoading) return <p>Loading incidents...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Incident Reports</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Title</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Description</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Location</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident._id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{incident.title}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{incident.description}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{incident.location}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;
