const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const ejsMate = require('ejs-mate');
const Database = require('./config/database');

const app = express();

// Views and View Engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV.underline} mode on port ${PORT}.`.yellow.bold);
});
