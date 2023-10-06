import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export function StyledText({ children, style, ...props }: TextProps) {
  return (
    <Text {...props} style={style ? [styles.text, style] : styles.text}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_400Regular",
  },
});
