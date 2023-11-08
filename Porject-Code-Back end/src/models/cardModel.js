const mongoose = require('mongoose');

// Schema para o modelo de card
const cardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  learned: {
    type: Boolean,
    default: false
  },
  showAnswer: {
    type: Boolean,
    default: false
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
