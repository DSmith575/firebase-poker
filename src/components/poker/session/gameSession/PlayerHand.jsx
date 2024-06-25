import { useState, useEffect } from 'react';

const PlayerHand = ({ hand, handleSelectCard, handleRemoveSelected }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const toggleCardSelection = (card) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(card)) {
        return prevSelectedCards.filter((selectedCard) => selectedCard !== card);
      } else {
        return [...prevSelectedCards, card];
      }
    });
  };

  useEffect(() => {
    handleSelectCard(selectedCards);
  }, [selectedCards, handleSelectCard]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRemoveSelected(selectedCards);
    setSelectedCards([]);
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
