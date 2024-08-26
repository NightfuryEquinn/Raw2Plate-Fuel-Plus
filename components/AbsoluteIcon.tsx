import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import React from 'react'
import { LightMode } from 'assets/colors/LightMode'

export default function AbsoluteIcon( { name, onPress }: any ) {
  return (
    <View style={ s.container }>
      <TouchableOpacity
        activeOpacity={ 0.5 }
        onPress={ onPress }
        style={ s.cta }
      >
        <IconMA 
          name={ name }
          color={ LightMode.darkGreen }
          size={ 28 }
        />
      </TouchableOpacity>
    </View>
  )
}
const s = StyleSheet.create({
  "container": {
    position: "absolute",
    bottom: 20,
    right: 30
  },
  "cta": {
    padding: 10,
    backgroundColor: LightMode.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LightMode.halfBlack,
    justifyContent: "center",
    alignItems: "center"
  },
})

AbsoluteIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}