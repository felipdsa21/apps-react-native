import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useMemo, useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { DatePickerComp } from "../components/DatePickerComp";
import { RootStackParamList } from "../util/Definitions";
import { TasksContext } from "../util/TasksContext";

export function TaskEditorScreen({ navigation, route }: TaskEditorScreenProps) {
  const { tasks, addTask, editTask } = useContext(TasksContext);
  const id = route.params ? route.params.id : undefined;
  const task = useMemo(() => (id ? tasks.find((task) => task.id === id) : undefined), [id]);
  const initialDesc = task?.desc || "";
  const initialDate =
    task?.timestamp !== undefined ? new Date(task.timestamp * 1000) : new Date(new Date().toDateString());

  const [valid, setValid] = useState(Boolean(initialDesc));

  const descRef = useRef(initialDesc);
  const dateRef = useRef(initialDate);

  function save() {
    const timestamp = dateRef.current!.getTime() / 1000;
    if (id !== undefined) {
      editTask(id, { desc: descRef.current, timestamp });
    } else {
      addTask({ desc: descRef.current, timestamp, done: false });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          placeholder="Escreva a descrição"
          placeholderTextColor="dimgray"
          defaultValue={descRef.current}
          onChangeText={(text) => {
            descRef.current = text;
            setValid(Boolean(descRef.current));
          }}
          onSubmitEditing={valid ? save : undefined}
          style={styles.desc}
        />
        <Text style={styles.label}>Data:</Text>
        <DatePickerComp dateRef={dateRef} />
        <Button title="Salvar" onPress={save} disabled={!valid} />
      </View>
    </View>
  );
}

export type TaskEditorScreenProps = NativeStackScreenProps<RootStackParamList, "TaskEditor">;

export const TaskEditorScreenOptions: NativeStackNavigationOptions = {
  title: "Editor de tarefas",
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  subcontainer: {
    gap: 12,
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 15,
    marginBottom: -8,
  },
  desc: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 6.5,
  },
});
