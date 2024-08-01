import { LightMode } from 'assets/colors/LightMode'
import HoriCard from 'components/HoriCard'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { forRecipeManager } from 'data/dummyData'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePicker from 'react-native-ui-datepicker'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function RecipeManager() {
  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )
  
  const [ selectedRecipe, setSelectedRecipe ] = useState( 0 )
  const [ selectedMeal, setSelectedMeal ] = useState( 0 )

  const showModal = () => {
    setModal( !modal )
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
          <Text style={ s.dateText }>{ dayjs( modalDate ).format( "D MMMM YYYY" ) }</Text>
        </TouchableOpacity>

        <Spacer size={ 15 } />

        <View style={ s.manager }>
          <View style={ s.leftManager }>
            {
              [ "BKF", "BRH", "LUN", "TEA", "DIN" ].map(( meal: string, index: number ) => (
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
          
          <View style={ s.rightManager }>
            <FlatList
              style={ s.flatList }
              contentContainerStyle={{ padding: 20, paddingTop: 0 }}
              showsVerticalScrollIndicator= { false }
              data={ forRecipeManager }
              renderItem={ CookItem }
              keyExtractor={ data => data.id.toString() }
              ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
            />
          </View>
        </View>

        
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
  "rightManager": {

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
  }
})