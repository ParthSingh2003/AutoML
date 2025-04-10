const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Delete unverified users older than 1 hour
const cleanUpUnverifiedUsers = async () => {
  const cutoff = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
  await User.deleteMany({
    verified: false,
    otpExpiry: { $lt: new Date() }, // expired OTP
  });
};

setInterval(cleanUpUnverifiedUsers, 60 * 60 * 1000); // Run every hour
