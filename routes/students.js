const express = require('express');
const router = express.Router();

const { createStudent, updateStudent, deleteStudent } = require('../controllers/students');

router.route('/new').post(createStudent);
router.route('/:id').put(updateStudent).delete(deleteStudent);

module.exports = router;
