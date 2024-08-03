import { LightMode } from 'assets/colors/LightMode'
import CalendarModal from 'components/CalendarModal'
import HoriCard from 'components/HoriCard'
import RecipeSelectionModal from 'components/RecipeSelectionModal'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { ForRecipeManager, forRecipeManager } from 'data/dummyData'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function RecipeManager() {
  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )

  const [ recipeModal, setRecipeModal ] = useState( false )
  const [ changeOrAdd, setChangeOrAdd ] = useState( "" )
  const [ recipe, setRecipe ] = useState( "" )
  const [ searchData, setSearchData ] = useState( [] )

  const [ selectedRecipe, setSelectedRecipe ] = useState( 0 )
  const [ selectedMeal, setSelectedMeal ] = useState( 0 )
  const [ mealIncluded, setMealIncluded ] = useState<any[]>( [] )

  const mealTypes = [ "BKF", "BRH", "LUN", "TEA", "DIN" ]

  const showModal = () => {
    setModal( !modal )
  }

  const showRecipeModal = ( mode: string ) => {
    setRecipeModal( !recipeModal )
    setChangeOrAdd( mode )
  }

  const CookItem = ( { item, index }: any ) => (
    <HoriCard
      onPress={ () => setSelectedRecipe( index ) }
      data={ item }
      active={ selectedRecipe === index }
    />
  )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    const mealsToInclude = forRecipeManager.filter(( item: ForRecipeManager ) => (
      dayjs( item.date, "DD-MM-YYYY" ).isSame( dayjs( modalDate ).format( "DD-MM-YYYY" ), 'day' ) &&
      item.meal === mealTypes[ selectedMeal ]
    ))

    setMealIncluded( mealsToInclude )
    setSelectedRecipe( 0 )
  }, [ selectedMeal, modalDate ])
  
  return (
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 25 } />

        <Text style={ s.heading }>Meal Planner</Text>

        <Spacer size={ 15 } />

        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ showModal }
          style={ s.changeDate }
        >
          <Text style={ s.dateText }>{ dayjs( modalDate ).format( "DD-MM-YYYY" ) }</Text>
        </TouchableOpacity>

        <Spacer size={ 15 } />

        <View style={ s.manager }>
          <View style={ s.leftManager }>
            {
              mealTypes.map(( meal: string, index: number ) => (
                <TouchableOpacity
                  activeOpacity={ 0.5 } 
                  onPress={ () => setSelectedMeal( index ) }
                  style={[ s.mealBlock, selectedMeal === index ? { backgroundColor: LightMode.green } : { backgroundColor: LightMode.white } ]}
                >
                  <Text style={ s.meal }>{ meal }</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          
          <FlatList
            style={ s.flatList }
            contentContainerStyle={{ padding: 20, paddingTop: 0 }}
            showsVerticalScrollIndicator= { false }
            data={ mealIncluded }
            renderItem={ CookItem }
            keyExtractor={ data => data.id.toString() }
            ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
          />
        </View>

        <Spacer size={ 45 } />

        <RoundedBorderButton 
          onPress={ () => console.log( "Remove" ) }
          icon="MA"
          name="delete"
          text="Remove Selected Recipe"
          color={ LightMode.red }
          textColor={ LightMode.white }
          borderRadius={ 10 }
        />

        <Spacer size={ 10 } />

        <RoundedBorderButton 
          onPress={ () => showRecipeModal( "change" ) }
          icon="MA"
          name="change-circle"
          text="Change Selected Recipe"
          color={ LightMode.white }
          textColor={ LightMode.black }
          borderRadius={ 10 }
        />

        <Spacer size={ 10 } />

        <RoundedBorderButton 
          onPress={ () => showRecipeModal( "add" ) }
          icon="MA"
          name="add-circle"
          text="Add New Recipe"
          color={ LightMode.yellow }
          textColor={ LightMode.white }
          borderRadius={ 10 }
        />

        <Spacer size={ 15 } />

        <Text style={ s.hint }>Select meal before adding new recipes.</Text>
        <Text style={ s.hint }>Your meal planner will auto-save.</Text>
      </View>

      <CalendarModal 
        modal={ modal }
        showModal={ showModal }
        modalDate={ modalDate }
        setModalDate={ setModalDate }
      />

      <RecipeSelectionModal 
        changeOrAdd={ changeOrAdd }
        recipeModal={ recipeModal }
        showRecipeModal={ showRecipeModal }
        recipe={ recipe }
        setRecipe={ setRecipe }
        searchData={ searchData }
      />
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
    color: LightMode.black,
    textAlign: "center"
  },
  "manager": {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 25
  },
  "leftManager": {
    gap: 10
  },
  "flatList": {
    height: 225,
    margin: -20,
    marginTop: 0,
  },
  "mealBlock": {
    padding: 7.5,
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
  "meal": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "cta": {
    paddingVertical: 7.5, 
    paddingHorizontal: 20,
    gap: 20,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: LightMode.white,
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
  "ctaText": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.black
  },
  "hint": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.lightBlack,
    textAlign: "center"
  },
})