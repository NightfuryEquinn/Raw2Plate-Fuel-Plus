import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from 'components/TopBar'
import Spacer from 'components/Spacer'
import { LightMode } from 'assets/colors/LightMode'
import InCartHoriCard from 'components/InCartHoriCard'
import ConfirmationModal from 'components/ConfirmationModal'
import SingleGroceryCardModal from 'components/SingleGroceryCardModal'
import { ForInCart } from 'data/dummyData'

export default function InCart( { navigation, route }: any ) {
  const { theCart } = route.params

  const [ modal, setModal ] = useState( false )

  const total = theCart.items.reduce(( total: any , currentItem: any ) => {
    return total + ( currentItem.item.price * currentItem.quantity )
  }, 0)

  const CartItem = ( { item, index }: any ) => (
    <InCartHoriCard
      key={ index }
      data={ item }
      onDelete={ showModal }
    />
  )

  const showModal = () => {
    setModal( !modal )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>In Cart</Text>

        <Spacer size={ 20 } />

        <Image 
          resizeMode="cover"
          source={ theCart.theStore.image }
          style={ s.image }
        />

        <Spacer size={ 15 } />

        <Text style={ s.text }>Deliver directly from <Text style={ s.yellow }>{ theCart.theStore.store }</Text></Text>
        
        <Spacer size={ 5 } />
      
        <Text style={ s.text }>Estimated delivery time <Text style={ s.black }>25 minutes</Text></Text>

        <Spacer size={ 30 } />

        <FlatList 
          style={ s.flatList }
          showsVerticalScrollIndicator={ false }
          contentContainerStyle={{ padding: 20 }}
          data={ theCart.items }
          renderItem={ CartItem }
          keyExtractor={ data => data.id.toString() }
          ItemSeparatorComponent={ () => <Spacer size={ 15 } /> }
        />

        <Spacer size={ 30 } />

        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ () => navigation.navigate( "Payment" ) }
          style={ s.paymentContainer }
        >
          <Text style={ s.payment }>Proceed to Payment</Text>

          <Text style={ s.total }>RM { total.toFixed( 2 ) }</Text>
        </TouchableOpacity>
      </View>

      <ConfirmationModal 
        modal={ modal }
        showModal={ showModal }
        message="Confirm to remove this item?"
        onCancel={ () => {
          showModal()
        }}
        onConfirm={ () => {
          showModal()
        }}
      />
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
    padding: 30,
    backgroundColor: LightMode.white
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
  },
  "image": {
    width: "auto",
    height: 150,
    borderRadius: 10,
  },
  "text": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.halfBlack
  },
  "yellow": {
    color: LightMode.yellow
  },
  "black": {
    color: LightMode.black
  },
  "flatList": {
    margin: -20
  },
  "paymentContainer": {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LightMode.green,
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
  "payment": {
    fontFamily: "fjalla",
    fontSize: 20,
    color: LightMode.black
  },
  "total": {
    borderRadius: 10,
    paddingHorizontal: 7.5,
    paddingVertical: 2.5,
    backgroundColor: LightMode.white,
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.black
  }
})