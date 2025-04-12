const express = require('express');
const router = express.Router();

const {
  signupUser,
  verifySignupOtp,
  loginUser,         
  verifyLoginOtp     
} = require('../controllers/authController');


router.post('/signup', signupUser);
router.post('/verify-signup-otp', verifySignupOtp);

router.post('/login', loginUser);
router.post('/verify-login-otp', verifyLoginOtp);

module.exports = router;
