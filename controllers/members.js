const bcrypt = require('bcryptjs');
const passport = require('passport');

const Member = require('../models/Member');

const renderRegister = (req, res, next) => {
  res.render('members/register');
};

const registerMember = (req, res, next) => {
  const { name, email, password, password2 } = req.body;

  // Check passwords match
  if (password !== password2) {
    req.flash('error', 'Passwords do not match.');
    return res.redirect('members/register');
  }

  // Validation passed
  Member.findOne({ email: email }).then((member) => {
    if (member) {
      // Member exists
      req.flash('error', 'E-Mail ID already exists');
      return res.redirect('/members/register');
    } else {
      const newMember = new Member({
        name,
        email,
        password,
      });

      // Hash Password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newMember.password, salt, (err, hash) => {
          if (err) throw err;
          // Set password to hashed
          newMember.password = hash;
          // Save Member
          newMember
            .save()
            .then((member) => {
              req.flash('success', `Welcome, ${member.name}`);
              res.redirect('/');
            })
            .catch((err) => console.log(err));
        })
      );
    }
  });
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
