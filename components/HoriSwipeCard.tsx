import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import { capitalizeWords } from 'data/formatData'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function HoriSwipeCard( { onPress, data, first = false }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      onPress={ onPress }
      style={[ s.container, !first && { marginTop: 5 } ]}
    >
      <Image 
        resizeMode="cover"
        style={ s.image }
        source={{ uri: data.image }}
      />

      <View style={ s.detailContainer }>
        <View style={ s.detailHeadingWrapper }>
          <Text numberOfLines={ 2 } style={ s.detailHeading }>{ capitalizeWords( data.title ) }</Text>
        </View>
        
        <View style={ s.detailWrapper }>
          <Text style={ s.sub }>Est. Cooking Time</Text>
          <Text style={[ s.sub, s.yellow ]}>{ data.readyInMinutes } minutes</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    margin: 15,
    marginBottom: 17.5,
    height: 110,
    flexDirection: "row",
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
  "detailContainer": {
    flex: 1,
    padding: 10,
    justifyContent: "space-between"
  },
  "detailHeadingWrapper": {
    flexDirection: "row",
  },
  "detailHeading": {
    fontFamily: "fira",
    fontSize: 16,
    flex: 1,
    flexWrap: "wrap"
  },
  "detailWrapper": {
    gap: 1
  },
  "sub": {
    fontFamily: "fira",
    fontSize: 12
  },
  "yellow": {
    color: LightMode.yellow
  },
  "image": {
    width: 100,
    height: 110,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "swipeButton": {
    marginTop: 35,
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: LightMode.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
})

HoriSwipeCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  first: PropTypes.bool.isRequired,
}