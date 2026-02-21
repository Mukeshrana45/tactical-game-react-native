export function getMovementTiles(unit, grid) {
  const visited = new Set();
  const queue = [{ x: unit.x, y: unit.y, cost: 0 }];
  const reachable = [];

  while (queue.length > 0) {
    const { x, y, cost } = queue.shift();
    const key = `${x}-${y}`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (cost > unit.movement) continue;

    reachable.push({ x, y });

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (let [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        grid[nx] &&
        grid[nx][ny] &&
        grid[nx][ny].terrain !== "MOUNTAIN" &&
        !grid[nx][ny].unit
      ) {
        queue.push({ x: nx, y: ny, cost: cost + 1 });
      }
    }
  }

  return reachable;
}