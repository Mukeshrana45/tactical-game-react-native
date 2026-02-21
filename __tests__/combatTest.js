import { resolveAttack } from "../src/engine/Combat";

describe("Combat Engine", () => {

  test("Damage calculation works correctly", () => {
    const attacker = { attack: 6 };
    const defender = { hp: 10, defense: 2 };

    const { damage, updatedDefender } =
      resolveAttack(attacker, defender);

    expect(damage).toBe(4);
    expect(updatedDefender.hp).toBe(6);
  });

});