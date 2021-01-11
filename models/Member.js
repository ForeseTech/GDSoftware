const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const Member = mongoose.model('Member', MemberSchema, 'Members');
module.exports = Member;
