import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import { forViewCalendar } from 'data/dummyData'
import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import EmptyRecipeVertCard from './EmptyRecipeVertCard'
import VertCard from './VertCard'

export default function HoriScrollRecipes( { navigation, title, data }: any ) {
  const cardDimensions = {
    width: 125,
    height: 150
  }
  
  const CookItem = ( { item, index }: any ) => (
    <VertCard 
      onPress={ () => navigation.navigate( "RecipeDetail", { recipeId: item.id, inBookmark: false } ) }
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
        ListEmptyComponent={ 
          <EmptyRecipeVertCard
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

HoriScrollRecipes.propTypes = {
  navigation: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired
}