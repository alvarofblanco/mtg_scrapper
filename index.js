require('dotenv').config();
const debug = require('debug')('app');
const morgan = require('morgan');
const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
const { getCard } = require('./src/cardService');

app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const { cardName } = req.query;
  if (cardName === undefined) {
    return res.status(400).send('no cardName provided');
  }

  let arr;

  try {
    arr = await getCard(cardName);
    if (arr.length === 0) {
      throw new Error('No card founded');
    }
  } catch (e) {
    return res.status(500).json({ message: 'Sorry, an error ocurred', error: e.message });
  }

  return res.json({ message: `${cardName} OK`, prices: arr });
});

app.use((req, res) => res.status(404).send('Sorry cant find that'));

app.listen(PORT, () => debug(`App listening on port ${PORT}`));
