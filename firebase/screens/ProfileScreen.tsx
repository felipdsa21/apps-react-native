import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { sendEmailVerification, signOut } from "firebase/auth";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import defaultPhoto from "../assets/default_photo.svg";
import { RootStackParamList } from "../util/Definitions";
import { auth } from "../util/FirebaseConfig";
import { showToast } from "../util/Toast";

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const user = auth.currentUser!;
  useIsFocused(); // Reload on refocus

  async function resendVerificationEmail() {
    try {
      await sendEmailVerification(user);
      showToast("Email de verificação enviado");
    } catch (err) {
      console.error(err);
      showToast("Não foi possível enviar o email");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image source={user.photoURL} placeholder={defaultPhoto} style={styles.photo} />
      </View>
      <View>
        <Text style={styles.label}>Nome: {user.displayName}</Text>
        <Text style={styles.label}>Email: {user.email} </Text>
        <Text style={[styles.label, user.emailVerified ? styles.verified : styles.unverified]}>
          {user.emailVerified ? "Email verificado" : "Email não verificado"}
        </Text>
      </View>
      <Button title="Atualizar dados" onPress={() => navigation.navigate("UpdateProfile")} />
      {!user.emailVerified ? (
        <Button title="Reenviar email de verificação" onPress={resendVerificationEmail} color="green" />
      ) : null}
      <Button title="Sair" onPress={() => signOut(auth)} color="red" />
    </View>
  );
}

export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

export const ProfileScreenOptions: NativeStackNavigationOptions = {
  title: "Perfil",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: "7%",
  },
  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    height: 200,
    width: 200,
  },
  label: {
    fontSize: 16,
  },
  verified: {
    color: "green",
  },
  unverified: {
    color: "red",
  },
});
