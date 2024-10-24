const Alert = require('../models/Alert');

// Controller to send an alert
const sendAlert = async (req, res) => {
  const { alertTitle, alertMessage, location } = req.body;

  // Basic validation
  if (!alertTitle || !alertMessage || !location || !location.coordinates) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create a new alert instance
    const alert = new Alert({
      alertTitle,
      alertMessage,
      location: {
        type: 'Point', // GeoJSON type
        coordinates: location.coordinates // [longitude, latitude]
      },
    });

    // Save the alert to the database
    await alert.save();

    res.status(201).json({ message: 'Alert sent successfully', alert });
  } catch (error) {
    res.status(500).json({ message: 'Error sending alert', error });
  }
};

// Controller to fetch all alerts
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts', error });
  }
};

module.exports = { sendAlert, getAlerts };
