import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import EmptyContent from 'components/EmptyContent'
import FilterRecipeSelectionModal from 'components/FilterRecipeSelectionModal'
import HoriCardWithCTA from 'components/HoriCardWithCTA'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandom } from 'redux/actions/recipeAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function DiscoverRecipe( { navigation }: any ) {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.recipe )

  const [ search, setSearch ] = useState( "" )
  const [ modal, setModal ] = useState( false )

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
      onPress={ () => navigation.navigate( "RecipeDetail", { recipeId: item.id } ) }
      data={ item }
    />
  )
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    if ( !data[ 0 ].randomRecipes ) {
      dispatch( fetchRandom( 1 ) )
    }
  }, [])
  
  return (
    loading ? <Loading /> :
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

        <Spacer size={ 30 } />

        {
          data && data.length > 0 && data[ 0 ]?.randomRecipes?.recipes ?
            <FlatList
              style={{ margin: -20 }}
              contentContainerStyle={{ padding: 20 }}
              showsVerticalScrollIndicator={ false }
              data={ data[ 0 ].randomRecipes.recipes }
              renderItem={ SearchItem }
              keyExtractor={ data => data.id.toString() }
              ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
              ListEmptyComponent={ () => (
                <EmptyContent 
                  message="No recipe found..."
                />
              )}
            />
          :
            <EmptyContent 
              message="No recipe found..."
            />
        }
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