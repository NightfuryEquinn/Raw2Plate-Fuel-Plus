import AppStack from 'app/AppStack';
import { registerBackgroundTask } from 'config/notificationInstance';
import { FirebaseProvider } from 'context/FirebaseProvider';
import { FontProvider } from 'context/FontProvider';
import { registerRootComponent } from 'expo';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { configureFonts, DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from 'redux/reducers/store';
import * as Location from 'expo-location'
import { Audio } from 'expo-av'

export default function App() {
  const fontConfig = {
    fontFamily: "cantarell"
  }

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts({ config: fontConfig })
  }

  const registerForPushNotificationAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync()

    if ( status !== "granted" ) {
      Alert.alert(
        "Permission Required!",
        `You need to enable notifications to use the app!`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      )
    }
  }

  const registerForLocationAsync = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
  
    if ( 
      foregroundStatus !== Location.PermissionStatus.GRANTED ||
      backgroundStatus !== Location.PermissionStatus.GRANTED
    ) {
      Alert.alert(
        "Permission Required!",
        `You need to enable foreground and background location services to use the app!`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      )
    }
  } 

  const registerForMicrophoneAsync = async () => {
    const { status } = await Audio.requestPermissionsAsync()

    if ( status !== Audio.PermissionStatus.GRANTED ) {
      Alert.alert(
        "Permission Required!",
        `You need to enable microphone to use the app!`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      )
    }
  }

  useEffect(() => {
    registerForPushNotificationAsync()
    registerForLocationAsync()
    registerForMicrophoneAsync()
    registerBackgroundTask()
  }, [])

  return (
    <Provider store={ store }>
      <PaperProvider theme={ theme }>
        <FirebaseProvider>
          <FontProvider>
            <AppStack />
          </FontProvider>
        </FirebaseProvider>
      </PaperProvider>
    </Provider>
  )
}

registerRootComponent( App )