import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Light } from "./Light";

export function App() {
  const [onId, setOnId] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.lights}>
        {["red", "yellow", "lightgreen"].map((color, i) => (
          <Light key={i} color={color} active={i === onId} onPress={() => setOnId(i)} />
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  lights: {
    backgroundColor: "black",
    borderRadius: 12,
    gap: 20,
    padding: 20,
  },
});

registerRootComponent(App);
