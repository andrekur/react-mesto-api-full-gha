const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config').config
const { ConflictError } = require('../errors/errors')
const User = require('../models/user')
const { HTTP_STATUS_CREATED } = require('http2').constants

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(next)
}

module.exports.getUser = (req, res, next) => {
  findUserOrFail(req.params.userId)
    .then(user => res.send(user))
    .catch(next)
}

module.exports.getSeltUser = (req, res, next) => {
  findUserOrFail(req.user._id)
    .then(user => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar
    }))
    .catch(next)
}
module.exports.updateSelfUser = (req, res, next) => {
  const { name, about } = req.body;
  updateUserData(req.user._id, {name, about})
    .then(user => res.send(user))
    .catch(next)
}

module.exports.updateSelfAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserData(req.user._id, {avatar})
    .then(user => res.send(user))
    .catch(next)
}

const updateUserData = (userId, updateData) => {
  return User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).orFail()
}

const findUserOrFail = (userId) => {
  return User.findById(userId).orFail()
}

module.exports.createUser = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с такой почтой уже существует, необходимо указать другую');
      }

      bcrypt.hash(req.body.password, 10)
        .then((hash) => User.create({
          email: req.body.email,
          password: hash,
          name: req.body.name,
          about: req.body.about,
          avatar: req.body.avatar,
        }))
        .then((user) => {
          res.status(HTTP_STATUS_CREATED).send({
            _id: user._id,
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
          });
        })
        .catch(next)
    })
    .catch(next)
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' }),
      });
    })
    .catch(next)
};
