import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { MutableRefObject, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export function DatePickerComp({ dateRef }: DatePickerCompProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Pressable onPress={() => setShow(true)}>
        <Text style={styles.display}>{dateRef.current.toLocaleDateString()}</Text>
      </Pressable>
      {show ? (
        <RNDateTimePicker
          value={dateRef.current}
          onChange={(event, date) => {
            if (date) dateRef.current = date;
            setShow(false);
          }}
        />
      ) : null}
    </>
  );
}

export interface DatePickerCompProps {
  dateRef: MutableRefObject<Date>;
}

const styles = StyleSheet.create({
  display: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    fontFamily: "monospace",
    padding: 6.5,
  },
});
