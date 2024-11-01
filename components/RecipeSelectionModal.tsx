import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import { mealCategories } from 'data/mealCategory'
import PropTypes from 'prop-types'
import React from 'react'
import { Alert, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addRecipesPlanner } from 'redux/actions/recipeAction'
import { AppDispatch } from 'redux/reducers/store'
import HoriCardWithCTA from './HoriCardWithCTA'
import LinedTextField from './LinedTextField'
import RoundedBorderButton from './RoundedBorderButton'
import Spacer from './Spacer'
import { addManualRecipesTracker } from 'redux/actions/trackerAction'

export default function RecipeSelectionModal({ 
  setSelectedRecipe,
  userSession, date, selectedMeal, 
  refreshing, onRefresh, 
  changeOrAdd, 
  recipeModal, showRecipeModal, 
  recipe, setRecipe, 
  searchData, searchPress 
}: any ) {
  const dispatch: AppDispatch = useDispatch()

  const ctaPress = async ( item: any ) => {
    if ( changeOrAdd === "change" ) {
      // Sub for getting the recipe id for review while adding in tracker
      setSelectedRecipe( [ item ] )
    } else {
      const res = await dispatch( addRecipesPlanner(
        userSession.userId,
        date,
        {
          mealId: 0,
          mealType: mealCategories[ selectedMeal ].label,
          recipeId: item.id,
          comment: "",
          plannerId: 0,
          trackerId: 0,
        }
      ))

      if ( res === 400 ) {
        Alert.alert(
          "Existed!",
          "This recipe has already been added at this meal time!",
          [
            { text: "Ok", style: "default" },
          ]
        )
      } else {
        Alert.alert(
          "Success!",
          "This recipe has been added!",
          [
            { text: "Ok", style: "default" },
          ]
        )
      }
    }
  }
  
  const SearchItem = ( { item, index }: any ) => (
    <HoriCardWithCTA 
      key={ index }
      changeOrAdd={ changeOrAdd }
      onPress={ () => {
        ctaPress( item )
        showRecipeModal() 
      }}
      data={ item }
    />
  )
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  return (
    <Modal
      animationType="slide"
      transparent={ true }
      visible={ recipeModal }
      onRequestClose={ () => showRecipeModal( "" ) }
    >
      <View style={ s.modalContainer }>
        <View style={ s.modalContent }>
          <View style={ s.modalWrapper }>
            <View style={ s.modalHeadingWrapper }>
              <View style={ s.modalHeading }>
                <Text style={ s.modalHeadingTitle }>{ changeOrAdd === "change" ? "Select Recipe" : "Add New Recipe" }</Text>
              </View>
            </View>

            <LinedTextField 
              name="search"
              placeholder="Search Recipes..."
              text={ recipe }
              setText={ setRecipe }
            />

            <RoundedBorderButton 
              onPress={ searchPress } 
              color={ LightMode.lightBlack } 
              text="Search" 
              textColor={ LightMode.white }
              borderRadius={ 10 }
              marginHori={ 0 }    
            />

            <Spacer size={ 10 } />

            <View style={{ flex: 1 }}>
              <View style={ s.flatListWrapper }>
                <FlatList 
                  refreshing={ refreshing }
                  onRefresh={ onRefresh }
                  style={ s.flatList }
                  contentContainerStyle={{ padding: 20, paddingTop: 10 }}
                  showsVerticalScrollIndicator= { false }
                  data={ searchData }
                  renderItem={ SearchItem }
                  keyExtractor={ data => data.id.toString() }
                  ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
                />
              </View>
            </View>

            <Spacer size={ 40 } />

            <RoundedBorderButton 
              onPress={ () => showRecipeModal( "" ) }
              text="Cancel"
              color={ LightMode.yellow }
              textColor={ LightMode.white }
              borderRadius={ 10 }
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  "modalContainer": {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: LightMode.halfBlack
  },
  "modalContent": {
    margin: 0, 
    flex: 0.85, 
    borderRadius: 10,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    padding: 20,
    alignItems: "center",
    backgroundColor: LightMode.white,
    gap: 10,
  },
  "modalButton": {
    padding: 10,
    borderRadius: 10,
    backgroundColor: LightMode.white
  },
  "modalWrapper": {
    alignItems: "center"
  },
  "modalHeadingWrapper": {
    flexDirection: "row"
  },
  "modalHeading": {
    flex: 1,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: LightMode.darkGrey, 
  },
  "modalHeadingTitle": {
    textAlign: "center",
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black,
  },
  "flatListWrapper": {
    flex: 1,
    flexDirection: "row"
  },
  "flatList": {
    width: "100%",
    margin: -10,
    marginTop: 0,
  },
})

RecipeSelectionModal.propTypes = {
  setSelectedRecipe: PropTypes.func,
  userSession: PropTypes.any.isRequired,
  date: PropTypes.string.isRequired,
  selectedMeal: PropTypes.number.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  changeOrAdd: PropTypes.string.isRequired,
  recipeModal: PropTypes.bool.isRequired,
  showRecipeModal: PropTypes.func.isRequired,
  recipe: PropTypes.string.isRequired,
  setRecipe: PropTypes.func.isRequired,
  searchData: PropTypes.any.isRequired,
  searchPress: PropTypes.func.isRequired
}