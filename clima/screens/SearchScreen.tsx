import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, TextInput, View } from "react-native";

import { StyledText } from "../components/StyledText";
import { Location, RootStackParamList } from "../util/Definitions";
import { requestSearchLocations } from "../util/OwmApi";

export function SearchScreen({ navigation }: SearchScreenProps) {
  const [locations, setLocations] = useState<Location[]>([]);

  const searchRef = useRef("");
  const searchDelayRef = useRef<ReturnType<typeof setTimeout>>();

  function doSearch() {
    clearTimeout(searchDelayRef.current);

    if (searchRef.current) {
      searchDelayRef.current = setTimeout(() => requestSearchLocations(searchRef.current).then(setLocations), 1000);
    }
  }

  function renderLocation({ item }: ListRenderItemInfo<Location>) {
    return (
      <StyledText onPress={() => navigation.navigate("Forecast", { lat: item.lat, lon: item.lon })}>
        {item.name}, {item.state ? [item.state, ", "] : null} {item.country}
      </StyledText>
    );
  }

  function renderSeparator() {
    return <View style={styles.locationBorder} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type a location"
        placeholderTextColor="dimgray"
        onChangeText={(text) => {
          searchRef.current = text;
          doSearch();
        }}
        style={styles.search}
      />
      <FlatList data={locations} renderItem={renderLocation} ItemSeparatorComponent={renderSeparator} />
    </View>
  );
}

export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, "Search">;

export const SearchScreenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 25,
  },
  search: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
    padding: 8,
  },
  locationBorder: {
    borderColor: "gray",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginVertical: 15,
  },
});
