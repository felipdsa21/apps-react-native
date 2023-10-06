import { DocumentTitleOptions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";

import { LoginScreen, LoginScreenOptions } from "./screens/LoginScreen";
import { ProfileScreen, ProfileScreenOptions } from "./screens/ProfileScreen";
import { RecoverScreen, RecoverScreenOptions } from "./screens/RecoverScreen";
import { SignUpScreen, SignUpScreenOptions } from "./screens/SignUpScreen";
import { UpdateProfileScreen, UpdateProfileScreenOptions } from "./screens/UpdateProfileScreen";
import { RootStackParamList } from "./util/Definitions";
import { auth } from "./util/FirebaseConfig";
import { usesNativeToast } from "./util/Toast";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function App() {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const navigator = user ? (
    <Stack.Navigator initialRouteName="Profile">
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
    formatter: (options, route) => `${options?.title ?? route?.name} - App Firebase`,
  };

  const container = <NavigationContainer documentTitle={documentTitle}>{navigator}</NavigationContainer>;
  return usesNativeToast ? container : <RootSiblingParent>{container}</RootSiblingParent>;
}

registerRootComponent(App);
