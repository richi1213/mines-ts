import { Container, Text, Graphics } from 'pixi.js';

export class BetInput {
  public container: Container = new Container();
  public onBet: () => void = () => {};

  private betAmount: number = 10;
  private minBet: number = 1;
  private maxBet: number = 9999;

  private betText: Text;

  constructor() {
    // Bet display text
    this.betText = new Text({
      text: `Bet: $${this.betAmount}`,
      style: { fontFamily: 'Arial', fontSize: 20, fill: 0xffffff },
    });
    this.container.addChild(this.betText);

    // Increase button
    const plus = this.createButton('+', 80, 0, () => this.adjustBet(1));
    this.container.addChild(plus);

    // Decrease button
    const minus = this.createButton('-', 120, 0, () => this.adjustBet(-1));
    this.container.addChild(minus);

    // "Place Bet" button
    const placeBetBtn = this.createButton('Bet', 0, 40, () => this.onBet());
    this.container.addChild(placeBetBtn);
  }

  private adjustBet(amount: number): void {
    const newBet = this.betAmount + amount;
    if (newBet >= this.minBet && newBet <= this.maxBet) {
      this.betAmount = newBet;
      this.betText.text = `Bet: $${this.betAmount}`;
    }
  }

  private createButton(
    label: string,
    x: number,
    y: number,
    onClick: () => void,
  ): Container {
    const button = new Container();
    const bg = new Graphics().roundRect(0, 0, 70, 30, 6).fill(0x333333);

    const text = new Text({
      text: label,
      style: {
        fontSize: 14,
        fill: 0xffffff,
        align: 'center',
      },
    });

    text.anchor.set(0.5);
    text.x = 35;
    text.y = 15;

    button.addChild(bg, text);
    button.x = x;
    button.y = y;
    button.eventMode = 'static';
    button.cursor = 'pointer';
    button.on('pointertap', onClick);

    return button;
  }

  getAmount(): number {
    return this.betAmount;
  }

  setAmount(amount: number): void {
    this.betAmount = Math.max(this.minBet, Math.min(this.maxBet, amount));
    this.betText.text = `Bet: $${this.betAmount}`;
  }

  reset(): void {
    this.setAmount(10);
  }
}
