const Member = require('../models/Member');
const asyncHandler = require('../middleware/async');

const renderRegister = (req, res, next) => {
  res.render('members/register');
};

const registerMember = asyncHandler(async (req, res, next) => {
  const { name, email, password, password2 } = req.body;

  // Check if passwords match
  if (password !== password2) {
    req.flash('error', 'Passwords do not match.');
    return res.redirect('/members/register');
  }

  const member = await Member.create({ name, email, password });

  // Send token response
  sendTokenResponse(member, req, res);
});

const renderLogin = (req, res, next) => {
  res.render('members/login');
};

const loginMember = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const member = await Member.findOne({ email: email }).select('+password');

  // Check if member exists
  if (!member) {
    req.flash('error', 'No such member exists. Please register first.');
    return res.redirect('/members/login');
  }

  // Check if password matches
  const isMatch = await member.matchPassword(password);
  if (!isMatch) {
    req.flash('error', 'Invalid Login Credentials.');
    return res.redirect('/members/login');
  }

  // Send token response
  sendTokenResponse(member, req, res);
});

const logout = (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  req.flash('success', 'You have logged out');
  res.redirect('/members/login');
};

// Get token from model, create cookie and send response
const sendTokenResponse = (member, req, res) => {
  const token = member.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  req.flash('success', `Welcome, ${member.name}`);
  res.cookie('token', token, options).redirect('/');
};

module.exports = {
  renderRegister,
  registerMember,
  renderLogin,
  loginMember,
  logout,
};
