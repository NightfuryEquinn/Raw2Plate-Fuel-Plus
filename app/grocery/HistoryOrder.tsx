import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'

export default function HistoryOrder() {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 

  return (
    <View>
      <Text>HistoryOrder</Text>
    </View>
  )
}

const s = StyleSheet.create({

})

