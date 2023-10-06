import { expect, test } from "@jest/globals";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { render } from "@testing-library/react-native";
import React from "react";

import { UpdateProfileScreen, UpdateProfileScreenOptions } from "./UpdateProfileScreen";
import { RootStackParamList } from "../util/Definitions";

test("Renderiza corretamente", async () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const component = (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UpdateProfile">
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={UpdateProfileScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  const tree = render(component);
  expect(tree);

  const button = await tree.findByText("Salvar");
  expect(button);
});
