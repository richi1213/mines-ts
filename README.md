# Mines Game

A simple minesweeper-inspired betting game built with TypeScript and PixiJS. The player selects a number of mines and places a bet, then attempts to reveal safe cells. Each safe reveal increases the potential win multiplier - but revealing a mine ends the game.

## Core Structure

### Main Classes

- **GameEngine**
  - Coordinates game flow and logic.
  - Listens to user/game events and updates internal systems accordingly.
  - Manages grid, betting, and game state.

- **Grid**
  - Represents the game's field of cells.
  - Handles mine placement and cell revealing.
  - Tracks the number of safe cells revealed.

- **Cell**
  - Represents a single grid cell.
  - Stores state: whether it's a mine, revealed, etc.

- **BettingSystem**
  - Manages player's balance, current bet, and mine count.
  - Applies balance changes on bet and cash out.

- **MultiplierCalculator**
  - Calculates win multiplier based on number of safe cells revealed and mines selected.

- **UIManager**
  - Manages rendering of UI components using PixiJS.
  - Listens to events and updates components like grid renderer, betting panel, info display, and controls.

- **EventDispatcher**
  - Custom event system used to decouple logic between systems and UI.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Install Dependencies

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```
