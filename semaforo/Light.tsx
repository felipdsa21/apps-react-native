import React from "react";
import { ColorValue, StyleSheet, TouchableOpacity } from "react-native";

export function Light({ color, active, onPress }: LightProps) {
  const style = [styles.light, { backgroundColor: color }, active ? null : styles.lightOff];
  return <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={style} />;
}

export interface LightProps {
  color: ColorValue;
  active: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  light: {
    borderRadius: 100 / 2,
    height: 100,
    width: 100,
  },
  lightOff: {
    opacity: 0.5,
  },
});
