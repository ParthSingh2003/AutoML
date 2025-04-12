const express = require('express');
const router = express.Router();

const {
  signupUser,
  verifySignupOtp,
  loginUser,
  verifyLoginOtp,
  handleForgotPassword,
  verifyForgotPasswordOtp,
  resetPassword
} = require('../controllers/authController');

router.post('/signup', signupUser);
router.post('/verify-signup-otp', verifySignupOtp);

router.post('/login', loginUser);
router.post('/verify-login-otp', verifyLoginOtp);

router.post('/forgot-password', handleForgotPassword);
router.post('/verify-forgot-otp', verifyForgotPasswordOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
