import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFontFromContext } from 'context/FontProvider'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import { LightMode } from 'assets/colors/LightMode'
import SingleGroceryCardModal from './SingleGroceryCardModal'

export default function InCartHoriCard( { userId, storeId, data, onDelete }: any ) {
  const [ quantity, setQuantity ] = useState( data.quantity )
  const [ editModal, setEditModal ] = useState( false )

  const showEditModal = () => {
    setEditModal( !editModal )
  }
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <View style={ s.container }>
      <Image 
        source={{ uri: data.image }}
        resizeMode="contain"
        style={ s.image }
      />

      <View style={ s.contentContainer }>
        <Text numberOfLines={ 2 } style={ s.name }>{ data.name }</Text>

        <View style={ s.contentDetail }>
          <Text style={ s.quantity }>Quantity <Text style={ s.black }>{ data.quantity }</Text></Text>

          <Text style={ s.price }>RM { ( data.price * data.quantity ).toFixed( 2 ) }</Text>
        </View>
      </View>

      <View style={ s.ctaContainer }>
        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ onDelete }
          style={ s.cta }
        >
          <IconMA 
            name="delete"
            size={ 28 }
            color={ LightMode.red }
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ showEditModal }
          style={[ s.cta, s.ctaBlack ]}
        >
          <IconMA 
            name="edit-note"
            size={ 28 }
            color={ LightMode.white }
          />
        </TouchableOpacity>
      </View>

      <SingleGroceryCardModal 
        userId={ userId }
        storeId={ storeId }
        data={ data }
        modal={ editModal }
        showModal={ showEditModal }
        quantity={ quantity }
        setQuantity={ setQuantity }
        editable={ true }
      />
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    height: 125,
    backgroundColor: LightMode.white,
    borderRadius: 10,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "image": {
    height: 125,
    width: 125,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "contentContainer": {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "space-between",
    gap: 20,
  },
  "name": {
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.black
  },
  "contentDetail": {
    gap: 5,
  },
  "quantity": {
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.halfBlack
  },
  "black": {
    color: LightMode.black
  },
  "price": {
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.black
  },
  "ctaContainer": {
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  "cta": {
    height: 40,
    width: 40,
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
    justifyContent: "center",
    alignItems: "center"
  },
  "ctaBlack": {
    backgroundColor: LightMode.black
  }
})

InCartHoriCard.propTypes = {
  userId: PropTypes.number.isRequired,
  storeId: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
  onDelete: PropTypes.func.isRequired,
}