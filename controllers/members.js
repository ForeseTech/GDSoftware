const bcrypt = require('bcryptjs');
const passport = require('passport');

const Member = require('../models/Member');

const renderRegister = (req, res, next) => {
  res.render('members/register');
};

const registerMember = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;

  // Check if passwords match
  if (password !== password2) {
    req.flash('error', 'Passwords do not match.');
    return res.redirect('members/register');
  }

  // Validation passed
  const member = await Member.findOne({ email: email });

  if (member) {
    req.flash('error', 'E-Mail ID already exists');
    return res.redirect('/members/register');
  } else {
    await Member.create({ name, email, password });
    req.flash('success', `Welcome, Home`);
    res.redirect('/');
  }
};

const renderLogin = (req, res, next) => {
  res.render('members/login');
};

const loginMember = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/members/login',
    failureFlash: true,
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/members/login');
};

module.exports = {
  renderRegister,
  registerMember,
  renderLogin,
  loginMember,
  logout,
};
