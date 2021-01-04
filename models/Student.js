const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  registerNum: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    enum: ['AUT', 'BIO', 'CHE', 'CIV', 'CSE', 'ECE', 'EEE', 'INT', 'MEC'],
  },

  gdDate: {
    type: Date,
  },

  member: {
    type: mongoose.Schema.ObjectId,
    ref: 'Member',
    required: true,
  },

  gdCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Student = mongoose.model('Student', StudentSchema, 'students');
module.exports = Student;
