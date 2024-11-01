import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXEPkksUHdaY2X3mhm98oltftIDMDsJYQ",
  authDomain: "raw2platefuelplus-b23a4.firebaseapp.com",
  projectId: "raw2platefuelplus-b23a4",
  storageBucket: "raw2platefuelplus-b23a4.appspot.com",
  messagingSenderId: "405561231500",
  appId: "1:405561231500:web:095fcec8ea7cc3024553a9"
}

const app = initializeApp( firebaseConfig )
const auth = initializeAuth( app, {
  persistence: getReactNativePersistence( AsyncStorage )
})
const storage = getStorage( app )

export { app, auth, storage }