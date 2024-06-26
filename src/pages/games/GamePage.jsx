import { useParams } from 'react-router-dom';
import PlayerHand from '../../components/poker/session/gameSession/PlayerHand';
import useGameLobby from '../../hooks/games/useGameLobby';
import useFetchPlayerHand from '../../hooks/games/useFetchPlayerHand';
import ButtonSpinner from '../../components/spinner/ButtonSpinner';

const GamePage = () => {
  const { gameId } = useParams();
  const { gameLobby } = useGameLobby(gameId);
  const { playerHand, loading, handleSelectCard, handleRemoveSelected, isCurrentTurn } = useFetchPlayerHand(gameId, gameLobby);

  return (
    <>
      {loading('playerHand') ? (
        <ButtonSpinner styles="animate-spin h-10 w-10 text-black" />
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
