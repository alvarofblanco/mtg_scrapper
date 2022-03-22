/* eslint-disable no-console */
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { getCard } = require('./src/cardService');
// TODO add tests

(async () => {
  const { argv } = yargs(hideBin(process.argv));
  const cardName = argv.name;
  let cardPrices;

  if (!cardName) {
    console.log('No card name provided - terminating program');
    return;
  }

  try {
    cardPrices = await getCard(cardName);
  } catch (e) {
    console.error('Could not fetch card prices', e.message);
  }

  console.table(cardPrices);
})();
