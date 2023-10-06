import { Image, ImageProps } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

import { StyledText } from "./StyledText";

export function ExtraInfo({ icon, name, content }: ExtraInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>
      <View style={styles.text}>
        <StyledText style={styles.name}>{name}</StyledText>
        <StyledText style={styles.content}>{content}</StyledText>
      </View>
    </View>
  );
}

export interface ExtraInfoProps {
  icon: ImageProps["source"];
  name: string;
  content: string;
}

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 85,
    width: "50%",
  },
  iconContainer: {
    marginLeft: 28,
    marginVertical: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    marginLeft: 20,
    marginVertical: 12,
  },
  name: {
    color: "lightgray",
    textTransform: "uppercase",
  },
  content: {
    color: "white",
    fontSize: 15.4,
    marginTop: 6.5,
  },
});
