import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import EmptyContent from 'components/EmptyContent'
import FilterRecipeSelectionModal from 'components/FilterRecipeSelectionModal'
import HoriCardWithCTA from 'components/HoriCardWithCTA'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { spoonCuisines } from 'data/spoonCuisines'
import { spoonIngredients } from 'data/spoonIngredients'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { discoverSearch, fetchRandom } from 'redux/actions/recipeAction'
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

  const clearFilter = () => {
    setCuisinesValue( "" ) 
    setIncludeValue( [] )
    setExcludeValue( [] )
    setMin( 100 )
    setMax( 350 )
  }

  const showModal = () => {
    setModal( !modal )
  }

  const searchPress = () => {
    const includeString = includeValue.join( "," )
    const excludeString = excludeValue.join( "," )

    dispatch( discoverSearch( search, 2, cuisinesValue, includeString, excludeString, min, max ) )
  }

  const SearchItem = ( { item, index }: any ) => (
    <HoriCardWithCTA 
      key={ index }
      onPress={ () => navigation.navigate( "RecipeDetail", { recipeId: item.id, inBookmark: false } ) }
      data={ item }
    />
  )
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    if ( !data[ 0 ].randomRecipes ) {
      dispatch( fetchRandom( 2 ) )
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

        <RoundedBorderButton 
          onPress={ searchPress } 
          color={ LightMode.lightBlack } 
          text="Search" 
          textColor={ LightMode.white }
          borderRadius={ 10 }
          marginHori={ 0 }    
        />

        <Spacer size={ 30 } />

        {
          data && data.length > 0 && ( data[ 0 ]?.randomRecipes?.recipes || data[ 0 ]?.randomRecipes?.results ) ?
            <FlatList
              style={{ margin: -20 }}
              contentContainerStyle={{ padding: 20 }}
              showsVerticalScrollIndicator={ false }
              data={ data[ 0 ].randomRecipes.recipes || data[ 0 ].randomRecipes.results }
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
              message="Unable to fetch Spooncular API..."
            />
        }
      </View>

      <FilterRecipeSelectionModal 
        modal={ modal }
        showModal={ showModal }
        openCuisines={ openCuisines }
        cuisinesValue={ cuisinesValue }
        cuisines={ spoonCuisines }
        setOpenCuisines={ setOpenCuisines }
        setCuisinesValue={ setCuisinesValue }
        ingredients={ spoonIngredients }
        openInclude={ openInclude }
        includeValue={ includeValue }
        openExclude={ openExclude }
        excludeValue={ excludeValue }
        setOpenInclude={ setOpenInclude }
        setIncludeValue={ setIncludeValue }
        setOpenExclude={ setOpenExclude }
        setExcludeValue={ setExcludeValue }
        min={ min }
        max={ max }
        setMin={ setMin }
        setMax={ setMax }
        save={ showModal }
        clearFilter={ clearFilter }
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
})