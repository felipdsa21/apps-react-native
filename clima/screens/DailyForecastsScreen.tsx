import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import { HorizontalWeather } from "../components/HorizontalWeather";
import { StyledText } from "../components/StyledText";
import { DailyForecast, DailyForecastData, RootStackParamList } from "../util/Definitions";
import { requestDailyForecasts } from "../util/OwmApi";

export function DailyForecastsScreen({ navigation, route }: DailyForecastsScreenProps) {
  const [forecasts, setForecasts] = useState<DailyForecastData | null>(null);
  const city = forecasts?.city;

  useEffect(() => {
    if (forecasts === null) {
      requestDailyForecasts(route.params.lat, route.params.lon).then(setForecasts);
    }
  }, []);

  useEffect(() => navigation.setOptions({ headerTitle: city ? renderHeaderTitle : "Daily Forecasts" }), [city]);

  function renderHeaderTitle() {
    if (!city) {
      return null;
    }

    return (
      <StyledText style={styles.location}>
        <StyledText style={styles.city}>{city.name},</StyledText> {city.country}
      </StyledText>
    );
  }

  function renderWeather({ item }: ListRenderItemInfo<DailyForecast>) {
    return <HorizontalWeather data={item} />;
  }

  function renderSeparator() {
    return <View style={styles.nextDaysSeparator} />;
  }

  if (forecasts === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StyledText style={styles.nextDaysLabel}>Next 7 Days</StyledText>
      <FlatList data={forecasts.list} renderItem={renderWeather} ItemSeparatorComponent={renderSeparator} />
    </View>
  );
}

export type DailyForecastsScreenProps = NativeStackScreenProps<RootStackParamList, "DailyForecasts">;

export const DailyForecastsScreenOptions: NativeStackNavigationOptions = {
  headerTintColor: "white",
  headerTitleAlign: "center",
  headerShadowVisible: false,
  /* @ts-expect-error Height not supported */
  headerStyle: { backgroundColor: "#427bff", height: 110 },
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    backgroundColor: "#427bff",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#427bff",
    flex: 1,
    paddingHorizontal: 30,
  },
  location: {
    color: "white",
    fontSize: 16.1,
  },
  city: {
    fontSize: 17.71,
    fontWeight: "bold",
  },
  nextDaysLabel: {
    color: "white",
    fontSize: 22.4,
    marginBottom: 28,
    marginTop: 10,
  },
  nextDaysSeparator: {
    height: 26,
  },
});
