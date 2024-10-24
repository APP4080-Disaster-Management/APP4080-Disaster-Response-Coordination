const Donation = require('../models/Donation');

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error });
  }
};

const addDonation = async (req, res) => {
  const { name, amount } = req.body;

  try {
    const donation = new Donation({ name, amount });
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: 'Error adding donation', error });
  }
};

module.exports = { getDonations, addDonation };
