const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');

const { createStudent, updateStudent, deleteStudent } = require('../controllers/students');

router.route('/new').post(isLoggedIn, createStudent);
router.route('/:id').put(isLoggedIn, updateStudent).delete(isLoggedIn, deleteStudent);

module.exports = router;
