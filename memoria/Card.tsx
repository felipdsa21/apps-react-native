import React from "react";
import { GestureResponderEvent, Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from "react-native";

export function Card({ image, status, disabled, onPress }: CardProps) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.card, getExtraCardStyle(status)]}>
      {status ? <Image source={image} style={styles.image} resizeMode="contain" /> : null}
    </TouchableOpacity>
  );
}

export interface CardProps {
  image: ImageSourcePropType;
  status: CardStatus;
  disabled: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

export enum CardStatus {
  Hidden,
  Selected,
  Visible,
}

function getExtraCardStyle(status: CardStatus) {
  switch (status) {
    case CardStatus.Hidden:
      return styles.hiddenCard;
    case CardStatus.Selected:
      return styles.selectedCard;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 131 / 10,
    height: 175,
    justifyContent: "center",
    width: 131,
  },
  hiddenCard: {
    backgroundColor: "#abb2b9",
  },
  selectedCard: {
    borderColor: "#0f3460",
    borderWidth: 5,
  },
  image: {
    height: 100,
    width: 100,
  },
});
