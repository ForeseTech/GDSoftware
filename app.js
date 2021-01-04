const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV.underline} mode on port ${PORT}.`.yellow.bold);
});
