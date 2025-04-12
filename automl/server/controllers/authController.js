const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing && existing.verified) {
      return res.status(400).json({ msg: 'User already exists and is verified' });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        email,
        password, // raw for now
        otp,
        otpExpiry,
        verified: false,
      },
      { upsert: true }
    );

    await transporter.sendMail({
      from: `"Signup OTP" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Verify your account',
      html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    });

    res.json({ msg: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating user' });
  }
};

const verifySignupOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    user.verified = true;

    await user.save();

    res.json({ msg: 'Signup complete. User verified!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.verified) {
      return res.status(400).json({ msg: 'User not found or not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    // generate OTP
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await transporter.sendMail({
      from: `"Login OTP" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Login OTP Verification',
      html: `<p>Your login OTP is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    });

    res.json({ msg: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // You could send back a JWT here instead if needed
    res.json({ msg: 'Login successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.verified) {
      return res.status(400).json({ msg: 'User not found or not verified' });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await transporter.sendMail({
      from: `"Reset Password OTP" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Reset your password',
      html: `<p>Your OTP for password reset is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    });

    res.json({ msg: 'OTP sent to email for password reset' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const verifyForgotPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Clear OTP to allow reset password
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ msg: 'OTP verified for password reset' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


module.exports = {
  signupUser,
  verifySignupOtp,
  loginUser,         
  verifyLoginOtp,
  handleForgotPassword, 
  verifyForgotPasswordOtp,
  resetPassword
};