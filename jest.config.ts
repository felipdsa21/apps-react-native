import type { Config } from "jest";

// https://docs.expo.dev/develop/unit-testing/#configuration
const modules = [
  "((jest-)?react-native|@react-native(-community)?)",
  "expo(nent)?",
  "@expo(nent)?/.*",
  "@expo-google-fonts/.*",
  "react-navigation",
  "@react-navigation/.*",
  "@unimodules/.*",
  "unimodules",
  "sentry-expo",
  "native-base",
  "react-native-svg",
  "firebase",
];

const config: Config = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/tests/Mocks.ts"],
  transformIgnorePatterns: [`node_modules/(?!${modules.join("|")})`],
};

export default config;
