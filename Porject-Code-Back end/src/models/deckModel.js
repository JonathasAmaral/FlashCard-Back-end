const mongoose = require('mongoose');

// Schema para o modelo de deck
const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
