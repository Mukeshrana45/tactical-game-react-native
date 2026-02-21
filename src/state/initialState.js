// src/state/initialState.js

export const initialState = {
  grid: null,              // 2D grid
  selectedUnit: null,      // currently selected unit
  movementTiles: [],       // tiles highlighted for movement
  attackTiles: [],         // tiles highlighted for attack
  currentPlayer: 1,        // 1 or 2
  winner: null             // null | 1 | 2
};