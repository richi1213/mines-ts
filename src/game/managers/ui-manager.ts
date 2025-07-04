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
import { GameState } from '@game/entities/game-state';

export class UIManager {
  public container: Container = new Container();
  private gridRenderer: GridRenderer;
  private infoDisplay: InfoDisplay;
  private gameControls: GameControls;
  private bettingPanel: BettingPanel;

  constructor(
    private readonly events: EventDispatcher<GameEvents>,
    private readonly grid: Grid,
    private readonly gameState: GameState,
    private readonly multiplierCalculator: MultiplierCalculator,
    private readonly bettingSystem: BettingSystem,
  ) {
    this.gridRenderer = new GridRenderer(
      this.grid,
      this.events,
      this.gameState,
    );
    this.infoDisplay = new InfoDisplay();
    this.gameControls = new GameControls();
    this.bettingPanel = new BettingPanel(this.events);
  }

  async init(): Promise<void> {
    await this.gridRenderer.init();

    this.gridRenderer.x = 100;
    this.gridRenderer.y = 100;

    this.infoDisplay.container.x = 400;
    this.infoDisplay.container.y = 100;

    this.bettingPanel.container.x = 100;
    this.bettingPanel.container.y = 400;

    this.gameControls.container.x = 100;
    this.gameControls.container.y = 550;

    this.container.addChild(this.gridRenderer);
    this.container.addChild(this.infoDisplay.container);
    this.container.addChild(this.bettingPanel.container);
    this.container.addChild(this.gameControls.container);

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

    this.events.on(GAME_EVENT.BALANCE_UPDATED, ({ balance }) => {
      this.bettingPanel.updateBalance(balance);
    });

    this.events.on(GAME_EVENT.GAME_OVER, () => {
      window.alert('Game over');
      this.reset();
    });

    this.events.on(GAME_EVENT.GAME_STARTED, () => {
      this.infoDisplay.reset();
    });

    this.gameControls.onBet = () => {
      const betAmount = this.bettingPanel.getBetAmount();
      const mineCount = this.bettingPanel.getMineCount();

      this.events.emit(GAME_EVENT.BET_PLACED, {
        amount: betAmount,
        mines: mineCount,
      });
      this.gameControls.setBetDisabled(true);
      this.bettingPanel.setDisableButtons();
    };

    this.gameControls.onCashOut = () => {
      console.log('clicked cash out button');

      // this.events.emit(GAME_EVENT.CASHED_OUT, {});
    };
  }

  getControls(): GameControls {
    return this.gameControls;
  }

  getBettingPanel(): BettingPanel {
    return this.bettingPanel;
  }

  reset(): void {
    this.gridRenderer.reset();
    this.infoDisplay.reset();
  }
}
