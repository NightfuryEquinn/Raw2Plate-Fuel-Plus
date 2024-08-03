import { LightMode } from 'assets/colors/LightMode'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {
  const pkg = require( "../package.json" )
  const [ foreground, setForeground ] = useState( false )
  const [ background, setBackground ] = useState( false )

  const getPreciseLocationImage = () => {
    return foreground || background 
      ? require( "../assets/images/checked.png" )
      : require( "../assets/images/cancel.png" ) 
  }

  const openDeviceSettings = () => {
    Alert.alert(
      "Permission Required",
      "To disable location permissions, please go to your device settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() }
      ]
    )
  }

  const toggleLocation = async () => {
    if ( foreground || background ) {
      openDeviceSettings()
    } else {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
      setForeground( foregroundStatus === Location.PermissionStatus.GRANTED )

      if ( foregroundStatus === Location.PermissionStatus.GRANTED ) {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
        setBackground( backgroundStatus === Location.PermissionStatus.GRANTED )
      }
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
    })()
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
                source={ require( "../assets/images/map.png" ) }
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
    paddingVertical: "auto",
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flexDirection: "row",
    gap: 15,
    alignItems: "center"
  },
  "sub": {
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