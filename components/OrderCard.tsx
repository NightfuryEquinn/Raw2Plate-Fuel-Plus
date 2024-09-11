import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Spacer from './Spacer'
import dayjs from 'dayjs'
import EmptyContent from './EmptyContent'

export default function OrderCard( { data, itemData, title }: any ) {
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
            source={{ uri: data.storeImage }}
            resizeMode="cover"
            style={ s.image }
          />

          <View style={ s.topTextContainer }>
            <Text style={ s.topHeading }>Order #{ data.orderId }</Text>

            <View>
              <Text style={ s.topPrice }>RM { data.totalPrice.toFixed( 2 ) }</Text>
              <Text style={ s.method }>Paid with { data.paidWith === "cc-visa" ? "Visa" : data.paidWith === "cc-mastercard" ? "Mastercard" : "American Express" }</Text>
            </View>
          </View>
        </View>

        <Spacer size={ 10 } />

        {
          data && data[ 0 ]?.activeOrder ?
            <Text style={ s.completed }>Completed at { dayjs( data.deliveredTime ).format( 'h:mm a' ) }. Received by <Text style={ s.grey }>Mr. { data.receiver } - { data.contact }</Text></Text>
          :
            null
        }

        <View style={ s.emptyDivider }></View>

        <View style={ s.middleContainer }>
          <Image 
            source={ require( "../assets/images/icons/destination.png" ) }
            resizeMode="cover"
            style={ s.icon }
          />

          <View style={ s.middleWrapper }>
            <Text style={ s.address }><Text style={ s.yellow }>From</Text> { data.storeName }</Text>
            <Text style={ s.address }><Text style={ s.yellow }>To</Text> { data.address }</Text>
          </View>
        </View>

        <View style={ s.emptyDivider }></View>

        <View>
          {
            itemData && itemData.length > 0 ?
              itemData.map(( item: any, index: number ) => (
                <View key={ index } style={ s.itemContainer }>
                  <Text style={ s.name }>{ item.name }</Text>
                  <Text style={ s.price }>{ item.quantity } * { item.price } / RM { ( item.quantity * item.price ).toFixed( 2 ) }</Text>
                </View>
              ))
            :
              <Fragment>
                <EmptyContent 
                  message="Unable to load item details in the order..."
                />

                <Spacer size={ 7.5 } />
              </Fragment>
          }
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
  },
  "completed": {
    fontFamily: "cantarell",
    fontSize: 14,
    color: LightMode.halfBlack
  },
  "grey": {
    color: LightMode.black
  }
})

OrderCard.propTypes = {
  data: PropTypes.any.isRequired,
  itemData: PropTypes.any,
  title: PropTypes.string.isRequired
}