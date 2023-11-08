const Deck = require('../models/deckModel');

const decksController = {
  getAllDecks: async (req, res) => {
    try {
      const decks = await Deck.find().populate('cards');
      res.json(decks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDeckById: async (req, res) => {
    try {
      const deck = await Deck.findById(req.params.id).populate('cards');
      if (!deck) {
        return res.status(404).json({ error: 'Deck não encontrado' });
      }
      res.json(deck);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createDeck: async (req, res) => {
    const { name, color } = req.body;

    try {
      const newDeck = new Deck({ name, color });
      const savedDeck = await newDeck.save();
      res.json(savedDeck);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateDeck: async (req, res) => {
    const { name, color } = req.body;

    try {
      const updatedDeck = await Deck.findByIdAndUpdate(
        req.params.id,
        { name, color },
        { new: true }
      );
      if (!updatedDeck) {
        return res.status(404).json({ error: 'Deck não encontrado' });
      }
      res.json(updatedDeck);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteDeck: async (req, res) => {
    try {
      const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
      if (!deletedDeck) {
        return res.status(404).json({ error: 'Deck não encontrado' });
      }
      res.json({ message: 'Deck deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = decksController;