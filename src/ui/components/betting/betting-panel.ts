import { GAME_CONFIG } from '@config/game-config';
import { EventDispatcher } from '@core/event-dispatcher';
import { BalanceDisplay } from '@ui/components/betting/balance-display';
import { BetInput } from '@ui/components/betting/bet-input';
import { MinesSelector } from '@ui/components/betting/mines-selector';
import { GAME_EVENT } from '@utils/enums';
import { Container } from 'pixi.js';
import { type GameEvents } from 'src/types/event-types';

export class BettingPanel {
  public container: Container;

  private betInput: BetInput;
  private minesSelector: MinesSelector;
  private balanceDisplay: BalanceDisplay;

  private balance: number = GAME_CONFIG.INITIAL_BETTING_BALANCE;

  constructor(private readonly events: EventDispatcher<GameEvents>) {
    this.container = new Container();

    this.betInput = new BetInput();
    this.minesSelector = new MinesSelector();
    this.balanceDisplay = new BalanceDisplay();

    // Position components
    this.betInput.container.y = 0;
    this.minesSelector.container.y = 60;
    this.balanceDisplay.container.y = 120;

    // Add to container
    this.container.addChild(this.betInput.container);
    this.container.addChild(this.minesSelector.container);
    this.container.addChild(this.balanceDisplay.container);

    // Listen for betting attempt
    this.betInput.onBet = this.placeBet;
  }

  private placeBet = () => {
    const amount = this.betInput.getAmount();
    const mines = this.minesSelector.getCount();

    if (amount > this.balance || amount <= 0) {
      console.warn('Invalid bet amount');
      return;
    }

    this.balance -= amount;
    this.balanceDisplay.update(this.balance);

    this.events.emit(GAME_EVENT.BET_PLACED, { amount, mines });
  };

  getBetAmount(): number {
    return this.betInput.getAmount();
  }

  getMineCount(): number {
    return this.minesSelector.getCount();
  }

  reset(): void {
    this.betInput.reset();
    this.minesSelector.reset();
  }

  updateBalance(newBalance: number): void {
    this.balance = newBalance;
    this.balanceDisplay.update(this.balance);
  }
}
