import React, { MutableRefObject, RefObject } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

export function InputComp({ innerRef, label, textRef, valid, focusNext, submit, validate, ...props }: InputCompProps) {
  console.assert(
    !(focusNext || submit) || Boolean(focusNext) !== Boolean(submit),
    "Only one of focusNext or submit should be used",
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        {...props}
        ref={innerRef}
        blurOnSubmit={focusNext ? false : undefined}
        defaultValue={textRef.current}
        onChangeText={(text) => {
          textRef.current = text;
          validate();
        }}
        onSubmitEditing={focusNext || submit}
        placeholderTextColor="dimgray"
        returnKeyType={focusNext ? "next" : undefined}
        style={getInputStyle(valid)}
      />
    </View>
  );
}

type NotAllowedProps =
  | "blurOnSubmit"
  | "defaultValue"
  | "onChangeText"
  | "onSubmitEditing"
  | "placeholderTextColor"
  | "returnKeyType"
  | "style";

export interface InputCompProps extends Omit<TextInputProps, NotAllowedProps> {
  innerRef?: RefObject<TextInput>;
  label: string;
  textRef: MutableRefObject<string>;
  valid: boolean;
  focusNext?: () => void;
  submit?: () => void;
  validate: () => void;
}

function getInputStyle(valid: boolean) {
  return valid ? styles.input : [styles.input, styles.invalidInput];
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 15,
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 15.5,
    padding: 8,
    width: "100%",
  },
  invalidInput: {
    borderColor: "red",
  },
});
