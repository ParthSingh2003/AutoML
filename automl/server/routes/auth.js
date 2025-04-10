const express = require('express');
const router = express.Router();

const {
  signupUser,
  verifySignupOtp,
} = require('../controllers/authController');

router.post('/signup', signupUser);
router.post('/verify-signup-otp', verifySignupOtp);

module.exports = router;
