import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { launchImageLibraryAsync } from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import validator from "validator";

import defaultPhoto from "../assets/default_photo.svg";
import { InputComp } from "../components/InputComp";
import { RootStackParamList } from "../util/Definitions";
import { auth } from "../util/FirebaseConfig";
import { areAllValuesTrue, useStateJE, uploadToStorage } from "../util/Helpers";
import { showToast } from "../util/Toast";

export function UpdateProfileScreen({ navigation }: UpdateProfileScreenProps) {
  const user = auth.currentUser!;

  const [photoUrl, setPhotoUrl] = useState(user.photoURL || "");
  const [validFields, setValidFields] = useStateJE({ name: Boolean(user.displayName) });
  const allValid = areAllValuesTrue(validFields);

  const nameRef = useRef(user.displayName || "");

  function validate() {
    setValidFields({ name: validator.isLength(nameRef.current, { min: 2 }) });
  }

  async function pickImage() {
    const result = await launchImageLibraryAsync({ aspect: [1, 1], allowsEditing: true });

    if (!result.canceled) {
      setPhotoUrl(result.assets[0].uri);
    }
  }

  async function doUpdateProfile() {
    try {
      let newUrl = undefined;
      if (photoUrl !== user.photoURL) {
        newUrl = photoUrl ? await uploadToStorage(photoUrl, `photos/${user.uid}`) : "";
      }

      await updateProfile(user, { displayName: nameRef.current, photoURL: newUrl });
      showToast("Perfil atualizado");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      showToast("Não foi possível atualizar o perfil");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image source={user.photoURL} placeholder={defaultPhoto} style={styles.photo} />
        <View style={styles.photoActions}>
          {photoUrl ? <Button title={"\u274C"} onPress={() => setPhotoUrl("")} /> : null}
          <Button title={`\u{1F4F7}`} onPress={pickImage} />
        </View>
      </View>
      <InputComp
        label="Nome"
        textRef={nameRef}
        valid={validFields.name}
        validate={validate}
        placeholder="Digite seu nome"
        submit={allValid ? doUpdateProfile : undefined}
      />
      <View style={styles.buttonView}>
        <Button title="Salvar" onPress={doUpdateProfile} disabled={!allValid} />
      </View>
    </View>
  );
}

export type UpdateProfileScreenProps = NativeStackScreenProps<RootStackParamList, "UpdateProfile">;

export const UpdateProfileScreenOptions: NativeStackNavigationOptions = {
  title: "Atualizar perfil",
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 12,
    padding: "7.5%",
  },
  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    height: 200,
    width: 200,
  },
  photoActions: {
    bottom: 5,
    flexDirection: "row",
    gap: 6,
    position: "absolute",
    right: 5,
  },
  buttonView: {
    width: "100%",
  },
});
