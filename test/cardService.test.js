const { getCard } = require('../src/cardService');

describe('Card Service', () => {
  let arr;

  it('Gets empty when name does not exists', async () => {
    arr = await getCard('Hoy no la pongo');
    expect(arr).toBeInstanceOf(Array);
    expect(arr.length).toBe(0);
  });

  it('Gets a card', async () => {
    arr = await getCard('Path to Exile');
    expect(arr).toBeInstanceOf(Array);
    expect(arr.length).toBeGreaterThan(0);
  });

  it('Gets error', async () => {
    arr = await getCard();
    expect(arr).toBeInstanceOf(Array);
    expect(arr.length).toBe(0);
  });

  // trying with Futy (MH2) because it does not have any
  // reprints. When reprinted, this test will fail
  it('Gets diferent cards according to name', async () => {
    arr = await getCard('fury');
    expect(arr).toBeInstanceOf(Array);
    expect(arr[0].name).not.toBe(arr[1].name);
  });
});
