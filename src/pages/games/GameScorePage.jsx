import { useParams } from 'react-router-dom';
import useGameLobby from '../../hooks/games/useGameLobby';
import { useEffect, useState } from 'react';
import { evaluateHand, determineWinner } from '../../utils/poker/evaluateHands';
import { set } from 'firebase/database';

const GameScorePage = () => {
  const { gameId } = useParams();
  const { gameLobby } = useGameLobby(gameId);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (gameLobby && gameLobby.length > 0) {
      setPlayers(gameLobby);
    }
  }, [gameLobby, players]);

  const determineGameOutcome = () => {
    // Ensure players have been set and have valid hands
    if (players.length === 0) return 'Comparing hands...';

    // Evaluate each player's hand
    const playerEvaluations = players.map((player) => ({
      playerId: player.playerId,
      evaluation: evaluateHand(player.hand),
      hand: player.hand,
    }));

    // Determine the winner(s)
    const winners = determineWinner(playerEvaluations);
    console.log(winners);

    // Check for draw scenario
    if (winners.length === players.length) {
      return "It's a draw!";
    } else if (winners.length === 1) {
      const winner = winners[0];
      return `Player ${winner.playerId} wins with ${winner.evaluation.rank}`;
    }
  };

  const winner = determineGameOutcome();

  return (
    <div>
      <h2>Game Score Page</h2>
      {/* Render additional game details or player hands as needed */}
    </div>
  );
};

export default GameScorePage;
