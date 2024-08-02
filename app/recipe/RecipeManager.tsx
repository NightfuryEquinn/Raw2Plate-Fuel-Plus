import { LightMode } from 'assets/colors/LightMode'
import HoriCard from 'components/HoriCard'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { ForRecipeManager, forRecipeManager } from 'data/dummyData'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePicker from 'react-native-ui-datepicker'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function RecipeManager() {
  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )

  const [ recipeModal, setRecipeModal ] = useState( false )
  const [ changeOrAdd, setChangeOrAdd ] = useState( "" )

  const [ selectedRecipe, setSelectedRecipe ] = useState( 0 )
  const [ selectedMeal, setSelectedMeal ] = useState( 0 )
  const [ mealIncluded, setMealIncluded ] = useState<any[]>( [] )

  const mealTypes = [ "BKF", "BRH", "LUN", "TEA", "DIN" ];

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
      <View>
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

        <Spacer size={ 25 } />

        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ () => showRecipeModal( "change" ) }
          style={ s.cta }
        >
          <IconMA 
            name="change-circle"
            size={ 24 }
            color={ LightMode.black }
          />

          <Text style={ s.ctaText }>{ selectedRecipe ? selectedRecipe : "Change Recipe" }</Text>
        </TouchableOpacity>

        <Spacer size={ 15 } />

        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ () => showRecipeModal( "add" ) }
          style={[ s.cta, { backgroundColor: LightMode.yellow } ]}
        >
          <IconMA 
            name="add-circle"
            size={ 24 }
            color={ LightMode.white }
          />

          <Text style={[ s.ctaText, { color: LightMode.white } ]}>Add Recipe</Text>
        </TouchableOpacity>

        <Spacer size={ 15 } />

        <Text style={ s.hint }>Your meal planner will auto-save.</Text>
      </View>

      <Modal
        animationType="fade"
        transparent={ true }
        visible={ modal }
        onRequestClose={ showModal }
      >
        <View style={ s.modalContainer }>
          <View style={ s.modalContent }>
            <DatePicker
              mode="single"
              date={ modalDate }
              onChange={ ( { date }: any ) => setModalDate( date ) }
              calendarTextStyle={{ fontFamily: "fjalla" }}
              selectedTextStyle={{ fontFamily: "fjalla" }}
              selectedItemColor={ LightMode.black }
              headerTextStyle={{ fontFamily: "fjalla", fontSize: 24 }}
              headerButtonSize={ 20 }
              headerButtonColor={ LightMode.black }
              todayTextStyle={{ fontFamily: "fjalla" }}
              weekDaysTextStyle={{ fontFamily: "fjalla" }}
            />
            
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showModal }
              style={ s.modalButton }
            >
              <IconMA 
                name="close"
                size={ 36 }
                color={ LightMode.black }
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={ true }
        visible={ recipeModal }
        onRequestClose={ () => showRecipeModal( "" ) }
      >
        <View style={[ s.modalContainer, { justifyContent: "flex-end" } ]}>
          <View style={[ s.modalContent, { margin: 0, flex: 0.75, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } ]}>
            <View style={ s.modalWrapper }>

            </View>
          </View>
        </View>
      </Modal>
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
    color: LightMode.black,
    textAlign: "center"
  },
  "modalContainer": {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightMode.halfBlack
  },
  "modalContent": {
    flex: 0.5,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: LightMode.white,
    gap: 10,
  },
  "modalButton": {
    padding: 10,
    borderRadius: 10,
    backgroundColor: LightMode.white
  },
  "manager": {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  "leftManager": {
    gap: 10
  },
  "flatList": {
    height: 300,
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
  "modalWrapper": {
    alignItems: "center"
  }
})