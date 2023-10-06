import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useRef } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import validator from "validator";

import { InputComp } from "../components/InputComp";
import { RootStackParamList } from "../util/Definitions";
import { auth } from "../util/FirebaseConfig";
import { areAllValuesTrue, useStateJE } from "../util/Helpers";
import { showToast } from "../util/Toast";

// eslint-disable-next-line no-empty-pattern
export function SignUpScreen({}: SignUpScreenProps) {
  const [validFields, setValidFields] = useStateJE({ email: false, password: false, confirmPassword: false });
  const allValid = areAllValuesTrue(validFields);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  function validate() {
    setValidFields({
      email: validator.isEmail(emailRef.current),
      password: validator.isLength(passwordRef.current, { min: 6 }),
      confirmPassword: passwordRef.current === confirmPasswordRef.current,
    });
  }

  async function doSignUp() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailRef.current, passwordRef.current);
      await sendEmailVerification(userCredential.user);
      showToast("Cadastro realizado e email de verificação enviado");
    } catch (err) {
      console.error(err);
      showToast("Não foi possível fazer o cadastro");
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
        focusNext={() => confirmPasswordInputRef.current!.focus()}
      />
      <InputComp
        label="Confirmar senha"
        innerRef={confirmPasswordInputRef}
        textRef={confirmPasswordRef}
        valid={validFields.confirmPassword}
        validate={validate}
        secureTextEntry={true}
        placeholder="Confirme sua senha"
        submit={allValid ? doSignUp : undefined}
      />
      <View style={styles.buttonView}>
        <Button title="Cadastrar" onPress={doSignUp} disabled={!allValid} />
      </View>
    </View>
  );
}

export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

export const SignUpScreenOptions: NativeStackNavigationOptions = {
  title: "Cadastrar",
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
    width: "100%",
  },
});
