import { GAME_PHASE } from '@config/game-config';
import { type GamePhaseType } from '@game/entities/types';

export class GameState {
  private currentState: GamePhaseType = GAME_PHASE.IDLE;

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
    this.currentState = GAME_PHASE.IDLE;
  }
}
