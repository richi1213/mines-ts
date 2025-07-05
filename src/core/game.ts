import { Application, Container } from 'pixi.js';
import { GAME_CONFIG } from '@config/game-config';
import { EventDispatcher } from '@core/event-dispatcher';
import { AssetManager } from '@game/managers/asset-manager';
import { GameEngine } from '@core/game-engine';
import { RandomGenerator } from '@game/systems/random-generator';
import { BettingSystem } from '@game/systems/betting-system';
import { MultiplierCalculator } from '@game/systems/multiplier-calculator';
import { UIManager } from '@game/managers/ui-manager';
import type { GameEvents } from 'src/types/event-types';

export class Game {
  private app: Application;
  private assetManager!: AssetManager;
  private eventDispatcher!: EventDispatcher<GameEvents>;
  private gameEngine!: GameEngine;
  private uiManager!: UIManager;
  private bettingSystem!: BettingSystem;

  constructor() {
    this.app = new Application();
  }

  async start() {
    await this.app.init({
      resizeTo: window,
      backgroundColor: GAME_CONFIG.BACKGROUND_COLOR,
    });

    document.body.appendChild(this.app.canvas);

    const container = new Container();
    this.app.stage.addChild(container);

    this.eventDispatcher = new EventDispatcher();
    this.assetManager = new AssetManager();
    await this.assetManager.loadAllAssets();

    this.bettingSystem = new BettingSystem();
    const randomGenerator = new RandomGenerator();
    const multiplierCalculator = new MultiplierCalculator();

    this.gameEngine = new GameEngine(
      this.eventDispatcher,
      randomGenerator,
      this.bettingSystem,
      multiplierCalculator,
      GAME_CONFIG.GRID_SIZE,
    );

    this.uiManager = new UIManager(
      this.eventDispatcher,
      this.gameEngine.getGrid(),
      this.gameEngine.getGameState(),
      multiplierCalculator,
      this.bettingSystem,
    );
    await this.uiManager.init();

    this.app.stage.addChild(this.uiManager.container);

    const bounds = this.uiManager.container.getLocalBounds();
    this.uiManager.container.x = (this.app.screen.width - bounds.width) / 2;
  }

  reset() {
    this.gameEngine.reset();
  }
}
