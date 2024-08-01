import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'

export default function HoriCard( { onPress, data, active }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      onPress={ onPress }
      style={[ s.container, active ? { width: 225 } : { width: 200 } ]} // Animated width
    >
      <Image 
        resizeMode="cover"
        source={ data.image }
        style={ s.image }
      />

      <Text numberOfLines={ 1 } style={ s.heading }>{ data.heading }</Text>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    width: 200,
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LightMode.black,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "image": {
    height: 40,
    width: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "heading": {
    flex: 1, 
    padding: 10,
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.white
  }
})

HoriCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
}