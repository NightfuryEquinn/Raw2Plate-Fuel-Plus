import { LightMode } from 'assets/colors/LightMode'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { Audio } from 'expo-av'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react'
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducers/store'

export default function Settings() {
  const { data, loading, error } = useSelector(( state: RootState ) => state.user )
  const userInfo = data[ 0 ].setUserSession

  const pkg = require( "../package.json" )
  const [ darkMode, setDarkMode ] = useState( userInfo.isDarkMode )
  const [ foreground, setForeground ] = useState( false )
  const [ background, setBackground ] = useState( false )
  const [ microphone, setMicrophone ] = useState( false )
  const [ notification, setNotification ] = useState( false )

  const getDarkMode = () => {
    return darkMode
      ? require( "../assets/images/icons/checked.png" )
      : require( "../assets/images/icons/cancel.png" ) 
  }

  const getPreciseLocationImage = () => {
    return foreground || background 
      ? require( "../assets/images/icons/checked.png" )
      : require( "../assets/images/icons/cancel.png" ) 
  }

  const getMicrophoneImage = () => {
    return microphone
    ? require( "../assets/images/icons/checked.png" )
    : require( "../assets/images/icons/cancel.png" ) 
  }

  const getNotification = () => {
    return microphone
    ? require( "../assets/images/icons/checked.png" )
    : require( "../assets/images/icons/cancel.png" ) 
  }

  const openDeviceSettings = ( text: string ) => {
    Alert.alert(
      "Permission Required",
      `To disable ${ text } permissions, please go to your device settings.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() }
      ]
    )
  }

  const toggleDarkMode = () => {
    if ( darkMode ) {
      setDarkMode( false )
    } else {
      setDarkMode( true )

      Alert.alert(
        "Not yet available!",
        "Dark mode will be integrated in the future. Please bear with the bugs!",
        [
          { text: "I Understood", style: "default" },
        ]
      )
    }
  }

  const toggleLocation = async () => {
    if ( foreground || background ) {
      openDeviceSettings( "location" )
    } else {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
      setForeground( foregroundStatus === Location.PermissionStatus.GRANTED )

      if ( foregroundStatus === Location.PermissionStatus.GRANTED ) {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
        setBackground( backgroundStatus === Location.PermissionStatus.GRANTED )
      }
    }
  }

  const toggleMicrophone = async () => {
    const { status } = await Audio.requestPermissionsAsync()
    
    if ( microphone ) {
      openDeviceSettings( "microphone" )
    } else {
      setMicrophone( status === Audio.PermissionStatus.GRANTED )
    }
  }

  const toggleNotification = async () => {
    const { status } = await Notifications.requestPermissionsAsync()

    if ( status === "granted" ) {
      openDeviceSettings( "notification" )
    } else {
      setNotification( true )
    }
  }

  useEffect(() => {
    (async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
      setForeground( foregroundStatus === Location.PermissionStatus.GRANTED )

      if ( foregroundStatus === Location.PermissionStatus.GRANTED ) {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
        setBackground( backgroundStatus === Location.PermissionStatus.GRANTED )
      }
    })();

    (async() => {
      const { status: micStatus } = await Audio.requestPermissionsAsync()
      setMicrophone( micStatus === Audio.PermissionStatus.GRANTED )
    })();

    (async() => {
      const { status: notificationStatus } = await Notifications.requestPermissionsAsync()
      setNotification( notificationStatus === "granted" )
    })
  }, [])

  return (
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>Settings</Text>

        <Spacer size={ 20 } />

        <View style={ s.settingContainer }>
          <View style={ s.setting }>
            <View style={ s.leftSetting }>
              <Image 
                resizeMode="cover"
                style={ s.image }
                source={ require( "../assets/images/icons/dark_mode.png" ) }
              />

              <Text style={ s.sub }>Dark Mode</Text>
            </View>

            <TouchableOpacity activeOpacity={ 0.5 } onPress={ toggleDarkMode }>
              <Image 
                resizeMode="cover"
                style={ s.image }
                source={ getDarkMode() }
              />
            </TouchableOpacity>
          </View>

          <View style={ s.setting }>
            <View style={ s.leftSetting }>
              <Image 
                resizeMode="cover"
                style={ s.image }
                source={ require( "../assets/images/icons/map.png" ) }
              />

              <Text style={ s.sub }>Precision Location</Text>
            </View>

            <TouchableOpacity activeOpacity={ 0.5 } onPress={ toggleLocation }>
              <Image 
                resizeMode="cover"
                style={ s.image }
                source={ getPreciseLocationImage() }
              />
            </TouchableOpacity>
          </View>

          <View style={ s.setting }>
            <View style={ s.leftSetting }>
              <Image 
                resizeMode="cover"
                style={ s.image }
                source={ require( "../assets/images/icons/microphone.png" ) }
              />

              <Text style={ s.sub }>Microphone Access for Voice Recognition</Text>
            </View>

            <TouchableOpacity activeOpacity={ 0.5 } onPress={ toggleMicrophone }>
              <Image 
                resizeMode="cover"
                style={ s.image }
                source={ getMicrophoneImage() }
              />
            </TouchableOpacity>
          </View>

          <View style={ s.setting }>
            <View style={ s.leftSetting }>
              <Image 
                resizeMode="cover"
                style={ s.image }
                source={ require( "../assets/images/icons/notification.png" ) }
              />

              <Text style={ s.sub }>Notifications</Text>
            </View>

            <TouchableOpacity activeOpacity={ 0.5 } onPress={ toggleNotification }>
              <Image 
                resizeMode="cover"
                style={ s.image }
                source={ getNotification() }
              />
            </TouchableOpacity>
          </View>
        </View>

        <Spacer size={ 30 } />

        <Text style={ s.version }>v{ pkg.version }</Text>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
    padding: 30,
    backgroundColor: LightMode.white
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
  },
  "settingContainer": {
    gap: 15
  },
  "setting": {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    backgroundColor: LightMode.white,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "leftSetting": {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    alignItems: "center"
  },
  "sub": {
    flex: 1,
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "image": {
    width: 24,
    height: 24
  },
  "version": {
    fontFamily: "cantarell",
    fontSize: 10,
    color: LightMode.lightBlack
  }
})