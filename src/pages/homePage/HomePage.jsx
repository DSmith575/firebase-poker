import CardDisplay from '../../components/cardDisplay/CardDisplay';
import PokerHandExamples from '../games/HandExamples';

const HomePage = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 flex justify-center items-center overflow-x-hidden">
        <CardDisplay animate={'animate-marquee'} />
      </div>
      <div className="col-span-2 flex justify-center">
        <PokerHandExamples />
      </div>
      <div className="col-span-2 flex justify-center items-center overflow-x-hidden">
        <CardDisplay animate={'animate-marqueeReverse'} />
      </div>
    </div>
  );
};

export default HomePage;
