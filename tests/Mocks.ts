import { jest } from "@jest/globals";

const AuthMock = {
  currentUser: {
    displayName: "",
    email: "",
    photoURL: "",
    uid: "test",
  },
};

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

jest.mock("firebase/app", () => {
  return {
    initializeApp: jest.fn(),
  };
});

jest.mock("firebase/auth", () => {
  return {
    createUserWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(() => AuthMock),
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(() => AuthMock),
    onAuthStateChanged: jest.fn(),
    sendEmailVerification: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    updateProfile: jest.fn(),
  };
});

jest.mock("firebase/firestore", () => {
  return {
    doc: jest.fn(),
    getDoc: jest.fn(),
    getFirestore: jest.fn(),
    setDoc: jest.fn(),
  };
});

jest.mock("firebase/storage", () => {
  return {
    getDownloadURL: jest.fn(),
    ref: jest.fn(),
    uploadBytes: jest.fn(),
  };
});
