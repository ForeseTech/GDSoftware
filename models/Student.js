const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
  {
    registerNum: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      enum: ['AUT', 'BIO', 'CHE', 'CIV', 'CSE', 'ECE', 'EEE', 'INT', 'MEC'],
      required: true,
    },

    scores: {
      type: Object,
      required: true,
    },

    comments: {
      type: String,
    },

    gdCompleted: {
      type: Boolean,
      default: false,
    },

    member: {
      type: mongoose.Schema.ObjectId,
      ref: 'Member',
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', StudentSchema, 'Students');
module.exports = Student;
