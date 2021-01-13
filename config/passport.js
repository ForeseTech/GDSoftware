const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Database = require('./database');

// Load member model
const Member = require('../models/Member');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      Member.findOne({ email: email })
        .then((member) => {
          if (!member) {
            return done(null, false, { message: 'No such email exists' });
          }

          // Match password
          bcrypt.compare(password, member.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, member);
            } else {
              return done(null, false, { message: 'Invalid login credentials' });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((member, done) => {
    done(null, member.id);
  });

  passport.deserializeUser((id, done) => {
    Member.findById(id, function (err, member) {
      done(err, member);
    });
  });
};
