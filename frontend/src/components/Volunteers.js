// src/components/Volunteers.js
import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Volunteers = () => {
  const [volunteerDetails, setVolunteerDetails] = useState({
    name: '',
    skills: '',
    availability: new Date() // Initialize with current date
  });

  const handleChange = (e) => {
    setVolunteerDetails({
      ...volunteerDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setVolunteerDetails({
      ...volunteerDetails,
      availability: date // Update availability when date is selected
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/volunteers', volunteerDetails);  
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
          <DatePicker
            selected={volunteerDetails.availability}
            onChange={handleDateChange}
            className="form-control"
            dateFormat="yyyy/MM/dd" // You can adjust the format as needed
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Volunteers;
