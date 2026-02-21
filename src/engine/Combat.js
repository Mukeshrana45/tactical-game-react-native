// src/engine/Combat.js

export function getAttackTiles(unit, grid) {
  const attackTiles = [];

  for (let i = -unit.range; i <= unit.range; i++) {
    for (let j = -unit.range; j <= unit.range; j++) {
      const nx = unit.x + i;
      const ny = unit.y + j;

      if (
        grid[nx] &&
        grid[nx][ny] &&
        Math.abs(i) + Math.abs(j) <= unit.range
      ) {
        attackTiles.push({ x: nx, y: ny });
      }
    }
  }

  return attackTiles;
}

// PURE FUNCTION: does NOT mutate
export function resolveAttack(attacker, defender) {
  const damage = Math.max(attacker.attack - defender.defense, 1);

  const updatedDefender = {
    ...defender,
    hp: defender.hp - damage,
  };

  return {
    damage,
    updatedDefender,
  };
}