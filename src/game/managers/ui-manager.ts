import { EventDispatcher } from '@core/event-dispatcher';
import { BettingPanel } from '@ui/components/betting/betting-panel';
import { GameControls } from '@ui/components/controls/game-controls';
import { GridRenderer } from '@ui/components/game/grid-renderer';
import { InfoDisplay } from '@ui/components/info/info-display';
import { Container } from 'pixi.js';
import { type GameEvents } from 'src/types/event-types';

export class UIManager {
  private container: Container;
  private gridRenderer: GridRenderer;
  private bettingPanel: BettingPanel;
  private gameControls: GameControls;
  private infoDisplay: InfoDisplay;

  constructor(
    stage: Container,
    private readonly events: EventDispatcher<GameEvents>,
  ) {
    this.container = new Container();
    stage.addChild(this.container);

    // Initialize UI components
    this.gridRenderer = new GridRenderer(this.events);
    this.bettingPanel = new BettingPanel(this.events);
    this.gameControls = new GameControls(this.events);
    this.infoDisplay = new InfoDisplay(this.events);

    // Add to main container
    this.container.addChild(this.gridRenderer.container);
    this.container.addChild(this.bettingPanel.container);
    this.container.addChild(this.gameControls.container);
    this.container.addChild(this.infoDisplay.container);
  }

  /**
   * Resize and layout UI elements on screen resize.
   */
  layout(width: number, height: number): void {
    // Position and scale components based on screen size
    this.gridRenderer.layout(width, height);
    this.bettingPanel.layout(width, height);
    this.gameControls.layout(width, height);
    this.infoDisplay.layout(width, height);
  }

  /**
   * Called when new grid data is available.
   */
  renderGrid(cells: unknown): void {
    this.gridRenderer.render(cells);
  }

  /**
   * Reset the UI to a clean state.
   */
  reset(): void {
    this.gridRenderer.reset();
    this.bettingPanel.reset();
    this.infoDisplay.reset();
    // gameControls might not need reset unless it has animations
  }
}
