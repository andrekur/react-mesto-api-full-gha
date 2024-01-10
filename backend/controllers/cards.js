const Card = require('../models/card');
const { HTTP_STATUS_OK  } = require('http2').constants;
const { ForbiddenError } = require('../errors/errors')


module.exports.createCard = (req, res, next) => {
  const { link, name } = req.body;
  Card.create({ link, name, owner: req.user._id })
    .then(card => card.populate('owner'))
    .then(card => res.send(card))
    .catch(next)
}

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then(cards => res.send(cards))
    .catch(next)
}

module.exports.deleteCard = (req, res, next) => {
  Card.findById({_id: req.params.cardId}).orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Отказано в доступе')
      }

      card.deleteOne()
        .then(() => res.status(HTTP_STATUS_OK).send({}))
        .catch(next)
    })
    .catch(next)
}

module.exports.likeCard = (req, res, next) => {
  updateCardOrFail(req.params.cardId, { $addToSet: { likes: req.user._id } })
    .then(card => card.populate(['likes', 'owner']))
    .then(card => res.send(card))
    .catch(next)
}

module.exports.dislikeCard = (req, res, next) => {
  updateCardOrFail(req.params.cardId, { $pull: { likes: req.user._id } })
    .then(card => card.populate(['likes', 'owner']))
    .then(card => res.send(card))
    .catch(next)
}

const updateCardOrFail = (cardId, data) => {
  return Card.findByIdAndUpdate(cardId, data, { new: true}).orFail()
}