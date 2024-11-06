// src/components/Volunteers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Volunteers = () => {
  const [volunteerDetails, setVolunteerDetails] = useState({
    name: '',
    skills: '',
    contact: '', // New contact field
    availability: new Date()
  });
  const [volunteers, setVolunteers] = useState([]); // State for storing fetched volunteers

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/volunteers`);
      setVolunteers(response.data); // Save fetched volunteers to state
    } catch (error) {
      console.error('Error fetching volunteers', error);
    }
  };

  const handleChange = (e) => {
    setVolunteerDetails({
      ...volunteerDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setVolunteerDetails({
      ...volunteerDetails,
      availability: date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/volunteers`, volunteerDetails);
      alert('Volunteer form submitted successfully!');
      setVolunteerDetails({ name: '', skills: '', contact: '', availability: new Date() });
      fetchVolunteers(); // Refresh volunteer list after submission
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
          <label htmlFor="contact" className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            value={volunteerDetails.contact}
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
            dateFormat="yyyy/MM/dd"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <h3>Registered Volunteers</h3>
      <ul className="list-group mt-4">
        {volunteers.map((volunteer) => (
          <li key={volunteer._id} className="list-group-item">
            <strong>Name:</strong> {volunteer.name} <br />
            <strong>Skills:</strong> {volunteer.skills} <br />
            <strong>Contact:</strong> {volunteer.contact} <br /> {/* Display contact */}
            <strong>Availability:</strong> {new Date(volunteer.availability).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Volunteers;
