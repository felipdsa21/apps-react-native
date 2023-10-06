import React from "react";
import { Image, StyleSheet } from "react-native";

import { StyledText } from "./StyledText";
import { Forecast } from "../util/Definitions";
import { getIconUrl } from "../util/OwmApi";

export function VerticalWeather({ data, now, selected, onPress }: VerticalWeatherProps) {
  const date = new Date(data.dt * 1000);
  const time = `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`;

  return (
    <StyledText onPress={onPress} style={selected ? [styles.container, styles.selected] : styles.container}>
      <StyledText style={styles.hour}>{time}</StyledText>
      <Image source={{ uri: getIconUrl(data.weather[0].icon) }} style={styles.icon} />
      <StyledText style={styles.temperature}>{now ? "Now" : Math.round(data.main.temp) + "\u00B0"}</StyledText>
    </StyledText>
  );
}

function padNumber(number: number) {
  return String(number).padStart(2, "0");
}

export interface VerticalWeatherProps {
  data: Forecast;
  now: boolean;
  selected: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#eaeaea",
    borderRadius: 10,
    borderWidth: 2,
    height: 122,
    paddingVertical: 8,
    textAlign: "center",
    width: 60,
  },
  selected: {
    backgroundColor: "#427bff",
    borderWidth: 0,
    color: "white",
  },
  hour: {
    fontSize: 16.1,
  },
  icon: {
    height: 60,
    shadowColor: "#808080",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    width: 60,
  },
  temperature: {
    fontSize: 16.8,
  },
});
