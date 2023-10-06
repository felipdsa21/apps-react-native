import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import validator from "validator";

import { InputComp } from "../components/InputComp";
import { RootStackParamList } from "../util/Definitions";
import { auth } from "../util/FirebaseConfig";
import { areAllValuesTrue, useStateJE } from "../util/Helpers";
import { showToast } from "../util/Toast";

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [validFields, setValidFields] = useStateJE({ email: false, password: false });
  const allValid = areAllValuesTrue(validFields);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordInputRef = useRef<TextInput>(null);

  function validate() {
    setValidFields({
      email: validator.isEmail(emailRef.current),
      password: validator.isLength(passwordRef.current, { min: 6 }),
    });
  }

  async function doLogin() {
    try {
      await signInWithEmailAndPassword(auth, emailRef.current, passwordRef.current);
    } catch (err) {
      console.error(err);
      showToast("Não foi possível entrar");
    }
  }

  return (
    <View style={styles.container}>
      <InputComp
        label="Email"
        textRef={emailRef}
        valid={validFields.email}
        validate={validate}
        inputMode="email"
        placeholder="Digite seu email"
        focusNext={() => passwordInputRef.current!.focus()}
        autoCapitalize="none"
        autoFocus={true}
      />
      <InputComp
        label="Senha"
        innerRef={passwordInputRef}
        textRef={passwordRef}
        valid={validFields.password}
        validate={validate}
        secureTextEntry={true}
        placeholder="Digite sua senha"
        submit={allValid ? doLogin : undefined}
      />
      <View style={styles.buttonView}>
        <Button title="Entrar" onPress={doLogin} disabled={!allValid} />
        <Button title="Recuperar senha" onPress={() => navigation.navigate("Recover")} color="darkorange" />
        <Button title="Cadastrar" onPress={() => navigation.navigate("SignUp")} color="green" />
      </View>
    </View>
  );
}

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export const LoginScreenOptions: NativeStackNavigationOptions = {
  title: "Entrar",
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 12,
    justifyContent: "center",
    padding: "7%",
  },
  buttonView: {
    gap: 12,
    width: "100%",
  },
});
