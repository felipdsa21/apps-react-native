import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { DailyForecastsScreen, DailyForecastsScreenOptions } from "./screens/DailyForecastsScreen";
import { ForecastScreen, ForecastScreenOptions } from "./screens/ForecastScreen";
import { SearchScreen, SearchScreenOptions } from "./screens/SearchScreen";
import { RootStackParamList } from "./util/Definitions";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="DailyForecasts" component={DailyForecastsScreen} options={DailyForecastsScreenOptions} />
          <Stack.Screen name="Forecast" component={ForecastScreen} options={ForecastScreenOptions} />
          <Stack.Screen name="Search" component={SearchScreen} options={SearchScreenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

registerRootComponent(App);
