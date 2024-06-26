import { useParams } from 'react-router-dom';
import useGameLobby from '../../hooks/games/useGameLobby';
import { useEffect } from 'react';

const GameScorePage = () => {
  const { gameId } = useParams();
  const { gameLobby } = useGameLobby(gameId);

  // const evaluations = gameLobby.map((player) => ({
  //   playerId: player.playerId,
  //   evaluation: evaluateHand(player.hand),
  //   hand: player.hand
  // }));

  // // Find the best hand among players
  // let bestPlayer = evaluations[0];

  // for (const player of evaluations) {
  //   if (compareHands(player.hand, bestPlayer.hand) === "Player 1 wins") {
  //     bestPlayer = player;
  //   }
  // }

  return (
    <div>
      <h1>Game Score Page</h1>
      {/* {evaluations.map((player, index) => (
        <div key={player.playerId}>
          <h2>Player {index + 1}</h2>
          <p>Player ID: {player.playerId}</p>
          <p>Hand: {JSON.stringify(player.hand)}</p>
          <p>Evaluation: {player.evaluation.rank} with high card {player.evaluation.highCard}</p>
        </div>
      ))}
      <h2>Result: Player {evaluations.indexOf(bestPlayer) + 1} wins with a {bestPlayer.evaluation.rank}</h2> */}
    </div>
  );
};

export default GameScorePage;

// export const fullHouse = (hand) => {
//   const valueCounts = {};

//   hand.forEach(card => {
//     valueCounts[card.rank.value] = (valueCounts[card.rank.value] || 0) + 1;
//   });

//   const threeOfAKind = Object.keys(valueCounts).find(value => valueCounts[value] === 3);
//   const pair = Object.keys(valueCounts).find(value => valueCounts[value] === 2);

//   if (threeOfAKind && pair) {
//     return { rank: 'Full House', value: 7, highCard: parseInt(threeOfAKind) };
//   }

//   return false;
// };

// export const multiples = (hand, count) => {
//   const valueCounts = {};

//   hand.forEach(card => {
//     valueCounts[card.rank.value] = (valueCounts[card.rank.value] || 0) + 1;
//   });

//   const multipleValue = Object.keys(valueCounts).find(value => valueCounts[value] === count);

//   if (multipleValue) {
//     return { rank: count === 4 ? 'Four of a Kind' : count === 3 ? 'Three of a Kind' : 'One Pair', value: count === 4 ? 8 : count === 3 ? 4 : 2, highCard: parseInt(multipleValue) };
//   }

//   return false;
// };

// export const twoPair = (hand) => {
//   const valueCounts = {};

//   hand.forEach(card => {
//     valueCounts[card.rank.value] = (valueCounts[card.rank.value] || 0) + 1;
//   });

//   const pairs = Object.keys(valueCounts).filter(value => valueCounts[value] === 2).map(Number).sort((a, b) => b - a);

//   if (pairs.length === 2) {
//     return { rank: 'Two Pair', value: 3, highCard: pairs[0] };
//   }

//   return false;
// };

// export const straight = (hand) => {
//   const uniqueValues = [...new Set(hand.map(card => card.rank.value))].sort((a, b) => a - b);

//   if (uniqueValues.length < 5) {
//     return false;
//   }

//   for (let i = 0; i <= uniqueValues.length - 5; i++) {
//     if (uniqueValues[i + 4] - uniqueValues[i] === 4) {
//       return { rank: 'Straight', value: 5, highCard: uniqueValues[i + 4] };
//     }
//   }

//   if (uniqueValues.includes(14) && uniqueValues.slice(0, 4).every((val, index) => val === 5 - index)) {
//     return { rank: 'Straight', value: 5, highCard: 5 }; // Low Ace Straight
//   }

//   return false;
// };

// export const flush = (hand) => {
//   const suitCounts = {};

//   hand.forEach(card => {
//     suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
//   });

//   const flushSuit = Object.keys(suitCounts).find(suit => suitCounts[suit] >= 5);

//   if (flushSuit) {
//     const flushHand = hand.filter(card => card.suit === flushSuit).sort((a, b) => b.rank.value - a.rank.value);
//     return { rank: 'Flush', value: 6, highCard: flushHand[0].rank.value };
//   }

//   return false;
// };

// export const straightFlush = (hand) => {
//   const flushHand = flush(hand);

//   if (flushHand) {
//     const straightHand = straight(flushHand);
//     if (straightHand) {
//       return { rank: 'Straight Flush', value: 9, highCard: straightHand.highCard };
//     }
//   }

//   return false;
// };

// export const royalFlush = (hand) => {
//   const straightFlushHand = straightFlush(hand);

//   if (straightFlushHand && straightFlushHand.highCard === 14) {
//     return { rank: 'Royal Flush', value: 10, highCard: 14 };
//   }

//   return false;
// };

// export const evaluateHand = (hand) => {
//   const handRanks = hand.map(card => card.rank.value);
//   const handSuits = hand.map(card => card.suit);

//   if (royalFlush(handRanks, handSuits)) return { rank: "Royal Flush", highCard: 14 };
//   if (straightFlush(handRanks, handSuits)) return { rank: "Straight Flush", highCard: Math.max(...handRanks) };
//   if (multiples(handRanks, 4)) return { rank: "Four of a Kind", highCard: multiples(handRanks, 4) };
//   if (fullHouse(handRanks)) return { rank: "Full House", highCard: fullHouse(handRanks) };
//   if (flush(handSuits)) return { rank: "Flush", highCard: Math.max(...handRanks) };
//   if (straight(handRanks)) return { rank: "Straight", highCard: straight(handRanks) };
//   if (multiples(handRanks, 3)) return { rank: "Three of a Kind", highCard: multiples(handRanks, 3) };
//   if (twoPair(handRanks)) return { rank: "Two Pair", highCard: twoPair(handRanks) };
//   if (multiples(handRanks, 2)) return { rank: "One Pair", highCard: multiples(handRanks, 2) };

//   return { rank: "High Card", highCard: Math.max(...handRanks) };
// };

// export const compareHands = (hand1, hand2) => {
//   const hand1Evaluation = evaluateHand(hand1);
//   const hand2Evaluation = evaluateHand(hand2);

//   const handRanks = ["High Card", "One Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush"];

//   const hand1RankIndex = handRanks.indexOf(hand1Evaluation.rank);
//   const hand2RankIndex = handRanks.indexOf(hand2Evaluation.rank);

//   if (hand1RankIndex > hand2RankIndex) return "Player 1 wins";
//   if (hand1RankIndex < hand2RankIndex) return "Player 2 wins";
//   if (hand1Evaluation.highCard > hand2Evaluation.highCard) return "Player 1 wins";
//   if (hand1Evaluation.highCard < hand2Evaluation.highCard) return "Player 2 wins";

//   return "It's a draw";
// };
