// src/components/AddDonation.js
import React, { useState } from 'react';
import axios from 'axios';

const AddDonation = () => {
  const [donationDetails, setDonationDetails] = useState({
    name: '',
    amount: '',
    contact: '',
    location: ''
  });

  const handleChange = (e) => {
    setDonationDetails({
      ...donationDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/donations`, donationDetails);
      alert('Donation added successfully!');
      setDonationDetails({ name: '', amount: '', contact: '', location: '' });
    } catch (error) {
      console.error('Error adding donation', error);
      alert('Error adding donation');
    }
  };

  return (
    <div className="container">
      <h2>Add a Donation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Donor Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={donationDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={donationDetails.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            value={donationDetails.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={donationDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddDonation;
