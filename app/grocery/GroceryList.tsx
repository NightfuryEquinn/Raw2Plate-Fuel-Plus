import { View, Text, StyleSheet } from 'react-native'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import React, { useState } from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from 'components/TopBar'
import Spacer from 'components/Spacer'
import { LightMode } from 'assets/colors/LightMode'

export default function GroceryList() {
  const [ modal, setModal ] = useState( false )

  const GroceryListItem = ( { item, index }: any ) => (
    null
  )
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />
        
        <Text style={ s.heading }>Grocery List</Text>

        <Spacer size={ 5 } />

        <Text style={ s.sub }>A wise once said: "To avoid overspending, list down your spending..."</Text>
      
        <Spacer size={ 20 } />

        
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
    padding: 30,
    backgroundColor: LightMode.white
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
  },
  "sub": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
})