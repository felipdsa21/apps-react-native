import CheckBox from "expo-checkbox";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { TaskNoId } from "../util/Definitions";

export function TaskComp({ data, now, setDesc, setDone, remove }: TaskCompProps) {
  const date = new Date(data.timestamp * 1000);

  return (
    <View style={styles.container}>
      <CheckBox value={data.done} onValueChange={setDone} />
      <View style={styles.container}>
        <Text style={!data.done && now.getTime() > date.getTime() ? styles.pastDate : null}>
          {getDateText(date, now)}
        </Text>
        <Text ellipsizeMode="head" numberOfLines={1}>
          {data.desc}
        </Text>
        <View style={[styles.done, data.done ? styles.doneVisible : null]} />
      </View>
      <Button title={"\u270E"} onPress={setDesc} />
      <Button title={"\u2716"} color="crimson" onPress={remove} />
    </View>
  );
}

export interface TaskCompProps {
  data: TaskNoId;
  now: Date;
  setDesc: () => void;
  setDone: (value: boolean) => void;
  remove: () => void;
}

function getDateText(date: Date, now: Date): string {
  const daysDiff = Math.floor((date.getTime() - now.getTime()) / 86400000);

  if (daysDiff > -2 && daysDiff <= -1) {
    return "Ontem";
  } else if (daysDiff > 0 && daysDiff <= 1) {
    return "Amanhã";
  } else if (daysDiff > 0 && daysDiff <= 6) {
    return date.toLocaleDateString("pt-br", { weekday: "long" });
  } else if (date.getFullYear() !== now.getFullYear()) {
    return date.getFullYear().toString();
  } else if (date.getMonth() !== now.getMonth()) {
    return date.toLocaleDateString("pt-br", { month: "long" });
  } else if (date.getDate() !== now.getDate()) {
    return `Dia ${date.getDate()}`;
  } else {
    return `Hoje`;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  pastDate: {
    color: "crimson",
  },
  done: {
    position: "absolute",
    width: "100%",
  },
  doneVisible: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
