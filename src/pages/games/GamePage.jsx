import { useParams } from 'react-router-dom';
import PlayerHand from '../../components/poker/session/gameSession/PlayerHand';
import useGameLobby from '../../hooks/games/useGameLobby';
import useFetchPlayerHand from '../../hooks/games/useFetchPlayerHand';
import ButtonSpinner from '../../components/spinner/ButtonSpinner';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { useEffect, useState } from 'react';
import { determineGameOutcome } from '../../utils/poker/evaluateHands';
import PokerHandExamples from './HandExamples';
import WinningHandCard from '../../components/poker/session/gameSession/WinningCardHand'; // Adjust import path as needed

const GamePage = () => {
  const { gameId } = useParams();
  const { gameLobby, gameFinished } = useGameLobby(gameId);
  const { playerHand, loading, handleSelectCard, handleRemoveSelected, isCurrentTurn } = useFetchPlayerHand(gameId, gameLobby);
  const { user } = useUserAuth();
  const [winner, setWinner] = useState([]);

  const evaluatePlayerHands = () => {
    if (!gameLobby || gameLobby.length === 0) {
      return;
    }
    const checkOutcome = determineGameOutcome(gameLobby);

    setWinner([checkOutcome]);
  };

  useEffect(() => {
    evaluatePlayerHands();
  }, [gameFinished]);

  return (
    <>
      {/* If gameFinished === true runs the "ending screen" and displays winners
    If isCurrentTurn === true, displays the current player's hand and allows them to select cards
    If isCurrentTurn === false, displays the current player's hand and shows a message that it's not their turn
    If loading('playerHand') or loading('gameLobby') is true, shows a loading spinner
*/}

      <section className="grid grid-cols-2 grid-rows-4 sm:grid-rows-none md:grid-rows-none">
        {loading('playerHand') ? (
          <ButtonSpinner styles="animate-spin h-10 w-10 text-black" />
        ) : gameFinished ? (
          <div className="col-span-full">
            <p className="flex justify-center font-bold text-3xl">Game has finished</p>
            <div className="flex flex-col justify-center items-center mt-8">
              <p className="font-bold text-2xl">{user && 'Your Hand'}</p>
              <PlayerHand hand={playerHand} handleSelectCard={handleSelectCard} handleRemoveSelected={handleRemoveSelected} />
              {winner &&
                winner.length > 0 &&
                winner.map((win) => (
                  <div className="mt-8" key={win.label}>
                    <p className="font-bold text-2xl text-center">Winning Hand</p>
                    {win.winner ? (
                      <>
                        <PlayerHand
                          hand={win.winner.hand}
                          handleSelectCard={handleSelectCard}
                          handleRemoveSelected={handleRemoveSelected}
                        />
                        <p className="font-bold text-1xl">{win.label}</p>
                        <WinningHandCard rank={win.evaluation} />
                      </>
                    ) : (
                      <p className="font-bold text-red-500">No winning hand found</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ) : isCurrentTurn ? (
          <>
            <div className="flex col-span-full justify-center">
              <PokerHandExamples />
            </div>
            <div className="row-start-4 col-span-full flex justify-center">
              <PlayerHand
                hand={playerHand}
                handleSelectCard={handleSelectCard}
                handleRemoveSelected={handleRemoveSelected}
                isCurrentTurn={isCurrentTurn}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex col-span-full justify-center">
              <PokerHandExamples />
            </div>
            <div className="col-span-full">
              <p className="flex justify-center items-center px-2 py-2 animate-pulse">Waiting for your turn...</p>
              <div className="flex justify-center">
                <PlayerHand hand={playerHand} handleSelectCard={handleSelectCard} handleRemoveSelected={handleRemoveSelected} />
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default GamePage;
