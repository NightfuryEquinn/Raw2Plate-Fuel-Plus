import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export default function HoriCard( { onPress, data, active }: any ) {
  const width = useSharedValue( 225 )
  const animatedStyle = useAnimatedStyle(() => ({
    width: active ? width.value : 225,
  }))
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    width.value = withTiming( 275, { duration: 250 } )
  }, [ active ])
  
  return (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      onPress={ onPress }
    >
      <Animated.View 
        layout={ LinearTransition } 
        style={[ 
          s.container, 
          active ? { backgroundColor: LightMode.black } : { backgroundColor: LightMode.lightBlack }, 
          animatedStyle 
        ]}
      >
        <Image 
          resizeMode="cover"
          source={{ uri: data.image }}
          style={ s.image }
        />

        <Text numberOfLines={ 1 } style={ s.heading }>{ data.title }</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    marginLeft: "auto",
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
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
  active: PropTypes.bool.isRequired
}