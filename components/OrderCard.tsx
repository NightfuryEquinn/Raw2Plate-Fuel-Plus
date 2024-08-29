import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Spacer from './Spacer'

export default function OrderCard( { title }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 
  
  return (
    <Fragment>
      <View style={ s.divider }>
        <Text style={ s.dividerText }>{ title }</Text>
      </View> 

      <Spacer size={ 10 } />

      <View style={ s.container }>
        <View style={ s.topContainer }>
          <Image 
            source={ require( "../assets/images/grocery_hardcoded/food_merchant.jpg" ) }
            resizeMode="cover"
            style={ s.image }
          />

          <View style={ s.topTextContainer }>
            <Text style={ s.topHeading }>Order #2202407142146</Text>

            <View>
              <Text style={ s.topPrice }>RM 41.50</Text>
              <Text style={ s.method }>Paid with Visa</Text>
            </View>
          </View>
        </View>

        <View style={ s.emptyDivider }></View>

        <View style={ s.middleContainer }>
          <Image 
            source={ require( "../assets/images/icons/destination.png" ) }
            resizeMode="cover"
            style={ s.icon }
          />

          <View style={ s.middleWrapper }>
            <Text style={ s.address }><Text style={ s.yellow }>From</Text> Food Merchant Pavilion Bukit Jalil</Text>
            <Text style={ s.address }><Text style={ s.yellow }>To</Text> F3-03, Arena Green Apartment, 57000 Bukit Jalil, Wilayah Persekutuan Kuala Lumpur</Text>
          </View>
        </View>

        <View style={ s.emptyDivider }></View>

        <View>
          <View style={ s.itemContainer }>
            <Text style={ s.name }>Romaine Lettuce</Text>
            <Text style={ s.price }>3 / RM 29.40</Text>
          </View>

          <View style={ s.itemContainer }>
            <Text style={ s.name }>Romaine Lettuce</Text>
            <Text style={ s.price }>3 / RM 29.40</Text>
          </View>

          <View style={ s.itemContainer }>
            <Text style={ s.name }>Romaine Lettuce</Text>
            <Text style={ s.price }>3 / RM 29.40</Text>
          </View>

          <View style={ s.itemContainer }>
            <Text style={ s.name }>Romaine Lettuce</Text>
            <Text style={ s.price }>3 / RM 29.40</Text>
          </View>

          <View style={ s.itemContainer }>
            <Text style={ s.name }>Romaine Lettuce</Text>
            <Text style={ s.price }>3 / RM 29.40</Text>
          </View>
        </View>
      </View>
    </Fragment>
  )
}

const s = StyleSheet.create({
  "container": {
    paddingTop: 15,
    paddingBottom: 7.5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: LightMode.white,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
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
  "emptyDivider": {
    marginVertical: 20,
    marginHorizontal: "auto",
    width: 300,
    height: 2.5,
    borderRadius: 10,
    backgroundColor: LightMode.darkGrey,
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
  "topContainer": {
    flexDirection: "row",
    gap: 15
  },
  "image": {
    height: 90,
    width: 125,
    borderRadius: 10,
  },
  "topTextContainer": {
    justifyContent: "space-between",
    gap: 10,
  },
  "topHeading": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.halfBlack
  },
  "topPrice": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black
  },
  "method": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.yellow
  },
  "middleContainer": {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  "icon": {
    height: 32,
    width: 32,
  },
  "middleWrapper": {
    flex: 1,
    gap: 5,
  },
  "address": {
    fontFamily: "cantarell",
    fontSize: 14,
    color: LightMode.black
  },
  "yellow": {
    color: LightMode.yellow
  }
})

OrderCard.propTypes = {
  title: PropTypes.string.isRequired
}