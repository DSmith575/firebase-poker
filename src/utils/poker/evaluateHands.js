// Check if all cards have the same suit
export const isFlush = (hand) => {
  return hand.every((card) => card.suit === hand[0].suit);
};

// Check if all cards form a "straight" (consecutive values)
export const isStraight = (sortedHand) => {
  for (let i = 0; i < sortedHand.length - 1; i++) {
    if (sortedHand[i + 1].rank.value !== sortedHand[i].rank.value + 1) {
      // Special case for A-2-3-4-5 (Ace low straight)
      if (!(i === 0 && sortedHand[0].rank.value === 2 && sortedHand[4].rank.value === 14)) {
        return false;
      }
    }
  }
  return true;
};

// Evaluate if the hand is a flush and return detailed evaluation if true
export const evaluateFlush = (hand) => {
  if (isFlush(hand)) {
    const sortedHand = hand.slice().sort((a, b) => b.rank.value - a.rank.value); // Sort by rank value descending
    return {
      rank: 'Flush',
      value: 5,
      highCard: sortedHand[0].rank.value,
    };
  }
  return false;
};

// Evaluate if the hand is a straight and return detailed evaluation if true
export const evaluateStraight = (hand) => {
  // Sort hand by rank value ascending
  const sortedHand = hand.slice().sort((a, b) => a.rank.value - b.rank.value);

  if (isStraight(sortedHand)) {
    return {
      rank: 'Straight',
      value: 6,
      highCard: sortedHand[sortedHand.length - 1].rank.value, // Highest card in the straight
    };
  }
  return false;
};

// Check if hand is a full house (three of a kind and a pair)
export const isFullHouse = (hand) => {
  const valueCounts = {};

  hand.forEach((card) => {
    valueCounts[card.rank.value] = (valueCounts[card.rank.value] || 0) + 1;
  });

  const threeOfAKind = Object.keys(valueCounts).find((value) => valueCounts[value] === 3);
  const pair = Object.keys(valueCounts).find((value) => valueCounts[value] === 2);

  if (threeOfAKind && pair) {
    return {
      rank: 'Full House',
      value: 7,
      highCard: parseInt(threeOfAKind),
    };
  }

  return false;
};

// Check if the hand contains n number of multiples (n of a kind)
export const isMultiples = (hand, count) => {
  const valueCounts = {};

  // Count occurrences of each rank value in the hand
  hand.forEach((card) => {
    valueCounts[card.rank.value] = (valueCounts[card.rank.value] || 0) + 1;
  });

  // Filter out rank values that occur 'count' times
  const multiples = Object.keys(valueCounts)
    .filter((value) => valueCounts[value] === count)
    .map(Number);

  if (multiples.length > 0) {
    // Sort multiples in descending order to get the highest value first
    multiples.sort((a, b) => b - a);

    // Return the highest multiple with its rank and value
    return {
      rank: count === 4 ? 'Four of a Kind' : count === 3 ? 'Three of a Kind' : 'One Pair',
      value: count === 4 ? 8 : count === 3 ? 4 : 2, // Assign appropriate values for different multiples
      highCard: multiples[0], // Highest value among the multiples
    };
  }

  return false; // Return false if no multiples of 'count' were found
};

// Check if the hand contains two pairs with the same rank
export const isTwoPair = (hand) => {
  const valueCounts = {};

  hand.forEach((card) => {
    valueCounts[card.rank.value] = (valueCounts[card.rank.value] || 0) + 1;
  });

  const pairs = Object.keys(valueCounts)
    .filter((value) => valueCounts[value] === 2)
    .map(Number)
    .sort((a, b) => b - a);

  if (pairs.length === 2) {
    return {
      rank: 'Two Pair',
      value: 3,
      highCard: pairs[0],
    };
  }

  return false;
};

// Check if the hand is a "straight flush" (values of the same suit)
export const isStraightFlush = (hand) => {
  const flushHand = isFlush(hand);
  if (!flushHand) return false;

  const straightHand = isStraight(flushHand);

  if (straightHand) {
    return {
      rank: 'Straight Flush',
      value: 9,
      highCard: hand[0].rank.value,
    };
  }

  return false;
};

// Check if the hand is a "royal flush" (10, J, Q, K, A of the same suit)
export const isRoyalFlush = (hand) => {
  const straightFlushHand = isStraightFlush(hand);

  if (straightFlushHand && straightFlushHand.highCard === 14) {
    return {
      rank: 'Royal Flush',
      value: 10,
      highCard: 14,
    };
  }

  return false;
};

// Evaluate the hand to determine its rank
export const evaluateHand = (hand) => {
  const sortedHand = hand.slice().sort((a, b) => b.rank.value - a.rank.value);
  return (
    isRoyalFlush(sortedHand) ||
    isStraightFlush(sortedHand) ||
    isMultiples(sortedHand, 4) ||
    isFullHouse(sortedHand) ||
    evaluateFlush(sortedHand) ||
    evaluateStraight(sortedHand) ||
    isMultiples(sortedHand, 3) ||
    isTwoPair(sortedHand) ||
    isMultiples(sortedHand, 2) || {
      rank: 'High Card',
      value: 1,
      highCard: Math.max(...sortedHand.map((card) => card.rank.value)),
    }
  );
};

// Evaluate players' hands and return their evaluations
export const evaluatePlayers = (players) => {
  return players.map((player) => ({
    playerId: player.playerId,
    evaluation: evaluateHand(player.hand),
    hand: player.hand,
  }));
};

// Determine the winner(s) based on their hand evaluations
export const determineWinner = (playerEvaluations) => {
  const sortedPlayers = playerEvaluations.sort((a, b) => {
    if (b.evaluation.value === a.evaluation.value) {
      return b.evaluation.highCard - a.evaluation.highCard;
    }
    return b.evaluation.value - a.evaluation.value;
  });

  const highestValue = sortedPlayers[0].evaluation.value;
  const highestHighCard = sortedPlayers[0].evaluation.highCard;

  // Find all players with the highest evaluation
  const winners = sortedPlayers.filter(
    (player) => player.evaluation.value === highestValue && player.evaluation.highCard === highestHighCard,
  );

  return winners;
};

// Determine the outcome of the game based on the players' evaluations
export const determineGameOutcome = (players) => {
  if (players.length === 0) return 'No players in the game.';

  // Evaluate each player's hand
  const playerEvaluations = evaluatePlayers(players);

  const winners = determineWinner(playerEvaluations);

  // Check for draw scenario
  if (winners.length === players.length) {
    return "It's a draw!";
  } else if (winners.length === 1) {
    const winner = winners[0];
    return {
      winner: winner,
      label: `Player ${winner.playerId} wins with ${winner.evaluation.rank}`,
    };
  } else {
    // Handle cases where no clear winner or draw is determined
    return 'Unable to determine the game outcome.';
  }
};
