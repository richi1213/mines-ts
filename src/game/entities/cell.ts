export class Cell {
  private mine = false;
  private revealed = false;

  setMine(value: boolean = true): void {
    this.mine = value;
  }

  reveal(): void {
    this.revealed = true;
  }

  reset(): void {
    this.mine = false;
    this.revealed = false;
  }

  get isMine(): boolean {
    return this.mine;
  }

  get isRevealed(): boolean {
    return this.revealed;
  }
}
