import { createButton } from '@utils/create-button';
import { Container } from 'pixi.js';

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

  setDisabled(disabled: boolean): void {
    const mode = disabled ? 'none' : 'static';
    const alpha = disabled ? 0.5 : 1;

    this.betButton.eventMode = mode;
    this.cashOutButton.eventMode = mode;
    this.betButton.alpha = alpha;
    this.cashOutButton.alpha = alpha;
  }
}
