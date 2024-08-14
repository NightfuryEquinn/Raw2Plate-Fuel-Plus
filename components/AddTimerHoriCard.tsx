import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import IconMA from 'react-native-vector-icons/MaterialIcons';
import { LightMode } from 'assets/colors/LightMode'
import PropTypes from 'prop-types'
import { useFontFromContext } from 'context/FontProvider';
import Spacer from './Spacer';

export default function AddTimerHoriCard( { onPress }: any ) {
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
        <IconMA 
          name="add"
          color={ LightMode.blue }
          size={ 36 }
        />

        <Text style={ s.heading }>Add New Timer</Text>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    marginBottom: 15,
    padding: 15,
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
  "wrapper": {
    marginHorizontal: "auto",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 20,
    color: LightMode.black
  }
})

AddTimerHoriCard.propTypes = {
  onPress: PropTypes.func.isRequired
}