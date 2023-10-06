import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useRef } from "react";
import { Button, StyleSheet, View } from "react-native";
import validator from "validator";

import { InputComp } from "../components/InputComp";
import { RootStackParamList } from "../util/Definitions";
import { auth } from "../util/FirebaseConfig";
import { areAllValuesTrue, useStateJE } from "../util/Helpers";
import { showToast } from "../util/Toast";

export function RecoverScreen({ navigation }: RecoverScreenProps) {
  const [validFields, setValidFields] = useStateJE({ email: false });
  const allValid = areAllValuesTrue(validFields);

  const emailRef = useRef("");

  function validate() {
    setValidFields({ email: validator.isEmail(emailRef.current) });
  }

  async function doRecoverPassword() {
    try {
      await sendPasswordResetEmail(auth, emailRef.current);
      showToast("Email enviado");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      showToast("Não foi possível enviar o email de recuperação");
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
        submit={allValid ? doRecoverPassword : undefined}
        autoCapitalize="none"
        autoFocus={true}
      />
      <View style={styles.buttonView}>
        <Button title="Enviar email de recuperação" onPress={doRecoverPassword} disabled={!allValid} />
      </View>
    </View>
  );
}

export type RecoverScreenProps = NativeStackScreenProps<RootStackParamList, "Recover">;

export const RecoverScreenOptions: NativeStackNavigationOptions = {
  title: "Recuperar senha",
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
