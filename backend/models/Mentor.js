const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  programs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program'
  }]

}, { timestamps: true });

module.exports = mongoose.model('Mentor', MentorSchema);
