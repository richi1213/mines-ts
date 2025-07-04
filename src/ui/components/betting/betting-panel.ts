import { EventDispatcher } from '@core/event-dispatcher';
import { BalanceDisplay } from '@ui/components/betting/balance-display';
import { BetInput } from '@ui/components/betting/bet-input';
import { MinesSelector } from '@ui/components/betting/mines-selector';
import { Container } from 'pixi.js';
import { GAME_EVENT } from '@utils/enums';
import type { GameEvents } from 'src/types/event-types';

export class BettingPanel {
  public container: Container;

  private betInput: BetInput;
  private minesSelector: MinesSelector;
  private balanceDisplay: BalanceDisplay;

  constructor(private readonly events: EventDispatcher<GameEvents>) {
    this.container = new Container();

    this.betInput = new BetInput();
    this.minesSelector = new MinesSelector();
    this.balanceDisplay = new BalanceDisplay();

    this.betInput.container.y = 0;
    this.minesSelector.container.y = 60;
    this.balanceDisplay.container.y = 120;

    this.container.addChild(this.betInput.container);
    this.container.addChild(this.minesSelector.container);
    this.container.addChild(this.balanceDisplay.container);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.events.on(GAME_EVENT.BALANCE_UPDATED, ({ balance }) => {
      this.balanceDisplay.update(balance);
    });
  }

  getBetAmount(): number {
    return this.betInput.getAmount();
  }

  getMineCount(): number {
    return this.minesSelector.getCount();
  }

  updateBalance(balance: number): void {
    this.balanceDisplay.update(balance);
  }

  reset(): void {
    this.betInput.reset();
    this.minesSelector.reset();
  }
}
