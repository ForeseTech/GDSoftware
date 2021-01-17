const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const Student = require('./models/Student');

const memberRouter = require('./routes/members');
const studentRouter = require('./routes/students');

const isLoggedIn = require('./middleware/auth');
const errorHandler = require('./middleware/error');

// Instantiate express app
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
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  // store: new MongoStore({ mongooseConnection: mongoose.connection }),
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

// Cookie parser middleware
app.use(cookieParser());

app.get('/', isLoggedIn, async (req, res, next) => {
  let students;

  if (req.user.name === 'Admin') {
    students = await Student.find({}).sort('-createdAt');
  } else {
    students = await Student.find({ member: req.user._id }).sort('-createdAt');
  }
  res.render('students/index', { students, member: req.user });
});

app.use('/members', memberRouter);
app.use('/students', studentRouter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
