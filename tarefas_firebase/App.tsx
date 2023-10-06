import { DocumentTitleOptions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";

import { TasksScreenWithProfile, TasksScreenWithProfileOptions } from "./screens/TasksScreenWithProfile";
import { RootStackParamList } from "./util/Definitions";
import { FirestoreBackendApi } from "./util/FirestoreBackendApi";
import { LoginScreen, LoginScreenOptions } from "../firebase/screens/LoginScreen";
import { ProfileScreen, ProfileScreenOptions } from "../firebase/screens/ProfileScreen";
import { RecoverScreen, RecoverScreenOptions } from "../firebase/screens/RecoverScreen";
import { SignUpScreen, SignUpScreenOptions } from "../firebase/screens/SignUpScreen";
import { UpdateProfileScreen, UpdateProfileScreenOptions } from "../firebase/screens/UpdateProfileScreen";
import { auth } from "../firebase/util/FirebaseConfig";
import { usesNativeToast } from "../firebase/util/Toast";
import { TaskEditorScreen, TaskEditorScreenOptions } from "../tarefas/screens/TaskEditorScreen";
import { TasksProvider } from "../tarefas/util/TasksContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function App() {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const navigator = user ? (
    <Stack.Navigator initialRouteName="Tasks">
      <Stack.Screen name="Tasks" component={TasksScreenWithProfile} options={TasksScreenWithProfileOptions} />
      <Stack.Screen name="TaskEditor" component={TaskEditorScreen} options={TaskEditorScreenOptions} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={ProfileScreenOptions} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={UpdateProfileScreenOptions} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={LoginScreenOptions} />
      <Stack.Screen name="Recover" component={RecoverScreen} options={RecoverScreenOptions} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={SignUpScreenOptions} />
    </Stack.Navigator>
  );

  const documentTitle: DocumentTitleOptions = {
    formatter: (options, route) => `${options?.title ?? route?.name} - App Tarefas`,
  };

  const container = (
    <TasksProvider backendApi={FirestoreBackendApi}>
      <NavigationContainer documentTitle={documentTitle}>{navigator}</NavigationContainer>
    </TasksProvider>
  );
  return usesNativeToast ? container : <RootSiblingParent>{container}</RootSiblingParent>;
}

registerRootComponent(App);
