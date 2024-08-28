import { LightMode } from 'assets/colors/LightMode'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function GroceryListItem( { data, onChecked, onDelete }: any ) {
  return (
    <View style={ s.container }>
      <TouchableOpacity 
        activeOpacity={ 0.5 }
        onPress={ onChecked }
        style={ s.listContainer }
      >
        { data.checked ?
          <Image 
            source={ require( "../assets/images/icons/checked.png" ) }
            resizeMode="contain"
            style={ s.checked }
          />
          :
          <View style={ s.emptyChecked }></View>
        }

        <View style={ s.textWrapper }>
          <Text style={ s.text }>{ data.name }</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={ 0.5 }
        onPress={ onDelete }
        style={ s.icon }
      >
        <IconMA 
          name="delete"
          size={ 32 }
          color={ LightMode.red }
        />
      </TouchableOpacity>
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  "listContainer": {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  "emptyChecked": {
    height: 28,
    width: 28,
    borderWidth: 1,
    borderColor: LightMode.black,
    borderRadius: 100
  },
  "checked": {
    height: 28,
    width: 28
  },
  "textWrapper": {
    flex: 1,
  },
  "text": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.black
  },
  "icon": {
    padding: 7.5,
    justifyContent: "center",
    alignItems: "center",
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
  }
})

GroceryListItem.propTypes = {
  data: PropTypes.any.isRequired,
  onChecked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

