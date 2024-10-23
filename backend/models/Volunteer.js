const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
