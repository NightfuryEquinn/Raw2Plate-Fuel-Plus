import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function AddGroceryListItemCard( { onPress }: any ) {
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
      <IconMA 
        name="add"
        size={ 32 }
        color={ LightMode.blue }
      />

      <Text style={ s.text }>Add New Items</Text>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 12.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: LightMode.black,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
  },
  "text": {
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.white
  }
})

AddGroceryListItemCard.propTypes = {
  onPress: PropTypes.func.isRequired
}