// models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  contact: { type: String, required: true },  // New contact field
  location: { type: String, required: true }  // New location field
});

module.exports = mongoose.model('Donation', donationSchema);
