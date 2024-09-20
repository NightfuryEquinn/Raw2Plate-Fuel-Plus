import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import TrackerPieChart from 'components/TrackerPieChart'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePicker from 'react-native-ui-datepicker'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrackerManual, fetchTrackerRecipes } from 'redux/actions/trackerAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

interface DateItem {
  dayOfWeek: string,
  dayOfMonth: number,
}

export default function MainTracker( { navigation }: any ) {
  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.tracker )

  const today = dayjs()
  const [ currentMonth, setCurrentMonth ] = useState( today )
  const [ selectedDate, setSelectedDate ] = useState( today.date() )
  const scrollRef = useRef<ScrollView>( null )

  const [ cal, setCal ] = useState( 0 )
  const [ manualCal, setManualCal ] = useState( 0 )
  const [ carbs, setCarbs ] = useState( 0 )
  const [ proteins, setProteins ] = useState( 0 )
  const [ fibers, setFibers ] = useState( 0 )
  const [ fats, setFats ] = useState( 0 )

  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( today )

  const [ refreshing, setRefreshing ] = useState( false )

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

  const onRefresh = () => {
    setRefreshing( true )

    if ( userSession ) {
      dispatch( fetchTrackerRecipes( userSession.userId ) )
      dispatch( fetchTrackerManual( userSession.userId ) )
    }

    setRefreshing( false )
  }

  const tabulateNutrients = () => {
    let totalCal = 0
    let totalManualCal = 0
    let totalCarbs = 0
    let totalProtein = 0
    let totalFibers = 0
    let totalFats = 0

    const mealsToInclude = data[ 0 ].trackerRecipes.filter(( item: any ) => (
      item.date === dayjs( `${ currentMonth.year() }-${ currentMonth.month() + 1 }-${ selectedDate }` ).format( "YYYY-MM-DD" )
    ))

    mealsToInclude.forEach(( data: any ) => {
      totalCal += data.recipeNutrients[ 0 ].amount
      totalCarbs += data.recipeNutrients[ 3 ].amount
      totalProtein += data.recipeNutrients[ 8 ].amount
      totalFibers += data.recipeNutrients[ 11 ].amount
      totalFats += data.recipeNutrients[ 1 ].amount
    })

    const manualToInclude = data[ 0 ].trackerManual.filter(( item: any ) =>
      item.date === dayjs( `${ currentMonth.year() }-${ currentMonth.month() + 1 }-${ selectedDate }` ).format( "YYYY-MM-DD" )
    )

    manualToInclude.forEach(( data: any ) => {
      totalManualCal += data.calories
    })

    setCal( +totalCal.toFixed( 0 ) )
    setManualCal( +totalManualCal.toFixed( 0 ) )
    setCarbs( +totalCarbs.toFixed( 2 ) )
    setProteins( +totalProtein.toFixed( 2 ) )
    setFibers( +totalFibers.toFixed( 2 ) )
    setFats( +totalFats.toFixed( 2 ) )
  }
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    const getUserSession = async () => {
      const theUserSession = await AsyncStorage.getItem( "@user_session" )

      if ( theUserSession !== null ) {
        const parsed = JSON.parse( theUserSession )

        setUserSession( parsed )
      }
    } 

    getUserSession()
  }, [])

  useEffect(() => {
    if ( userSession ) {
      dispatch( fetchTrackerRecipes( userSession.userId ) )
      dispatch( fetchTrackerManual( userSession.userId ) )
    }
  }, [ userSession ])

  useEffect(() => {
    const selectedIndex = dates.findIndex( date => date.dayOfMonth === selectedDate )

    if ( scrollRef.current && selectedIndex !== -1 ) {
      scrollRef.current.scrollTo({
        x: selectedIndex * 50,
        animated: true,
      })
    }
  }, [ selectedDate, dates ])

  useEffect(() => {
    tabulateNutrients()
  }, [ currentMonth, selectedDate ])
  
  return (
    loading ? <Loading /> :
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

        <Text style={ s.heading }>Total Calories (kcal)</Text>

        <Text style={ s.headingSub }>{ cal } ({ manualCal })</Text>

        <Spacer size={ 10 } />

        <ScrollView
          showsVerticalScrollIndicator={ false }
          style={{ height: Dimensions.get( "window" ).height * 0.625 }}
          refreshControl={
            <RefreshControl 
              refreshing={ refreshing }
              onRefresh={ onRefresh } 
            />
          }
        >
          { 
            cal !== 0 && manualCal !== 0 ?
              <TrackerPieChart 
                carbs={ carbs } 
                proteins={ proteins } 
                fibers={ fibers } 
                fats={ fats }          
              />
            :
            <View style={ s.emptyContainer }>
              <Text style={ s.empty }>You haven't even record what you eat!</Text>
            </View>
          }
          
          <Spacer size={ 20 } />

          <View style={ s.mainNutrients }>
            <View style={ s.section }>
              <View style={ s.sectionWrapper }>
                <Image 
                  resizeMode="contain"
                  source={ require( "../../assets/images/nutrients/carb.png" ) }
                  style={ s.image }
                />

                <Text style={ s.main }>Carbohydrates</Text>
              </View>
              
              <Text style={ s.secondary }>{ carbs } gram(s)</Text>
            </View>

            <View style={ s.section }>
              <View style={ s.sectionWrapper }>
                <Image 
                  resizeMode="contain"
                  source={ require( "../../assets/images/nutrients/protein.png" ) }
                  style={ s.image }
                />

                <Text style={ s.main }>Proteins</Text>
              </View>
              
              <Text style={ s.secondary }>{ proteins } gram(s)</Text>
            </View>

            <View style={ s.section }>
              <View style={ s.sectionWrapper }>
                <Image 
                  resizeMode="contain"
                  source={ require( "../../assets/images/nutrients/fiber.png" ) }
                  style={ s.image }
                />

                <Text style={ s.main }>Fibers</Text>
              </View>
              
              <Text style={ s.secondary }>{ fibers } gram(s)</Text>
            </View>

            <View style={ s.section }>
              <View style={ s.sectionWrapper }>
                <Image 
                  resizeMode="contain"
                  source={ require( "../../assets/images/nutrients/fat.png" ) }
                  style={ s.image }
                />

                <Text style={ s.main }>Fats</Text>
              </View>
              
              <Text style={ s.secondary }>{ fats } gram(s)</Text>
            </View>
          </View>
        </ScrollView>

        <Spacer size={ 10 } />

        <View style={ s.ctaContainer }>
          <View style={ s.textWrapper }>
            <Text style={ s.hint }>Manually inputted calories are separated in brackets. For more details, refer to daily intakes or daily nutrients from side menu.</Text>
          </View>
          
          <TouchableOpacity
            activeOpacity={ 0.5 }
            onPress={ () => navigation.navigate( "ManualAdd" ) }
            style={ s.cta }
          >
            <IconMA 
              name="add"
              size={ 32 }
              color={ LightMode.blue }
            />
          </TouchableOpacity>
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
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.black
  },
  "blue": {
    color: LightMode.blue
  },
  "scroll": {
    height: 125,
    margin: -20, // Counter scroll view content container style due to drop shadow issue
    flexDirection: "row",
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
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.black,
    textTransform: "uppercase"
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 20, 
    color: LightMode.black,
  },
  "headingSub": {
    fontFamily: "fira",
    fontSize: 32,
    color: LightMode.yellow
  },
  "mainNutrients": {
    gap: 10,
  },
  "section": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "sectionWrapper": {
    flexDirection: "row",
    gap: 15,
    alignItems: "center"
  },
  "image": {
    width: 36,
    height: 36,
  },
  "main": {
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.black,
  },
  "secondary": {
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.halfBlack
  },
  "ctaContainer": {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "cta": {
    height: 40,
    width: 40,
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
    justifyContent: "center",
    alignItems: "center"
  },
  "textWrapper": {
    flex: 1
  },
  "hint": {
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.lightBlack,
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
  "emptyContainer": {
    height: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  "empty": {
    fontFamily: "fira",
    fontSize: 24,
    color: LightMode.lightBlack,
    textAlign: "center"
  }
})