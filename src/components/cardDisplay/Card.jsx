import { suitSymbols, suitColors } from '../../utils/poker/cards';

const Card = ({ card }) => {
  return (
    <div
      className={`relative w-20 h-28 md:w-[5rem] md:h-[7rem] border border-gray-300 rounded-lg p-2 m-1
      bg-white shadow-lg`}>
      <div className={`absolute top-1 left-1 text-lg ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</div>
      <div className={`absolute bottom-1 right-1 text-lg rotate-180 ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</div>
      <div className={`text-3xl ${suitColors[card.suit]} flex items-center justify-center h-full`}>{card.rank.label}</div>
    </div>
  );
};

export default Card;
