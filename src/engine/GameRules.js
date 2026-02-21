// src/engine/GameRules.js

export function checkWinner(grid) {
  let player1Alive = false;
  let player2Alive = false;

  grid.forEach(row => {
    row.forEach(tile => {
      if (tile.unit) {
        if (tile.unit.player === 1) player1Alive = true;
        if (tile.unit.player === 2) player2Alive = true;
      }
    });
  });

  if (!player1Alive) return 2;
  if (!player2Alive) return 1;

  return null;
}