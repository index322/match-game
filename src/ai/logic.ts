export const getComputerMatchesTurn = (
  matchesLeft: number,
  maxPerTurn: number
) => {
  let matchesToTake = matchesLeft % (maxPerTurn + 1);

  if (matchesToTake === 0) {
    matchesToTake = 1;
  }

  return matchesToTake;
};
