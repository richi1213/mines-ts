import { GAME_CONFIG } from '@config/game-config';

export class MultiplierCalculator {
  calculate(revealedSafeCells: number, totalMines: number): number {
    if (totalMines <= 0 || revealedSafeCells < 0) return 1;

    const totalCells = GAME_CONFIG.GRID_SIZE * GAME_CONFIG.GRID_SIZE;
    const safeCells = totalCells - totalMines;

    if (revealedSafeCells > safeCells) return 1;

    const multiplier = this.computeMultiplier(
      totalCells,
      totalMines,
      revealedSafeCells,
    );
    return parseFloat(multiplier.toFixed(2));
  }

  private computeMultiplier(
    totalCells: number,
    mineCount: number,
    revealed: number,
  ): number {
    // Grows faster with fewer mines, slows with more revealed
    const base = 1.2 + mineCount / 25;
    return Math.pow(base, revealed);
  }
}
