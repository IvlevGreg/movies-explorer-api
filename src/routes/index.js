const router = require('express').Router();

const protectRoutesForNotAuth = require('../middlewares/protectRoutesForNotAuth');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const authRoutes = require('./auth');
const errorsRoutes = require('./errorsRoutes');

router.use('/crash-test', protectRoutesForNotAuth, () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', authRoutes);

router.use('/users', protectRoutesForNotAuth, usersRoutes);
router.use('/movies', protectRoutesForNotAuth, moviesRoutes);

router.use('*', protectRoutesForNotAuth, errorsRoutes);

module.exports = router;
