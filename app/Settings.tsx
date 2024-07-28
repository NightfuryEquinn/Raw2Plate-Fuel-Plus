import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LightMode } from 'assets/colors/LightMode'

export default function Settings() {
  return (
    <SafeAreaView style={ s.container }>
      <View>
        <Text>Settings</Text>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    padding: 30,
    backgroundColor: LightMode.white
  },
})