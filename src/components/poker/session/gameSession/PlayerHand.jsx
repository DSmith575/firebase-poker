import Button from '../../../button/Button';
import usePlayerHand from '../../../../hooks/games/usePlayerHand';

const PlayerHand = ({ hand, handleSelectCard, handleRemoveSelected, isCurrentTurn }) => {
  const { selectedCards, toggleCardSelection, handleSubmit } = usePlayerHand({
    handleSelectCard,
    handleRemoveSelected,
    isCurrentTurn,
  });

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      {hand &&
        hand.length > 0 &&
        hand.map((card, index) => (
          <div
            key={index}
            className={`${isCurrentTurn ? 'cursor-pointer' : 'not-allowed'} border border-gray-300 rounded-md p-2 ${selectedCards.includes(card) ? 'bg-yellow-300' : 'hover:bg-blue-200'}`}
            onClick={() => {
              toggleCardSelection(card);
              handleSelectCard(selectedCards);
            }}>
            {card.suit} {card.rank.label}
          </div>
        ))}
      {isCurrentTurn && (
        <Button
          label={'Discard Selected Cards/End Turn'}
          styles={'bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 transition ease-in-out duration-300'}
        />
      )}
    </form>
  );
};

export default PlayerHand;
