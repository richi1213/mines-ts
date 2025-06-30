import { GAME_PHASE } from '@config/game-config';

export type GamePhaseType = (typeof GAME_PHASE)[keyof typeof GAME_PHASE];
