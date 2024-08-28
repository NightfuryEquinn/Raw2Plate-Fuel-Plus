import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinedTextField from './LinedTextField'

export default function AddGroceryListItemModal( { modal, showModal, name, setName, onCancel, onConfirm }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 

  return (
    <Modal
      animationType="fade"
      transparent={ true }
      visible={ modal }
      onRequestClose={ showModal }
    >
      <View style={ s.modalContainer }>
        <View style={ s.modalContent }>
          <LinedTextField 
            name="new-label"
            placeholder="Name your grocery..."
            text={ name }
            setText={ setName }
          />
        
          <View style={ s.actionContainer }>
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ onCancel }
            >
              <Image
                resizeMode="cover"
                source={ require( "../assets/images/icons/cancel.png" ) }
                style={ s.image }
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ onConfirm }
            >
              <Image 
                resizeMode="cover"
                source={ require( "../assets/images/icons/checked.png" ) }
                style={ s.image }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  "modalContainer": {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightMode.halfBlack
  },
  "modalContent": {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: LightMode.white,
    gap: 20,
  },
  "actionContainer": {
    flexDirection: "row",
    gap: 80,
    alignItems: "center"
  },
  "image": {
    marginHorizontal: "auto",
    width: 48,
    height: 48
  }
})

AddGroceryListItemModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}