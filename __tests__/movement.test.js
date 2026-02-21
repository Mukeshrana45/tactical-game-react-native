import { getMovementTiles } from "../src/engine/Movement";

describe("Movement Engine", () => {

  test("Knight movement stays within range", () => {

    const mockGrid = Array(8)
      .fill(null)
      .map((_, x) =>
        Array(8).fill(null).map((_, y) => ({
          x,
          y,
          terrain: "PLAIN",
          unit: null,
        }))
      );

    const knight = {
      x: 4,
      y: 4,
      movement: 2,
    };

    const tiles = getMovementTiles(knight, mockGrid);

    tiles.forEach(tile => {
      const distance =
        Math.abs(tile.x - 4) +
        Math.abs(tile.y - 4);

      expect(distance).toBeLessThanOrEqual(2);
    });

  });

});