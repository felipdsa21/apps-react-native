import { ToastAndroid } from "react-native";

export const usesNativeToast = true;
export const showToast = (msg: string) => ToastAndroid.show(msg, ToastAndroid.SHORT);
