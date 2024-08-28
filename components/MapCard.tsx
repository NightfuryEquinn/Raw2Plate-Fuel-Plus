import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'

export default function MapCard( {}: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 
  
  return (
    <View>
      <Text>MapCard</Text>
    </View>
  )
}

const s = StyleSheet.create({

})

MapCard.propTypes = {
  
}