export const GRID_SIZE = 8;

export const TERRAIN = {
  PLAIN: "PLAIN",
  FOREST: "FOREST",
  MOUNTAIN: "MOUNTAIN",
};

export function createGrid() {
  const grid = [];

  for (let row = 0; row < GRID_SIZE; row++) {
    const newRow = [];

    for (let col = 0; col < GRID_SIZE; col++) {
      let terrain = TERRAIN.PLAIN;

      const random = Math.random();

      if (random < 0.1) {
        terrain = TERRAIN.MOUNTAIN;
      } else if (random < 0.25) {
        terrain = TERRAIN.FOREST;
      }

      newRow.push({
        x: row,
        y: col,
        terrain: terrain,
        unit: null,
      });
    }

    grid.push(newRow);
  }

  return grid;
}