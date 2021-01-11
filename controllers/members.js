const Member = require('../models/Member');

const renderRegister = (req, res, next) => {
  res.render('users/register');
};

const registerMember = (req, res, next) => {};

const renderLogin = (req, res, next) => {
  res.render('users/login');
};

const loginMember = (req, res, next) => {};

const logout = (req, res, next) => {};

module.exports = {
  renderRegister,
  registerMember,
  renderLogin,
  loginMember,
  logout,
};
