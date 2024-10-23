const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const donationsRoutes = require('./routes/donationsRoutes');
const volunteersRoutes = require('./routes/volunteersRoutes');
const alertsRoutes = require('./routes/alertsRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/donations', donationsRoutes);
app.use('/api/volunteers', volunteersRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
