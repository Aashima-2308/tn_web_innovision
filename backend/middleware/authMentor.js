const jwt = require('jsonwebtoken');

const Mentor = require('../models/Mentor');
const Mentee = require('../models/Mentee');


// --------------------------------------------------
// MENTOR AUTHENTICATION
// --------------------------------------------------

exports.authenticate = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      error: 'JWT_SECRET is not configured'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find mentor without password
    const mentor = await Mentor.findById(decoded.id)
      .select('-password');

    if (!mentor) {
      return res.status(401).json({
        error: 'Mentor not found'
      });
    }

    // Attach mentor to request
    req.mentor = mentor;

    next();

  } catch (err) {
    console.error('Mentor authentication error:', err.message);

    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
};


// --------------------------------------------------
// MENTEE AUTHENTICATION
// --------------------------------------------------

exports.authenticateMentee = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      error: 'JWT_SECRET is not configured'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find mentee without password
    const mentee = await Mentee.findById(decoded.id)
      .select('-password');

    if (!mentee) {
      return res.status(401).json({
        error: 'Mentee not found'
      });
    }

    // Attach mentee to request
    req.mentee = mentee;

    next();

  } catch (err) {
    console.error('Mentee authentication error:', err.message);

    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
};


