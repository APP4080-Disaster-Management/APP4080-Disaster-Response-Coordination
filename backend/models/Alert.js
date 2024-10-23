const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertTitle: { type: String, required: true },
  alertMessage: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  sentAt: { type: Date, default: Date.now },
});

alertSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Alert', alertSchema);
