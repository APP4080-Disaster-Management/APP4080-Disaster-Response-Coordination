// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [incidentsRes, volunteersRes, donationsRes] = await Promise.all([
          axios.get('/api/incidents'),
          axios.get('/api/volunteers'),
          axios.get('/api/donations')
        ]);
        setIncidents(incidentsRes.data);
        setVolunteers(volunteersRes.data);
        setDonations(donationsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-section">
        <h3>Active Incidents</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident._id}>
                <td>{incident.title}</td>
                <td>{incident.status}</td>
                <td>{incident.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h3>Volunteers</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map(volunteer => (
              <tr key={volunteer._id}>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h3>Donations</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr key={donation._id}>
                <td>{donation.name}</td>
                <td>${donation.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
