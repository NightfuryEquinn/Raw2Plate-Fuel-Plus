import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import RoundedBorderButton from './RoundedBorderButton'
import Spacer from './Spacer'
import { AppDispatch } from 'redux/reducers/store'
import { useDispatch } from 'react-redux'
import { addItemCart, updateItemCart } from 'redux/actions/groceryAction'

export default function SingleGroceryCardModal( { userId, data, modal, showModal, quantity, setQuantity, editable = false }: any ) {
  const dispatch: AppDispatch = useDispatch()
  
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
            <View style={ s.wrapper }>
              <Image 
                resizeMode="contain"
                source={{ uri: data.image }}
                style={ s.image }
              />
            </View>
            
            <Spacer size={ 30 } />

            <Text style={ s.price }>RM { data.price && data.price.toFixed( 2 ) }</Text>

            <Text style={ s.name }>{ data.name }</Text>

            <Spacer size={ 30 } />

            <View style={ s.quantityContainer }>
              <Text style={ s.quantityHeading }>Quantity</Text>

              <View style={ s.ctaContainer }>
                <TouchableOpacity
                  activeOpacity={ 0.5 }
                  onPress={ () => quantity > 1 && setQuantity( quantity - 1 ) }
                  style={ s.icon }
                >
                  <IconMA 
                    name="horizontal-rule"
                    size={ 32 }
                    color={ LightMode.blue }
                  />
                </TouchableOpacity>

                <Text style={ s.quantity }>{ quantity }</Text>

                <TouchableOpacity
                  activeOpacity={ 0.5 }
                  onPress={ () => setQuantity( quantity + 1 ) }
                  style={ s.icon }
                >
                  <IconMA 
                    name="add"
                    size={ 32 }
                    color={ LightMode.blue }
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Spacer size={ 40 } />

            <View style={ s.buttonContainer }>
              <RoundedBorderButton 
                onPress={ () => {
                  showModal()

                  if ( editable ) {
                    dispatch( updateItemCart(
                      {
                        cartId: data.cartId,
                        quantity: quantity,
                        userId: userId,
                        itemId: data.itemId
                      }
                    ))
                  } else {
                    dispatch( addItemCart(
                      {
                        cartId: 0,
                        quantity: quantity,
                        userId: userId,
                        itemId: data.itemId
                      }
                    )) 
                  }
                }}
                text={ editable ? "Update Cart" : "Add to Cart" }
                color={ LightMode.yellow }
                textColor={ LightMode.white }
                borderRadius={ 10 }
              />

              <TouchableOpacity
                activeOpacity={ 0.5 }
                onPress={ showModal }
              >
                <Text style={ s.textButton }>Cancel</Text>
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
    flex: 0.75, 
    borderRadius: 10,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    padding: 30,
    alignItems: "center",
    backgroundColor: LightMode.white,
    gap: 10,
  },
  "modalWrapper": {
    flex: 1,
    alignItems: "flex-start"
  },
  "wrapper": {
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
    width: Dimensions.get( "window" ).width - 60,
    height: 250,
    borderRadius: 10,
    backgroundColor: "#FFFFFF"
  },
  "price": {
    fontFamily: "cantarell",
    fontSize: 28,
    color: LightMode.black,
  },
  "name": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.halfBlack
  },
  "quantityContainer": {
    flex: 1,
    gap: 10,
  },
  "quantityHeading": {
    fontFamily: "cantarell",
    fontSize: 22,
    color: LightMode.black
  },
  "ctaContainer": {
    flexDirection: "row",
    gap: 30,
    alignItems: "center"
  },
  "quantity": {
    fontFamily: "cantarell",
    fontSize: 28,
    color: LightMode.lightBlack
  },
  "icon": {
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
})

SingleGroceryCardModal.propTypes = {
  userId: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  editable: PropTypes.bool
}