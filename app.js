const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const Database = require('./config/database');

const Student = require('./models/Student');

const memberRouter = require('./routes/members');
const studentRouter = require('./routes/students');

const { isLoggedIn } = require('./middleware');

// Passport Config
require('./config/passport')(passport);

const app = express();

// Views and View Engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));

// Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Method-override middleware
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Serve static assets
app.use(express.static(path.join(__dirname, '/public')));

// express-session middleware
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
};
app.use(session(sessionConfig));

// connect-flash middleware
app.use(flash());

// flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', isLoggedIn, async (req, res, next) => {
  const students = await Student.find({ member: req.user._id }).sort('-createdAt');
  console.log(students);
  res.render('students/index', { students });
});

app.use('/members', memberRouter);
app.use('/students', studentRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV.underline} mode on port ${PORT}.`.yellow.bold);
});
