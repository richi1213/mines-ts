import { EventDispatcher } from '@core/event-dispatcher';
import { GameState } from '@game/entities/game-state';
import { Grid } from '@game/entities/grid';
import { BettingSystem } from '@game/systems/betting-system';
import { MultiplierCalculator } from '@game/systems/multiplier-calculator';
import { RandomGenerator } from '@game/systems/random-generator';
import { type GameEvents } from 'src/types/event-types';

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
    this.grid = new Grid(this.gridSize, 0, this.random, this.events); // mines assigned later
  }

  startGame(betAmount: number, mineCount: number): void {
    if (this.gameState.isPlaying()) return;

    this.bettingSystem.placeBet(betAmount, mineCount);
    this.gameState.start();
    this.grid = new Grid(this.gridSize, mineCount, this.random, this.events);

    this.events.emit('BET_PLACED', { amount: betAmount, mines: mineCount });
    this.events.emit('GAME_STARTED', undefined);
  }

  revealCell(row: number, col: number): void {
    if (!this.gameState.isPlaying()) return;

    this.grid.reveal(row, col);
    const cell = this.grid.getCell(row, col);

    if (cell.isMine) {
      this.gameState.gameOver();
      this.events.emit('GAME_OVER', { won: false });
    } else {
      const multiplier = this.multiplierCalculator.calculate(
        this.grid.getRevealedCount(),
        this.bettingSystem.getMineCount(),
      );
      const potentialWin = this.bettingSystem.getBetAmount() * multiplier;
      // Optional: emit multiplier/potential win here
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

    this.events.emit('CASHED_OUT', { winAmount });
    this.events.emit('GAME_OVER', { won: true });
  }

  reset(): void {
    this.gameState.reset();
    this.grid.reset();
  }

  getGrid(): Grid {
    return this.grid;
  }

  getGameState(): GameState {
    return this.gameState;
  }
}
