import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import { capitalizeWords } from 'data/formatData'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function VertCard( { onPress, width, height, fontSize = 12, textAlign = "center", data, last = false }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <TouchableOpacity 
      activeOpacity={ 0.5 }
      onPress={ onPress }
      style={[ s.container, !last && { marginRight: 15 } ]}
    >
      <View style={{ width: width, height: height }}>
        <Image 
          resizeMode="cover"
          style={[ s.image, { width: width, height: height * 0.625 } ]}
          source={{ uri: data.image }}
        />

        <Text numberOfLines={ 2 } style={[ s.sub, { fontSize: fontSize, textAlign: textAlign } ]}>{ capitalizeWords( data.title ) }</Text>
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
    padding: 10,
    fontFamily: "fira"
  }
})

VertCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
  fontSize: PropTypes.number,
  textAlign: PropTypes.string,
  last: PropTypes.bool.isRequired,
}