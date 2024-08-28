import { LightMode } from 'assets/colors/LightMode'
import axios from 'axios'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconFA from "react-native-vector-icons/FontAwesome"
import { MAPS_API_KEY } from "@env"

export default function Payment( { route }: any ) {
  const { theCart, total } = route.params

  const [ receiver, setReceiver ] = useState( "" )
  const [ contact, setContact ] = useState( "" )
  const [ address, setAddress ] = useState( "" )

  const locationSearch = async () => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${ address }&key=${ MAPS_API_KEY }`
      )

      if ( res.data.status === "OK" ) {
        const theAddress = res.data.results[ 0 ].formatted_address
        setAddress( theAddress )
      } else {
        Alert.alert(
          "Location not found!",
          "Please ensure that the location name is accurate or existing.",
          [
            { text: "Ok", style: "default" },
          ]
        )
        
        setAddress( "" )
      }
    } catch ( error ) {
      Alert.alert(
        "Unable to fetch location!",
        "Please try again later.",
        [
          { text: "Ok", style: "default" },
        ]
      )

      setAddress( "" )
    }
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

        <Text style={ s.heading }>Payment</Text>

        <Spacer size={ 10 } />

        <LinedTextField 
          name="person"
          placeholder="Receiver Name"
          text={ receiver }
          setText={ setReceiver }
        />

        <Spacer size={ 5 } />

        <LinedTextField 
          name="call"
          placeholder="Contact Number"
          text={ contact }
          setText={ setContact }
          number={ true }
        />

        <Spacer size={ 5 } />

        <LinedTextField 
          name="location-on"
          placeholder="Address"
          text={ address }
          setText={ setAddress }
        />

        <Spacer size={ 10 } />

        <View style={ s.checkContainer }> 
          <TouchableOpacity
            activeOpacity={ 0.5 }
            onPress={ locationSearch }
            style={ s.check }
          >
            <Text style={ s.checkText }>Check</Text>
          </TouchableOpacity>
        </View>

        <Spacer size={ 30 } />

        <View style={ s.divider }>
          <Text style={ s.dividerText }>Order Review</Text>
        </View> 

        <Spacer size={ 10 } />

        <View style={ s.reviewContainer }>
          <ScrollView
            style={{ height: 125 }}
            showsVerticalScrollIndicator={ false }
          >
            {
              theCart.items.map(( item: any, index: number ) => (
                <View key={ index } style={ s.itemContainer }>
                  <Text style={ s.name }>{ item.item.name }</Text>
                  <Text style={ s.price }>{ item.quantity } / RM { ( item.quantity * item.item.price ).toFixed( 2 ) }</Text>
                </View>
              ))
            }
          </ScrollView>
        </View>

        <Spacer size={ 10 } />

        <TouchableOpacity 
          activeOpacity={ 0.5 }
          onPress={ () => console.log( "Change Method" ) }
          style={ s.methodContainer }
        >
          <View style={ s.methodWrapper }>
            <IconFA 
              name="cc-visa"
              size={ 24 }
              color={ LightMode.visaBlue }
            />

            <Text style={ s.methodText }>Payment Method</Text>
          </View>

          <Text style={[ s.methodText, s.halfBlack ]}>5638 **** **** ****</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ () => console.log( "Place Order" ) }
          style={ s.paymentContainer }
        >
          <Text style={ s.payment }>Place Order</Text>

          <Text style={ s.total }>RM { total.toFixed( 2 ) }</Text>
        </TouchableOpacity>
      </View>
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
  "checkContainer": {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  "check": {
    paddingHorizontal: 25,
    paddingVertical: 7.5,
    backgroundColor: LightMode.blue,
    borderRadius: 100,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "checkText": {
    fontFamily: "fjalla",
    fontSize: 16,
    color: LightMode.white
  },
  "divider": {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: LightMode.black,
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
  },
  "dividerText": {
    fontFamily: "cantarell",
    fontSize: 14,
    color: LightMode.white,
  },
  "reviewContainer": {
    padding: 10,
    justifyContent: "space-between",
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
  "itemContainer": {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "name": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "price": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.halfBlack
  },
  "paymentContainer": {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
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
  },
  "methodContainer": {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  "methodWrapper": {
    flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  "methodText": {
    fontFamily: "fjalla",
    fontSize: 16,
    color: LightMode.black,
  },
  "halfBlack": {
    color: LightMode.halfBlack
  }
})