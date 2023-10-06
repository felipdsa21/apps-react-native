import Toast from "react-native-root-toast";

export const usesNativeToast = false;
export const showToast: (msg: string) => void = Toast.show;

// Makes react-native-root-siblings work on the Web
if (typeof setImmediate !== "function") {
  // @ts-expect-error Node's __promisify__ is unneeded
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.setImmediate = function <Args extends any[]>(handler: (...args: Args) => void, ...args: Args) {
    args.unshift(0);
    return setTimeout(handler, ...args);
  };
}
