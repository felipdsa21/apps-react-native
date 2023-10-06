import { expect, test } from "@jest/globals";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { render } from "@testing-library/react-native";
import React from "react";

import { ProfileScreen, ProfileScreenOptions } from "./ProfileScreen";
import { RootStackParamList } from "../util/Definitions";

test("Renderiza corretamente", async () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const component = (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} options={ProfileScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  const tree = render(component);
  expect(tree);

  const button = await tree.findByText("Sair");
  expect(button);
});
