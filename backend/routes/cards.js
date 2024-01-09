const router = require('express').Router();

const { createCard, getCards, likeCard, dislikeCard, deleteCard } = require('../controllers/cards');
const { cardIdValidator, cardCreateValidator } = require('../validators/cards')

router.get('/', getCards);
router.post('/', cardCreateValidator, createCard);
router.delete('/:cardId', cardIdValidator, deleteCard);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;