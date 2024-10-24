const Volunteer = require('../models/Volunteer');

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers', error });
  }
};

const addVolunteer = async (req, res) => {
  const { name, contact } = req.body;

  try {
    const volunteer = new Volunteer({ name, contact });
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(400).json({ message: 'Error adding volunteer', error });
  }
};

module.exports = { getVolunteers, addVolunteer };
