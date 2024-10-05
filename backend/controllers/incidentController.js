const Incident = require('../models/Incident');

const reportIncident = async (req, res) => {
  const { title, description, location } = req.body;
  const incident = new Incident({ title, description, location });

  await incident.save();
  res.status(201).json(incident);
};

const verifyIncident = async (req, res) => {
  const { id } = req.params;
  const incident = await Incident.findById(id);

  if (incident) {
    incident.status = 'verified';
    await incident.save();
    res.json({ message: 'Incident verified' });
  } else {
    res.status(404).json({ message: 'Incident not found' });
  }
};

module.exports = { reportIncident, verifyIncident };
