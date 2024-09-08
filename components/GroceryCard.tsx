import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Spacer from './Spacer'

export default function GroceryCard( { data, onPress }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      onPress={ onPress }
      style={ s.container }
    >
      <View style={ s.wrapper }>
        <Image 
          resizeMode="contain"
          source={{ uri: data.image }}
          style={ s.image }
        />
      </View>
      
      <Spacer size={ 10 } />

      <Text style={ s.price }>RM { data.price.toFixed( 2 ) }</Text>

      <Spacer size={ 2.5 } />

      <Text style={ s.name }>{ data.name }</Text>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    width: 100,
    height: "auto",
  },
  "wrapper": {
    borderRadius: 10,
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
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  "price": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black,
  },
  "name": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.halfBlack
  }
})

GroceryCard.propTypes = {
  data: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired
}