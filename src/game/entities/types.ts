import { GamePhase } from '@utils/enums';

export type GamePhaseType = (typeof GamePhase)[keyof typeof GamePhase];
