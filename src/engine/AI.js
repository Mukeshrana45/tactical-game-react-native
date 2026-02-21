// src/engine/AI.js

import { getMovementTiles } from "./Movement";
import { getAttackTiles, resolveAttack } from "./Combat";

export function runAI(grid, currentPlayer) {
  if (!grid) return grid;

  const newGrid = grid.map(row =>
    row.map(tile => ({
      ...tile,
      unit: tile.unit ? { ...tile.unit } : null
    }))
  );

  const aiUnits = [];
  const enemyUnits = [];

  newGrid.forEach(row =>
    row.forEach(tile => {
      if (tile.unit) {
        if (tile.unit.player === currentPlayer) {
          aiUnits.push(tile.unit);
        } else {
          enemyUnits.push(tile.unit);
        }
      }
    })
  );

  if (aiUnits.length === 0 || enemyUnits.length === 0) {
    return newGrid;
  }

  const aiUnit = aiUnits[0];
  const target = enemyUnits[0];

  const reachable = getMovementTiles(aiUnit, newGrid);

  let bestMove = null;
  let shortestDistance = Infinity;

  reachable.forEach(tile => {
    const distance =
      Math.abs(tile.x - target.x) +
      Math.abs(tile.y - target.y);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      bestMove = tile;
    }
  });

  let updatedUnit = aiUnit;

  if (bestMove) {
    newGrid[aiUnit.x][aiUnit.y].unit = null;

    updatedUnit = {
      ...aiUnit,
      x: bestMove.x,
      y: bestMove.y
    };

    newGrid[bestMove.x][bestMove.y].unit = updatedUnit;
  }

  const attackTiles = getAttackTiles(updatedUnit, newGrid);

  const canAttack = attackTiles.find(
    t => t.x === target.x && t.y === target.y
  );

  if (canAttack) {
    const { updatedDefender } = resolveAttack(
      updatedUnit,
      target
    );

    if (updatedDefender.hp <= 0) {
      newGrid[target.x][target.y].unit = null;
    } else {
      newGrid[target.x][target.y].unit = updatedDefender;
    }
  }

  return newGrid;
}