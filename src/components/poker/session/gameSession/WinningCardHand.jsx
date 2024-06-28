import { pokerHands } from '../../../../utils/poker/rules';
import { suitSymbols, suitColors } from '../../../../utils/poker/cards';

const WinningHandCard = ({ rank }) => {
  // Find the matching poker hand by its name for the winning hand example cards to display
  const winningHand = pokerHands.find((pokerHand) => pokerHand.name === rank);

  if (!winningHand) {
    // Handle case where winning hand isn't found
    return null;
  }

  return (
    // Display the winning hand example cards
    // Just a visual representation of the winning hand
    <div className="flex flex-col justify-center items-center mt-8">
      <p className="font-bold text-2xl">{winningHand.name} Example</p>
      <div className="flex">
        {winningHand.cards.map((card, index) => (
          <div
            key={index}
            className="relative w-20 h-28 md:w-[5rem] md:h-[7rem] border border-gray-300 rounded-lg p-2 m-1 bg-white shadow-lg">
            <div className={`absolute top-1 left-1 text-lg ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</div>
            <div className={`absolute bottom-1 right-1 text-lg rotate-180 ${suitColors[card.suit]}`}>
              {suitSymbols[card.suit]}
            </div>
            <div className={`text-3xl ${suitColors[card.suit]} flex items-center justify-center h-full`}>{card.rank}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningHandCard;
