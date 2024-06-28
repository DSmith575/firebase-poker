import React from 'react';
import { suitSymbols, suitColors } from '../../utils/poker/cards';
import { pokerHands } from '../../utils/poker/rules';

const PokerHandExamples = () => {
  return (
    <div className="py-8">
      <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {pokerHands.map((hand, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-center">{hand.name}</h3>
            <div className="flex flex-wrap justify-center">
              {hand.cards.map((card, index) => (
                <div key={index} className="flex items-center m-1">
                  <div className={`text-3xl ${suitColors[card.suit]} mr-1`}>{suitSymbols[card.suit]}</div>
                  <div>{card.rank}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokerHandExamples;
