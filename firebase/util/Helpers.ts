import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Dispatch, SetStateAction, useState } from "react";

export function areAllValuesTrue(obj: object) {
  return Object.values(obj).every(Boolean);
}

export function useStateJE<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);

  function wrappedSetState(action: SetStateAction<S>) {
    // @ts-expect-error Action can be a function
    const newState = typeof action === "function" ? action(state) : action;
    return setState(JSON.stringify(state) !== JSON.stringify(newState) ? newState : state);
  }

  return [state, wrappedSetState];
}

export async function uploadToStorage(url: string, name: string) {
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(new TypeError("Network request failed"));
    xhr.responseType = "blob";
    xhr.open("GET", url, true);
    xhr.send(null);
  });

  const storageRef = ref(getStorage(), name);
  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
}
