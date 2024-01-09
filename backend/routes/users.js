const router = require('express').Router();
const { getUsers, getUser, getSeltUser, updateSelfUser, updateSelfAvatar } = require('../controllers/users')
const { userIdValidator, updateUserDataValidator, updateUserAvatarValidator } = require('../validators/users')

router.get('/', getUsers);
router.patch('/me', updateUserDataValidator, updateSelfUser);
router.get('/me', getSeltUser);
router.patch('/me/avatar', updateUserAvatarValidator, updateSelfAvatar);
router.get('/:userId', userIdValidator, getUser);

module.exports = router;