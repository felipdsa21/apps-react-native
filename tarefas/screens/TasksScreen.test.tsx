import { expect, jest, test } from "@jest/globals";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { render } from "@testing-library/react-native";
import React from "react";

import { TasksScreen, TasksScreenOptions } from "./TasksScreen";
import { RootStackParamList } from "../util/Definitions";
import { BackendApi, TasksProvider } from "../util/TasksContext";

const MockBackendApi = {
  listTasks: jest.fn<BackendApi["listTasks"]>(),
  addTask: jest.fn<BackendApi["addTask"]>(),
  editTask: jest.fn<BackendApi["editTask"]>(),
  deleteTask: jest.fn<BackendApi["deleteTask"]>(),
};

test("Renderiza corretamente", async () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const component = (
    <TasksProvider backendApi={MockBackendApi}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tasks">
          <Stack.Screen name="Tasks" component={TasksScreen} options={TasksScreenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );

  MockBackendApi.listTasks.mockImplementation(async () => [{ id: 1, desc: "Test", done: false, timestamp: 1 }]);

  const tree = render(component);
  expect(tree);
});
