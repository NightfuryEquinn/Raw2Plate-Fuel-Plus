import { LightMode } from 'assets/colors/LightMode';
import HoriSwipeCard from 'components/HoriSwipeCard';
import Spacer from 'components/Spacer';
import TopBar from 'components/TopBar';
import { useFontFromContext } from 'context/FontProvider';
import { forCalendarOverview } from 'data/dummyData';
import { mealCategories, MealCategory } from 'data/mealCategory';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconMA from 'react-native-vector-icons/MaterialIcons';

export default function CalendarOverview( { navigation }: any ) {
  const [ active, setActive ] = useState( 0 )
  const margin = useSharedValue( 0 )

  const zoomPress = ( index: any ) => {
    if ( active === index ) {
      return
    } else {
      margin.value = withTiming( 7.5, { duration: 250 } )
      setActive( index )
    }
  }

  const CookItem = ( { item, index }: any ) => (
    <HoriSwipeCard 
      onPress={ () => console.log( "Recipe Detail" ) }
      onBookmark={ () => console.log( "Bookmark" ) }
      onDelete={ () => console.log( "Delete" ) }
      data={ item }
      first={ index === 0 && true }
    />
  )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    margin.value = withTiming( 7.5, { duration: 250 } )
  }, [])
  
  return (
    <SafeAreaView style={ s.container }>        
      <View>
        <TopBar />

        <Spacer size={ 20 } />

        <View style={ s.headingContainer }>
          <Text style={ s.heading }>Today's Meal</Text>

          <Pressable onPress={ () => navigation.navigate( "ViewCalendar" ) }>
            <Text style={[ s.sub, s.blue ]}>View Calendar</Text>
          </Pressable>
        </View>

        <Spacer size={ 5 } />

        <Text style={ s.sub }>{ dayjs().format( "D MMMM YYYY" ) }</Text>

        <Spacer size={ 15 } />

        <ScrollView 
          contentContainerStyle={{ padding: 20 }} 
          horizontal={ true } 
          style={ s.scroll }
        >
          {
            mealCategories.map(( data: MealCategory, index: number ) => {
              const animatedStyle = useAnimatedStyle(() => ({
                marginTop: active === index ? margin.value : 0
              }))

              return (
                <Fragment key={ index }>                    
                  <TouchableWithoutFeedback 
                    onPress={ () => zoomPress( index ) }
                  >
                    <Animated.View layout={ LinearTransition } style={[ s.vertContainer, animatedStyle ]}>
                      <Image 
                        resizeMode="cover"
                        style={ s.vertImage }
                        source={ data.source }
                      />

                      <Text style={ s.vertSub }>{ data.label }</Text>
                    </Animated.View>
                  </TouchableWithoutFeedback>

                  { index !== mealCategories.length - 1 ? <Spacer horizontal size={ 10 } /> : null }
                </Fragment>
              )
            })
          }
        </ScrollView>

        <Spacer size={ 20 } />

        <View style={ s.headingContainer }>
          <Text style={ s.heading2 }>Recipes to Cook</Text>

          <Pressable onPress={ () => navigation.navigate( "RecipeManager" ) }>
            <IconMA 
              name="edit-note"
              color={ LightMode.blue }
              size={ 24 }
            />
          </Pressable>
        </View>

        <Spacer size={ 15 } />

        <FlatList
          style={ s.flatList }
          showsVerticalScrollIndicator= { false }
          data={ forCalendarOverview }
          renderItem={ CookItem }
          keyExtractor={ data => data.id.toString() }
          ListFooterComponent={ () => <Spacer size={ 75 } /> }
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
  "headingContainer": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
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
    margin: -20, // Counter scroll view content container style due to drop shadow issue
    flexDirection: "row",
  },
  "vertContainer": {
    width: 100,
    height: 110,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: LightMode.white,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "vertImage": {
    width: 100, 
    height: 110 * 0.75,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  "vertSub": {
    padding: 5,
    fontFamily: "cantarell",
    fontSize: 12, 
    textAlign: "center",
    color: LightMode.black
  },
  "heading2": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black
  },
  "flatList": {
    height: Dimensions.get( "window" ).height * 0.5, 
    margin: -15, 
    marginTop: -7.5
  }
})