import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Button, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import { TaskComp } from "../components/TaskComp";
import { RootStackParamList, Task } from "../util/Definitions";
import { TasksContext } from "../util/TasksContext";

export function TasksScreen({ navigation }: TasksScreenProps) {
  const { loading, tasks, editTask, loadTasks, removeTask } = useContext(TasksContext);
  const [, setUpdate] = useState({});

  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const sortedTasks = useMemo(() => tasks.sort(sortTasks), [tasks]);

  useEffect(() => {
    loadTasks();
    updateTimeoutRef.current = setTimeout(updateDisplayedDates, getMilisecondsUntilTomorrow());
    return () => clearTimeout(updateTimeoutRef.current);
  }, []);

  function sortTasks(a: Task, b: Task) {
    return +a.done - +b.done || a.timestamp - b.timestamp || a.desc.localeCompare(b.desc);
  }

  function renderTask({ item }: ListRenderItemInfo<Task>) {
    return (
      <TaskComp
        data={item}
        now={now}
        setDesc={() => navigation.navigate("TaskEditor", { id: item.id })}
        setDone={(value) => editTask(item.id, { done: value })}
        remove={() => removeTask(item.id)}
      />
    );
  }

  function renderSeparator() {
    return <View style={styles.taskBorder} />;
  }

  function updateDisplayedDates() {
    setUpdate({});
    updateTimeoutRef.current = setTimeout(updateDisplayedDates, getMilisecondsUntilTomorrow());
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const now = new Date(new Date().toDateString());

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Button title="Adicionar" onPress={() => navigation.navigate("TaskEditor")} />
        <FlatList data={sortedTasks} renderItem={renderTask} ItemSeparatorComponent={renderSeparator} />
      </View>
    </View>
  );
}

export type TasksScreenProps = NativeStackScreenProps<RootStackParamList, "Tasks">;

export const TasksScreenOptions: NativeStackNavigationOptions = {
  title: "Tarefas",
};

function getMilisecondsUntilTomorrow() {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return tomorrow.getTime() - now.getTime();
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    padding: 15,
  },
  subcontainer: {
    gap: 5,
    width: "100%",
  },
  taskBorder: {
    borderColor: "gray",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginVertical: 3,
  },
});
