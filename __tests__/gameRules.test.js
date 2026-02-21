import { checkWinner } from "../src/engine/GameRules";

describe("Game Rules", () => {

  test("Player 1 wins when only player 1 units exist", () => {

    const grid = [
      [{ unit: { player: 1 } }],
      [{ unit: null }]
    ];

    const winner = checkWinner(grid);

    expect(winner).toBe(1);

  });

  test("Player 2 wins when only player 2 units exist", () => {

    const grid = [
      [{ unit: { player: 2 } }],
      [{ unit: null }]
    ];

    const winner = checkWinner(grid);

    expect(winner).toBe(2);

  });

});