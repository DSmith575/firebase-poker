const Suit = {
  SPADE: 'Spade',
  HEART: 'Heart',
  CLUB: 'Club',
  DIAMOND: 'Diamond',
};

const Rank = {
  TWO: { label: '2', value: 2 },
  THREE: { label: '3', value: 3 },
  FOUR: { label: '4', value: 4 },
  FIVE: { label: '5', value: 5 },
  SIX: { label: '6', value: 6 },
  SEVEN: { label: '7', value: 7 },
  EIGHT: { label: '8', value: 8 },
  NINE: { label: '9', value: 9 },
  TEN: { label: '10', value: 10 },
  JACK: { label: 'J', value: 11 },
  QUEEN: { label: 'Q', value: 12 },
  KING: { label: 'K', value: 13 },
  ACE: { label: 'A', value: 14 },
};

export const createDeck = () => {
  const deck = [];
  for (const suitKey in Suit) {
    for (const rankKey in Rank) {
      const card = {
        suit: Suit[suitKey],
        rank: Rank[rankKey],
      };
      deck.push(card);
    }
  }
  return deck;
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
