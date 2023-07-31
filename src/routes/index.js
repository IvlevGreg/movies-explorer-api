const router = require('express').Router();

const auth = require('../middlewares/auth');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const authRoutes = require('./auth');
const errorsRoutes = require('./errorsRoutes');

router.use('/', authRoutes);

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

router.use('*', auth, errorsRoutes);

module.exports = router;