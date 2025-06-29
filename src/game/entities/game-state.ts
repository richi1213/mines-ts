import { type GamePhaseType } from '@game/entities/types';
import { GamePhase } from '@utils/enums';

export class GameState {
  private currentState: GamePhaseType = GamePhase.IDLE;

  get state(): GamePhaseType {
    return this.currentState;
  }

  is(state: GamePhaseType): boolean {
    return this.currentState === state;
  }

  set(state: GamePhaseType): void {
    if (this.currentState !== state) {
      this.currentState = state;
    }
  }

  reset(): void {
    this.currentState = GamePhase.IDLE;
  }
}
