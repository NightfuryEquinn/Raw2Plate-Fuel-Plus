import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import { LightMode } from 'assets/colors/LightMode'

export default function StepBox( { index, step }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <View style={ s.container }>
      <Text style={ s.boxText }>{ index }. { step }</Text>
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: LightMode.darkGrey,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "boxText": {
    fontFamily: "fira",
    color: LightMode.black, 
    fontSize: 16,
    textAlign: "justify"
  }
})

StepBox.propTypes = {
  index: PropTypes.number.isRequired,
  step: PropTypes.string.isRequired
}