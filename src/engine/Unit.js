// src/engine/Unit.js

export class Unit {
  constructor(id, player, type, x, y) {
    this.id = id;
    this.player = player; // 1 or 2
    this.type = type;     // "KNIGHT" or "ARCHER"
    this.x = x;
    this.y = y;

    // Default values
    this.hp = 0;
    this.attack = 0;
    this.defense = 0;
    this.movement = 0;
    this.range = 0;

    this.initializeStats();
  }

  initializeStats() {
    if (this.type === "KNIGHT") {
      this.hp = 20;
      this.attack = 6;
      this.defense = 3;
      this.movement = 3;
      this.range = 1;
    }

    if (this.type === "ARCHER") {
      this.hp = 12;
      this.attack = 4;
      this.defense = 1;
      this.movement = 2;
      this.range = 3;
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
  }

  isDead() {
    return this.hp <= 0;
  }
}