import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import { forRecipeManager } from 'data/dummyData'
import PropTypes from 'prop-types'
import React from 'react'
import { Dimensions, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import HoriCardWithCTA from './HoriCardWithCTA'
import LinedTextField from './LinedTextField'
import RoundedBorderButton from './RoundedBorderButton'
import Spacer from './Spacer'

export default function RecipeSelectionModal( { changeOrAdd, recipeModal, showRecipeModal, recipe, setRecipe, searchData }: any ) {
  const SearchItem = ( { item, index }: any ) => (
    <HoriCardWithCTA 
      changeOrAdd={ changeOrAdd }
      onPress={ showRecipeModal }
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
      <View style={[ s.modalContainer, { justifyContent: "flex-end" } ]}>
        <View style={[ s.modalContent, { margin: 0, flex: 0.85, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } ]}>
          <View style={ s.modalWrapper }>
            <View style={ s.modalHeadingWrapper }>
              <View style={ s.modalHeading }>
                <Text style={ s.modalHeadingTitle }>{ changeOrAdd === "change" ? "Change Selected Recipe" : "Add New Recipe" }</Text>
              </View>
            </View>

            <LinedTextField 
              name="search"
              placeholder="Search Recipes..."
              text={ recipe }
              setText={ setRecipe }
            />

            <View style={ s.flatListWrapper }>
              <FlatList 
                style={ s.flatList }
                contentContainerStyle={{ padding: 20, paddingTop: 10 }}
                showsVerticalScrollIndicator= { false }
                data={ forRecipeManager }
                renderItem={ SearchItem }
                keyExtractor={ data => data.id.toString() }
                ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
              />
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
    flexDirection: "row"
  },
  "flatList": {
    height: Dimensions.get( "window" ).height * 0.535,
    margin: -10,
    marginTop: 0,
  },
})

RecipeSelectionModal.propTypes = {
  changeOrAdd: PropTypes.string.isRequired,
  recipeModal: PropTypes.bool.isRequired,
  showRecipeModal: PropTypes.func.isRequired,
  recipe: PropTypes.string.isRequired,
  setRecipe: PropTypes.func.isRequired,
  searchData: PropTypes.any.isRequired
}