import React from 'react';
import IncidentList from '../components/IncidentList';
import IncidentReportForm from '../components/IncidentReportForm';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <IncidentReportForm />
      <IncidentList />
    </div>
  );
}

export default AdminDashboard;
