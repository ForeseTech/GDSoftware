const express = require('express');
const router = express.Router();

const { renderRegister, registerMember, renderLogin, loginMember, logout } = require('../controllers/members');

router.route('/register').get(renderRegister).post(registerMember);
router.route('/login').get(renderLogin).post(loginMember);
router.route('/logout').get(logout);

module.exports = router;
