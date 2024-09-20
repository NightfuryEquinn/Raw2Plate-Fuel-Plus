import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from 'app/Loading';
import { LightMode } from 'assets/colors/LightMode';
import HoriScrollRecipes from 'components/HoriScrollRecipes';
import Spacer from 'components/Spacer';
import TopBar from 'components/TopBar';
import { useFontFromContext } from 'context/FontProvider';
import { mealCategories, MealCategory } from 'data/mealCategory';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-ui-datepicker';
import IconMA from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlannerRecipes, fetchRecipePlannerTrackerInfo } from 'redux/actions/recipeAction';
import { AppDispatch, RootState } from 'redux/reducers/store';

interface DateItem {
  dayOfWeek: string,
  dayOfMonth: number,
}

export default function ViewCalendar( { navigation }: any ) {
  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.recipe )

  const today = dayjs()
  const [ currentMonth, setCurrentMonth ] = useState( today )
  const [ selectedDate, setSelectedDate ] = useState( today.date() )
  const scrollRef = useRef<ScrollView>( null )

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

  const filteredPlanner = data[ 0 ]?.plannerRecipes?.filter(
    ( item: any ) => item.date === dayjs( `${ currentMonth.year() }-${ currentMonth.month() + 1 }-${ selectedDate }` ).format( "YYYY-MM-DD" )
  ) || []

  const dates = generateDates()

  const onRefresh = () => {
    setRefreshing( true )

    if ( userSession ) {
      dispatch( fetchPlannerRecipes( userSession.userId ) )

      const theRecipeIds = data[ 0 ].plannerRecipes.map(
        ( item: any ) => item.recipeId
      ).join( "," )

      dispatch( fetchRecipePlannerTrackerInfo( theRecipeIds ) )
    }

    setRefreshing( false )
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
      dispatch( fetchPlannerRecipes( userSession.userId ) )
    }
  }, [ userSession ])

  useEffect(() => {
    if ( data[ 0 ].plannerRecipes && !data[ 0 ].plannerRecipesInfo ) {
      const theRecipeIds = data[ 0 ].plannerRecipes.map(
        ( item: any ) => item.recipeId
      ).join( "," )

      dispatch( fetchRecipePlannerTrackerInfo( theRecipeIds ) )
    }
  }, [ data[ 0 ].plannerRecipes ])

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

        <View style={ s.headingContainer }>
          <Text style={ s.recipeHeading }>Recipes to Cook</Text>

          <Pressable onPress={ () => navigation.navigate( "RecipeManager" ) }>
            <IconMA 
              name="edit-note"
              color={ LightMode.blue }
              size={ 24 }
            />
          </Pressable>
        </View>

        <Spacer size={ 5 } />

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          style={ s.nestedScroll }
          showsVerticalScrollIndicator={ false }
          refreshControl={
            <RefreshControl 
              refreshing={ refreshing }
              onRefresh={ onRefresh } 
            />
          }
        >
          {
            mealCategories.map(( meal: MealCategory, index: number ) => {
              const filteredPlannerInfo = data[ 0 ]?.plannerRecipesInfo?.filter(
                ( item: any, index: number ) => 
                  item.id === filteredPlanner[ index ]?.recipeId &&
                  meal.label === filteredPlanner[ index ]?.mealType
              ) || []
              
              return (
                <View key={ index }>
                  <HoriScrollRecipes
                    navigation={ navigation }
                    title={ meal.label }
                    data={ filteredPlannerInfo }
                  />

                  <Spacer size={ 20 } />
                </View>
              )
            })
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
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.black
  },
  "blue": {
    color: LightMode.blue
  },
  "scroll": {
    height: 115,
    margin: -20, // Counter scroll view content container style due to drop shadow issue
    flexDirection: "row",
  },
  "date": {
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
  "recipeHeading": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black
  },
  "nestedScroll": {
    height: Dimensions.get( "window" ).height * 0.625,
    marginHorizontal: -20,
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
  }
})