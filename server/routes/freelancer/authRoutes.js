const express = require('express');
const router = express.Router();
const authController = require('../../controllers/freelancer/authController');
const authMiddleware = require('../../middlewares/authMiddleware');

router.post('/signup', authController.initialSignup);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.put('/complete-profile', authMiddleware, authController.completeProfile);

module.exports = router;