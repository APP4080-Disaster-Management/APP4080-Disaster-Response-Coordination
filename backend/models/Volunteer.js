// models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  contact: { type: String, required: true, }, // New contact field

  availability: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
