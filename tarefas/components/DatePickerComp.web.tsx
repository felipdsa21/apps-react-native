import React, { MutableRefObject } from "react";
import { StyleSheet } from "react-native";

export function DatePickerComp({ dateRef }: DatePickerCompProps) {
  return (
    <input
      type="date"
      defaultValue={toISO8601Local(dateRef.current)}
      onChange={(e) => (dateRef.current = parseISO8601Local(e.target.value))}
      style={styles.input}
    />
  );
}

export interface DatePickerCompProps {
  dateRef: MutableRefObject<Date>;
}

function parseISO8601Local(value: string) {
  const date = new Date(value);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

function toISO8601Local(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T", 1)[0];
}

const styles = StyleSheet.create({
  input: {
    padding: 6,
  },
});
