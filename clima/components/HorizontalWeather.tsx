import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { StyledText } from "./StyledText";
import { DailyForecast } from "../util/Definitions";
import { getIconUrl } from "../util/OwmApi";

export function HorizontalWeather({ data }: HorizontalWeatherProps) {
  const date = new Date(data.dt * 1000);
  const weekDay = date.toLocaleDateString("en-gb", { weekday: "long" });
  const formattedDate = date.toLocaleDateString("en-gb", { day: "2-digit", month: "short" });

  return (
    <View style={styles.container}>
      <Image source={{ uri: getIconUrl(data.weather[0].icon) }} style={styles.icon} />
      <StyledText style={styles.dateContainer}>
        <StyledText style={styles.weekDay}>{weekDay}, </StyledText>
        <StyledText style={styles.date}>{formattedDate}</StyledText>
      </StyledText>
      <StyledText>
        <StyledText style={styles.temperature}>{Math.round(data.temp.day)} </StyledText>
        <StyledText style={styles.tempSeparator}>/ </StyledText>
        <StyledText style={styles.feelsLike}>{Math.round(data.feels_like.day) + "\u00B0"}</StyledText>
      </StyledText>
    </View>
  );
}

export interface HorizontalWeatherProps {
  data: DailyForecast;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    height: 60,
    width: 60,
  },
  dateContainer: {
    flexGrow: 0.7,
    fontSize: 16.8,
  },
  weekDay: {
    color: "white",
  },
  date: {
    color: "lightgray",
  },
  temperature: {
    color: "white",
    fontSize: 23.8,
  },
  tempSeparator: {
    color: "white",
    fontSize: 18.2,
  },
  feelsLike: {
    color: "lightgray",
    fontSize: 18.2,
  },
});
