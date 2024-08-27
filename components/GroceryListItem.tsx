import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

export default function GroceryListItem( { data, onPress }: any ) {
  return (
    <View>
      <Text>GroceryListItem</Text>
    </View>
  )
}

const s = StyleSheet.create({

})

GroceryListItem.propTypes = {
  data: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired
}

