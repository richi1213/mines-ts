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

  isPlaying(): boolean {
    return this.currentState === GAME_PHASE.PLAYING;
  }

  start(): void {
    this.set(GAME_PHASE.PLAYING);
  }

  gameOver(): void {
    this.set(GAME_PHASE.GAME_OVER);
  }

  cashOut(): void {
    this.set(GAME_PHASE.CASHED_OUT);
  }

  reset(): void {
    this.set(GAME_PHASE.IDLE);
  }

  set(state: GamePhaseType): void {
    this.currentState = state;
  }
}
