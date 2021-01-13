const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Encrypt Password using bcrypt
MemberSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Member = mongoose.model('Member', MemberSchema, 'Members');
module.exports = Member;
