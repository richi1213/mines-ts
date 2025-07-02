import { GAME_CONFIG } from '@config/game-config';
import { Container, Text } from 'pixi.js';

export class BalanceDisplay {
  public container: Container = new Container();

  private balance: number = GAME_CONFIG.INITIAL_BETTING_BALANCE;
  private text: Text;

  constructor() {
    this.text = new Text({
      text: `Balance: $${this.balance}`,
      style: {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0xffffff,
      },
    });

    this.container.addChild(this.text);
  }

  update(newBalance: number): void {
    this.balance = newBalance;
    this.text.text = `Balance: $${this.balance}`;
  }

  get(): number {
    return this.balance;
  }

  reset(): void {
    this.update(GAME_CONFIG.INITIAL_BETTING_BALANCE);
  }
}
