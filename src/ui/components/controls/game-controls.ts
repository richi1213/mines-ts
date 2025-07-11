import { Container } from 'pixi.js';
import { createButton } from '@utils/create-button';

export class GameControls {
  public container: Container = new Container();

  public onBet: () => void = () => {};
  public onCashOut: () => void = () => {};

  private betButton: Container;
  private cashOutButton: Container;

  constructor() {
    this.betButton = createButton('Bet', 100, 40, 0, 0, () => this.onBet());
    this.cashOutButton = createButton('Cash Out', 100, 40, 120, 0, () =>
      this.onCashOut(),
    );

    this.container.addChild(this.betButton, this.cashOutButton);
  }

  setBetDisabled(disabled = true): void {
    this.betButton.eventMode = disabled ? 'none' : 'static';
    this.betButton.alpha = disabled ? 0.5 : 1;
  }

  setCashOutDisabled(disabled = true): void {
    this.cashOutButton.eventMode = disabled ? 'none' : 'static';
    this.cashOutButton.alpha = disabled ? 0.5 : 1;
  }
}
