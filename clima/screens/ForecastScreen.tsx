import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import { DetailedWeather } from "../components/DetailedWeather";
import { StyledText } from "../components/StyledText";
import { VerticalWeather } from "../components/VerticalWeather";
import { Forecast, ForecastData, RootStackParamList } from "../util/Definitions";
import { requestForecast } from "../util/OwmApi";

export function ForecastScreen({ navigation, route }: ForecastScreenProps) {
  const [forecasts, setForecasts] = useState<ForecastData | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (forecasts === null) {
      requestForecast(route.params.lat, route.params.lon).then(setForecasts);
    }
  }, []);

  function renderWeather({ item, index }: ListRenderItemInfo<Forecast>) {
    const onPress = () => setCurrent(index);
    return <VerticalWeather data={item} onPress={onPress} now={index === 0} selected={index === current} />;
  }

  function renderSeparator() {
    return <View style={styles.nextHoursSeparator} />;
  }

  if (forecasts === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const city = forecasts.city;

  return (
    <View style={styles.container}>
      <StyledText style={styles.location}>
        <StyledText style={styles.city}>{city.name},</StyledText> {city.country}
      </StyledText>
      <DetailedWeather forecast={forecasts.list[current]} />
      <View style={styles.footer}>
        <View style={styles.footerHeader}>
          <StyledText style={styles.today}>Today</StyledText>
          <StyledText style={styles.nextDays} onPress={() => navigation.navigate("DailyForecasts", route.params)}>
            Next Days {"\u003E"}
          </StyledText>
        </View>
        <View style={styles.nextHours}>
          <FlatList
            data={forecasts.list}
            horizontal={true}
            renderItem={renderWeather}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      </View>
    </View>
  );
}

export type ForecastScreenProps = NativeStackScreenProps<RootStackParamList, "Forecast">;

export const ForecastScreenOptions: NativeStackNavigationOptions = {
  headerTitle: "",
  headerShadowVisible: false,
  /* @ts-expect-error Height not supported */
  headerStyle: { height: 110 },
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 30,
  },
  location: {
    fontSize: 21,
    marginBottom: 35,
    marginTop: 4,
  },
  city: {
    fontSize: 25.2,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 50,
  },
  footerHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  today: {
    fontSize: 17.5,
  },
  nextDays: {
    color: "#666666",
    fontSize: 17.5,
  },
  nextHours: {
    marginVertical: 18,
  },
  nextHoursSeparator: {
    width: 20,
  },
});
