import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { LightMode } from 'assets/colors/LightMode'
import IconMA from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

export default function AddRecipeVertCard( { onPress, width, height }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <TouchableOpacity 
      activeOpacity={ 0.5 }
      onPress={ onPress }
      style={[ s.container, { width: width, height: height } ]}
    >
      <View style={ s.wrapper }>
        <View style={ s.iconContainer }>
          <IconMA
            name="add"
            color={ LightMode.blue }
            size={ 32 }
          />
        </View>

        <Text style={ s.iconText }>Add Recipe</Text>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    marginLeft: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  "iconContainer": {
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
  "iconText": {
    fontFamily: "fjalla",
    fontSize: 16,
    color: LightMode.black
  }
})

AddRecipeVertCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}