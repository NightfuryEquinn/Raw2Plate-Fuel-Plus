import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'

export default function SingleGroceryCardModal( { data, modal, showModal, quantity, setQuantity }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <View>
      <Text>SingleGroceryCardModal</Text>
    </View>
  )
}

const s = StyleSheet.create({

})

SingleGroceryCardModal.propTypes = {
  data: PropTypes.any.isRequired,
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
}