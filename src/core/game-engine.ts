import { EventDispatcher } from '@core/event-dispatcher';
import { GameState } from '@game/entities/game-state';
import { Grid } from '@game/entities/grid';
import { BettingSystem } from '@game/systems/betting-system';
import { MultiplierCalculator } from '@game/systems/multiplier-calculator';
import { RandomGenerator } from '@game/systems/random-generator';
import { type GameEvents } from 'src/types/event-types';
import { GAME_EVENT } from '@utils/enums';

export class GameEngine {
  private grid: Grid;
  private gameState: GameState;

  constructor(
    private readonly events: EventDispatcher<GameEvents>,
    private readonly random: RandomGenerator,
    private readonly bettingSystem: BettingSystem,
    private readonly multiplierCalculator: MultiplierCalculator,
    private readonly gridSize: number,
  ) {
    this.gameState = new GameState();
    this.grid = new Grid(this.gridSize, 0, this.random, this.events);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.events.on(GAME_EVENT.BET_PLACED, ({ amount, mines }) => {
      try {
        this.bettingSystem.placeBet(amount, mines);
        this.startGame(mines);
        this.events.emit(GAME_EVENT.BALANCE_UPDATED, {
          balance: this.bettingSystem.getBalance(),
        });
      } catch (err) {
        console.warn('Bet failed:', (err as Error).message);
      }
    });

    this.events.on(GAME_EVENT.CELL_CLICKED, ({ row, col }) => {
      this.revealCell(row, col);
    });
  }

  startGame(mineCount: number): void {
    if (this.gameState.isPlaying()) return;

    this.gameState.start();
    this.grid = new Grid(this.gridSize, mineCount, this.random, this.events);

    this.events.emit(GAME_EVENT.GAME_STARTED, { grid: this.grid });
  }

  revealCell(row: number, col: number): void {
    const cell = this.grid.getCell(row, col);
    if (cell.isRevealed) return;

    this.grid.reveal(row, col);

    this.events.emit(GAME_EVENT.CELL_REVEALED, {
      row,
      col,
      isMine: cell.isMine,
    });

    if (cell.isMine) {
      this.gameState.gameOver();
      this.events.emit(GAME_EVENT.GAME_OVER, { won: false });
    } else {
      const revealedCount = this.grid.getRevealedCount();
      const mineCount = this.bettingSystem.getMineCount();
      const multiplier = this.multiplierCalculator.calculate(
        revealedCount,
        mineCount,
      );
      const potentialWin = this.bettingSystem.getBetAmount() * multiplier;

      this.events.emit(GAME_EVENT.POTENTIAL_WIN_UPDATED, { potentialWin });
    }
  }

  cashOut(): void {
    const revealedCount = this.grid.getRevealedCount();
    const mineCount = this.bettingSystem.getMineCount();
    const multiplier = this.multiplierCalculator.calculate(
      revealedCount,
      mineCount,
    );
    const winAmount = this.bettingSystem.getBetAmount() * multiplier;

    this.bettingSystem.cashOut(winAmount);
    this.gameState.gameOver();

    this.events.emit(GAME_EVENT.CASHED_OUT, { winAmount });
    this.events.emit(GAME_EVENT.GAME_OVER, { won: true });
  }

  reset(): void {
    this.gameState.reset();
    this.grid.reset();
    this.grid = new Grid(this.gridSize, 0, this.random, this.events);
  }

  getGrid(): Grid {
    return this.grid;
  }

  getGameState(): GameState {
    return this.gameState;
  }
}
