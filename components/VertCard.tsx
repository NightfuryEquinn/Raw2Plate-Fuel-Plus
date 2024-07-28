import { View, Text, StyleSheet, Platform, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { LightMode } from 'assets/colors/LightMode'
import PropTypes from 'prop-types'
import { useFontFromContext } from 'context/FontProvider'

export default function VertCard( { width, height, image, text, fontSize, textAlign }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <TouchableOpacity 
      activeOpacity={ 0.5 }
      onPress={ () => console.log( "Pressed" ) }
      style={ s.container }
    >
      <View style={{ width: width, height: height }}>
        <Image 
          resizeMode="cover"
          style={[ s.image, { width: width, height: height * 0.75 } ]}
          source={ image }
        />

        <Text style={[ s.sub, { fontSize: fontSize, textAlign: textAlign } ]}>{ text }</Text>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    alignItems: "center",
    borderRadius: 10,
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
  "image": {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  "sub": {
    padding: 5,
    fontFamily: "cantarell"
  }
})

VertCard.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  image: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  textAlign: PropTypes.string
}

VertCard.defaultProps = {
  fontSize: 12,
  textAlign: "center"
}