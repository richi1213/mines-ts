import { Container } from 'pixi.js';
import { EventDispatcher } from '@core/event-dispatcher';
import { Grid } from '@game/entities/grid';
import { MultiplierCalculator } from '@game/systems/multiplier-calculator';
import { BettingSystem } from '@game/systems/betting-system';
import { GridRenderer } from '@ui/components/game/grid-renderer';
import { InfoDisplay } from '@ui/components/info/info-display';
import { GameControls } from '@ui/components/controls/game-controls';
import { BettingPanel } from '@ui/components/betting/betting-panel';
import { GAME_EVENT } from '@utils/enums';
import { type GameEvents } from 'src/types/event-types';

export class UIManager {
  public container: Container = new Container();
  private gridRenderer: GridRenderer;
  private infoDisplay: InfoDisplay;
  private gameControls: GameControls;
  private bettingPanel: BettingPanel;

  constructor(
    private readonly events: EventDispatcher<GameEvents>,
    private readonly grid: Grid,
    private readonly multiplierCalculator: MultiplierCalculator,
    private readonly bettingSystem: BettingSystem,
  ) {
    this.gridRenderer = new GridRenderer(this.grid, this.events);
    this.infoDisplay = new InfoDisplay();
    this.gameControls = new GameControls();
    this.bettingPanel = new BettingPanel(this.events);
  }

  async init(): Promise<void> {
    await this.gridRenderer.init();

    // Position UI components
    this.gridRenderer.x = 100;
    this.gridRenderer.y = 100;

    this.infoDisplay.container.x = 400;
    this.infoDisplay.container.y = 100;

    this.bettingPanel.container.x = 100;
    this.bettingPanel.container.y = 400;

    this.gameControls.container.x = 100;
    this.gameControls.container.y = 520;

    // Add to main container
    this.container.addChild(this.gridRenderer);
    this.container.addChild(this.infoDisplay.container);
    this.container.addChild(this.bettingPanel.container);
    this.container.addChild(this.gameControls.container);

    // Register event listeners
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.events.on(GAME_EVENT.POTENTIAL_WIN_UPDATED, ({ potentialWin }) => {
      // this.infoDisplay.updateMultiplier();
      this.infoDisplay.updatePotentialWin(potentialWin);

      const nextMultiplier = this.multiplierCalculator.calculate(
        this.grid.getRevealedCount() + 1,
        this.bettingSystem.getMineCount(),
      );

      this.infoDisplay.updateNextMultiplier(nextMultiplier);
    });

    this.events.on(GAME_EVENT.CASHED_OUT, ({ winAmount }) => {
      this.bettingSystem.cashOut(winAmount);
      this.infoDisplay.updatePotentialWin(0);
    });

    this.events.on(GAME_EVENT.GAME_OVER, () => {
      // Disable controls/reset UI here
    });

    this.events.on(GAME_EVENT.GAME_STARTED, () => {
      this.infoDisplay.reset();
    });
  }

  reset(): void {
    this.gridRenderer.reset();
    this.infoDisplay.reset();
  }
}
