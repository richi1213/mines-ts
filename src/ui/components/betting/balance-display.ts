import { Container, Text } from 'pixi.js';

export class BalanceDisplay {
  public container: Container = new Container();
  private text: Text;

  constructor() {
    this.text = new Text({
      text: '0',
      style: {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 0xffffff,
      },
    });

    this.container.addChild(this.text);
  }

  update(balance: number): void {
    this.text.text = `${balance}`;
  }
}
