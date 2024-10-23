const Alert = require('../models/Alert');

const sendAlert = async (req, res) => {
  const { alertTitle, alertMessage, location } = req.body;
  try {
    const alert = new Alert({ alertTitle, alertMessage, location });
    await alert.save();
    res.status(201).json({ message: 'Alert sent successfully', alert });
  } catch (error) {
    res.status(400).json({ message: 'Error sending alert' });
  }
};

const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts' });
  }
};

module.exports = { sendAlert, getAlerts };
