import { Sprite, Texture } from 'pixi.js';
import { Assets } from 'pixi.js';
import { GAME_CONFIG } from '@config/game-config';

export enum CellVisualState {
  Closed = 'closed',
  RevealedSafe = 'safe',
  RevealedMine = 'mine',
}

export class CellRenderer {
  public sprite: Sprite;

  private textures: Record<CellVisualState, Texture>;

  constructor() {
    // Load textures from cache (make sure they're preloaded via AssetManager)
    this.textures = {
      [CellVisualState.Closed]: Assets.get(
        'assets/images/cells/cell-closed.png',
      ),
      [CellVisualState.RevealedSafe]: Assets.get(
        'assets/images/cells/cell-open.png',
      ),
      [CellVisualState.RevealedMine]: Assets.get(
        'assets/images/cells/cell-mine.png',
      ),
    };

    if (Object.values(this.textures).some((t) => !t)) {
      throw new Error('[CellRenderer] Missing one or more textures');
    }

    this.sprite = new Sprite(this.textures[CellVisualState.Closed]);
    this.sprite.width = GAME_CONFIG.CELL_SIZE;
    this.sprite.height = GAME_CONFIG.CELL_SIZE;
    this.sprite.eventMode = 'static';
    this.sprite.cursor = 'pointer';
  }

  setPosition(x: number, y: number): void {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  setState(state: CellVisualState): void {
    this.sprite.texture = this.textures[state];
  }

  reset(): void {
    this.setState(CellVisualState.Closed);
  }
}
