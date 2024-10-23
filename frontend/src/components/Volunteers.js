// src/components/Volunteers.js
import React, { useState } from 'react';
import axios from 'axios';

const Volunteers = () => {
  const [volunteerDetails, setVolunteerDetails] = useState({
    name: '',
    skills: '',
    availability: ''
  });

  const handleChange = (e) => {
    setVolunteerDetails({
      ...volunteerDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/volunteers', volunteerDetails);  // Remove response
      alert('Volunteer form submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="container">
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={volunteerDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="skills" className="form-label">Skills</label>
          <input
            type="text"
            className="form-control"
            id="skills"
            name="skills"
            value={volunteerDetails.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="availability" className="form-label">Availability</label>
          <input
            type="text"
            className="form-control"
            id="availability"
            name="availability"
            value={volunteerDetails.availability}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Volunteers;
