const express = require('express');
const router = express.Router();
const cardsController = require('../../controllers/cardsController');

// Define routes for cards
router.get('/', cardsController.getAllCards);
router.get('/:cardId/decks/:deckId', cardsController.getCardById);
router.post('/', cardsController.createCard);
router.put('/:cardId/decks/:deckId', cardsController.updateCard);
router.delete('/:cardId/decks/:deckId', cardsController.deleteCard);

module.exports = router;
