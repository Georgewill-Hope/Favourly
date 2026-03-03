import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  // @ts-ignore
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
