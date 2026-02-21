// src/state/gameReducer.js

export function gameReducer(state, action) {
  switch (action.type) {

    // ---------------- INIT GAME ----------------
    case "INIT_GAME":
      return {
        ...state,
        grid: action.payload,
        selectedUnit: null,
        movementTiles: [],
        attackTiles: [],
        currentPlayer: 1,
        winner: null
      };

    // ---------------- SELECT UNIT ----------------
    case "SELECT_UNIT":
      return {
        ...state,
        selectedUnit: action.payload.unit,
        movementTiles: action.payload.movementTiles,
        attackTiles: []
      };

    // ---------------- MOVE UNIT ----------------
    case "MOVE_UNIT":
      return {
        ...state,
        grid: action.payload.grid,
        selectedUnit: action.payload.unit,
        movementTiles: [],
        attackTiles: action.payload.attackTiles
      };

    // ---------------- ATTACK ----------------
    case "ATTACK":
      return {
        ...state,
        grid: action.payload.grid,
        selectedUnit: null,
        movementTiles: [],
        attackTiles: []
      };

    // ---------------- END TURN ----------------
    case "END_TURN":
      return {
        ...state,
        selectedUnit: null,
        movementTiles: [],
        attackTiles: [],
        currentPlayer: state.currentPlayer === 1 ? 2 : 1
      };

    // ---------------- SET WINNER ----------------
    case "SET_WINNER":
      return {
        ...state,
        winner: action.payload
      };

    // ---------------- RESET GAME ----------------
    case "RESET_GAME":
      return {
        ...action.payload   // payload should be initialState
      };

    default:
      return state;
  }
}