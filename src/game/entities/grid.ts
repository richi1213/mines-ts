import { type GameEvents } from 'src/types/event-types';
import { Cell } from '@game/entities/cell';
import { EventDispatcher } from '@core/event-dispatcher';
import { RandomGenerator } from '@game/systems/random-generator';
import { GAME_EVENT } from '@utils/enums';

export class Grid {
  private readonly size: number;
  private readonly mineCount: number;
  private cells: Cell[] = [];
  private revealedCount = 0;

  constructor(
    size: number,
    mineCount: number,
    private readonly random: RandomGenerator,
    private readonly events: EventDispatcher<GameEvents>,
  ) {
    this.size = size;
    this.mineCount = mineCount;
    this.init();
  }

  private init(): void {
    this.cells = [];

    for (let i = 0; i < this.size * this.size; i++) {
      this.cells.push(new Cell());
    }

    this.placeMines();
  }

  private placeMines(): void {
    const indices = this.random.sample(this.size * this.size, this.mineCount);
    for (const index of indices) {
      this.cells[index].setMine(true);
    }
  }

  private index(row: number, col: number): number {
    return row * this.size + col;
  }

  reveal(row: number, col: number): void {
    const index = this.index(row, col);
    const cell = this.cells[index];

    if (cell.isRevealed) return;

    cell.reveal();
    this.revealedCount++;

    this.events.emit(GAME_EVENT.CELL_REVEALED, {
      row,
      col,
      isMine: cell.isMine,
    });

    if (cell.isMine) {
      this.events.emit(GAME_EVENT.GAME_OVER, { won: false });
    }
  }

  getCell(row: number, col: number): Cell {
    return this.cells[this.index(row, col)];
  }

  getAllCells(): Cell[] {
    return this.cells;
  }

  reset(): void {
    this.revealedCount = 0;
    this.init();
  }

  getRevealedCount(): number {
    return this.revealedCount;
  }
}
