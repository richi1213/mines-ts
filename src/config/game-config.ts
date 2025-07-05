export enum GAME_CONFIG {
  BACKGROUND_COLOR = '#0284c7',
  GRID_SIZE = 5,
  CELL_SIZE = 60,
  INITIAL_BETTING_BALANCE = 100,
}

export enum GAME_PHASE {
  IDLE = 'idle',
  BETTING = 'betting',
  PLAYING = 'playing',
  GAME_OVER = 'game-over',
  CASHED_OUT = 'cashed-out',
}
