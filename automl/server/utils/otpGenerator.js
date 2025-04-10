// utils/otpGenerator.js

exports.generateOTP = (length = 6) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // generate a random digit 0-9
    }
    return otp;
  };
  