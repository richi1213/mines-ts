import { Container, Graphics, Text } from 'pixi.js';

export class GameControls {
  public container: Container = new Container();
  public onBet: () => void = () => {};
  public onCashOut: () => void = () => {};

  private betButton: Container;
  private cashOutButton: Container;

  constructor() {
    this.betButton = this.createButton('Bet', 0, 0);
    this.cashOutButton = this.createButton('Cash Out', 120, 0);

    this.container.addChild(this.betButton, this.cashOutButton);
  }

  private createButton(label: string, x: number, y: number): Container {
    const button = new Container();
    const bg = new Graphics().roundRect(0, 0, 100, 40, 6).fill(0x444444);

    const text = new Text({
      text: label,
      style: {
        fontSize: 16,
        fill: 0xffffff,
      },
    });

    text.anchor.set(0.5);
    text.x = 50;
    text.y = 20;

    button.addChild(bg, text);
    button.x = x;
    button.y = y;

    button.eventMode = 'static';
    button.cursor = 'pointer';

    button.on('pointertap', () => {
      if (label === 'Bet') this.onBet();
      else if (label === 'Cash Out') this.onCashOut();
    });

    return button;
  }

  setDisabled(disabled: boolean): void {
    this.betButton.eventMode = disabled ? 'none' : 'static';
    this.cashOutButton.eventMode = disabled ? 'none' : 'static';
    this.betButton.alpha = this.cashOutButton.alpha = disabled ? 0.5 : 1;
  }
}
