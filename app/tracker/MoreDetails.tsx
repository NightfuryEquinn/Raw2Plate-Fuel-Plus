import { LightMode } from 'assets/colors/LightMode'
import RecipeMoreDetails from 'components/RecipeMoreDetails'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { ForMainTracker, forMainTracker } from 'data/dummyData'
import { mealCategories, MealCategory } from 'data/mealCategory'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePicker from 'react-native-ui-datepicker'
import IconMA from 'react-native-vector-icons/MaterialIcons'

interface DateItem {
  dayOfWeek: string,
  dayOfMonth: number,
}

export default function MoreDetails() {
  const today = dayjs()
  const [ currentMonth, setCurrentMonth ] = useState( today )
  const [ selectedDate, setSelectedDate ] = useState( today.date() )
  const scrollRef = useRef<ScrollView>( null )

  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( today )

  const showModal = () => {
    setModal( !modal )
  }

  const changeMonth = ( direction: number ) => {
    const newMonth = currentMonth.clone().add( direction, "months" )
    setCurrentMonth( newMonth )

    if ( newMonth.isSame( today, "month" ) ) {
      setSelectedDate( today.date() )
    } else {
      setSelectedDate( 1 )
    }
  }

  const generateDates = () => {
    const startOfMonth = currentMonth.clone().startOf( "month" )
    const endOfMonth = currentMonth.clone().endOf( "month" )
    const dates: DateItem[] = []

    for ( let i = startOfMonth.date(); i <= endOfMonth.date(); i++ ) {
      const date = startOfMonth.clone().date( i )
      
      dates.push({
        dayOfWeek: date.format( 'dd' ),
        dayOfMonth: i
      })
    }

    return dates
  }

  const dates = generateDates()
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    const selectedIndex = dates.findIndex( date => date.dayOfMonth === selectedDate )

    if ( scrollRef.current && selectedIndex !== -1 ) {
      scrollRef.current.scrollTo({
        x: selectedIndex * 50,
        animated: true,
      })
    }
  }, [ selectedDate, dates ])
  
  return (
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 25 } />

        <View style={ s.headingContainer }>
          <View style={ s.monthDate }>
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => changeMonth( -1 ) }
              style={ s.arrow }
            >
              <IconMA 
                name="keyboard-arrow-left"
                color={ LightMode.yellow }
                size={ 28 }
              />
            </TouchableOpacity>
            
            <Text style={ s.monthHeading }>{ currentMonth.format( "MMMM YYYY" ) }</Text>

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => changeMonth( 1 ) }
              style={ s.arrow }
            >
              <IconMA 
                name="keyboard-arrow-right"
                color={ LightMode.yellow }
                size={ 28 }
              />  
            </TouchableOpacity>
          </View>
          
          <Pressable onPress={ showModal }>
            <Text style={[ s.sub, s.blue ]}>Select Date</Text>
          </Pressable>
        </View>

        <Spacer size={ 20 } />

        <ScrollView 
          contentContainerStyle={{ padding: 20 }} 
          horizontal={ true } 
          style={ s.scroll }
          ref={ scrollRef }
        >
          { dates.map(( date: DateItem ) => (
            <TouchableOpacity
              key={ date.dayOfMonth }
              activeOpacity={ 0.5 }
              onPress={ () => {
                const year = currentMonth.year()
                const month = currentMonth.month() + 1
                const selectedDate = dayjs().year( year ).month( month - 1 ).date( date.dayOfMonth )

                setSelectedDate( date.dayOfMonth )
                setModalDate( selectedDate )
              }}
              style={[ 
                s.date, 
                selectedDate === date.dayOfMonth ? s.greenBack : s.whiteBack,
                currentMonth.clone().endOf( "month" ).date() !== date.dayOfMonth && s.marginRight
              ]}
            >
              <Text style={ s.dateText }>{ date.dayOfWeek }</Text>
              <Text style={ s.dateText }>{ date.dayOfMonth }</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Spacer size={ 30 } />

        <Text style={ s.heading }>Recipes Consumed / Cooked</Text>

        <Spacer size={ 10 } />

        <ScrollView
          showsVerticalScrollIndicator={ false }
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 5, paddingBottom: 20 }}
          style={ s.nestedScroll }
        >
          {
            mealCategories.map(( data: MealCategory, index: number ) => (
              <Fragment>
                <View key={ index } style={ s.divider }>
                  <Text style={ s.dividerText }>{ data.label }</Text>
                </View> 
                
                {
                  forMainTracker
                    .filter(( recipe: ForMainTracker ) => ( recipe.meal === data.abbr && dayjs( recipe.date, "DD-MM-YYYY" ).isSame( dayjs( modalDate ).format( "DD-MM-YYYY" ), 'day' )) )
                    .map(( recipe: ForMainTracker, index: number ) => (
                      <Fragment key={ index }>
                        <RecipeMoreDetails 
                          name={ recipe.name }
                          image={ recipe.image }
                          calories={ recipe.calories }
                          carbo={ recipe.carbo }
                          protein={ recipe.protein }
                          fibers={ recipe.fibers }
                          fats={ recipe.fats }
                        />
                      </Fragment>
                    ))
                }

                { mealCategories.length - 1 !== index && <Spacer size={ 30 } /> }
              </Fragment>
            ))
          }
        </ScrollView>
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
              onChange={ ( { date }: any ) => {
                setModalDate( date )
                setCurrentMonth( date )
                setSelectedDate( dayjs( date ).date() )
              }}
              calendarTextStyle={{ fontFamily: "fjalla" }}
              selectedTextStyle={{ fontFamily: "fjalla" }}
              selectedItemColor={ LightMode.black }
              headerTextStyle={{ fontFamily: "fjalla", fontSize: 16 }}
              headerButtonSize={ 16 }
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
                size={ 24 }
                color={ LightMode.white }
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
    flex: 1,
    padding: 30,
    backgroundColor: LightMode.white
  },
  "headingContainer": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  "monthDate": {
    flexDirection: "row",
    alignItems: "center"
  },
  "monthHeading": {
    fontFamily: "fjalla",
    fontSize: 28,
    color: LightMode.black,
  },
  "arrow": {
    alignSelf: "center"
  },
  "sub": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "blue": {
    color: LightMode.blue
  },
  "scroll": {
    height: 50,
    margin: -20, // Counter scroll view content container style due to drop shadow issue
    flexDirection: "row",
  },
  "nestedScroll": {
    height: Dimensions.get( "window" ).height * 0.625,
    margin: -20,
    marginTop: -5
  },
  "date": {
    height: 60,
    width: 40,
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
    justifyContent: "center",
    alignItems: "center"
  },
  "whiteBack": {
    backgroundColor: LightMode.white,
  },
  "greenBack": {
    backgroundColor: LightMode.green,
  },
  "marginRight": {
    marginRight: 10,
  },
  "dateText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black,
    textTransform: "uppercase"
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 20, 
    color: LightMode.black,
  },
  "divider": {
    flex: 1,
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
  "modalContainer": {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightMode.halfBlack
  },
  "modalContent": {
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
    backgroundColor: LightMode.black
  },
})