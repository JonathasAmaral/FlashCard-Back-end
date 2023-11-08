const express = require('express');
const mongoose = require('mongoose');
const cardsRoutes = require('./routes/cards/card');
const decksRoutes = require('./routes/decks/deck');

const app = express();
const port = 3000;

// site for create mongodb in cloud (https://www.mongodb.com/atlas/database)
// Mudar link do banco de dados para o da sua base de dados do mongoDB
mongoose.connect('mongodb+srv://<name>:<password>@cluster0.mqxhjth.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      console.log('Conexão com o MongoDB estabelecida');
    })
    .catch((error) => {
      console.error('Erro ao conectar com o MongoDB:', error);
    });// Connect to MongoDB database

// for parsing application/json
app.use(express.json()); 

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
