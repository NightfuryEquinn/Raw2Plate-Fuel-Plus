import { LightMode } from 'assets/colors/LightMode';
import { useFontFromContext } from 'context/FontProvider';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import IconMA from 'react-native-vector-icons/MaterialIcons';

export default function EmptyRecipeVertCard( { width, height }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <View 
      style={[ s.container, { width: width, height: height } ]}
    >
      <View style={ s.wrapper }>
        <Image 
          source={ require( "../assets/images/icons/cancel.png" ) }
          resizeMode="cover"
          style={ s.emptyIcon }
        />


        <Text style={ s.iconText }>No Recipes</Text>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
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
  "emptyIcon": {
    height: 44,
    width: 44
  },
  "iconText": {
    fontFamily: "fjalla",
    fontSize: 16,
    color: LightMode.black
  }
})