import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'

export default function EmptyContent( { message }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <View style={ s.emptyContainer }>
      <Image 
        source={ require( "../assets/images/icons/cancel.png" ) }
        resizeMode="cover"
        style={ s.emptyIcon }
      />

      <Text style={ s.emptyText }>{ message }</Text>
    </View>
  )
}

const s = StyleSheet.create({
  "emptyContainer": {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: LightMode.darkGrey,
    borderRadius: 10
  },
  "emptyIcon": {
    height: 44,
    width: 44
  },
  "emptyText": {
    paddingHorizontal: 20,
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.black,
    textAlign: "center"
  }
})

EmptyContent.propTypes = {
  message: PropTypes.string.isRequired
}