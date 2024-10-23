const Incident = require('../models/Incident');
const Volunteer = require('../models/Volunteer');
const Donation = require('../models/Donation');
const Alert = require('../models/Alert');

const getDashboardData = async (req, res) => {
  try {
    const incidents = await Incident.find();
    const volunteers = await Volunteer.find();
    const donations = await Donation.find();
    const alerts = await Alert.find();

    res.json({ incidents, volunteers, donations, alerts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin dashboard data' });
  }
};

module.exports = { getDashboardData };
