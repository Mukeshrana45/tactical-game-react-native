import React, { useReducer, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { createGrid, TERRAIN } from "../engine/Grid";
import { Unit } from "../engine/Unit";
import { getMovementTiles } from "../engine/Movement";
import { getAttackTiles, resolveAttack } from "../engine/Combat";
import { runAI } from "../engine/AI";
import { checkWinner } from "../engine/GameRules";

import { initialState } from "../state/initialState";
import { gameReducer } from "../state/gameReducer";

export default function GameScreen() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // ---------------- INIT GAME ----------------
  useEffect(() => {
    initializeGame();
  }, []);

  function initializeGame() {
    const newGrid = createGrid();

    const u1 = new Unit("1", 1, "KNIGHT", 7, 0);
    const u2 = new Unit("2", 1, "ARCHER", 7, 2);
    const u3 = new Unit("3", 2, "KNIGHT", 0, 7);
    const u4 = new Unit("4", 2, "ARCHER", 0, 5);

    newGrid[7][0] = { ...newGrid[7][0], unit: { ...u1 } };
    newGrid[7][2] = { ...newGrid[7][2], unit: { ...u2 } };
    newGrid[0][7] = { ...newGrid[0][7], unit: { ...u3 } };
    newGrid[0][5] = { ...newGrid[0][5], unit: { ...u4 } };

    dispatch({ type: "INIT_GAME", payload: newGrid });
  }

  // ---------------- AI TURN ----------------
  useEffect(() => {
    if (state.currentPlayer === 2 && state.grid && !state.winner) {
      const updatedGrid = runAI(state.grid, 2);

      const winner = checkWinner(updatedGrid);

      if (winner) {
        dispatch({ type: "SET_WINNER", payload: winner });
      } else {
        dispatch({ type: "AI_MOVE", payload: updatedGrid });
      }
    }
  }, [state.currentPlayer]);

  // ---------------- TILE PRESS ----------------
  function handleTilePress(tile) {
    if (!state.grid || state.winner) return;

    // SELECT UNIT
    if (tile.unit && tile.unit.player === state.currentPlayer) {
      const movementTiles = getMovementTiles(tile.unit, state.grid);

      dispatch({
        type: "SELECT_UNIT",
        payload: { unit: tile.unit, movementTiles },
      });

      return;
    }

    if (!state.selectedUnit) return;

    // MOVE
    const validMove = state.movementTiles.some(
      (t) => t.x === tile.x && t.y === tile.y
    );

    if (validMove) {
      const newGrid = state.grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          unit: cell.unit ? { ...cell.unit } : null,
        }))
      );

      const movedUnit = {
        ...state.selectedUnit,
        x: tile.x,
        y: tile.y,
      };

      newGrid[state.selectedUnit.x][state.selectedUnit.y].unit = null;
      newGrid[tile.x][tile.y].unit = movedUnit;

      const attackTiles = getAttackTiles(movedUnit, newGrid);

      dispatch({
        type: "MOVE_UNIT",
        payload: {
          grid: newGrid,
          unit: movedUnit,
          attackTiles,
        },
      });

      return;
    }

    // ATTACK
    const validAttack = state.attackTiles.some(
      (t) => t.x === tile.x && t.y === tile.y
    );

    if (
      validAttack &&
      tile.unit &&
      tile.unit.player !== state.currentPlayer
    ) {
      const newGrid = state.grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          unit: cell.unit ? { ...cell.unit } : null,
        }))
      );

      const { damage, updatedDefender } = resolveAttack(
        state.selectedUnit,
        tile.unit
      );

      Alert.alert("Attack!", `Dealt ${damage} damage`);

      if (updatedDefender.hp <= 0) {
        newGrid[tile.x][tile.y].unit = null;
      } else {
        newGrid[tile.x][tile.y].unit = updatedDefender;
      }

      const winner = checkWinner(newGrid);

      dispatch({
        type: "ATTACK",
        payload: { grid: newGrid },
      });

      if (winner) {
        dispatch({ type: "SET_WINNER", payload: winner });
      } else {
        dispatch({ type: "END_TURN" });
      }
    }
  }

  // ---------------- VICTORY SCREEN ----------------
  if (state.winner) {
    return (
      <View style={styles.center}>
        <Text style={styles.victoryText}>
          Player {state.winner} Wins!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={initializeGame}
        >
          <Text style={{ color: "white" }}>Restart Game</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---------------- LOADING ----------------
  if (!state.grid) {
    return (
      <View style={styles.center}>
        <Text>Loading Game...</Text>
      </View>
    );
  }

  // ---------------- RENDER ----------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Player {state.currentPlayer}'s Turn
      </Text>

      {state.grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((tile) => {
            const isMoveTile = state.movementTiles.some(
              (t) => t.x === tile.x && t.y === tile.y
            );

            const isAttackTile = state.attackTiles.some(
              (t) => t.x === tile.x && t.y === tile.y
            );

            return (
              <TouchableOpacity
                key={`${tile.x}-${tile.y}`}
                onPress={() => handleTilePress(tile)}
                style={[
                  styles.tile,
                  {
                    backgroundColor: isMoveTile
                      ? "lightblue"
                      : isAttackTile
                      ? "salmon"
                      : tile.terrain === TERRAIN.MOUNTAIN
                      ? "#555"
                      : tile.terrain === TERRAIN.FOREST
                      ? "#88aa55"
                      : "#ddd",
                  },
                ]}
              >
                {tile.unit && (
                  <Text
                    style={{
                      color:
                        tile.unit.player === 1 ? "blue" : "red",
                    }}
                  >
                    {tile.unit.type[0]} ({tile.unit.hp})
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
      <TouchableOpacity
  style={styles.button}
  onPress={() => dispatch({ type: "END_TURN" })}
>
  <Text style={{ color: "white" }}>End Turn</Text>
</TouchableOpacity>
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  victoryText: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  tile: {
    width: 40,
    height: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "black",
  },
});