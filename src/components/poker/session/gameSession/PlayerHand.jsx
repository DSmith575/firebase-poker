import Button from '../../../button/Button';
import usePlayerHand from '../../../../hooks/games/usePlayerHand';
import { suitSymbols, suitColors } from '../../../../utils/poker/cards';

const PlayerHand = ({ hand, handleSelectCard, handleRemoveSelected, isCurrentTurn }) => {
  const { selectedCards, toggleCardSelection, handleSubmit } = usePlayerHand({
    handleSelectCard,
    handleRemoveSelected,
    isCurrentTurn,
  });

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <Button
            label="Discard Selected Cards / End Turn"
            styles={` bg-green-500 text-black rounded-md px-2 py-2 hover:bg-green-600 transition ease-in-out duration-300 ${isCurrentTurn ? 'block' : 'hidden'}`}
            onClick={handleSubmit}
            type={'submit'}
          />
        </div>
        <div className="flex">
          {hand &&
            hand.length > 0 &&
            hand.map((card, index) => (
              <div
                key={index}
                className={`relative w-20 h-28 md:w-[5rem] md:h-[7rem] border border-gray-300 rounded-lg p-2 m-1
            bg-white shadow-lg ${isCurrentTurn ? 'cursor-pointer' : 'not-allowed'} 
            ${selectedCards.includes(card) ? 'bg-yellow-300' : 'hover:bg-blue-200'}`}
                onClick={() => {
                  toggleCardSelection(card);
                  handleSelectCard(selectedCards);
                }}>
                <div className={`absolute top-1 left-1 text-lg ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</div>
                <div className={`absolute bottom-1 right-1 text-lg rotate-180 ${suitColors[card.suit]}`}>
                  {suitSymbols[card.suit]}
                </div>
                <div className={`text-3xl ${suitColors[card.suit]} flex items-center justify-center h-full`}>
                  {card.rank.label}
                </div>
              </div>
            ))}
        </div>
      </form>
    </>
  );
};

export default PlayerHand;
