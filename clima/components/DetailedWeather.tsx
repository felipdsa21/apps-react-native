import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { ExtraInfo } from "./ExtraInfo";
import { StyledText } from "./StyledText";
import sunIcon from "../assets/sun.svg";
import thermometerIcon from "../assets/thermometer.svg";
import waveIcon from "../assets/wave.svg";
import windIcon from "../assets/wind.svg";
import { Forecast } from "../util/Definitions";
import { getIconUrl } from "../util/OwmApi";

export function DetailedWeather({ forecast }: DetailedWeatherProps) {
  const weather = forecast.weather[0];
  const date = new Date(forecast.dt * 1000);
  const formattedDate = date.toLocaleDateString("en-gb", { weekday: "long", day: "2-digit", month: "short" });

  return (
    <View style={styles.container}>
      <Image source={{ uri: getIconUrl(weather.icon) }} style={styles.icon} />
      <StyledText style={styles.description}>{weather.description}</StyledText>
      <StyledText style={styles.date}>{formattedDate}</StyledText>
      <StyledText style={styles.temperature}>{Math.round(forecast.main.temp) + "\u00B0"}</StyledText>
      <View style={styles.extraInfo}>
        <ExtraInfo icon={windIcon} name="Wind" content={`${forecast.wind.speed} m/s`} />
        <ExtraInfo icon={thermometerIcon} name="Feels like" content={forecast.main.feels_like + "\u00B0"} />
        <ExtraInfo icon={sunIcon} name="Index UV" content="Unknown" />
        <ExtraInfo icon={waveIcon} name="Pressure" content={`${forecast.main.pressure} hPa`} />
      </View>
    </View>
  );
}

export interface DetailedWeatherProps {
  forecast: Forecast;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#427bff",
    borderRadius: 20,
  },
  icon: {
    height: 125,
    marginTop: 18,
    width: 125,
  },
  description: {
    color: "white",
    fontSize: 26.6,
    marginTop: -18,
    textTransform: "capitalize",
  },
  date: {
    color: "lightgray",
    fontSize: 15.4,
    marginVertical: 4,
  },
  temperature: {
    color: "white",
    fontSize: 87.5,
    marginTop: 10,
  },
  extraInfo: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    width: "100%",
  },
});
