const router = require('express').Router();
const auth = require('../middlewares/auth')
const { NotFoundError } = require('../errors/errors')

router.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use('/', require('./login'))
router.use('/cards', auth, require('./cards'))
router.use('/users', auth, require('./users'))


router.use('*', function(req, res, next) {
  next(new NotFoundError('URL not found'))
});


module.exports = router;