import { Container, Text, Graphics } from 'pixi.js';

export class MinesSelector {
  public container: Container = new Container();

  private minesCount: number = 3;
  private readonly minMines = 1;
  private readonly maxMines = 24;

  private label: Text;
  private plusButton: Container;
  private minusButton: Container;

  constructor() {
    this.label = new Text({
      text: `Mines: ${this.minesCount}`,
      style: {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0xffffff,
      },
    });

    this.container.addChild(this.label);

    this.plusButton = this.createButton('+', 100, 0, () => this.adjustMines(1));
    this.minusButton = this.createButton('-', 150, 0, () =>
      this.adjustMines(-1),
    );

    this.container.addChild(this.plusButton, this.minusButton);
  }

  private adjustMines(amount: number): void {
    const next = this.minesCount + amount;
    if (next >= this.minMines && next <= this.maxMines) {
      this.minesCount = next;
      this.label.text = `Mines: ${this.minesCount}`;
    }
  }

  private createButton(
    label: string,
    x: number,
    y: number,
    onClick: () => void,
  ): Container {
    const button = new Container();
    const bg = new Graphics().roundRect(0, 0, 30, 30, 4).fill(0x333333);

    const text = new Text({
      text: label,
      style: { fontSize: 16, fill: 0xffffff },
    });
    text.anchor.set(0.5);
    text.x = 15;
    text.y = 15;

    button.addChild(bg, text);
    button.x = x;
    button.y = y;
    button.eventMode = 'static';
    button.cursor = 'pointer';
    button.on('pointertap', onClick);

    return button;
  }

  getCount(): number {
    return this.minesCount;
  }

  setCount(value: number): void {
    this.minesCount = Math.max(this.minMines, Math.min(this.maxMines, value));
    this.label.text = `Mines: ${this.minesCount}`;
  }

  setDisabled(disabled: boolean): void {
    const mode = disabled ? 'none' : 'static';
    const alpha = disabled ? 0.5 : 1;

    this.plusButton.eventMode = mode;
    this.minusButton.eventMode = mode;

    this.plusButton.alpha = alpha;
    this.minusButton.alpha = alpha;
  }
}
