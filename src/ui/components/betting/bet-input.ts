import { createButton } from '@utils/create-button';
import { Container, Text } from 'pixi.js';

export class BetInput {
  public container: Container = new Container();
  public onBet: () => void = () => {};

  private betAmount: number = 10;
  private minBet: number = 1;
  private maxBet: number = 9999;

  private betText: Text;
  private plusButton: Container;
  private minusButton: Container;

  constructor() {
    this.betText = new Text({
      text: `Bet: $${this.betAmount}`,
      style: { fontFamily: 'Arial', fontSize: 20, fill: 0xffffff },
    });
    this.container.addChild(this.betText);

    this.plusButton = createButton(
      '+',
      70,
      30,
      80,
      0,
      () => this.adjustBet(1),
      14,
    );
    this.minusButton = createButton(
      '-',
      70,
      30,
      160,
      0,
      () => this.adjustBet(-1),
      14,
    );

    this.container.addChild(this.plusButton, this.minusButton);
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

  setDisabled(disabled: boolean): void {
    const mode = disabled ? 'none' : 'static';
    const alpha = disabled ? 0.5 : 1;

    this.plusButton.eventMode = mode;
    this.minusButton.eventMode = mode;

    this.plusButton.alpha = alpha;
    this.minusButton.alpha = alpha;
  }
}
