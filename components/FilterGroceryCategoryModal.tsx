import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import { GroceryCategory, groceryCategory } from 'data/groceryCategory'
import PropTypes from 'prop-types'
import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CategoryCard from './CategoryCard'
import RoundedBorderButton from './RoundedBorderButton'
import Spacer from './Spacer'

export default function FilterGroceryCategoryModal( { modal, showModal, category, showCategory }: any ) {
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
      <View style={ s.modalContainer }>
        <View style={ s.modalContent }>
          <View style={ s.modalWrapper }>
            <View style={ s.modalHeadingWrapper }>
              <View style={ s.modalHeading }>
                <Text style={ s.modalHeadingTitle }>Categories</Text>
              </View>
            </View>

            <Spacer size={ 30 } />

            <View style={ s.categoryContainer }>
              {
                groceryCategory.map(( data: GroceryCategory, index: number ) => (
                  <CategoryCard
                    key={ index }
                    selected={ category === data.label }
                    data={ data }
                    onPress={ () => showCategory( data.label ) }
                  />
                ))
              }
            </View>

            <Spacer size={ 40 } />

            <View style={ s.buttonContainer }>
              <RoundedBorderButton 
                onPress={ showModal }
                text="Done"
                color={ LightMode.yellow }
                textColor={ LightMode.white }
                borderRadius={ 10 }
              />

              <TouchableOpacity
                activeOpacity={ 0.5 }
                onPress={ () => {
                  showCategory( "" )
                  showModal()
                }}
              >
                <Text style={ s.textButton }>Clear</Text>
              </TouchableOpacity>
            </View>
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
    flex: 0.7, 
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
  "categoryContainer": {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "space-between"
  },
  "buttonContainer": {
    marginHorizontal: "auto",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  "textButton": {
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.yellow
  },
})

FilterGroceryCategoryModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  showCategory: PropTypes.func.isRequired
}