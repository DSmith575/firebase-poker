import { useState, useEffect } from 'react';

const usePlayerHand = ({ handleSelectCard, handleRemoveSelected, isCurrentTurn }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  // Toggle card selection
  const toggleCardSelection = (card) => {
    if (!isCurrentTurn) return;
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(card)) {
        return prevSelectedCards.filter((selectedCard) => selectedCard !== card);
      } else {
        return [...prevSelectedCards, card];
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
    if (isCurrentTurn) {
      await handleRemoveSelected(selectedCards);
      setSelectedCards([]);
    }
  };

  return {
    selectedCards,
    toggleCardSelection,
    handleSubmit,
  };
};

export default usePlayerHand;
