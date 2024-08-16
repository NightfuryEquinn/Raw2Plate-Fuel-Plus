import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import { forViewCalendar } from 'data/dummyData'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import AddRecipeVertCard from './AddRecipeVertCard'
import VertCard from './VertCard'

export default function HoriScrollRecipes( { title, data, onPressAddRecipe }: any ) {
  const cardDimensions = {
    width: 125,
    height: 150
  }
  
  const CookItem = ( { item, index }: any ) => (
    <VertCard 
      onPress={ () => console.log( "Pressed" ) }
      width={ cardDimensions.width }
      height={ cardDimensions.height }
      data={ item }
      fontSize={ 14 }
      textAlign="left"
      last={ index === forViewCalendar.length - 1 && true }
    />
  )
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  return (
    <View>
      <Text style={ s.recipeSection }>{ title }</Text>

      <FlatList 
        style={ s.flatList }
        contentContainerStyle={{ padding: 20 }}
        horizontal={ true }
        data={ data }
        renderItem={ CookItem }
        keyExtractor={ data => data.id.toString() }
        ListFooterComponent={ 
          <AddRecipeVertCard
            onPress={ onPressAddRecipe }
            width={ cardDimensions.width } 
            height={ cardDimensions.height } 
          /> 
        }
      />
    </View>
  )
}

const s = StyleSheet.create({
  "recipeSection": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.darkGreen,
    textTransform: "uppercase"
  },
  "flatList": {
    margin: -20, // Counter scroll view content container style due to drop shadow issue
    marginTop: -10,
  },
})