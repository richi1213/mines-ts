import { Container, Text } from 'pixi.js';

export class InfoDisplay {
  public container: Container = new Container();

  private multiplierText: Text;
  private nextMultiplierText: Text;
  private potentialWinText: Text;

  constructor() {
    const style = {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0xffffff,
    };

    this.multiplierText = new Text({ text: 'Multiplier: x1.00', style });
    this.multiplierText.y = 0;

    this.nextMultiplierText = new Text({ text: 'Next: x1.10', style });
    this.nextMultiplierText.y = 30;

    this.potentialWinText = new Text({ text: '0.00', style });
    this.potentialWinText.y = 60;

    this.container.addChild(this.multiplierText);
    this.container.addChild(this.nextMultiplierText);
    this.container.addChild(this.potentialWinText);
  }

  updateMultiplier(multiplier: number): void {
    this.multiplierText.text = `Multiplier: x${multiplier.toFixed(2)}`;
  }

  updateNextMultiplier(next: number): void {
    this.nextMultiplierText.text = `Next: x${next.toFixed(2)}`;
  }

  updatePotentialWin(amount: number): void {
    this.potentialWinText.text = `${amount.toFixed(2)}`;
  }

  reset(): void {
    this.updateMultiplier(1);
    this.updateNextMultiplier(1.1);
    this.updatePotentialWin(0);
  }
}
