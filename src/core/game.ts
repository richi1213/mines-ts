import { Application, Container } from 'pixi.js';
import { GAME_CONFIG } from '@config/game-config';
import { EventDispatcher } from '@core/event-dispatcher';
import { AssetManager } from '@game/managers/asset-manager';

export class Game {
  private app: Application;
  private assetManager!: AssetManager;
  private eventDispatcher!: EventDispatcher;
  //   private gameEngine!: GameEngine;
  //   private uiManager!: UIManager;
  //   private gameState!: GameState;

  constructor() {
    this.app = new Application();
  }

  async start() {
    await this.app.init({
      resizeTo: window,
      backgroundColor: GAME_CONFIG.backgroundColor,
    });

    const container = new Container();
    this.app.stage.addChild(container);

    // Set up core systems
    this.eventDispatcher = new EventDispatcher();
    // this.assetManager = new AssetManager();
    // this.gameState = new GameState();
  }

  reset() {}
}
