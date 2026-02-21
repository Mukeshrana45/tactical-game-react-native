import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Tile({ tile, onPress, color }) {
  return (
    <TouchableOpacity
      style={[styles.tile, { backgroundColor: color }]}
      onPress={onPress}
    >
      {tile.unit && (
        <Text style={{ color: tile.unit.player === 1 ? "blue" : "red" }}>
          {tile.unit.type[0]} ({tile.unit.hp})
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 40,
    height: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});