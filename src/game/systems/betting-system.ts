import { GAME_CONFIG } from '@config/game-config';

export class BettingSystem {
  private balance: number;
  private currentBet: number = 0;
  private mineCount: number = 0;

  constructor(initialBalance: number = GAME_CONFIG.INITIAL_BETTING_BALANCE) {
    this.balance = initialBalance;
  }

  placeBet(amount: number, mines: number): void {
    if (amount <= 0 || mines <= 0) {
      throw new Error('Bet amount and mine count must be greater than 0.');
    }

    if (amount > this.balance) {
      throw new Error('Insufficient balance.');
    }

    this.balance -= amount;
    this.currentBet = amount;
    this.mineCount = mines;
  }

  cashOut(winAmount: number): void {
    this.balance += winAmount;
    this.currentBet = 0;
    this.mineCount = 0;
  }

  getBalance(): number {
    return this.balance;
  }

  getBetAmount(): number {
    return this.currentBet;
  }

  getMineCount(): number {
    return this.mineCount;
  }

  reset(): void {
    this.currentBet = 0;
    this.mineCount = 0;
  }
}
