import { createButton } from '@utils/create-button';
import { Container, Text } from 'pixi.js';

export class BetInput {
  public container: Container = new Container();
  public onBet: () => void = () => {};

  private betAmount: number = 10;
  private minBet: number = 1;
  private maxBet: number = 9999;

  private betText: Text;

  constructor() {
    this.betText = new Text({
      text: `Bet: $${this.betAmount}`,
      style: { fontFamily: 'Arial', fontSize: 20, fill: 0xffffff },
    });
    this.container.addChild(this.betText);

    const plus = createButton('+', 70, 30, 80, 0, () => this.adjustBet(1), 14);
    const minus = createButton(
      '-',
      70,
      30,
      160,
      0,
      () => this.adjustBet(-1),
      14,
    );

    this.container.addChild(plus, minus);
  }

  private adjustBet(amount: number): void {
    const newBet = this.betAmount + amount;
    if (newBet >= this.minBet && newBet <= this.maxBet) {
      this.betAmount = newBet;
      this.betText.text = `Bet: $${this.betAmount}`;
    }
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
