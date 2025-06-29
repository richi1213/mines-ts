import { Game } from '@core/game';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const game = new Game();
    await game.start();
  } catch (error) {
    console.error('Error during startup:', error);
  }
});
