import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LightMode } from 'assets/colors/LightMode'
import TopBar from 'components/TopBar'
import Spacer from 'components/Spacer'

export default function ViewCalendar() {
  return (
    <SafeAreaView style={ s.container }>
      <View>
        <TopBar />

        <Spacer size={ 30 } />
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    padding: 30,
    backgroundColor: LightMode.white
  }
})