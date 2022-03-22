const { getCard } = require('../src/cardService');

describe('Card Service', () => {
  let arr;

  it('Gets a card', async () => {
    arr = await getCard('Path to Exile');
    expect(arr.length > 0);
  });
});
