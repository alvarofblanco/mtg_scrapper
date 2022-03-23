const debug = require('debug')('app');
const express = require('express');

const app = express();
const { getCard } = require('./src/cardService');

app.get('/', async (req, res) => {
  const { cardName } = req.query;
  debug('Card Name', cardName);

  let arr;

  try {
    arr = await getCard(cardName);
  } catch (e) {
    return res.status(500).json({ message: 'Sorry, an error ocurred', error: e.message });
  }

  return res.json({ message: `${cardName} OK`, prices: arr });
});

app.listen(3000, () => debug('App listening on port 3000'));
