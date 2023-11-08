const Card = require('../models/cardModel');
const Deck = require('../models/deckModel');

const cardsController = {

  getAllCards: async (req, res) => {
    try {
      const cards = await Card.find().populate({
        path: 'deck',
        select: 'name color -_id' // Retorna apenas 'name' e 'color' do deck, excluindo o _id
      });

      if (!cards || cards.length === 0) {
        return res.status(404).json({ message: 'Nenhum card encontrado.' });
      }

      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCardById: async (req, res) => {
    try {
      const card = await Card.findById(req.params.cardId).populate({
        path: 'deck',
        select: 'name color -_id' // Retorna apenas 'name' e 'color' do deck, excluindo o _id
      });
      
      if (!card) {
        return res.status(404).json({ error: 'Card não encontrado' });
      }

      res.json(card);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCard: async (req, res) => {
    const { question, answer, learned, showAnswer, deckId } = req.body;

    try {
      if (!question || !answer || !deckId) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
      }

      const deck = await Deck.findById(deckId);
      if (!deck) {
        return res.status(404).json({ error: 'Deck não encontrado' });
      }

      const newCard = new Card({ question, answer, learned, showAnswer, deck: deckId });
      const savedCard = await newCard.save();

      deck.cards.push(savedCard._id);
      await deck.save();

      res.json(savedCard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCard: async (req, res) => {
    try {
      const { question, answer, learned, showAnswer, deckId } = req.body;

    if (!question || !answer || !deckId) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ error: 'Card não encontrado' });
    }

    const deck = await Deck.findById(deckId).populate('cards');
    if (!deck) {
      return res.status(404).json({ error: 'Deck não encontrado' });
    }

    // Encontrar o card dentro do deck
    const cardInDeck = deck.cards.find(c => c._id.toString() === req.params.cardId);
    if (!cardInDeck) {
      return res.status(404).json({ error: 'Card não encontrado no deck' });
    }

    // Atualizar as informações do card
    card.question = question;
    card.answer = answer;
    card.learned = learned;
    card.showAnswer = showAnswer;
    card.deck = deckId;

    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
    }
  },

  deleteCard: async (req, res) => {
    try {
      const cardId = req.params.cardId;
      const deckId = req.params.deckId;

      const deck = await Deck.findById(deckId);
      if (!deck) {
        return res.status(404).json({ error: 'Deck não encontrado' });
      }

      const cardIndex = deck.cards.indexOf(cardId);
      if (cardIndex === -1) {
        return res.status(404).json({ error: 'Card não encontrado no deck' });
      }

      // Remove o card do array de cards do deck
      deck.cards.splice(cardIndex, 1);
      await deck.save();

      await Card.findByIdAndDelete(cardId);

      res.json({ message: 'Card deletado do deck com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = cardsController;
