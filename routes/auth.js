const { login, register, checkLoginStatus, logout } = require('../controllers/auth');

const router = require('express-promise-router')();

router.route('/register')
    .post(register);

router.route('/login')
    .get(checkLoginStatus)
    .post(login);

router.route('/logout')
    .get(logout);

module.exports = router;
