import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { LightMode } from 'assets/colors/LightMode'
import PropTypes from 'prop-types'
import Spacer from './Spacer'

export default function ConfirmationModal( { modal, showModal, message, onCancel, onConfirm }: any ) {
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
          <Text style={ s.message }>{ message }</Text>

          <View style={ s.actionContainer }>
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ onCancel }
            >
              <Image 
                resizeMode="cover"
                source={ require( "../assets/images/cancel.png" ) }
                style={ s.image }
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ onConfirm }
            >
              <Image 
                resizeMode="cover"
                source={ require( "../assets/images/checked.png" ) }
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
  "message": {
    fontFamily: "cantarell",
    fontSize: 20,
    color: LightMode.black,
    textAlign: "center"
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

ConfirmationModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}