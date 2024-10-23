// const Incident = require('../models/Incident');

// const reportIncident = async (req, res) => {
//   const { title, description, location } = req.body;
//   const incident = new Incident({ title, description, location });

//   await incident.save();
//   res.status(201).json(incident);
// };

// const verifyIncident = async (req, res) => {
//   const { id } = req.params;
//   const incident = await Incident.findById(id);

//   if (incident) {
//     incident.status = 'verified';
//     await incident.save();
//     res.json({ message: 'Incident verified' });
//   } else {
//     res.status(404).json({ message: 'Incident not found' });
//   }
// };

// module.exports = { reportIncident, verifyIncident };
// controllers/IncidentControllers.js
// controllers/incidentControllers.js

// routes/incidentRoutes.js
// controllers/incidentControllers.js
const Incident = require('../models/Incident');

const reportIncident = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    const incident = new Incident({ title, description, location });
    await incident.save();
    res.status(201).json(incident);
  } catch (error) {
    console.error('Error saving incident:', error);
    res.status(500).json({ message: 'Error reporting incident' });
  }
};

const verifyIncident = async (req, res) => {
  const { id } = req.params;

  try {
    const incident = await Incident.findById(id);
    if (incident) {
      incident.status = 'verified';
      await incident.save();
      res.json({ message: 'Incident verified' });
    } else {
      res.status(404).json({ message: 'Incident not found' });
    }
  } catch (error) {
    console.error('Error verifying incident:', error);
    res.status(500).json({ message: 'Error verifying incident' });
  }
};

module.exports = { reportIncident, verifyIncident };


