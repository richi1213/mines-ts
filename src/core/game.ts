import { Application, Container } from 'pixi.js';
import { GAME_CONFIG } from '@config/game-config';
import { EventDispatcher } from '@core/event-dispatcher';
import { AssetManager } from '@game/managers/asset-manager';
import { GameEngine } from '@core/game-engine';
import { RandomGenerator } from '@game/systems/random-generator';
import type { GameEvents } from 'src/types/event-types';
import { BettingSystem } from '@game/systems/betting-system';
import { MultiplierCalculator } from '@game/systems/multiplier-calculator';

export class Game {
  private app: Application;
  private assetManager!: AssetManager;
  private eventDispatcher!: EventDispatcher<GameEvents>;
  private gameEngine!: GameEngine;
  // private uiManager!: UIManager;

  constructor() {
    this.app = new Application();
  }

  async start() {
    await this.app.init({
      // resizeTo: window,
      backgroundColor: GAME_CONFIG.BACKGROUND_COLOR,
    });

    const container = new Container();
    this.app.stage.addChild(container);

    // Core systems
    this.eventDispatcher = new EventDispatcher();
    this.assetManager = new AssetManager();

    await this.assetManager.loadAllAssets();

    const randomGenerator = new RandomGenerator();
    const bettingSystem = new BettingSystem();
    const multiplierCalculator = new MultiplierCalculator();

    this.gameEngine = new GameEngine(
      this.eventDispatcher,
      randomGenerator,
      bettingSystem,
      multiplierCalculator,
      GAME_CONFIG.GRID_SIZE,
    );
  }

  reset() {
    this.gameEngine.reset();
  }
}
