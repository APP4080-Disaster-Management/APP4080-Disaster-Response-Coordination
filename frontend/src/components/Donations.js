// src/components/Donations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Donations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('/api/donations');
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations', error);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="container">
      <h2>Donations List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{donation.name}</td>
              <td>${donation.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donations;
