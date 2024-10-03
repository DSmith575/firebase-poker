import { useState, useEffect } from 'react';

const usePlayerHand = ({ handleSelectCard, handleRemoveSelected, isCurrentTurn }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  // Toggle card selection
  const toggleCardSelection = (card) => {
    if (!isCurrentTurn) return;

    setSelectedCards((prevSelectedCards) => {
      const isCardSelected = prevSelectedCards.includes(card);
      if (isCardSelected) {
        const newSelectedCards = prevSelectedCards.filter((selectedCard) => selectedCard !== card);
        const newCards = newSelectedCards;
        return newCards;
      } else {
        const newSelectedCards = [...prevSelectedCards, card];
        return newSelectedCards;
      }
    });
  };

  useEffect(() => {
    if (!isCurrentTurn) {
      handleSelectCard(selectedCards);
    }
  }, [selectedCards, handleSelectCard, isCurrentTurn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentSelectedCard = selectedCards;
    await handleRemoveSelected(currentSelectedCard);
    setSelectedCards([]);
  };

  return {
    selectedCards,
    toggleCardSelection,
    handleSubmit,
  };
};

export default usePlayerHand;
