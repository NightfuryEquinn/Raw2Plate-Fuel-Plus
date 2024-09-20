import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { LightMode } from 'assets/colors/LightMode'

export default function CategoryCard( { selected, data, onPress }: any ) {
  return (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      onPress={ onPress }
      style={[ s.container, selected ? { backgroundColor: LightMode.green } : { backgroundColor: LightMode.white } ]}
    >
      <View style={ s.wrapper }>
        <Text style={ s.label }>{ data.label }</Text>

        <Image 
          resizeMode="contain"
          source={ data.source }
          style={ s.image }
        />
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  "container": {
    height: 100,
    width: 110,
    padding: 12.5,
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
  "wrapper": {
    flex: 1,
    gap: 10,
    justifyContent: "space-between"
  },
  "label": {
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.black
  },
  "image": {
    height: 44,
    width: 44
  }
})

CategoryCard.propTypes = {
  selected: PropTypes.bool.isRequired,
  data: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired
}