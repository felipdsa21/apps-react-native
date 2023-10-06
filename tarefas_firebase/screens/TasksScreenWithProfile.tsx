import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import defaultPhoto from "../../firebase/assets/default_photo.svg";
import { auth } from "../../firebase/util/FirebaseConfig";
import { TasksScreen, TasksScreenOptions, TasksScreenProps } from "../../tarefas/screens/TasksScreen";
import { RootStackParamList } from "../util/Definitions";

export function TasksScreenWithProfile({ navigation, route }: TasksScreenWithProfileProps) {
  const user = auth.currentUser!;
  useIsFocused(); // Reload on refocus

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profile}>
        <Image source={user.photoURL} placeholder={defaultPhoto} style={styles.photo} />
        <Text>{user.displayName || user.email}</Text>
        <Text style={styles.arrow}>{"\u2794"}</Text>
      </TouchableOpacity>
      <TasksScreen navigation={navigation as TasksScreenProps["navigation"]} route={route} />
    </>
  );
}

export type TasksScreenWithProfileProps = NativeStackScreenProps<RootStackParamList, "Tasks">;
export { TasksScreenOptions as TasksScreenWithProfileOptions };

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: -5,
    marginHorizontal: 15,
    marginTop: 10,
  },
  photo: {
    height: 30,
    width: 30,
  },
  arrow: {
    marginLeft: "auto",
  },
});
