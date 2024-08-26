import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Fragment, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from 'components/TopBar'
import Spacer from 'components/Spacer'
import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import RecipeSelectionModal from 'components/RecipeSelectionModal'
import CalendarModal from 'components/CalendarModal'
import DropDownPicker from 'react-native-dropdown-picker'
import LinedTextField from 'components/LinedTextField'
import RecipeMoreDetails from 'components/RecipeMoreDetails'

export default function ManualAdd() {
  const [ manual, setManual ] = useState( false )

  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )

  const [ recipeModal, setRecipeModal ] = useState( false )
  const [ recipe, setRecipe ] = useState( "" )
  const [ searchData, setSearchData ] = useState( [] )

  const [ openDrop, setOpenDrop ] = useState( false )
  const [ dropValue, setDropValue ] = useState( "" )

  const [ manualRecipe, setManualRecipe ] = useState( "" )
  const [ manualCalories, setManualCalories ] = useState( "" )

  const dropItems = [
    { label: 'Breakfast', value: 'BKF' },
    { label: 'Brunch', value: 'BRH' },
    { label: 'Lunch', value: 'LUN' },
    { label: 'Tea Time', value: 'TEA' },
    { label: 'Dinner', value: 'DIN' }
  ]

  const getManualImage = () => {
    return manual
    ? require( "../../assets/images/icons/checked.png" )
    : require( "../../assets/images/icons/cancel.png" ) 
  }
  
  const showModal = () => {
    setModal( !modal )
  }

  const showRecipeModal = () => {
    setRecipeModal( !recipeModal )
  }
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />
        
        <Text style={ s.heading }>Add Recipe to Tracker</Text>

        <Spacer size={ 20 } />

        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ showModal }
          style={ s.changeDate }
        >
          <Text style={ s.dateText }>{ dayjs( modalDate ).format( "DD-MM-YYYY" ) }</Text>
        </TouchableOpacity>

        <Spacer size={ 30 } />

        <View style={ s.manualContainer }>
          <Text style={ s.manual }>Manual Input?</Text>

          <TouchableOpacity activeOpacity={ 0.5 } onPress={ () => setManual( !manual ) }>
            <Image 
              resizeMode="cover"
              style={ s.image }
              source={ getManualImage() }
            />
          </TouchableOpacity>
        </View>

        <Spacer size={ 15 } />

        { !manual ?
          <Fragment>
            <DropDownPicker 
              open={ openDrop }
              value={ dropValue }
              items={ dropItems }
              setOpen={ setOpenDrop }
              setValue={ setDropValue }
              placeholder="Choose Meal"
              textStyle={{
                fontFamily: "cantarell"
              }}
            />

            <Spacer size={ 15 } />

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showRecipeModal }
              style={ s.changeDate }
            >
              <Text style={ s.dateText }>{ recipe || "Choose Recipe" }</Text>
            </TouchableOpacity>
          </Fragment>
          :
          <Fragment>
            <LinedTextField 
              placeholder="Your recipe?" 
              text={ manualRecipe } 
              name="local-restaurant" 
              setText={ setManualRecipe }        
            />

            <LinedTextField 
              placeholder="Your calories of the recipe?" 
              text={ manualCalories } 
              name="numbers" 
              setText={ setManualCalories }
              number={ true }
            />
          </Fragment>
        }

        <Spacer size={ 50 } />

        <View style={ s.divider }>
          <Text style={ s.dividerText }>Review</Text>
        </View> 

        <RecipeMoreDetails 
          name={ "Salmon Wellington" }
          image={ require( "../../assets/images/placeholders/garlic_salmon.jpg" ) }
          calories={ 360 }
          carbo={ 0 }
          protein={ 0 }
          fibers={ 0 }
          fats={ 0 }
        />
        
        <Spacer size={ 50 } />

        <Text style={ s.hintText }>NOTE: Detailed nutrient information about a manually inserted recipe will not be generated.</Text>
      </View>

      <CalendarModal 
        modal={ modal }
        showModal={ showModal }
        modalDate={ modalDate }
        setModalDate={ setModalDate }
      />

      <RecipeSelectionModal 
        changeOrAdd="add"
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
  "image": {
    width: 24,
    height: 24
  },
  "manualContainer": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "manual": {
    fontFamily: "fjalla",
    fontSize: 20,
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
  "divider": {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
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
    justifyContent: "center",
  },
  "dividerText": {
    fontFamily: "cantarell",
    fontSize: 14,
    color: LightMode.white,
  },
  "hintText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.halfBlack
  }
})