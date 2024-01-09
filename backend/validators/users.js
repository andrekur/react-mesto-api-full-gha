const { celebrate, Joi } = require('celebrate');

module.exports.userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/)
  })
})

module.exports.updateUserDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
})

module.exports.updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(http|https?:\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+([/?].*)?$/)
  })
})
