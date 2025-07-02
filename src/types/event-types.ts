export type GameEvents = {
  CELL_REVEALED: { row: number; col: number; isMine: boolean };
  BET_PLACED: { amount: number; mines: number };
  GAME_STARTED: undefined;
  GAME_OVER: { won: boolean };
  CASHED_OUT: { winAmount: number };
  POTENTIAL_WIN_UPDATED: { potentialWin: number };
};
