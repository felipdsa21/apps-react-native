import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import React from "react";

import { TaskEditorScreen, TaskEditorScreenOptions } from "./screens/TaskEditorScreen";
import { TasksScreen, TasksScreenOptions } from "./screens/TasksScreen";
import { RootStackParamList } from "./util/Definitions";
import { JsonServerBackendApi } from "./util/JsonServerBackendApi";
import { TasksProvider } from "./util/TasksContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function App() {
  return (
    <TasksProvider backendApi={JsonServerBackendApi}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tasks">
          <Stack.Screen name="TaskEditor" component={TaskEditorScreen} options={TaskEditorScreenOptions} />
          <Stack.Screen name="Tasks" component={TasksScreen} options={TasksScreenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}

registerRootComponent(App);
