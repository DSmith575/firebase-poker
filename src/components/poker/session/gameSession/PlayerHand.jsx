import { useState } from 'react';

const PlayerHand = ({ hand, handleSelectCard, handleRemoveSelected }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const toggleCardSelection = (card) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter((selectedCard) => selectedCard !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRemoveSelected(selectedCards);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      {hand &&
        hand.length > 0 &&
        hand.map((card, index) => (
          <div
            key={index}
            className={`cursor-pointer border border-gray-300 rounded-md p-2 ${selectedCards.includes(card) ? 'bg-yellow-300' : 'hover:bg-blue-200'}`}
            onClick={() => {
              toggleCardSelection(card);
              handleSelectCard(selectedCards);
            }}>
            {card.suit} {card.rank.label}
          </div>
        ))}
      <button>Discard Selected</button>
    </form>
  );
};

export default PlayerHand;
