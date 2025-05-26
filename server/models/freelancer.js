const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const freelancerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationOTP: String,
  otpExpiration: Date,
  profileCompleted: {
    type: Boolean,
    default: false
  },
  name: String,
  country: String,
  phoneNumber: String,
  postalCode: String,
  bankDetails: {
    accountNumber: String,
    routingNumber: String,
    bankName: String
  },
  verificationIDs: [String], // Store paths to uploaded documents
  isAdminVerified: {
    type: Boolean,
    default: false
  },
  tokensAvailable: {
    type: Number,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
freelancerSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Freelancer', freelancerSchema);