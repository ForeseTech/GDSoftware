const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv').config();

const Database = require('./config/database');

// Load models
const Student = require('./models/Student');
const Member = require('./models/Member');

// Read JSON files
const students = JSON.parse(fs.readFileSync(`${__dirname}/resources/_data/students.json`, 'utf-8'));
const members = JSON.parse(fs.readFileSync(`${__dirname}/resources/_data/members.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Student.create(students);
    await Member.create(members);

    console.log('Data Imported...'.green);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Student.deleteMany();
    await Member.deleteMany();

    console.log('Data Destroyed...'.red);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
