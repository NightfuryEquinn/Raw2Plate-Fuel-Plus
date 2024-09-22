import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import CalendarModal from 'components/CalendarModal'
import ConfirmationModal from 'components/ConfirmationModal'
import HoriCard from 'components/HoriCard'
import RecipeSelectionModal from 'components/RecipeSelectionModal'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { mealCategories, MealCategory } from 'data/mealCategory'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlannerRecipes, discoverSearch, fetchPlannerRecipes, fetchRandom, fetchRecipePlannerTrackerInfo } from 'redux/actions/recipeAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function RecipeManager( {  }: any ) {
  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.recipe )

  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )

  const [ recipeModal, setRecipeModal ] = useState( false )
  const [ changeOrAdd, setChangeOrAdd ] = useState( "" )
  const [ recipe, setRecipe ] = useState( "" )
  const [ searchData, setSearchData ] = useState( data[ 0 ].randomRecipes?.recipes || data[ 0 ].randomRecipes?.results )

  const [ selectedRecipe, setSelectedRecipe ] = useState( 0 )
  const [ selectedMeal, setSelectedMeal ] = useState( 0 )
  
  const [ refreshing, setRefreshing ] = useState( false )
  const [ refreshingModal, setRefreshingModal ] = useState( false )

  const [ confirmModal, setConfirmModal ] = useState( false )

  const filteredPlanner = data[ 0 ]?.plannerRecipes?.filter(
    ( item: any ) => item.date === dayjs( modalDate ).format( "YYYY-MM-DD" ).toString()
  ) || []

  const filteredPlannerInfo = data[ 0 ]?.plannerRecipesInfo?.filter(
    ( item: any, index: number ) => 
      item.id === filteredPlanner[ index ]?.recipeId &&
      mealCategories[ selectedMeal ].label === filteredPlanner[ index ]?.mealType
  ) || []
  
  const onRefresh = async () => {
    setRefreshing( true )

    const fetchData = async () => {
      if ( userSession ) {
        await dispatch( fetchPlannerRecipes( userSession.userId ) )

        if ( data[ 0 ].plannerRecipes && data[ 0 ].plannerRecipes.length > 0 ) {
          const theRecipeIds = data[ 0 ].plannerRecipes
            .filter(( item: any ) => item.date === dayjs( modalDate ).format( "YYYY-MM-DD" ).toString())
            .map(( item: any ) => item.recipeId)

          const previousRecipeIds = data[ 0 ].plannerRecipesInfo
            ?.map(( item: any ) => item.id ) || []

          const newRecipeIds = theRecipeIds
            .filter(( item: any ) => !previousRecipeIds.includes( item ) )
          
          const removedRecipeIds = previousRecipeIds
            .filter(( item: any ) => !theRecipeIds.includes( item ) )

          if ( newRecipeIds.length > 0 || removedRecipeIds.length > 0 ) {
            await dispatch( fetchRecipePlannerTrackerInfo( theRecipeIds.join( "," ) ) )
          }
        }
      }
    }
    
    if ( userSession ) {
      fetchData()
    }

    setRefreshing( false )
  }

  const onRefreshModal = () => {
    setRefreshingModal( true )

    setSearchData( data[ 0 ]?.randomRecipes?.results )

    setRefreshingModal( false )
  }

  const showModal = () => {
    setModal( !modal )
  }

  const showRecipeModal = ( mode: string ) => {
    setRecipeModal( !recipeModal )
    setChangeOrAdd( mode )
  }

  const showConfirmModal = () => {
    setConfirmModal( !confirmModal )
  }

  const searchPress = ( recipe: string ) => {
    dispatch( discoverSearch( recipe, 2, "", "", "", 0, 1000 ) )

    setSearchData( data[ 0 ]?.randomRecipes?.results )
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
    const getUserSession = async () => {
      const theUserSession = await AsyncStorage.getItem( "@user_session" )

      if ( theUserSession !== null ) {
        const parsed = JSON.parse( theUserSession )

        setUserSession( parsed )
      }
    } 

    getUserSession()
    
    if ( !data[ 0 ].randomRecipes ) {
      dispatch( fetchRandom( 2 ) )
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if ( userSession ) {
        await dispatch( fetchPlannerRecipes( userSession.userId ) )

        if ( data[ 0 ].plannerRecipes && data[ 0 ].plannerRecipes.length > 0 ) {
          const theRecipeIds = data[ 0 ].plannerRecipes
            .filter(( item: any ) => item.date === dayjs( modalDate ).format( "YYYY-MM-DD" ).toString())
            .map(( item: any ) => item.recipeId)

          const previousRecipeIds = data[ 0 ].plannerRecipesInfo
            ?.map(( item: any ) => item.id ) || []

          const newRecipeIds = theRecipeIds
            .filter(( item: any ) => !previousRecipeIds.includes( item ) )
          
          const removedRecipeIds = previousRecipeIds
            .filter(( item: any ) => !theRecipeIds.includes( item ) )

          if ( newRecipeIds.length > 0 || removedRecipeIds.length > 0 ) {
            await dispatch( fetchRecipePlannerTrackerInfo( theRecipeIds.join( "," ) ) )
          }
        }
      }
    }
    
    if ( userSession ) {
      fetchData()
    }
  }, [ userSession ])
  
  return (
    loading ? <Loading /> :
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
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
              mealCategories.map(( meal: MealCategory, index: number ) => { 
                return (
                  <TouchableOpacity
                    key={ index }
                    activeOpacity={ 0.5 } 
                    onPress={ () => setSelectedMeal( index ) }
                    style={[ s.mealBlock, selectedMeal === index ? { backgroundColor: LightMode.green } : { backgroundColor: LightMode.white } ]}
                  >
                    <Text style={ s.meal }>{ meal.abbr }</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          
          <FlatList
            refreshing={ refreshing }
            onRefresh={ onRefresh }
            style={ s.flatList }
            contentContainerStyle={{ padding: 20, paddingTop: 0 }}
            showsVerticalScrollIndicator= { false }
            data={ filteredPlannerInfo }
            renderItem={ CookItem }
            keyExtractor={ data => data.id.toString() }
            ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
          />
        </View>

        <Spacer size={ 45 } />

        <RoundedBorderButton 
          onPress={ () => showConfirmModal() }
          icon="MA"
          name="delete"
          text="Remove Selected Recipe"
          color={ LightMode.red }
          textColor={ LightMode.white }
          borderRadius={ 10 }
        />

        <Spacer size={ 10 } />

        <RoundedBorderButton 
          onPress={ () => showRecipeModal( "add" ) }
          icon="MA"
          name="add-circle"
          text="Add New Recipe"
          color={ LightMode.yellow }
          textColor={ LightMode.white }
          borderRadius={ 10 }
        />

        <Spacer size={ 15 } />

        <Text style={ s.hint }>Select meal type before adding new recipes.</Text>
        <Text style={ s.hint }>Your meal planner will auto-save. Refresh to see changes.</Text>
      </View>

      <CalendarModal 
        modal={ modal }
        showModal={ showModal }
        modalDate={ modalDate }
        setModalDate={ setModalDate }
      />

      <RecipeSelectionModal 
        userSession={ userSession }
        date={ dayjs( modalDate ).format( "YYYY-MM-DD" ).toString() }
        selectedMeal={ selectedMeal }
        refreshing={ refreshingModal }
        onRefresh={ onRefreshModal }
        changeOrAdd={ changeOrAdd }
        recipeModal={ recipeModal }
        showRecipeModal={ () => showRecipeModal( "change" ) }
        recipe={ recipe }
        setRecipe={ setRecipe }
        searchData={ searchData }
        searchPress={ () => searchPress( recipe ) }
      />

      <ConfirmationModal 
        modal={ confirmModal }
        showModal={ showConfirmModal }
        message="Delete this recipe? This cannot be undone."
        onCancel={ () => {
          showConfirmModal()
        }}
        onConfirm={ () => {
          Alert.alert(
            "Delete success!",
            "The selected recipe is removed!",
            [
              { text: "Ok", style: "default" },
            ]
          )
          
          const toDelete = filteredPlanner
            .filter(( item: any ) => item.recipeId === filteredPlannerInfo[ selectedRecipe ]?.id )[ 0 ].mealId

          dispatch( deletePlannerRecipes( toDelete ) )
          showConfirmModal()
        }}
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
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.black,
    textAlign: "center"
  },
  "manager": {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 25
  },
  "leftManager": {
    gap: 10
  },
  "flatList": {
    height: 385,
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
    fontFamily: "fira",
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
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.black
  },
  "hint": {
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.lightBlack,
    textAlign: "center"
  },
})