const Incident = require('../models/Incident');

// Report a new incident
const reportIncident = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    // Create and save the new incident
    const incident = new Incident({ title, description, location });
    await incident.save();

    // Respond with success message and saved incident details
    res.status(201).json({
      message: 'Incident reported successfully',
      incident,
    });
  } catch (error) {
    // Error handling
    console.error('Error reporting incident:', error);
    res.status(500).json({ message: 'Error reporting incident', error });
  }
};

// Verify an existing incident by ID
const verifyIncident = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure a valid ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid incident ID format' });
    }

    // Find incident by ID
    const incident = await Incident.findById(id);

    if (incident) {
      // Update status to 'verified'
      incident.status = 'verified';
      await incident.save();

      res.json({
        message: 'Incident verified',
        incident,
      });
    } else {
      // If incident is not found
      res.status(404).json({ message: 'Incident not found' });
    }
  } catch (error) {
    // Error handling
    console.error('Error verifying incident:', error);
    res.status(500).json({ message: 'Error verifying incident', error });
  }
};

// Get all incidents
const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find(); // Fetch all incidents from the database

    // Respond with the list of incidents
    res.status(200).json({
      message: 'Incidents fetched successfully',
      incidents,
    });
  } catch (error) {
    // Error handling
    console.error('Error fetching incidents:', error);
    res.status(500).json({ message: 'Error fetching incidents', error });
  }
};

module.exports = { reportIncident, verifyIncident, getAllIncidents };
