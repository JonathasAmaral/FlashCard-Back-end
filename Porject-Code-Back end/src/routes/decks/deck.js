const express = require('express');
const router = express.Router();
const decksController = require('../../controllers/decksController');

// Define routes for decks
router.get('/', decksController.getAllDecks);
router.get('/:id', decksController.getDeckById);
router.post('/', decksController.createDeck);
router.put('/:id', decksController.updateDeck);
router.delete('/:id', decksController.deleteDeck);

module.exports = router;
