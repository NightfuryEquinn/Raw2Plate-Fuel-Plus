import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from 'components/TopBar'
import Spacer from 'components/Spacer'
import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import RecipeSelectionModal from 'components/RecipeSelectionModal'
import CalendarModal from 'components/CalendarModal'
import DropDownPicker from 'react-native-dropdown-picker'
import LinedTextField from 'components/LinedTextField'
import RecipeMoreDetails from 'components/RecipeMoreDetails'
import { AppDispatch, RootState } from 'redux/reducers/store'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addRecipesPlanner, discoverSearch, fetchRandom } from 'redux/actions/recipeAction'
import Loading from 'app/Loading'
import RoundedBorderButton from 'components/RoundedBorderButton'
import { addManualRecipesTracker, fetchRecipesNutrients } from 'redux/actions/trackerAction'
import { mealCategories } from 'data/mealCategory'
import EmptyContent from 'components/EmptyContent'
import { capitalizeWords } from 'data/formatData'
import { ScrollView } from 'react-native-gesture-handler'

export default function ManualAdd( { navigation }: any ) {
  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const recipeData = useSelector(( state: RootState ) => state.recipe )
  const trackerData = useSelector(( state: RootState ) => state.tracker )

  const [ manual, setManual ] = useState( false )

  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )

  const [ recipeModal, setRecipeModal ] = useState( false )
  const [ recipe, setRecipe ] = useState( "" )
  const [ searchData, setSearchData ] = useState( recipeData.data[ 0 ]?.randomRecipes?.recipes || recipeData.data[ 0 ]?.randomRecipes?.results )

  const [ refreshing, setRefreshing ] = useState( false )

  const [ openDrop, setOpenDrop ] = useState( false )
  const [ dropValue, setDropValue ] = useState( "" )

  const [ manualRecipe, setManualRecipe ] = useState( "" )
  const [ manualCalories, setManualCalories ] = useState( "" )

  const [ selectedRecipe, setSelectedRecipe ] = useState<any>( [] )
  const [ recipeNutrients, setRecipeNutrients ] = useState<any>( [] )
  
  const dropItems = [
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Brunch', value: 'Brunch' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Tea Time', value: 'Tea Time' },
    { label: 'Dinner', value: 'Dinner' }
  ]

  const getManualImage = () => {
    return manual
    ? require( "../../assets/images/icons/checked.png" )
    : require( "../../assets/images/icons/cancel.png" ) 
  }
  
  const showModal = () => {
    setModal( !modal )
  }

  const showRecipeModal = () => {
    setRecipeModal( !recipeModal )
  }
  
  const onRefresh = async () => {
    setRefreshing( true )

    setSearchData( recipeData.data[ 0 ]?.randomRecipes?.recipes || recipeData.data[ 0 ]?.randomRecipes?.results )

    setRefreshing( false )
  }

  const searchPress = ( recipe: string ) => {
    dispatch( discoverSearch( recipe, 2, "", "", "", 0, 1000 ) )

    setSearchData( recipeData.data[ 0 ]?.randomRecipes?.recipes || recipeData.data[ 0 ]?.randomRecipes?.results )
  }

  const addToTrackerPress = async () => {
    if ( !manual ) {
      const res = await dispatch( addRecipesPlanner(
        userSession.userId,
        dayjs( modalDate ).format( "YYYY-MM-DD" ).toString(),
        {
          mealId: 0,
          mealType: dropValue,
          recipeId: selectedRecipe.id,
          comment: "",
          plannerId: 0,
          trackerId: 0,
        }
      ))

      if ( res === 400 ) {
        Alert.alert(
          "Conflict!",
          "This recipe has been already been tracked!",
          [
            { text: "I Understood", style: "default" },
          ]
        )
      } else {
        Alert.alert(
          "Success!",
          "This recipe has been tracked!",
          [
            { text: "I Understood", style: "default" },
          ]
        )

        navigation.goBack()
      }
    } else {
      await dispatch( addManualRecipesTracker(
        userSession.userId,
        dayjs( modalDate ).format( "YYYY-MM-DD" ).toString(),
        {
          manualMealId: 0,
          name: manualRecipe,
          calories: +( +manualCalories ).toFixed( 2 ),
          trackerId: 0
        }
      ))

      Alert.alert(
        "Success!",
        "This recipe has been tracked!",
        [
          { text: "I Understood", style: "default" },
        ]
      )

      navigation.goBack()
    }
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
    
    if ( !recipeData.data[ 0 ]?.randomRecipes ) {
      dispatch( fetchRandom( 2 ) )
    }
  }, [])

  useEffect(() => {
    if ( selectedRecipe.length !== 0 ) {
      dispatch( fetchRecipesNutrients( selectedRecipe.id ) )
    }
  }, [ selectedRecipe ])

  useEffect(() => {
    if ( trackerData.data[ 0 ]?.cacheRecipesNutrients ) {
      const theRecipeNutrients = trackerData.data[ 0 ]?.cacheRecipesNutrients?.filter(( item: any ) =>
        item.recipeId === selectedRecipe.id
      )

      setRecipeNutrients( theRecipeNutrients )
    }
  }, [ trackerData.data[ 0 ]?.cacheRecipesNutrients ])
  
  return (
    recipeData.loading || trackerData.loading ? <Loading /> :
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />
        
        <Text style={ s.heading }>Add Recipe to Tracker</Text>

        <Spacer size={ 20 } />

        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ showModal }
          style={ s.changeDate }
        >
          <Text style={ s.dateText }>{ dayjs( modalDate ).format( "DD-MM-YYYY" ) }</Text>
        </TouchableOpacity>

        <Spacer size={ 30 } />

        <ScrollView
          style={{ margin: -20 }}
          contentContainerStyle={{ padding: 20 }}
        >
        <View style={ s.manualContainer }>
          <Text style={ s.manual }>Manual Input?</Text>

          <TouchableOpacity activeOpacity={ 0.5 } onPress={ () => setManual( !manual ) }>
            <Image 
              resizeMode="cover"
              style={ s.image }
              source={ getManualImage() }
            />
          </TouchableOpacity>
        </View>

        <Spacer size={ 15 } />

        { !manual ?
          <Fragment>
            <DropDownPicker 
              open={ openDrop }
              value={ dropValue }
              items={ dropItems }
              setOpen={ setOpenDrop }
              setValue={ setDropValue }
              placeholder="Choose Meal"
              textStyle={{
                fontFamily: "fira"
              }}
            />

            <Spacer size={ 15 } />

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showRecipeModal }
              style={ s.changeDate }
            >
              <Text style={ s.dateText }>{ recipe || "Choose Recipe" }</Text>
            </TouchableOpacity>
          </Fragment>
          :
          <Fragment>
            <LinedTextField 
              placeholder="Your recipe?" 
              text={ manualRecipe } 
              name="local-restaurant" 
              setText={ setManualRecipe }        
            />

            <LinedTextField 
              placeholder="Your calories of the recipe?" 
              text={ manualCalories } 
              name="numbers" 
              setText={ setManualCalories }
              number={ true }
            />
          </Fragment>
        }

        <Spacer size={ 30 } />

        <View style={ s.divider }>
          <Text style={ s.dividerText }>Review</Text>
        </View> 

        {
          trackerData && trackerData.data.length > 0 && trackerData.data[ 0 ]?.cacheRecipesNutrients && selectedRecipe.length !== 0 && recipeNutrients.length !== 0 ?
            <RecipeMoreDetails 
              name={ capitalizeWords( selectedRecipe?.title ) }
              image={ selectedRecipe?.image }
              calories={ recipeNutrients[ 0 ]?.nutrients[ 0 ]?.amount.toFixed( 2 ) }
              carbo={ recipeNutrients[ 0 ]?.nutrients[ 3 ]?.amount }
              protein={ recipeNutrients[ 0 ]?.nutrients[ 8 ]?.amount }
              fibers={ recipeNutrients[ 0 ]?.nutrients[ 11 ]?.amount }
              sugars={ recipeNutrients[ 0 ]?.nutrients[ 5 ]?.amount }
              fats={ recipeNutrients[ 0 ]?.nutrients[ 1 ]?.amount }
              cholesterols={ recipeNutrients[ 0 ]?.nutrients[ 6 ]?.amount }
            />
          : manual ?
            <Fragment>
              <Spacer size={ 10 } />

              <EmptyContent 
                message="No review available for manual inputs..."
              />
            </Fragment>
          :
            <Fragment>
              <Spacer size={ 10 } />

              <EmptyContent 
                message="Select a recipe to review calories and nutrients..."
              />
            </Fragment>
        }

        </ScrollView>

        <Spacer size={ 30 } />

        <Text style={ s.hintText }>NOTE: Detailed nutrient information about a manually inserted recipe will not be generated. Only calories will be recorded.</Text>

        <Spacer size={ 10 } />

        <RoundedBorderButton 
          onPress={ addToTrackerPress }
          text="Add to Tracker"
          color={ LightMode.green }
          textColor={ LightMode.black }
          borderRadius={ 10 }
          marginHori={ 0 }
        />
      </View>

      <CalendarModal 
        modal={ modal }
        showModal={ showModal }
        modalDate={ modalDate }
        setModalDate={ setModalDate }
      />

      <RecipeSelectionModal
        setSelectedRecipe={ setSelectedRecipe }
        userSession={ userSession }
        date={ dayjs( modalDate ).format( "YYYY-MM-DD" ).toString() }
        selectedMeal={ dropItems.findIndex( item => item.label === dropValue ) }
        refreshing={ refreshing }
        onRefresh={ onRefresh }
        changeOrAdd={ "change" }
        recipeModal={ recipeModal }
        showRecipeModal={ showRecipeModal }
        recipe={ recipe }
        setRecipe={ setRecipe }
        searchData={ searchData }
        searchPress={ () => searchPress( recipe ) }
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
  "image": {
    width: 24,
    height: 24
  },
  "manualContainer": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "manual": {
    fontFamily: "fjalla",
    fontSize: 20,
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
  "divider": {
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
    fontFamily: "fira",
    fontSize: 14,
    color: LightMode.white,
  },
  "hintText": {
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.halfBlack
  }
})