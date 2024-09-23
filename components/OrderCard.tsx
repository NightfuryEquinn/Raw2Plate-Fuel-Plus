import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Spacer from './Spacer'
import dayjs from 'dayjs'
import EmptyContent from './EmptyContent'
import { AppDispatch, RootState } from 'redux/reducers/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderItems } from 'redux/actions/groceryAction'
import RoundedBorderButton from './RoundedBorderButton'

export default function OrderCard( { orderData, title }: any ) {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.grocery )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 

  return (
    <Fragment>
      {
        title && title !== "" &&
        <Fragment>
          <View style={ s.divider }>
            <Text style={ s.dividerText }>{ title }</Text>
          </View> 

          <Spacer size={ 10 } />
        </Fragment>
      }

      <View style={ s.container }>
        <View style={ s.topContainer }>
          <Image 
            source={{ uri: orderData?.storeImage }}
            resizeMode="cover"
            style={ s.image }
          />

          <View style={ s.topTextContainer }>
            <Text style={ s.topHeading }>Order #{ orderData?.orderId }</Text>

            <View>
              <Text style={ s.topPrice }>RM { orderData?.totalPrice?.toFixed( 2 ) }</Text>
              <Text style={ s.method }>Paid with { orderData?.paidWith === "cc-visa" ? "Visa" : orderData?.paidWith === "cc-mastercard" ? "Mastercard" : "American Express" }</Text>
            </View>
          </View>
        </View>

        <Spacer size={ 10 } />

        {
          orderData && ( orderData?.status === "Cancelled" || orderData?.status === "Completed" ) ?
            <Fragment>
              <Text style={ s.completed }>{ orderData.status } at { dayjs( orderData?.deliveredTime ).format( 'h:mm a' ) }. </Text>
              
              <Spacer size={ 5 } />

              <Text style={ s.completed }>Received by <Text style={ s.grey }>{ orderData?.receiver } - { orderData?.contact }</Text></Text>
            </Fragment>
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
            <Text style={ s.address }><Text style={ s.yellow }>From</Text> { orderData?.storeName }</Text>
            <Text style={ s.address }><Text style={ s.yellow }>To</Text> { orderData?.address }</Text>
          </View>
        </View>

        <View style={ s.emptyDivider }></View>

        <View>
          {
            data[ 0 ]?.orderItems && data[ 0 ]?.orderItems.length > 0 && data[ 0 ].orderItems[ 0 ].orderId === orderData?.orderId ?
              data[ 0 ]?.orderItems.map(( item: any, index: number ) => (
                <View key={ index } style={ s.itemContainer }>
                  <Text style={ s.name }>{ item.name }</Text>
                  <Text style={ s.price }>{ item.quantity } * { item.price } / RM { ( item.quantity * item.price ).toFixed( 2 ) }</Text>
                </View>
              ))
            : data[ 0 ].orderItems[ 0 ].orderId !== orderData?.orderId ?
              <Fragment>
                <RoundedBorderButton 
                  onPress={ () => dispatch( fetchOrderItems( orderData?.orderId ) ) }
                  text="View Details"
                  color={ LightMode.blue }
                  textColor={ LightMode.white }
                  borderRadius={ 10 }
                  marginHori={ 0 }
                /> 

                <Spacer size={ 7.5 } />
              </Fragment>
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
    fontFamily: "fira",
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
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.black
  },
  "price": {
    fontFamily: "fira",
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
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.halfBlack
  },
  "topPrice": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black
  },
  "method": {
    fontFamily: "fira",
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
    fontFamily: "fira",
    fontSize: 14,
    color: LightMode.black
  },
  "yellow": {
    color: LightMode.yellow
  },
  "completed": {
    fontFamily: "fira",
    fontSize: 14,
    color: LightMode.halfBlack
  },
  "grey": {
    color: LightMode.black
  }
})

OrderCard.propTypes = {
  orderData: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
}