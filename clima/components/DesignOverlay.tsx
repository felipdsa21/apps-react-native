import React from "react";
import { Image, StyleSheet } from "react-native";

export function DesignOverlay({ name }: DesignOverlayProps) {
  return <Image source={{ uri: require(`../design/${name}.png`) }} style={styles.image} />;
}

export interface DesignOverlayProps {
  name: string;
}

const styles = StyleSheet.create({
  image: {
    filter: "hue-rotate(90deg)",
    height: 998,
    imageRendering: "pixelated",
    opacity: 0.5,
    pointerEvents: "none",
    position: "absolute",
    width: 463,
  },
});
