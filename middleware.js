const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please log in to acess the site.');
  res.redirect('members/login');
};

module.exports = { isLoggedIn };
