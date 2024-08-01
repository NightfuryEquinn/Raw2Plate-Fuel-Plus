import { LightMode } from 'assets/colors/LightMode'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import dayjs from 'dayjs'
import HoriCard from 'components/HoriCard'
import { forRecipeManager } from 'data/dummyData'

export default function RecipeManager() {
  const [ selectedDate, setSelectedDate ] = useState( dayjs().date() )
  const [ pickerDate, setPickerDate ] = useState( dayjs().toDate() )
  const [ isPickerVisible, setPickerVisible ] = useState( false )
  const [ selectedRecipe, setSelectedRecipe ] = useState( 0 )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>
      <View>
        <TopBar />

        <Spacer size={ 25 } />

        <Text style={ s.heading }>Meal Planner</Text>

        <Spacer size={ 15 } />

        <TouchableOpacity
          activeOpacity={ 0.5 }
          // onPress={  }
          style={ s.changeDate }
        >
          <Text style={ s.dateText }>{ dayjs( pickerDate ).format( "D MMMM YYYY" ) }</Text>
        </TouchableOpacity>

        <Spacer size={ 15 } />

        <HoriCard
          onPress={ () => console.log( "Recipe" ) }
          data={ forRecipeManager[0] }
        />
      </View>

      
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    padding: 30,
    backgroundColor: LightMode.white
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
  },
  "changeDate": {
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: LightMode.white,
    borderColor: LightMode.black,
    borderWidth: 1,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
    justifyContent: "center"
  },
  "dateText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  }
})