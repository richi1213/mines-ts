import { GAME_CONFIG } from '@config/game-config';
import { EventDispatcher } from '@core/event-dispatcher';
import { GameState } from '@game/entities/game-state';
import { Grid } from '@game/entities/grid';
import { GAME_EVENT } from '@utils/enums';
import { Assets, Container, Sprite } from 'pixi.js';
import { type GameEvents } from 'src/types/event-types';

export class GridRenderer extends Container {
  private cellSprites: Sprite[] = [];

  constructor(
    private grid: Grid,
    private events: EventDispatcher<GameEvents>,
    private gameState: GameState,
  ) {
    super();
    this.interactive = true;
  }

  async init(): Promise<void> {
    const size = this.grid.size;
    const closedTexture = Assets.get('square');
    this.cellSprites = [];

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const sprite = new Sprite(closedTexture);
        sprite.width = GAME_CONFIG.CELL_SIZE;
        sprite.height = GAME_CONFIG.CELL_SIZE;
        sprite.x = col * GAME_CONFIG.CELL_SIZE;
        sprite.y = row * GAME_CONFIG.CELL_SIZE;
        sprite.eventMode = 'static';
        sprite.cursor = 'pointer';

        sprite.on('pointertap', () => {
          if (this.gameState.isPlaying()) {
            this.events.emit(GAME_EVENT.CELL_CLICKED, { row, col });
          }
        });

        this.cellSprites.push(sprite);
        this.addChild(sprite);
      }
    }

    this.events.on(GAME_EVENT.CELL_REVEALED, ({ row, col, isMine }) => {
      this.revealCell(row, col, isMine);
    });

    this.events.on(GAME_EVENT.GAME_OVER, ({ won }) => {
      if (!won) this.revealAllMines();
    });
  }

  private revealCell(row: number, col: number, isMine: boolean): void {
    const index = row * this.grid.size + col;
    const sprite = this.cellSprites[index];
    const texture = isMine ? Assets.get('bomb') : Assets.get('star');
    sprite.texture = texture;

    sprite.eventMode = 'none';
    sprite.cursor = 'default';
  }

  private revealAllMines(): void {
    for (let row = 0; row < this.grid.size; row++) {
      for (let col = 0; col < this.grid.size; col++) {
        const cell = this.grid.getCell(row, col);
        if (cell.isMine) {
          this.revealCell(row, col, true);
        }
      }
    }
  }

  reset(): void {
    const closedTexture = Assets.get('square');
    for (const sprite of this.cellSprites) {
      sprite.texture = closedTexture;
      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';
    }
  }
}
