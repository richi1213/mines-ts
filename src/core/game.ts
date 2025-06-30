import { Application, Container } from 'pixi.js';
import { GAME_CONFIG } from '@config/game-config';
import { EventDispatcher } from '@core/event-dispatcher';
import { AssetManager } from '@game/managers/asset-manager';
import { GameState } from '@game/entities/game-state';

export class Game {
  private app: Application;
  private assetManager!: AssetManager;
  private eventDispatcher!: EventDispatcher;
  private gameState!: GameState;
  //   private gameEngine!: GameEngine;
  //   private uiManager!: UIManager;

  constructor() {
    this.app = new Application();
  }

  async start() {
    await this.app.init({
      resizeTo: window,
      backgroundColor: GAME_CONFIG.BACKGROUND_COLOR,
    });

    const container = new Container();
    this.app.stage.addChild(container);

    this.eventDispatcher = new EventDispatcher();
    this.assetManager = new AssetManager();
    this.gameState = new GameState();

    await this.assetManager.loadAllAssets();
  }

  reset() {}
}
