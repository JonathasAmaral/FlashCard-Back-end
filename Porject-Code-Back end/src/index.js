const express = require('express');
const mongoose = require('mongoose');
const cardsRoutes = require('./routes/cards/card');
const decksRoutes = require('./routes/decks/deck');
const cors = require('cors');

const app = express();

const port = 3000;

// site for create mongodb in cloud (https://www.mongodb.com/atlas/database)
// Mudar link do banco de dados para o da sua base de dados do mongoDB
mongoose.connect('mongodb://localhost:27017/flashCards')
    .then(() => {
      console.log('Conexão com o MongoDB estabelecida');
    })
    .catch((error) => {
      console.error('Erro ao conectar com o MongoDB:', error);
    }); // Connect to MongoDB database

// for parsing application/json and cors
app.use(express.json()); 
app.use(cors());

// Routes
app.use('/cards', cardsRoutes);
app.use('/decks', decksRoutes);

// Default route
app.get('/', (req, res) => {
  res.send({ message: 'The best app for learn!'});
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
