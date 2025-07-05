import { GAME_CONFIG } from '@config/game-config';

export class MultiplierCalculator {
  calculate(revealedSafeCells: number, totalMines: number): number {
    const gridSize = GAME_CONFIG.GRID_SIZE;
    const totalCells = gridSize * gridSize;

    if (totalMines <= 0 || revealedSafeCells < 0 || totalMines >= totalCells)
      return 1;

    const safeCells = totalCells - totalMines;
    const clampedRevealed = Math.min(revealedSafeCells, safeCells);

    return this.computeMultiplier(totalMines, clampedRevealed);
  }

  private computeMultiplier(mineCount: number, revealed: number): number {
    const base = Math.max(1.01, 1.2 + mineCount / 25);
    return Math.pow(base, revealed);
  }
}
