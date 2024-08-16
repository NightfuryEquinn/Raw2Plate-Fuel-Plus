import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import RoundedBorderButton from './RoundedBorderButton'
import Spacer from './Spacer'

import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Checkbox } from 'react-native-paper'

export default function FilterRecipeSelectionModal( { 
  modal, showModal,
  openCuisines, cuisinesValue, cuisines, setOpenCuisines, setCuisinesValue,
  ingredients,
  openInclude, includeValue, openExclude, excludeValue,
  setOpenInclude, setIncludeValue, setOpenExclude, setExcludeValue,
  match, setMatch,
  min, max, setMin, setMax,
  save 
}: any ) {

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <Modal
      animationType="slide"
      transparent={ true }
      visible={ modal }
      onRequestClose={ showModal }
    >
      <GestureHandlerRootView style={ s.modalContainer }>
        <View style={ s.modalContent }>
          <View style={ s.modalWrapper }>
            <View>
              <View style={ s.modalHeadingWrapper }>
                <View style={ s.modalHeading }>
                  <Text style={ s.modalHeadingTitle }>Filter Selection</Text>
                </View>
              </View>

              <Spacer size={ 20 } />

              <View style={ s.filterContent }>
                <Text style={ s.filterTitle }>Cuisines</Text>

                <DropDownPicker 
                  open={ openCuisines }
                  value={ cuisinesValue }
                  items={ cuisines }
                  setOpen={ setOpenCuisines }
                  setValue={ setCuisinesValue }
                  placeholder="Choose Cuisines"
                  textStyle={{
                    fontFamily: "cantarell"
                  }}
                  zIndex={ 3000 }
                  zIndexInverse={ 1000 }
                />
              </View>

              <Spacer size={ 20 } />

              <View style={ s.filterContent }>
                <Text style={ s.filterTitle }>Ingredients</Text>

                <DropDownPicker
                  multiple={ true }
                  open={ openInclude }
                  value={ includeValue }
                  items={ ingredients }
                  setOpen={ setOpenInclude }
                  setValue={ setIncludeValue }
                  placeholder="To be included"
                  textStyle={{
                    fontFamily: "cantarell"
                  }}
                  zIndex={ 2000 }
                  zIndexInverse={ 2000 }
                />

                <View style={ s.ingredientContainer }>
                  <Image 
                    source={ require( "../assets/images/checked.png" ) }
                    style={ s.image }
                  />

                  <View style={ s.list }>
                    <Text style={ s.listText }>{ includeValue.length !== 0 ? includeValue.join( ", " ) : "No ingredient selected..." }</Text>
                  </View>
                </View>
              </View>

              <Spacer size={ 20 } />

              <View style={ s.filterContent }>
                <DropDownPicker
                  multiple={ true }
                  open={ openExclude }
                  value={ excludeValue }
                  items={ ingredients }
                  setOpen={ setOpenExclude }
                  setValue={ setExcludeValue }
                  placeholder="To be excluded"
                  textStyle={{
                    fontFamily: "cantarell"
                  }}
                  zIndex={ 1000 }
                  zIndexInverse={ 3000 }
                />

                <View style={ s.ingredientContainer }>
                  <Image 
                    source={ require( "../assets/images/cancel.png" ) }
                    style={ s.image }
                  />

                  <View style={ s.list }>
                    <Text style={ s.listText }>{ excludeValue.length !== 0 ? excludeValue.join( ", " ) : "No ingredient selected..." }</Text>
                  </View>
                </View>
              </View>

              <Spacer size={ 20 } />

              <View style={ s.filterContent }>
                <Text style={ s.filterTitle }>Calories Range</Text>

                <MultiSlider
                  values={[ min, max ]}
                  sliderLength={ Dimensions.get( "screen" ).width * 0.9 }
                  min={ 30 }
                  max={ 2500 }
                  step={ 10 }
                  snapped={ true }
                  onValuesChange={ ( value: any ) => {
                    setMin( value[ 0 ] )
                    setMax( value[ 1 ] )
                  }}
                  markerStyle={{ backgroundColor: LightMode.blue }}
                  trackStyle={{ backgroundColor: LightMode.darkGrey }}
                  selectedStyle={{ backgroundColor: LightMode.black }}
                />  
                
                <Text style={ s.listText }>{ min } - { max } kcal</Text>
              </View>
            </View>

            <View style={ s.buttonContainer }>
              <View style={ s.checkbox }>
                <Checkbox 
                  color={ LightMode.black }
                  status={ match ? "checked": "unchecked" }
                  onPress={ () => setMatch( !match ) }
                />

                <Text style={ s.checkboxText }>Match Ingredients Included & Excluded</Text>
              </View>
              
              <RoundedBorderButton 
                onPress={ save }
                text="Apply Filter"
                color={ LightMode.yellow }
                textColor={ LightMode.white }
                borderRadius={ 10 }
              />

              <TouchableOpacity
                activeOpacity={ 0.5 }
                onPress={ () => console.log( "Clear" ) }
              >
                <Text style={ s.textButton }>Clear Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
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
  "modalWrapper": {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start"
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
  "filterContent": {
    gap: 10,
  },
  "filterTitle": {
    fontFamily: "fjalla",
    fontSize: 18,
    color: LightMode.black,
  },
  "ingredientContainer": {
    flexDirection: "row",
    gap: 20,
    alignItems: "center"
  },
  "image": {
    width: 24,
    height: 24
  },
  "list": {
    flex: 1,
  },
  "listText": {
    fontFamily: "cantarell",
    fontSize: 14,
    color: LightMode.black
  },
  "buttonContainer": {
    marginHorizontal: "auto",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  "textButton": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.yellow
  },
  "slider": {
    justifyContent: "center",
    alignItems: "center"
  },
  "checkbox": {
    flexDirection: "row",
    gap: 5,
    alignItems: "center"
  },
  "checkboxText": {
    fontFamily: "fjalla",
    fontSize: 16,
    color: LightMode.black,
  }
})

FilterRecipeSelectionModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  openCuisines: PropTypes.bool.isRequired,
  cuisinesValue: PropTypes.string.isRequired,
  cuisines: PropTypes.array.isRequired,
  setOpenCuisines: PropTypes.func.isRequired,
  setCuisinesValue: PropTypes.func.isRequired,
  ingredients: PropTypes.array.isRequired,
  openInclude: PropTypes.bool.isRequired, 
  includeValue: PropTypes.array.isRequired, 
  openExclude: PropTypes.bool.isRequired, 
  excludeValue: PropTypes.array.isRequired,
  setOpenInclude: PropTypes.func.isRequired, 
  setIncludeValue: PropTypes.func.isRequired, 
  setOpenExclude: PropTypes.func.isRequired, 
  setExcludeValue: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
  setMatch: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setMin: PropTypes.func.isRequired,
  setMax: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
}