const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['reported', 'verified', 'responded'], default: 'reported' },
  chiefNotified: { type: Boolean, default: false },
});

module.exports = mongoose.model('Incident', incidentSchema);
