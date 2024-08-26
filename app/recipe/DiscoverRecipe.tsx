import { LightMode } from 'assets/colors/LightMode'
import FilterRecipeSelectionModal from 'components/FilterRecipeSelectionModal'
import HoriCardWithCTA from 'components/HoriCardWithCTA'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { forRecipeManager } from 'data/dummyData'
import { mealCategories, MealCategory } from 'data/mealCategory'
import React, { useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function DiscoverRecipe( { navigation }: any ) {
  const pagerView = useRef<any>()

  const [ search, setSearch ] = useState( "" )
  const [ modal, setModal ] = useState( false )
  const [ active, setActive ] = useState( 0 )

  const [ openCuisines, setOpenCuisines ] = useState( false )
  const [ cuisinesValue, setCuisinesValue ] = useState( "" )
  const [ openInclude, setOpenInclude ] = useState( false )
  const [ includeValue, setIncludeValue ] = useState( [] )
  const [ openExclude, setOpenExclude ] = useState( false )
  const [ excludeValue, setExcludeValue ] = useState( [] )

  const [ min, setMin ] = useState( 100 )
  const [ max, setMax ] = useState( 350 )

  const [ match, setMatch ] = useState( false )

  const cuisines = [
    { label: 'African', value: 'AFR' },
    { label: 'American', value: 'AMR' },
    { label: 'British', value: 'BRT' },
    { label: 'Cajun', value: 'CAJ' },
    { label: 'Caribbean', value: 'CRB' },
    { label: 'Chinese', value: 'CHN' },
    { label: 'Eastern European', value: 'EAE' },
    { label: 'European', value: 'EUR' },
    { label: 'French', value: 'FRN' },
  ]

  const ingredients = [
    { label: 'Tomato', value: 'TOM' },
    { label: 'Garlic', value: 'GAR' },
    { label: 'Onion', value: 'ONI' },
    { label: 'Olive Oil', value: 'OLI' },
    { label: 'Chicken Breast', value: 'CHB' },
    { label: 'Basil', value: 'BAS' },
    { label: 'Salt', value: 'SLT' },
    { label: 'Black Pepper', value: 'BKP' },
    { label: 'Lemon', value: 'LEM' },
  ]

  const showModal = () => {
    setModal( !modal )
  }

  const SearchItem = ( { item, index }: any ) => (
    <HoriCardWithCTA 
      key={ index }
      onPress={ () => navigation.navigate( "RecipeDetail" ) }
      data={ item }
    />
  )
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>Discover</Text>

        <Spacer size={ 10 } />

        <View style={ s.searchContainer }>
          <View style={ s.searchWrapper }>
            <LinedTextField 
              name="search"
              placeholder="Search Recipes..."
              text={ search }
              setText={ setSearch }
            />
          </View>
          
          <TouchableOpacity
            activeOpacity={ 0.5 }
            onPress={ showModal }
            style={ s.icon }
          >
            <IconMA 
              name="filter-alt"
              size={ 24 }
              color={ LightMode.white }
            />
          </TouchableOpacity>
        </View>

        <Spacer size={ 10 } />

        <View>
          <ScrollView
            contentContainerStyle={{ padding: 20 }}
            horizontal={ true }
            showsHorizontalScrollIndicator={ false }
            style={ s.scroll }
          >
            {
              mealCategories.map(( meal: MealCategory, index: number ) => (
                <TouchableOpacity
                  key={ index }
                  activeOpacity={ 0.5 }
                  onPress={ () => {
                    setActive( index ) 
                    pagerView.current.setPage( index )
                  }}
                  style={[ 
                    s.pagerButton, 
                    active === index ? { backgroundColor: LightMode.green } : { backgroundColor: LightMode.white },
                    mealCategories.length - 1 !== index && { marginRight: 15 }
                  ]}
                >
                  <View style={ s.pagerWrapper }>
                    <Text style={ s.pagerText }>{ meal.label }</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>

        <Spacer size={ 40 } />

        <PagerView
          ref={ pagerView }
          initialPage={ active }
          scrollEnabled={ true }
          style={ s.pager }
          keyboardDismissMode="on-drag"
          onPageScroll={ ( e: any ) => setActive( e.nativeEvent.position ) }
        >
          {
            mealCategories.map(( meal: MealCategory, index: number ) => (
              <FlatList
                key={ index }
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator={ false }
                data={ forRecipeManager }
                renderItem={ SearchItem }
                keyExtractor={ data => data.id.toString() }
                ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
              />
            ))
          }
        </PagerView>
      </View>

      <FilterRecipeSelectionModal 
        modal={ modal }
        showModal={ showModal }
        openCuisines={ openCuisines }
        cuisinesValue={ cuisinesValue }
        cuisines={ cuisines }
        setOpenCuisines={ setOpenCuisines }
        setCuisinesValue={ setCuisinesValue }
        ingredients={ ingredients }
        openInclude={ openInclude }
        includeValue={ includeValue }
        openExclude={ openExclude }
        excludeValue={ excludeValue }
        setOpenInclude={ setOpenInclude }
        setIncludeValue={ setIncludeValue }
        setOpenExclude={ setOpenExclude }
        setExcludeValue={ setExcludeValue }
        match={ match }
        setMatch={ setMatch }
        min={ min }
        max={ max }
        setMin={ setMin }
        setMax={ setMax }
        save={ showModal }
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
  "searchContainer": {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  "searchWrapper": {
    flex: 1,
  },
  "icon": {
    padding: 10,
    backgroundColor: LightMode.black,
    borderRadius: 10,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  }, 
  "scroll": {
    margin: -20
  },
  "pagerButton": {
    height: 35,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "pagerWrapper": {
    flex: 1,
  },
  "pagerText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "pager": {
    flex: 1,
    margin: -20,
  }
})