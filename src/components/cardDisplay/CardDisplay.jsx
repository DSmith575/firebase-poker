import { createDeck } from '../../utils/poker/createDeck';
import Card from './Card';

const CardDisplay = ({ animate }) => {
  const deck = createDeck();

  return (
    <div className="relative flex overflow-x-hidden w-full">
      <div className={`flex whitespace-no-wrap ${animate}`}>
        {deck.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;
