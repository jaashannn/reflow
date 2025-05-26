const Freelancer = require('../../models/Freelancer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateOTP, sendOTPEmail } = require('../../utils/email');

exports.initialSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const otp = generateOTP();
    
    const freelancer = new Freelancer({
      email,
      password,
      emailVerificationOTP: otp,
      otpExpiration: Date.now() + 3600000 // 1 hour
    });

    await freelancer.save();
    await sendOTPEmail(email, otp);
    
    res.status(201).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const freelancer = await Freelancer.findOne({ email });

    if (!freelancer || freelancer.emailVerificationOTP !== otp || freelancer.otpExpiration < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    freelancer.isEmailVerified = true;
    freelancer.emailVerificationOTP = undefined;
    freelancer.otpExpiration = undefined;
    await freelancer.save();

    const token = jwt.sign({ id: freelancer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token, profileCompleted: freelancer.profileCompleted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.completeProfile = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.user.id);
    
    if (!freelancer.isEmailVerified) {
      return res.status(403).json({ error: 'Email not verified' });
    }

    const updates = req.body;
    Object.assign(freelancer, updates);
    freelancer.profileCompleted = true;
    
    await freelancer.save();
    res.json({ message: 'Profile completed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};