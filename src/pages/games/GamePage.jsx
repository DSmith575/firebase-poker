import { useParams } from 'react-router-dom';
import PlayerHand from '../../components/poker/session/gameSession/PlayerHand';
import useGameLobby from '../../hooks/games/useGameLobby';
import useFetchPlayerHand from '../../hooks/games/useFetchPlayerHand';
import ButtonSpinner from '../../components/spinner/ButtonSpinner';
import NavigateLink from '../../components/poker/session/NavigateLink';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { useEffect, useState } from 'react';
import { determineGameOutcome } from '../../utils/poker/evaluateHands';

const GamePage = () => {
  const { gameId } = useParams();
  const { gameLobby, gameFinished } = useGameLobby(gameId);
  const { playerHand, loading, handleSelectCard, handleRemoveSelected, isCurrentTurn } = useFetchPlayerHand(gameId, gameLobby);
  const { user } = useUserAuth();

  const [winner, setWinner] = useState([]);
  const evaluatePlayerHands = () => {
    if (!gameLobby) {
      return false;
    }

    const x = determineGameOutcome(gameLobby);
    setWinner([x]);
  };

  useEffect(() => {
    evaluatePlayerHands();
  }, [gameFinished]);

  return (
    <>
      {loading('playerHand') ? (
        <ButtonSpinner styles="animate-spin h-10 w-10 text-black" />
      ) : gameFinished ? (
        <>
          <p>{user}</p>
          <PlayerHand hand={playerHand} handleSelectCard={handleSelectCard} handleRemoveSelected={handleRemoveSelected} />
          <p>Game has finished</p>
          {/* <NavigateLink navLink={`/games/session/${gameId}/gameResults`} label={'View Results'} /> */}
          {winner &&
            winner.map((win) => (
              <>
                <p>{win.label}</p>
                <PlayerHand
                  hand={win.winner.hand}
                  handleSelectCard={handleSelectCard}
                  handleRemoveSelected={handleRemoveSelected}
                />
              </>
            ))}
        </>
      ) : isCurrentTurn ? (
        <PlayerHand
          hand={playerHand}
          handleSelectCard={handleSelectCard}
          handleRemoveSelected={handleRemoveSelected}
          isCurrentTurn={isCurrentTurn}
        />
      ) : (
        <>
          <PlayerHand hand={playerHand} handleSelectCard={handleSelectCard} handleRemoveSelected={handleRemoveSelected} />
          <p>Waiting for your turn...</p>
        </>
      )}
    </>
  );
};

export default GamePage;
