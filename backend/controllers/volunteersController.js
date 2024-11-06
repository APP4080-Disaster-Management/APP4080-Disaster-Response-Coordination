const Volunteer = require('../models/Volunteer');

// Register a volunteer
const registerVolunteer = async (req, res) => {
  const { name, skills,contact, availability } = req.body;
  try {
    const volunteer = new Volunteer({ name, skills,contact, availability });
    await volunteer.save();
    res.status(201).json({ message: 'Volunteer registered successfully', volunteer });
  } catch (error) {
    res.status(500).json({ message: 'Error registering volunteer', error });
  }
};

// Get all volunteers
const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers', error });
  }
};

module.exports = { registerVolunteer, getAllVolunteers };
