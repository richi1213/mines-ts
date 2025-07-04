import { EventDispatcher } from '@core/event-dispatcher';
import { GameState } from '@game/entities/game-state';
import { Grid } from '@game/entities/grid';
import { BettingSystem } from '@game/systems/betting-system';
import { MultiplierCalculator } from '@game/systems/multiplier-calculator';
import { RandomGenerator } from '@game/systems/random-generator';
import { GameEvents } from 'src/types/event-types';
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
  }

  startGame(betAmount: number, mineCount: number): void {
    if (this.gameState.isPlaying()) return;

    this.bettingSystem.placeBet(betAmount, mineCount);
    this.gameState.start();
    this.grid = new Grid(this.gridSize, mineCount, this.random, this.events);

    this.events.emit(GAME_EVENT.BET_PLACED, {
      amount: betAmount,
      mines: mineCount,
    });
    this.events.emit(GAME_EVENT.GAME_STARTED, undefined);
  }

  revealCell(row: number, col: number): void {
    if (!this.gameState.isPlaying()) return;

    this.grid.reveal(row, col);
    const cell = this.grid.getCell(row, col);

    if (cell.isMine) {
      this.gameState.gameOver();
      this.events.emit(GAME_EVENT.GAME_OVER, { won: false });
    } else {
      const multiplier = this.multiplierCalculator.calculate(
        this.grid.getRevealedCount(),
        this.bettingSystem.getMineCount(),
      );
      const potentialWin = this.bettingSystem.getBetAmount() * multiplier;
      this.events.emit(GAME_EVENT.POTENTIAL_WIN_UPDATED, {
        potentialWin,
      });
    }
  }

  cashOut(): void {
    if (!this.gameState.isPlaying()) return;

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
